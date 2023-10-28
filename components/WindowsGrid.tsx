import CalendarWindow from "./CalendarWindow";

export default function WindowsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 24 }, (_, i) => (
        <CalendarWindow day={`${i + 1}`} key={i} />
      ))}
    </div>
  );
}
