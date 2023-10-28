"use client";

import { getIconForDay } from "@/app/icons";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CalendarWindowProps {
  day: string;
}

export default function CalendarWindow({ day }: CalendarWindowProps) {
  const { calendarId } = useParams();

  return (
    <Card as={Link} href={`/c/${calendarId}/${day}`} className="cursor-pointer">
      <CardHeader className="pb-0 flex items-start justify-center">
        <h4 className="font-bold text-xl text-primary pb-0">Day {day}</h4>
      </CardHeader>
      <CardBody className="overflow-visible flex items-center justify-center">
        <FontAwesomeIcon
          icon={getIconForDay(day)}
          className="h-20 w-20 text-primary"
        />
      </CardBody>
    </Card>
  );
}
