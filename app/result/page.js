"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";

const iconMap = {
  seed: "/seed.png",
  flame: "/flame.png",
  bridge: "/bridge.png",
  sanctuary: "/sanctuary.png",
  mirror: "/mirror.png",
  river: "/river.png",
};

export default function ResultPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("เพื่อนใหม่");
  const displayName = (name && name.trim()) || "เพื่อนใหม่";
  const [result, setResult] = useState(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
     if (hasProcessed.current) return;
    hasProcessed.current = true;

    const storedName = localStorage.getItem("byc_name");
    if (storedName) setName(storedName);

    const answersRaw = localStorage.getItem("byc_answers") || "[]";
    const answers = JSON.parse(answersRaw);
    const runId = localStorage.getItem("byc_run_id");
    const savedRunId = localStorage.getItem("byc_saved_run_id");


    async function fetchResult() {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: storedName || "เพื่อนใหม่", answers })
      });
      const data = await res.json();
      setResult(data);
      localStorage.setItem("byc_result", JSON.stringify(data));
      setLoading(false);

        if (runId && savedRunId === runId) return;

      const payload = {
        name: data.name,
        archetype: data.archetype?.title || data.winner
      };

      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
       if (runId) localStorage.setItem("byc_saved_run_id", runId);
    }

    if (answers.length > 0) {
      fetchResult();
    } else {
      setLoading(false);
    }
  }, []);

  const handleApply = () => {
    window.open(
      "https://forms.gle/XdoS3JpfQXr5VDof8",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      className="screen bg-cover"
      style={{ backgroundImage: "url(/bg4.png)" }}
    >
      <FogOverlay />
      <HoloCard>
        {loading && <p>กำลังฟังเสียงหัวใจคุณอยู่…</p>}

        {!loading && result && (
          <div className="result-layout">
            <div className="result-tag">
              <span>Archetype ของ</span>
              <span className="result-pill-name">{displayName}</span>
            </div>
            <img
              src={iconMap[result.winner.toLowerCase()] || "/seed.png"}
              alt={result.winner}
              className="result-icon"
            />
            <h1>{result.archetype.title}</h1>
            <p>{result.archetype.meaning}</p>
            <p>{result.archetype.warm}</p>

            <p className="result-subtitle">
              ประโยคไหนที่คุณอยากเก็บไว้เตือนใจตัวเองในวันนี้:
            </p>

            <ul className="affirm-list">
              {result.archetype.affirm.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <button className="btn btn-primary" onClick={handleApply}>
              สมัครเข้าร่วมโครงการ
            </button>
          </div>
        )}

        {!loading && !result && (
          <>
            <p>ยังไม่มีข้อมูลคำตอบ ลองเริ่มใหม่อีกครั้งนะ</p>
          </>
        )}
      </HoloCard>
    </main>
  );
}