"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";

export default function CardPage() {
  const [name, setName] = useState("เพื่อนใหม่");
  const [result, setResult] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("byc_name");
    if (storedName) setName(storedName);

    const storedResult = localStorage.getItem("byc_result");
    if (storedResult) setResult(JSON.parse(storedResult));
  }, []);

  const handleExport = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "byc-story-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main
      className="screen bg-cover"
      style={{ backgroundImage: "url(/bg2.png)" }}
    >
      <FogOverlay />
      <HoloCard>
        <h2
          style={{
            marginBottom: "22px",
            fontSize: "2rem",
            fontWeight: 800,
            textAlign: "center",
            width: "100%",
            lineHeight: "1.2",
            display: "block"
          }}
        >
          การ์ดสำหรับ IG Story
        </h2>
        <div
          ref={cardRef}
          className="card-wrapper"
        >
          <div className="card-inner">
            <div>
              <div style={{ fontSize: "1.0rem", opacity: 0.8 }}>
                Be Your Change – Journey Within
              </div>
              <div style={{ marginTop: 4, fontSize: "1.4rem", fontWeight: 600 }}>
                {name}
              </div>
              {result && (
                <>
                  <div style={{ marginTop: 4, fontSize: "1.2rem", opacity: 0.92 }}>
                    {result.archetype.title}
                  </div>
                  <p style={{ marginTop: 10, fontSize: "1.1rem" }}>
                    “{result.archetype.quote}”
                  </p>
                </>
              )}
            </div>

            <div className="card-footer">
              <div>หยิบอนาคตไว้ในมือฉัน</div>
              <div style={{ fontSize: "0.9rem" }}>beyourchange • journey within</div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleExport}>
          บันทึกเป็นภาพสำหรับ IG Story
        </button>
      </HoloCard>
    </main>
  );
}