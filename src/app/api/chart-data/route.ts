// app/api/chart-data/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { WorryTypes } from "@/data/worryTypes";

async function generateChartData() {
  try {
    const { data, error } = await supabase
      .from("user_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Object.entries(WorryTypes).map(([worryId, worry]) => {
      // 各教育レベルのデータをフィルタリング
      const undergraduateData = data.filter(
        (r) => r.education_level === "undergraduate" && r.top_worry === worryId
      );
      const masterData = data.filter(
        (r) => r.education_level === "master" && r.top_worry === worryId
      );
      const doctorData = data.filter(
        (r) => r.education_level === "doctor" && r.top_worry === worryId
      );
      const otherData = data.filter(
        (r) => r.education_level === "other" && r.top_worry === worryId
      );

      return {
        worryId,
        worryTitle: worry.title,
        // 教育レベル別の集計
        undergraduate: undergraduateData.length,
        master: masterData.length,
        doctor: doctorData.length,
        other: otherData.length,
        // 年次別の集計（教育レベルごと）
        year1: {
          undergraduate: undergraduateData.filter((r) => r.year_number === 1)
            .length,
          master: masterData.filter((r) => r.year_number === 1).length,
          doctor: doctorData.filter((r) => r.year_number === 1).length,
        },
        year2: {
          undergraduate: undergraduateData.filter((r) => r.year_number === 2)
            .length,
          master: masterData.filter((r) => r.year_number === 2).length,
          doctor: doctorData.filter((r) => r.year_number === 2).length,
        },
        year3: {
          undergraduate: undergraduateData.filter((r) => r.year_number === 3)
            .length,
          master: masterData.filter((r) => r.year_number === 3).length,
          doctor: doctorData.filter((r) => r.year_number === 3).length,
        },
        year4: {
          undergraduate: undergraduateData.filter((r) => r.year_number === 4)
            .length,
          master: masterData.filter((r) => r.year_number === 4).length,
          doctor: doctorData.filter((r) => r.year_number === 4).length,
        },
      };
    });
  } catch (error) {
    console.error("Error generating chart data:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await generateChartData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
