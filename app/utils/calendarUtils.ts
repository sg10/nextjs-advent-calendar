import { YEAR } from "@/config/settings";

export function getDebugDate() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // 2023-12-16
  return new Date(2023, 11, 16);
}

export function getTodayDay() {
  const date = getDebugDate() ?? new Date();
  return date.getDate();
}

export function isDayToday(day: number) {
  return isCalendarMonth() && day === getTodayDay();
}

function isPast24th() {
  const the24th = new Date(YEAR, 11, 24);
  return new Date() > the24th;
}

export function isCalendarMonth() {
  const date = getDebugDate() ?? new Date();
  return date.getMonth() === 11 || isPast24th();
}

export function isOpen(day: number | string) {
  if (typeof day === "string") {
    day = parseInt(day);
  }
  return (isCalendarMonth() && day <= getTodayDay()) || isPast24th();
}
