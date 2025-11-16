"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";

export default function SoftPage() {
  const router = useRouter();
  const [name, setName] = useState("เพื่อนใหม่");
  const displayName = (name && name.trim()) || "เพื่อนใหม่";

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
          <strong>{displayName}</strong>, โลกไม่ได้รอให้คุณสมบูรณ์แบบนะ{"\n"}
          มันแค่ขอให้คุณยังอยู่ข้างตัวเองก็พอ{"\n\n"}
          ต่อให้วันนี้หัวใจจะหนักขึ้นนิดหน่อย{"\n"}
          คุณก็ยังคู่ควรกับการเติบโตเสมอ{"\n\n"}
          หายใจเข้าช้า ๆ นะ{"\n"}
          แล้วค่อยไปดูภาพสะท้อนหัวใจของคุณกัน
        </p>

        <button className="btn btn-primary" onClick={handleNext}>
          ดู Archetype ของ {displayName}
        </button>
      </HoloCard>
    </main>
  );
}