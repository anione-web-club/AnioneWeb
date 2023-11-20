import { useState } from "react";

export function useInput(initialValue) {
  const [text, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value: text },
    } = event;
    setValue(text);
  };
  return [text, onChange];
}
