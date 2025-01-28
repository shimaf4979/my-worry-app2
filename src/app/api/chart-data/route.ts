// app/api/chart-data/route.ts
import { NextResponse } from "next/server";
import { getChartData } from "@/lib/cache";

export async function GET() {
  try {
    const data = await getChartData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
