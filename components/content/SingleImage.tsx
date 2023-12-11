import Image from "next/image";
import { useMemo } from "react";

export default function SingleImage({ url }: { url: string }): JSX.Element {
  const urlReplaced = useMemo(() => {
    if (url?.startsWith?.("https://drive.google.com/file/d/")) {
      const gDriveId = url.split("/")[5];
      return `https://drive.google.com/uc?export=view&id=${gDriveId}`;
    }

    return url;
  }, [url]);

  return (
    <img // eslint-disable-line @next/next/no-img-element
      src={urlReplaced}
      alt="Calendar day image"
      className="w-full"
      width={500}
      height={500}
    />
  );
}
