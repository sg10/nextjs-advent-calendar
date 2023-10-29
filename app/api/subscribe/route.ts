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

  const token = (await request.json()).token;

  if (!token?.length) {
    return NextResponse.json(
      { success: false, error: "No token provided" },
      {
        status: 401,
      },
    );
  }

  const registrationTokens = [token];

  try {
    const response = await admin
      .messaging()
      .subscribeToTopic(registrationTokens, NOTIFICATION_TOPIC);
    console.log("Successfully subscribed to topic:", response);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error subscribing to topic:", error);
    return NextResponse.json(
      { success: false, error: "Error subscribing to topic" },
      {
        status: 401,
      },
    );
  }
}
