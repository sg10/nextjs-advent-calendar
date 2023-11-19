"use client";

import { useEffect } from "react";
import CalendarWindow from "./CalendarWindow";
import { useParams } from "next/navigation";

interface WindowsGridProps {
  today: number;
  scrollToToday?: boolean;
  windows: any;
}

export default function WindowsGrid({ today, windows }: WindowsGridProps) {
  const params = useParams();

  useEffect(() => {
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
  }, [today, params]);

  return (
    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 24 }, (_, i) => (
        <CalendarWindow
          key={i}
          day={i + 1}
          disabled={i + 1 > today || !windows.find((d) => d.day === i + 1)}
          emphasized={i + 1 === today}
        />
      ))}
    </div>
  );
}
