import { getFirestoreDB } from "@/app/api/firebase-admin";
import NotificationManager from "@/components/NotificationManager";
import WindowsGrid from "@/components/WindowsGrid";

interface PageProps {
  params: {
    calendarId: string;
  };
}

export default async function Page({ params: { calendarId } }: PageProps) {
  const configDoc = await getFirestoreDB()
    .collection(calendarId)
    .doc("config")
    .get();

  if (!configDoc.exists) {
    return (
      <div className="flex items-center justify-center text-primary text-2xl flex-col gap-4">
        <div>Calendar not found</div>
        <div className="h-96">:(</div>
      </div>
    );
  }

  const config = configDoc.data() as {
    title: string;
    notificationsEnabled: boolean | undefined;
  };

  const windowsDocs = await getFirestoreDB()
    .collection(calendarId)
    .doc("config")
    .collection("windows")
    .listDocuments();

  const windows: WindowContentData[] = [];

  for (const doc of windowsDocs) {
    const data = (await doc.get()).data();
    windows.push({ ...data, day: parseInt(doc.id) } as WindowContentData);
  }

  windows.sort((a, b) => a.day - b.day);

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        {config.title}
      </h1>

      {config.notificationsEnabled && <NotificationManager />}
      <WindowsGrid windows={windows} />
    </div>
  );
}
