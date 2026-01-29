import Image from "next/image";
import FogOverlay from "@/components/FogOverlay";

export default function AboutPage() {
  return (
    <div className="screen relative flex justify-center items-start pt-24 bg-gradient overflow-hidden">
      <FogOverlay />
      <div className="holo-card w-full max-w-4xl px-10 py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About Be Your Change
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-black/80 mb-12 text-center leading-relaxed">
          Be Your Change คือโครงการพัฒนาผู้นำนักศึกษาของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)
          ที่ออกแบบมาเพื่อให้นักศึกษาได้สำรวจตัวเอง ค้นหาอัตลักษณ์
          และเติบโตเป็นผู้นำที่สร้างการเปลี่ยนแปลงเชิงบวกให้กับสังคม
        </p>

        {/* Partners Section */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-8 text-left">
            Project Partners
          </h2>

          <div className="flex flex-row items-start justify-start gap-20 w-full">
            {/* WE Tech Consulting */}
            <div className="flex flex-col items-center">
              <Image
                src="/WE.png"
                alt="WE Tech Consulting"
                width={160}
                height={160}
                className="object-contain"
              />
              <p className="mt-3 text-sm text-black/60 text-center">
                WE Tech Consulting
              </p>
            </div>

            {/* Be PSY You */}
            <div className="flex flex-col items-center">
              <Image
                src="/BePSYYou.PNG"
                alt="Be PSY You"
                width={160}
                height={160}
                className="object-contain"
              />
              <p className="mt-3 text-sm text-black/60 text-center">
                Be PSY You
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}