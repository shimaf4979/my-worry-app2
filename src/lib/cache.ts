// lib/chartDataCache.ts
import { ChartData } from "@/types";
import { supabase } from "@/lib/supabase";
import { WorryTypes } from "@/data/worryTypes";

interface CacheStore {
  data: ChartData[] | null;
  lastUpdated: number;
  isUpdating: boolean;
}

const cache: CacheStore = {
  data: null,
  lastUpdated: 0,
  isUpdating: false,
};

const UPDATE_INTERVAL = 10 * 60 * 1000; // 10分

// キャッシュを更新する関数
async function updateCache() {
  if (cache.isUpdating) return;

  try {
    cache.isUpdating = true;
    const { data, error } = await supabase.from("user_results").select("*");

    if (error) throw error;

    cache.data = Object.entries(WorryTypes).map(([worryId, worry]) => {
      const undergrads = data.filter(
        (r) => r.education_level === "undergraduate" && r.top_worry === worryId
      );
      const masters = data.filter(
        (r) => r.education_level === "master" && r.top_worry === worryId
      );
      const doctors = data.filter(
        (r) => r.education_level === "doctor" && r.top_worry === worryId
      );
      const others = data.filter(
        (r) => r.education_level === "other" && r.top_worry === worryId
      );

      return {
        worryId,
        worryTitle: worry.title,
        undergraduate: undergrads.length,
        master: masters.length,
        doctor: doctors.length,
        other: others.length,
        year1: {
          undergraduate: undergrads.filter((r) => r.year_number === 1).length,
          master: masters.filter((r) => r.year_number === 1).length,
          doctor: doctors.filter((r) => r.year_number === 1).length,
        },
        year2: {
          undergraduate: undergrads.filter((r) => r.year_number === 2).length,
          master: masters.filter((r) => r.year_number === 2).length,
          doctor: doctors.filter((r) => r.year_number === 2).length,
        },
        year3: {
          undergraduate: undergrads.filter((r) => r.year_number === 3).length,
          master: masters.filter((r) => r.year_number === 3).length,
          doctor: doctors.filter((r) => r.year_number === 3).length,
        },
        year4: {
          undergraduate: undergrads.filter((r) => r.year_number === 4).length,
          master: masters.filter((r) => r.year_number === 4).length,
          doctor: doctors.filter((r) => r.year_number === 4).length,
        },
      };
    });

    cache.lastUpdated = Date.now();
  } finally {
    cache.isUpdating = false;
  }
}

// バックグラウンドで定期的にキャッシュを更新
setInterval(() => {
  const now = Date.now();
  if (now - cache.lastUpdated >= UPDATE_INTERVAL) {
    updateCache();
  }
}, UPDATE_INTERVAL);

// 初回のキャッシュ更新を実行
updateCache();

// キャッシュからデータを同期的に取得する関数
export function getChartData(): ChartData[] {
  // キャッシュが古い場合はバックグラウンドで更新を開始
  const now = Date.now();
  if (now - cache.lastUpdated >= UPDATE_INTERVAL && !cache.isUpdating) {
    updateCache();
  }

  return cache.data || [];
}
