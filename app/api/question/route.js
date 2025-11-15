import { NextResponse } from "next/server";
import { QUESTIONS } from "@/lib/questions";

export async function GET() {
  return NextResponse.json({ questions: QUESTIONS });
}