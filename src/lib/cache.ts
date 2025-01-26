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

  return Object.entries(WorryTypes).map(([worryId, worry]) => ({
    worryId,
    worryTitle: worry.title,
    undergraduate: data.filter(
      (r) => r.education_level === "undergraduate" && r.top_worry === worryId
    ).length,
    master: data.filter(
      (r) => r.education_level === "master" && r.top_worry === worryId
    ).length,
    doctor: data.filter(
      (r) => r.education_level === "doctor" && r.top_worry === worryId
    ).length,
    other: data.filter(
      (r) => r.education_level === "other" && r.top_worry === worryId
    ).length,
    year1: data.filter((r) => r.year_number === 1 && r.top_worry === worryId)
      .length,
    year2: data.filter((r) => r.year_number === 2 && r.top_worry === worryId)
      .length,
    year3: data.filter((r) => r.year_number === 3 && r.top_worry === worryId)
      .length,
    year4: data.filter((r) => r.year_number === 4 && r.top_worry === worryId)
      .length,
  }));
}

// キャッシュされたデータを取得する関数
export async function getCachedChartData(): Promise<ChartData[]> {
  const now = Date.now();
  if (!cachedChartData || now - lastUpdateTime > UPDATE_INTERVAL) {
    cachedChartData = await generateChartData();
    lastUpdateTime = now;
  }
  return cachedChartData;
}
