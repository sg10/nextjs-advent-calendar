"use client";

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
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
