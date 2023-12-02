"use client";

import { useEffect } from "react";
import CalendarWindow from "./CalendarWindow";
import { useParams } from "next/navigation";
import {
  getTodayDay,
  isCalendarMonth,
  isDayToday,
  isOpen,
} from "@/app/utils/calendarUtils";

interface WindowsGridProps {
  scrollToToday?: boolean;
  windows: WindowContentData[];
}

export default function WindowsGrid({ windows }: WindowsGridProps) {
  const params = useParams();

  useEffect(() => {
    if (!isCalendarMonth()) return;

    const today = getTodayDay();

    const hash = window.location.hash; // day-x
    const dayToScrollTo = hash ? parseInt(hash.split("-")[1]) : undefined;

    if (!dayToScrollTo) {
      const todayElement = document.getElementById(`day-${today}`);
      if (todayElement) {
        todayElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      const element = document.getElementById(`day-${dayToScrollTo}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [params]);

  return (
    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {windows.map((window: any) => (
        <CalendarWindow
          key={window.day}
          day={window.day}
          disabled={!isOpen(window.day)}
          emphasized={isDayToday(window.day)}
        />
      ))}
    </div>
  );
}
