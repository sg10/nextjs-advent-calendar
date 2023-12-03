import Image from "next/image";
import YouTube from "./YouTube";

export default function ContentElementResolver({
  data,
}: {
  data: any;
}): JSX.Element {
  if (data.type === "youtube") {
    return <YouTube url={data.url} />;
  } else if (data.type === "text") {
    return (
      <div className="text-md text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {data.text}
      </div>
    );
  } else if (data.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={data.url}
        alt={data.url}
        className="w-full"
        width={500}
        height={500}
      />
    );
  }
  if (data.type === "video-file") {
    return (
      <video controls width="100%" className="w-full" height="auto">
        <source src={data.url} type="video/mp4" />
      </video>
    );
  } else if (data.type === "placeholder") {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-800">
        <div className="flex items-center justify-center h-full">
          <p className="text-primary">Placeholder</p>
        </div>
      </div>
    );
  }

  return <div>Invalid type: {data.type ?? "undefined"}</div>;
}
