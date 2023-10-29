import NotificationManager from "@/components/NotificationManager";
import WindowsGrid from "@/components/WindowsGrid";

interface PageProps {
  params: {
    calendarId: string;
  };
}

export default async function Page({ params: { calendarId } }: PageProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const today = 7;

  return (
    <div className="flex flex-col gap-8 items-stretch justify-center">
      <h1 className="text-3xl font-bold text-center text-primary">
        Calendar {calendarId}
      </h1>

      <NotificationManager />
      <WindowsGrid today={today} />
    </div>
  );
}
