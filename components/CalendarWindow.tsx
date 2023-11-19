"use client";

import { getIconForDay } from "@/app/icons";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CalendarWindowProps {
  day: number;
  disabled?: boolean;
  emphasized?: boolean;
}

export default function CalendarWindow({
  day,
  disabled,
  emphasized,
}: CalendarWindowProps) {
  const { calendarId } = useParams();

  const linkProps = disabled
    ? {}
    : { href: `/c/${calendarId}/${day}`, as: Link };

  return (
    <Card
      {...linkProps}
      className={`${disabled ? "opacity-50" : "hover:shadow-lg cursor-pointer"} 
        ${emphasized ? "border-3 border-primary" : ""}
        p-4
      transition-all duration-200 ease-in-out`}
      id={`day-${day}`}
    >
      <CardHeader className="pb-3 flex items-start justify-center font-bold text-2xl text-primary text-center">
        Day {day}
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
