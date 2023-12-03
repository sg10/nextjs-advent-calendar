import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireFirebaseAdmin } from "../firebase-admin";
import { NOTIFICATION_TOPIC } from "@/config/notifications";

export async function POST(request: NextRequest) {
  const admin = requireFirebaseAdmin();

  if (!request.body)
    return NextResponse.json(
      { success: false, error: "No body provided" },
      {
        status: 401,
      },
    );

  const jsonData = (await request.json()) as {
    token: string;
    calendarId: string;
    hour: number;
  };

  const token = jsonData.token;

  if (!token?.length) {
    return NextResponse.json(
      { success: false, error: "No token provided" },
      {
        status: 401,
      },
    );
  }

  const db = admin.firestore();

  const calendarId = jsonData.calendarId;

  const docRef = db.collection(calendarId).doc("config");
  const doc = await docRef.get();

  if (!doc.exists) {
    return NextResponse.json(
      { success: false, error: "Calendar not found" },
      {
        status: 401,
      },
    );
  }

  // set single field: subscriptions
  const subscriptions = doc.data()?.subscriptions ?? [];

  // check if token already exists
  const existingSubscription = subscriptions.find(
    (s: any) => s.token === token,
  );

  if (existingSubscription) {
    return NextResponse.json(
      { success: false, error: "Token already subscribed" },
      {
        status: 401,
      },
    );
  }

  // add new subscription
  subscriptions.push({
    token,
    hour: jsonData.hour,
  });

  await docRef.update({
    subscriptions,
  });

  return NextResponse.json({ success: true });
}
