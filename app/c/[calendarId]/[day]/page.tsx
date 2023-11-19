import WindowContent from "@/components/content/WindowContent";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import data from "@/app/data.json";
import { Button } from "@nextui-org/button";
import Link from "next/link";

interface Params {
  params: {
    day: string;
  };
}

export default async function Page({
  params: { calendarId, day },
}: Params): Promise<JSX.Element> {
  const win: WindowContent = data[calendarId].windows.find(
    (d) => d.day === parseInt(day),
  );

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <Card>
        <div className="flex flex-col items-stretch justify-center">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center text-primary">
              <span className="inline-block h-11 w-11 rounded-full bg-primary text-white text-center mr-3">
                {day}
              </span>
              {win.title}
            </h1>
          </CardHeader>
          <CardBody>
            <p>{win.text}</p>
          </CardBody>
          <WindowContent content={win.content} />
        </div>
      </Card>
      <Button as={Link} href={`/c/${calendarId}#day-${day}`} color="secondary">
        Back
      </Button>
    </div>
  );
}
