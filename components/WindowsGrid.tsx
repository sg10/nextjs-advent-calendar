"use client";

import { useEffect } from "react";
import CalendarWindow from "./CalendarWindow";

interface WindowsGridProps {
  today: number;
  scrollToToday?: boolean;
}

export default function WindowsGrid({
  today,
  scrollToToday = true,
}: WindowsGridProps) {
  useEffect(() => {
    if (scrollToToday) {
      const todayElement = document.getElementById(`day-${today}`);
      if (todayElement) {
        todayElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [today, scrollToToday]);

  return (
    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 24 }, (_, i) => (
        <CalendarWindow
          key={i}
          day={`${i + 1}`}
          disabled={i + 1 > today}
          emphasized={i + 1 === today}
        />
      ))}
    </div>
  );
}
