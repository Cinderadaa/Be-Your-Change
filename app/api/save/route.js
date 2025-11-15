import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("Save result:", body);
  // ต่อ Supabase ตรงนี้ได้ทีหลัง
  return NextResponse.json({ ok: true });
}