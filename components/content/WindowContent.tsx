"use client";

import { useState } from "react";
import Quiz from "./Quiz";
import YouTube from "./YouTube";

export default function WindowContent({
  content,
}: {
  content: Content;
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
