import { firestoreDB } from "@/app/firebase-server";
import { doc, setDoc } from "firebase/firestore";

export default async function initialPopulate({
  calendarId,
}: {
  calendarId: string;
}) {
  // create config doc
  await setDoc(doc(firestoreDB, calendarId, "config"), {
    title: "Advent Calendar",
  });

  // create windows
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
      setDoc(
        doc(firestoreDB, calendarId, "config", "windows", `${window.day}`),
        window,
      ),
    ),
  );
}
