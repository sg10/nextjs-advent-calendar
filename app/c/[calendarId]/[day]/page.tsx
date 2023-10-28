import { getIconForDay } from "@/app/icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Params {
  params: {
    day: string;
  };
}

export default function Page({ params: { day } }: Params): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-primary">
        Day {day}{" "}
        <FontAwesomeIcon icon={getIconForDay(day)} beat className="ml-2" />
      </h1>
    </div>
  );
}
