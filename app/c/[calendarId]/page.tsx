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
    <div>
      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        Calendar {calendarId}
      </h1>
      <WindowsGrid today={today} />
    </div>
  );
}
