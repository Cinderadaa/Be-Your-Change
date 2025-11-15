"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Typewriter from "@/components/Typewriter";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";

const introText = `
ลมหายใจคุณก็เหนื่อยมาพอแล้วนะ
วันนี้ไม่ต้องรีบเป็นคนเก่ง
มาลองคุยกับหัวใจคุณสักแป๊บดีไหม
`;

export default function IntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleStart = () => {
    const trimmed = name.trim() || "เพื่อนใหม่";
    localStorage.setItem("byc_name", trimmed);
    localStorage.setItem("byc_answers", JSON.stringify([]));
    router.push("/question/1");
  };

  return (
    <main
      className="screen bg-cover"
      style={{ backgroundImage: "url(/bg1.png)" }}
    >
      <FogOverlay />
      <HoloCard>
        <Typewriter text={introText} />

        <input
          id="nameInput"
          className="input"
          placeholder="ขอรู้จักชื่อคุณหน่อย..."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {name.trim() && (
          <p style={{ marginTop: 12, fontSize: "1.3rem" }}>
            ดีใจที่คุณมานะ, <b>{name.trim()}</b>
            {"\n"}โลกภายนอกวุ่นวายพอแล้ว ตอนนี้ขอให้มีแค่คุณกับหัวใจตัวเอง
          </p>
        )}

        <button className="btn btn-primary" onClick={handleStart}>
          เริ่มเส้นทาง
        </button>
      </HoloCard>
    </main>
  );
}