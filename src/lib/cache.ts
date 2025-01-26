// lib/chartDataCache.ts
import { ChartData } from "@/types";
import { supabase } from "@/lib/supabase";
import { WorryTypes } from "@/data/worryTypes";

let cachedChartData: ChartData[] | null = null;
let lastUpdateTime = 0;
const UPDATE_INTERVAL = 10 * 60 * 1000; // 10分

async function generateChartData() {
  const { data, error } = await supabase.from("user_results").select("*");

  if (error) throw error;

  return Object.entries(WorryTypes).map(([worryId, worry]) => {
    // 学部生のデータ集計
    const undergraduateData = data.filter(
      (r) => r.education_level === "undergraduate" && r.top_worry === worryId
    );

    // 修士のデータ集計
    const masterData = data.filter(
      (r) => r.education_level === "master" && r.top_worry === worryId
    );

    // 博士のデータ集計
    const doctorData = data.filter(
      (r) => r.education_level === "doctor" && r.top_worry === worryId
    );

    // その他のデータ集計
    const otherData = data.filter(
      (r) => r.education_level === "other" && r.top_worry === worryId
    );

    return {
      worryId,
      worryTitle: worry.title,
      // 教育レベル別の合計
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
}

export async function getCachedChartData(): Promise<ChartData[]> {
  const now = Date.now();
  if (!cachedChartData || now - lastUpdateTime > UPDATE_INTERVAL) {
    cachedChartData = (await generateChartData()) as any;
    lastUpdateTime = now;
  }
  return cachedChartData as ChartData[];
}
