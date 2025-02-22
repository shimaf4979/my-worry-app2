// app/statistics/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import WorryDistributionChart from "@/components/WorryDistributionChart";
import { WorryTypes } from "@/data/worryTypes";
import type { UserResult, EducationLevel } from "@/types";
import { EDUCATION_LEVEL_LABELS } from "@/constants/labels";

const educationOptions = [
  { value: "all", label: "全て" },
  { value: "undergraduate", label: "学部" },
  { value: "master", label: "修士" },
  { value: "doctor", label: "博士" },
] as const;

const RecentResults = ({ results }: { results: UserResult[] }) => {
  const getEducationLevelStyle = (educationLevel: EducationLevel) => {
    switch (educationLevel) {
      case "undergraduate":
        return "bg-blue-50";
      case "master":
        return "bg-green-50";
      case "doctor":
        return "bg-red-50";
      case "other":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  const getYearStyle = (yearNumber: number) => {
    switch (yearNumber) {
      case 1:
        return "bg-pink-50 text-pink-600"; // ライトピンク
      case 2:
        return "bg-pink-100 text-pink-700"; // ホットピンク
      case 3:
        return "bg-red-100 text-red-700"; // ライトレッド（ピンク寄り）
      case 4:
        return "bg-red-200 text-red-900"; // クリムゾン（濃い赤）
      default:
        return "bg-gray-100 text-gray-800"; // デフォルト
    }
  };

  if (results.length === 0) {
    return (
      <div className='text-center text-gray-500 py-4'>
        まだ診断結果がありません
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {results.slice(0, 20).map((result) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg shadow-sm border border-gray-200 
              ${getEducationLevelStyle(
                result.education_level as EducationLevel
              )}`}
        >
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
            <div className='flex items-center space-x-2'>
              <div>
                <span className='font-semibold'>{result.nickname}</span>
                <span className='text-sm'>さん</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium
                    ${
                      result.education_level === "undergraduate"
                        ? "bg-blue-100 text-blue-800"
                        : ""
                    }
                    ${
                      result.education_level === "master"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${
                      result.education_level === "doctor"
                        ? "bg-red-100 text-red-800"
                        : ""
                    }
                    ${
                      result.education_level === "other"
                        ? "bg-purple-100 text-purple-800"
                        : ""
                    }`}
                >
                  {EDUCATION_LEVEL_LABELS[result.education_level]}
                </span>
                {result.year_number && (
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-medium 
                      ${getYearStyle(result.year_number)}`}
                  >
                    {result.year_number}年生
                  </span>
                )}
              </div>
            </div>
            <p className=''>
              {new Intl.DateTimeFormat("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(result.created_at))}
            </p>
            <div className='flex items-center gap-1'>
              <p className='font-semibold'>
                {WorryTypes[result.top_worry as keyof typeof WorryTypes]?.title}
              </p>
              に悩んでいます
            </div>
          </div>
        </motion.div>
      ))}
      {results.length > 20 && (
        <div className='text-center text-gray-500 text-sm py-2'>
          ※ 最新20件の結果のみ表示しています
        </div>
      )}
    </div>
  );
};

export default function StatisticsPage() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<UserResult[]>([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<
    EducationLevel | "all"
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // チャートデータを取得
        const chartResponse = await fetch("/api/chart-data");
        if (!chartResponse.ok) {
          throw new Error(
            `Chart data fetch failed: ${chartResponse.statusText}`
          );
        }
        const chartJson = await chartResponse.json();
        setChartData(chartJson.data);

        // 最新10件を取得
        const recentResponse = await fetch("/api/recent-results");
        if (!recentResponse.ok) {
          throw new Error(
            `Recent results fetch failed: ${recentResponse.statusText}`
          );
        }
        const recentJson = await recentResponse.json();
        setRecentResults(recentJson.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error instanceof Error ? error.message : "データの取得に失敗しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    // 初回データ取得
    fetchData();
  }, []);

  return (
    <div className='w-full p-4'>
      <div className='max-w-full mx-auto space-y-6'>
        <Card className='p-4 overflow-hidden'>
          <div className='mb-6'>
            <h1 className='text-xl md:text-2xl font-bold mb-4'>
              みんなの悩み分布
            </h1>
            <div className='flex flex-wrap gap-2'>
              {educationOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() =>
                    setSelectedEducationLevel(
                      option.value as EducationLevel | "all"
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedEducationLevel === option.value
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className='flex justify-center items-center h-[400px]'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500' />
            </div>
          ) : error ? (
            <div className='text-center text-red-500 py-8'>{error}</div>
          ) : chartData.length === 0 ? (
            <div className='text-center text-gray-500 py-8'>
              データがありません
            </div>
          ) : (
            <div className='w-full -mx-4'>
              <WorryDistributionChart
                data={chartData}
                selectedEducationLevel={selectedEducationLevel}
              />
            </div>
          )}
        </Card>

        <Card className='p-4'>
          <h2 className='text-lg md:text-xl font-bold mb-4'>
            最新の診断結果
            <span className='text-sm font-normal text-gray-500 ml-2'>
              (最新10件)
            </span>
          </h2>
          <RecentResults results={recentResults} />
        </Card>
      </div>
    </div>
  );
}
