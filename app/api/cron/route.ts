import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireFirebaseAdmin } from "../firebase-admin";
import {
  NOTIFICATION_BODY,
  NOTIFICATION_TITLE,
  NOTIFICATION_TOPIC,
} from "@/config/notifications";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    process.env.NODE_ENV === "production"
  ) {
    return NextResponse.json(
      { success: false, error: "Not cron" },
      {
        status: 401,
      },
    );
  }

  const admin = requireFirebaseAdmin();

  try {
    const response = await admin.messaging().send({
      notification: {
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
      },
      webpush: {
        fcmOptions: {
          link: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        },
      },
      topic: NOTIFICATION_TOPIC,
    });
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log("Error sending message:", error);
  }

  return NextResponse.json({ success: true });
}
