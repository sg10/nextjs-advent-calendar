import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@nextui-org/button";

import { getFirestoreDB } from "@/app/api/firebase-admin";
import { revalidatePath } from "next/cache";
import dynamic from "next/dynamic";
import WindowCardPreview from "./WindowCardPreview";
import initialPopulate from "./inital";
import React from "react";
import Link from "next/link";
import WindowEditor from "./WindowEditor";

export default async function InitalPopulate({
  params: { calendarId, day },
}: {
  params: { calendarId: string; day: string };
}) {
  const configDoc = await getFirestoreDB()
    .collection(calendarId)
    .doc("config")
    .get();

  const config = (configDoc.data() ?? initialPopulate({ calendarId })) as {
    title: string;
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

  async function create(formData: FormData) {
    "use server";

    const dataString = formData.get("data") as string | null;
    if (!dataString) throw new Error("No data");
    const data = JSON.parse(dataString);

    await getFirestoreDB()
      .collection(calendarId)
      .doc("config")
      .collection("windows")
      .doc(day)
      .set(data);

    revalidatePath(`/c/${calendarId}/populate/${day}`);
  }

  const calendarWindow = windows.find((window) => `${window.day}` === `${day}`);

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        <Link href={`/c/${calendarId}/populate`}>Populate {config.title}</Link>
      </h1>
      {calendarWindow ? (
        <>
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
          <form
            action={create}
            className="flex flex-col gap-8 items-stretch justify-center w-full"
          >
            <WindowEditor defaultValue={calendarWindow} name="data" />
            <Button type="submit">Save</Button>
          </form>
          <ErrorBoundary fallback={<div>Invalid data</div>}>
            <WindowCardPreview window={calendarWindow} />
          </ErrorBoundary>
        </>
      ) : (
        // list of windows including title
        <div className="flex flex-col gap-8 items-stretch justify-center w-full">
          {windows.map((window) => (
            <div
              key={window.day}
              className="flex flex-col gap-8 items-stretch justify-center w-full"
            >
              <a href={`/c/${calendarId}/populate/${window.day}`}>
                {window.day} - {window.title}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
