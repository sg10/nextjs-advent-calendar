"use client";

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import ContentEditor from "./ContentEditor";
import { ContentData } from "./types";
import JsonModal from "./JsonModal";

interface WindowData {
  day: number;
  title: string;
  text: string;
  content: ContentData[];
  name: string;
}

export default function WindowEditor({
  defaultValue,
  name,
}: {
  defaultValue: WindowData;
  name: string;
}) {
  const [data, setData] = useState<WindowData>(defaultValue);

  useEffect(() => {
    setData(defaultValue);
  }, [defaultValue]);

  const updateData = (newData: WindowData) => {
    setData(newData);
  };

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name={name} value={JSON.stringify(data)} />

      <Input
        label="Title"
        value={data.title}
        onChange={(e) => updateData({ ...data, title: e.target.value })}
      />

      <Textarea
        label="Description"
        value={data.text || ""}
        onValueChange={(value) => updateData({ ...data, text: value })}
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Content</h3>
        {data.content.map((content, index) => (
          <div key={index} className="border p-4 rounded">
            <ContentEditor
              content={content}
              onChange={(newContent) => {
                const newContentArray = [...data.content];
                newContentArray[index] = newContent;
                updateData({ ...data, content: newContentArray });
              }}
            />
            <JsonModal value={content} name={`content[${index}]`} />
          </div>
        ))}
      </div>
    </div>
  );
}
