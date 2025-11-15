"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 40 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return <p className="typewriter">{display}</p>;
}