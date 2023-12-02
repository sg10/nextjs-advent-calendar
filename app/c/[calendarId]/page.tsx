import { firestoreDB } from "@/app/firebase-server";
import NotificationManager from "@/components/NotificationManager";
import WindowsGrid from "@/components/WindowsGrid";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

interface PageProps {
  params: {
    calendarId: string;
  };
}

const notificationsEnabled = false;

export default async function Page({ params: { calendarId } }: PageProps) {
  const configDoc = await getDoc(doc(firestoreDB, calendarId, "config"));

  if (!configDoc.exists()) {
    return (
      <div className="flex items-center justify-center text-primary text-2xl flex-col gap-4">
        <div>Calendar not found</div>
        <div className="h-96">:(</div>
      </div>
    );
  }

  const config = configDoc.data() as { title: string };

  const windowsDocs = await getDocs(
    collection(firestoreDB, calendarId, "config", "windows"),
  );

  const windows = windowsDocs.docs.map(
    (doc: FirebaseFirestore.DocumentData) => {
      return {
        day: doc.id,
        ...doc.data(),
      } as WindowContentData;
    },
  ) as WindowContentData[];

  windows.sort((a, b) => a.day - b.day);

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        {config.title}
      </h1>

      {notificationsEnabled && <NotificationManager />}
      <WindowsGrid windows={windows} />
    </div>
  );
}
