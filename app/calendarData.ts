import dataNoType from "@/app/data.json";

interface CalendarData {
  title: string;
  windows: {
    day: number;
    title: string;
    text: string;
    content: {
      type: string;
    }[];
  }[];
}

const calendarData: Record<string, CalendarData> = dataNoType;

export default calendarData;
