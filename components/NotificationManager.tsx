"use client";

import { firebaseApp } from "@/app/firebase-client";
import { faBan, faBell, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { getMessaging, getToken } from "firebase/messaging";
import { useCallback, useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";

async function getTokenAndSubscribe(calendarId: string) {
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
      calendarId,
      hour: 8,
    }),
  });

  console.log("Subscribed to topic.");
}

export default function NotificationManager() {
  const { calendarId } = useParams() as { calendarId: string };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const onEnable = useCallback(async () => {
    onClose();

    setError(null);

    const p = await Notification.requestPermission();
    setPermission(p);

    if (p !== "granted") {
      setError("Permission denied.");
      setLoading(false);
      return;
    }
  }, [onClose]);

  useEffect(() => {
    setPermission(Notification.permission);
    if (permission !== "granted") {
      setLoading(false);
      return;
    }

    async function initialize() {
      setLoading(true);

      try {
        await getTokenAndSubscribe(calendarId);
      } catch (error) {
        console.log("error", error);
      }

      setLoading(false);
    }

    initialize();
  }, [permission, calendarId]);

  return (
    <>
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
              <Button onClick={onOpen}>Get notifications</Button>
            </div>
          ) : (
            <p>
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              You are subscribed to daily notifications.
            </p>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Daily notifications
              </ModalHeader>
              <ModalBody>
                <p>Your browser will ask you to allow notifications.</p>
                <p>
                  Please select <strong>Forever</strong> or{" "}
                  <strong>Always allow</strong> to receive daily notifications.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={onEnable}>Next</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
