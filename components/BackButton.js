"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="back-link" onClick={() => router.back()}>
      ← ย้อนกลับ
    </div>
  );
}