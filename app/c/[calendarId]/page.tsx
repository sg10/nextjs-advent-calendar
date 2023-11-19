import NotificationManager from "@/components/NotificationManager";
import WindowsGrid from "@/components/WindowsGrid";
import data from "@/app/data.json";

interface PageProps {
  params: {
    calendarId: string;
  };
}

export default async function Page({ params: { calendarId } }: PageProps) {
  const calendar = data[calendarId];
  const today = 7;

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        {calendar.title}
      </h1>

      <NotificationManager />
      <WindowsGrid today={today} windows={calendar.windows} />
    </div>
  );
}
