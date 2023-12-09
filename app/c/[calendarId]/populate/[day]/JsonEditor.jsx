"use client";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { useState } from "react";

export default function JsonEditor({ defaultValue, name }) {
  const [value, setValue] = useState(defaultValue ?? {});

  let jsonOrNull = null;
  try {
    jsonOrNull = JSON.stringify(value);
  } catch (e) {
    console.error(e);
  }
  return (
    <div>
      <input
        name={name}
        className="hidden"
        value={jsonOrNull}
        onChange={() => {}}
      />
      <Editor
        value={value}
        onChange={(v) => setValue(v)}
        mainMenuBar={true}
        statusBar={false}
        allowedModes={["code", "tree"]}
        htmlElementProps={{ style: { height: 500 } }}
      />
    </div>
  );
}
