import WindowContent from "@/components/content/WindowContent";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function RenderedWindowMaybe({
  window,
}: {
  window: WindowContentData;
}) {
  try {
    const renderedCard = (
      <Card>
        <div className="flex flex-col items-stretch justify-center">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center text-primary flex items-center justify-center">
              <div className="flex items-center justify-center w-10 h-10 mr-2 rounded-full bg-primary text-white text-lg">
                {window.day}
              </div>
              {window.title}
            </h1>
          </CardHeader>
          <CardBody>
            <p>{window.text}</p>
          </CardBody>
          <WindowContent content={window.content} />
        </div>
      </Card>
    );
    return renderedCard;
  } catch (err) {
    return (
      <div>
        <p>Invalid data</p>
        <p>{JSON.stringify(window)}</p>
      </div>
    );
  }
}
