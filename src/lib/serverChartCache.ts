// // lib/serverChartCache.ts
// import { cache } from "react";
// import { unstable_cache } from "next/cache";
// import { supabase } from "@/lib/supabase";
// import { WorryTypes } from "@/data/worryTypes";
// import { ChartData, YearData } from "@/types";

// interface CachedData {
//   chartData: ChartData[];
//   timestamp: number;
// }

// // 10分のキャッシュ時間
// const CACHE_DURATION = 10 * 60;

// export const getChartDataFromDB = cache(async (): Promise<ChartData[]> => {
//   const { data: results, error } = await supabase
//     .from("user_results")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) throw error;

//   return Object.entries(WorryTypes).map(([worryId, worry]) => {
//     // 各教育レベルでのフィルタリング
//     const undergraduateResults = results.filter(
//       (r) => r.education_level === "undergraduate" && r.top_worry === worryId
//     );
//     const masterResults = results.filter(
//       (r) => r.education_level === "master" && r.top_worry === worryId
//     );
//     const doctorResults = results.filter(
//       (r) => r.education_level === "doctor" && r.top_worry === worryId
//     );
//     const otherResults = results.filter(
//       (r) => r.education_level === "other" && r.top_worry === worryId
//     );

//     // 年次別データの集計
//     const getYearData = (filteredResults: any[]): YearData => ({
//       undergraduate: filteredResults.filter((r) => r.year_number === 1).length,
//       master: filteredResults.filter((r) => r.year_number === 2).length,
//       doctor: filteredResults.filter((r) => r.year_number === 3).length,
//     });

//     return {
//       worryId,
//       worryTitle: worry.title,
//       undergraduate: undergraduateResults.length,
//       master: masterResults.length,
//       doctor: doctorResults.length,
//       other: otherResults.length,
//       year1: getYearData(results.filter((r) => r.year_number === 1)),
//       year2: getYearData(results.filter((r) => r.year_number === 2)),
//       year3: getYearData(results.filter((r) => r.year_number === 3)),
//       year4: getYearData(results.filter((r) => r.year_number === 4)),
//     };
//   });
// });

// // キャッシュされたデータを取得する関数
// export const getCachedChartData = unstable_cache(
//   async () => {
//     const data = await getChartDataFromDB();
//     return {
//       chartData: data,
//       timestamp: Date.now(),
//     };
//   },
//   ["chart-data-cache"],
//   { revalidate: CACHE_DURATION }
// );
