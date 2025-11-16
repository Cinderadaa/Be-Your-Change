// components/FogOverlay.js
export default function FogOverlay() {
  return (
    <div className="fog-overlay" aria-hidden="true">
      {/* เลือกใช้กี่อันก็ได้ ไม่ต้องใส่ครบทุก icon */}
      <img src="/bg.png" alt="" className="orb orb-bg" />
      <img src="/bridge.png" alt="" className="orb orb-bridge" />
      <img src="/flame.png" alt="" className="orb orb-flame" />
      <img src="/horizon.png" alt="" className="orb orb-horizon" />
      <img src="/lighthouse.png" alt="" className="orb orb-lighthouse" />
      <img src="/river.png" alt="" className="orb orb-river" />
    </div>
  );
}