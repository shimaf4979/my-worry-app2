// app/api/chart-data/route.ts
import { NextResponse } from "next/server";
import { getCachedChartData } from "@/lib/cache";

export async function GET() {
  try {
    const data = await getCachedChartData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
