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
    const runId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();
    localStorage.setItem("byc_name", trimmed);
    localStorage.setItem("byc_answers", JSON.stringify([]));
    localStorage.setItem("byc_run_id", runId);
    localStorage.removeItem("byc_saved_run_id");
    router.push("/question/1");
  };

  return (
    <main className="relative min-h-screen flex items-start justify-center px-4 pt-24 pb-10 bg-transparent">
      <FogOverlay />
      <div className="relative z-10 w-full max-w-md">
        <HoloCard>
          <div className="space-y-6">
            <div className="text-left">
              <Typewriter text={introText} />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="nameInput"
                className="block text-sm text-neutral-500"
              >
                ก่อนเริ่มเดินทาง อยากให้เรารู้จักชื่อคุณหน่อย 🙂
              </label>

              <input
                id="nameInput"
                className="input w-full"
                placeholder="พิมพ์ชื่อเล่นของคุณ..."
                value={name}
                onChange={e => setName(e.target.value)}
              />

              {name.trim() && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                  ดีใจที่คุณมานะ, <b>{name.trim()}</b>
                  <br />
                  โลกภายนอกวุ่นวายพอแล้ว ตอนนี้ขอให้มีแค่คุณกับหัวใจตัวเอง
                </p>
              )}
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={handleStart}
            >
              เริ่มเส้นทาง
            </button>
          </div>
        </HoloCard>
      </div>
    </main>
  );
}