import { getFirestoreDB } from "@/app/api/firebase-admin";

export default async function initialPopulate({
  calendarId,
}: {
  calendarId: string;
}) {
  await getFirestoreDB().collection(calendarId).doc("config").set({
    title: "Advent Calendar",
  });

  const windows = [];

  for (let i = 1; i <= 24; i++) {
    windows.push({
      day: i,
      title: "Title",
      text: "Text",
      content: [
        {
          type: "placeholder",
          title: "Placeholder",
          text: "This is a placeholder.",
        },
      ],
    });
  }

  await Promise.all(
    windows.map((window) =>
      getFirestoreDB()
        .collection(calendarId)
        .doc("config")
        .collection("windows")
        .doc(`${window.day}`)
        .set(window),
    ),
  );

  console.log("Done");
}
