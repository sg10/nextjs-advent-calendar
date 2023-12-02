import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@nextui-org/button";

import { revalidatePath } from "next/cache";
import JsonEditor from "./JsonEditor";
import RenderedWindowMaybe from "./RenderedWindowMaybe";
import initialPopulate from "./inital";
import { getFirestoreDB } from "@/app/firebase-server";

export default async function InitalPopulate({
  params: { calendarId, day },
}: {
  params: { calendarId: string; day: string };
}) {
  const configDoc = await getFirestoreDB()
    .collection(calendarId)
    .doc("config")
    .get();
  if (!configDoc.exists) {
    initialPopulate({ calendarId });
  }
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

  async function create(formData: FormData) {
    "use server";

    const dataString = formData.get("data") as string;
    const data = JSON.parse(dataString);

    await getFirestoreDB()
      .collection(calendarId)
      .doc("config")
      .collection("windows")
      .doc(day)
      .set(data);

    revalidatePath(`/c/${calendarId}/populate/${day}`);
  }

  const window = windows.find((window) => `${window.day}` === `${day}`);

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        Populate {calendarId}
      </h1>
      <div className="flex flex-row gap-2 items-stretch justify-center flex-wrap">
        {windows.map((window) => (
          <a
            key={window.day}
            href={`/c/${calendarId}/populate/${window.day}`}
            className="text-center text-primary"
          >
            {`${window.day}` === `${day}` ? (
              <span className="font-bold">{window.day}</span>
            ) : (
              window.day
            )}
          </a>
        ))}
      </div>
      {window && (
        <>
          <form
            action={create}
            className="flex flex-col gap-8 items-stretch justify-center w-full"
          >
            <JsonEditor defaultValue={window} name="data" />
            <Button type="submit">Save</Button>
          </form>
          <ErrorBoundary fallback={<div>Invalid data</div>}>
            <RenderedWindowMaybe window={window} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
