"use client";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { useState } from "react";

export default function JsonEditor({ defaultValue, name }) {
  const [value, setValue] = useState(defaultValue ?? {});

  return (
    <>
      <input
        name={name}
        className="hidden"
        value={JSON.stringify(value)}
        onChange={() => {}}
      />
      <Editor
        value={value}
        onChange={(v) => setValue(v)}
        mainMenuBar={false}
        statusBar={false}
      />
    </>
  );
}
