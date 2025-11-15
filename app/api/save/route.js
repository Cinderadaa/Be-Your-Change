import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, archetype, answers } = body;

    console.log("Incoming save body:", body);

    const { data, error } = await supabase
      .from("byc_results")
      .insert([
        {
          name,
          archetype,
          created_at: new Date(),
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(
        JSON.stringify({ ok: false, error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Internal API error:", err);
    return new Response(
      JSON.stringify({ ok: false, message: "Server crash" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}