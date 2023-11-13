"use client";

import { useState } from "react";
import Quiz from "./Quiz";
import YouTube from "./YouTube";

export default function WindowContent({
  content,
}: {
  content: { title: string; description: string; url: string };
}): JSX.Element {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  return (
    <div>
      {isCompleted ? (
        <YouTube url="https://www.youtube.com/embed/1qN72LEQnaU" />
      ) : (
        <Quiz onCompleted={() => setIsCompleted(true)} />
      )}
    </div>
  );
}
