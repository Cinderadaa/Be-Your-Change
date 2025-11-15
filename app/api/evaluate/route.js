import { NextResponse } from "next/server";
import { QUESTIONS } from "@/lib/questions";
import { ARCHETYPES, TIE_BREAK } from "@/lib/archetypes";

export async function POST(req) {
  const { name, answers } = await req.json(); 
  // answers: [{ questionId, optionId }]

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: "invalid answers" }, { status: 400 });
  }

  const score = {};
  Object.keys(ARCHETYPES).forEach(k => (score[k] = 0));

  for (const ans of answers) {
    const q = QUESTIONS.find(q => q.id === ans.questionId);
    if (!q) continue;
    const opt = q.options.find(o => o.id === ans.optionId);
    if (!opt) continue;
    score[opt.archetype] += 1;
  }

  const max = Math.max(...Object.values(score));
  const candidates = Object.keys(score).filter(k => score[k] === max);
  const winner =
    candidates.length === 1
      ? candidates[0]
      : TIE_BREAK.find(k => candidates.includes(k));

  const archetype = ARCHETYPES[winner];

  return new Response(JSON.stringify({
    name,
    winner,
    score,
    archetype
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}