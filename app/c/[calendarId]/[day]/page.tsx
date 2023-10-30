import { getIconForDay } from "@/app/icons";
import YouTube from "@/components/content/YouTube";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

interface Params {
  params: {
    day: string;
  };
}

interface Content {
  title: string;
  description: string;
  url: string;
}

export default async function Page({ params: { day } }: Params): JSX.Element {
  const content: Content = {
    title: "Snowflake",
    description:
      "The cool thing about a snowflake is that it is unique. No two snowflakes are alike. The same is true for you. You are unique. There is no one else like you. You are special. You are loved. You are a child of God.",
    url: "https://www.youtube.com/embed/1qN72LEQnaU",
  };

  return (
    <Card>
      <div className="flex flex-col items-stretch justify-center">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-primary">
            <span className="inline-block h-10 w-10 rounded-full bg-primary text-white text-center mr-3">
              {day}
            </span>
            {content.title}
          </h1>
        </CardHeader>
        <CardBody>
          <p>{content.description}</p>
        </CardBody>
        <div>
          <YouTube url="https://www.youtube.com/embed/1qN72LEQnaU" />
        </div>
      </div>
    </Card>
  );
}
