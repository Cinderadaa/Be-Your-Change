import { NextResponse } from "next/server";

export async function POST(request) {
  const { answers, name } = await request.json();

  const archetypes = {
    Seed: 0,
    Flame: 0,
    Bridge: 0,
    Sanctuary: 0,
    Mirror: 0,
    River: 0,
  };

  answers.forEach((a) => {
    archetypes[a] = (archetypes[a] || 0) + 1;
  });

  const top = Object.entries(archetypes).sort((a, b) => b[1] - a[1])[0][0];

  const result = {
    name,
    archetype: top,
  };

  return NextResponse.json(result);
}