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
    return <Image src={data.url} alt={data.alt} className="w-full" />;
  }

  return <div>Invalid type: {data.type ?? "undefined"}</div>;
}
