"use client";

import { firebaseApp } from "@/app/firebase-client";
import { faBan, faBell, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { getMessaging, getToken } from "firebase/messaging";
import { useCallback, useEffect, useState } from "react";

async function getTokenAndSubscribe() {
  const firebaseMessaging = getMessaging(firebaseApp);
  const currentToken = await getToken(firebaseMessaging, {
    vapidKey: process.env.NEXT_PUBLIC_CLOUD_MESSAGING_VAPID,
  });

  if (!currentToken) {
    throw new Error("No registration token available.");
  }

  console.log("Got registration token.", currentToken);

  await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: currentToken,
    }),
  });

  console.log("Subscribed to topic.");
}

export default function NotificationManager() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const onClick = useCallback(async () => {
    setError(null);

    const p = await Notification.requestPermission();
    setPermission(p);

    if (p !== "granted") {
      setError("Permission denied.");
      setLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    setPermission(Notification.permission);
    if (permission !== "granted") {
      setLoading(false);
      return;
    }

    async function initialize() {
      setLoading(true);

      try {
        await getTokenAndSubscribe();
      } catch (error) {
        console.log("error", error);
      }

      setLoading(false);
    }

    initialize();
  }, [permission]);

  return (
    <Card>
      <CardHeader>
        <FontAwesomeIcon icon={faBell} className="mr-2" />
        Notifications
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <p>
          Get a daily notification when your advent calendar is ready to be
          opened.
        </p>
        {loading ? (
          <p>...</p>
        ) : permission === "denied" ? (
          <p>
            <FontAwesomeIcon icon={faBan} className="mr-2" />
            Permission denied. Please allow notifications in your browser
            settings.
          </p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : permission !== "granted" ? (
          <div className="flex flex-col gap-4 items-center justify-center">
            <Button onClick={onClick}>Get notifications</Button>
          </div>
        ) : (
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            You are subscribed to daily notifications.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
