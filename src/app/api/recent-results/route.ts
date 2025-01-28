// app/api/recent-results/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("user_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent results" },
      { status: 500 }
    );
  }
}
