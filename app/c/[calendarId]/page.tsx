import WindowsGrid from "@/components/WindowsGrid";

interface PageProps {
  params: {
    calendarId: string;
  };
}

export default function Page({
  params: { calendarId },
}: PageProps): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-primary">
        Calendar {calendarId}
      </h1>
      <WindowsGrid />
    </div>
  );
}
