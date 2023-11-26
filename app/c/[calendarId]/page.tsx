import NotificationManager from "@/components/NotificationManager";
import WindowsGrid from "@/components/WindowsGrid";
import calendarData from "@/app/calendarData";

interface PageProps {
  params: {
    calendarId: string;
  };
}

const notificationsEnabled = false;

export default async function Page({ params: { calendarId } }: PageProps) {
  const calendar = calendarData[calendarId];

  if (!calendar) {
    return (
      <div className="flex items-center justify-center text-primary text-2xl">
        Calendar not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        {calendar.title}
      </h1>

      {notificationsEnabled && <NotificationManager />}
      <WindowsGrid windows={calendar.windows} />
    </div>
  );
}
