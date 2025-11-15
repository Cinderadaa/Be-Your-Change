"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";

export default function SoftPage() {
  const router = useRouter();
  const [name, setName] = useState("เพื่อนใหม่");

  useEffect(() => {
    const stored = localStorage.getItem("byc_name");
    if (stored) setName(stored);
  }, []);

  const handleNext = () => {
    router.push("/result");
  };

  return (
    <main
      className="screen bg-cover"
      style={{ backgroundImage: "url(/bg3.png)" }}
    >
      <FogOverlay />
      <HoloCard>
        <p className="typewriter">
          {name}, โลกไม่ได้รอให้คุณสมบูรณ์แบบ{"\n"}
          มันรอให้คุณยังเป็นตัวเอง{"\n"}
          ต่อให้วันไหนหัวใจคุณหนัก{"\n"}
          คุณก็ยังคู่ควรกับการเติบโตเสมอ{"\n\n"}
          หายใจเข้าช้า ๆ นะ{"\n"}
          คุณไม่ต้องรีบไปไหนเลย
        </p>

        <button className="btn btn-primary" onClick={handleNext}>
          เห็นตัวเองมากขึ้น
        </button>
      </HoloCard>
    </main>
  );
}