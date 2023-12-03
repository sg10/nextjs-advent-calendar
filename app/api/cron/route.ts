import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireFirebaseAdmin } from "../firebase-admin";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // if parameter "test=1" is set, allow cron to be tested,
  // but only if the calendarId contains the word "test" (hacky)
  const testMode = request.url.includes("test=1");

  if (
    !testMode &&
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

  const calendarIdToTokens: Record<string, string[]> = {};
  const calendarIdToName: Record<string, string> = {};

  const collections = await admin.firestore().listCollections();
  for (let i = 0; i < collections.length; i++) {
    const calendarId = collections[i].id;

    if (!calendarId.includes("test") && testMode) continue;

    const docRef = admin.firestore().collection(calendarId).doc("config");
    const doc = await docRef.get();

    if (!doc.exists) continue;

    const docData = doc.data();

    if (!docData?.notificationsEnabled) continue;

    const subscriptions = docData.subscriptions ?? [];

    calendarIdToTokens[calendarId] = subscriptions
      // .filter((s: any) => s.hour === currentHour)  TODO: implement
      .map((s: any) => s.token);

    calendarIdToName[calendarId] = docData.title;
  }

  for (let calendarId in calendarIdToTokens) {
    console.log(
      `Calendar ${calendarId} has ${calendarIdToTokens[calendarId].length} subscriptions`,
    );
  }

  let successCount = 0;

  try {
    for (let calendarId in calendarIdToTokens) {
      if (!calendarIdToTokens[calendarId].length) continue;

      console.log(`Sending notifications for ${calendarId}`);
      const response = await admin.messaging().sendEachForMulticast({
        notification: {
          title: calendarIdToName[calendarId] ?? "Advent Calendar",
          body: "The next window is now available!",
        },
        webpush: {
          fcmOptions: {
            link: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          },
        },
        tokens: calendarIdToTokens[calendarId],
      });

      successCount += response.successCount;
    }
  } catch (error) {
    console.log("Error sending message:", error);
  }

  console.log(`Successfully sent ${successCount} messages`);

  return NextResponse.json({ success: true });
}
