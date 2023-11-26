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

export function isCalendarMonth() {
  const date = getDebugDate() ?? new Date();
  return date.getMonth() === 11;
}

export function isOpen(day: number | string) {
  if (typeof day === "string") {
    day = parseInt(day);
  }
  return isCalendarMonth() && day <= getTodayDay();
}
