import WindowContent from "@/components/content/WindowContent";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import calendarData from "@/app/calendarData";
import { isOpen } from "@/app/utils/calendarUtils";

interface Params {
  params: {
    day: string;
    calendarId: string;
  };
}

export default async function Page({
  params: { calendarId, day },
}: Params): Promise<JSX.Element> {
  const win: WindowContent = calendarData?.[calendarId].windows.find(
    (d: any) => d.day === parseInt(day),
  ) as WindowContent;

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <Card>
        {isOpen(day) ? (
          <div className="flex flex-col items-stretch justify-center">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary flex items-center justify-center">
                <div className="flex items-center justify-center w-10 h-10 mr-2 rounded-full bg-primary text-white text-lg">
                  {day}
                </div>
                {win.title}
              </h1>
            </CardHeader>
            <CardBody>
              <p>{win.text}</p>
            </CardBody>
            <WindowContent content={win.content} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-primary">This window is not open yet.</p>
          </div>
        )}
      </Card>
      <Button as={Link} href={`/c/${calendarId}#day-${day}`} color="secondary">
        Back
      </Button>
    </div>
  );
}
