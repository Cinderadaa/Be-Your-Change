"use client";

import { useEffect, useState } from "react";
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
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("byc_name");
    if (storedName) setName(storedName);

    const answersRaw = localStorage.getItem("byc_answers") || "[]";
    const answers = JSON.parse(answersRaw);

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

      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    if (answers.length > 0) {
      fetchResult();
    } else {
      setLoading(false);
    }
  }, []);

  const handleCard = () => {
    router.push("/card");
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
          <>
            <div className="result-tag">Archetype ของคุณ</div>
            <img
              src={iconMap[result.winner.toLowerCase()] || "/seed.png"}
              alt={result.winner}
              className="result-icon"
            />
            <h1>{result.archetype.title}</h1>
            <p style={{ marginTop: 6 }}>{result.archetype.meaning}</p>
            <p style={{ marginTop: 12 }}>{result.archetype.warm}</p>

            <ul className="affirm-list">
              {result.archetype.affirm.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>

            <button className="btn btn-primary" onClick={handleCard}>
              สร้างการ์ดของฉัน
            </button>
          </>
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