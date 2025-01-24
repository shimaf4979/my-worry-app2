// app/statistics/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import WorryDistributionChart from "@/components/WorryDistributionChart";
import { supabase } from "@/lib/supabase";
import { WorryTypes } from "@/data/worryTypes";
import { validateUserResults } from "@/utils/validation";
import type { UserResult, EducationLevel } from "@/types";

const educationOptions = [
  { value: "all", label: "全て" },
  { value: "undergraduate", label: "学部" },
  { value: "master", label: "修士" },
  { value: "doctor", label: "博士" },
  { value: "other", label: "その他" },
] as const;

export default function StatisticsPage() {
  const [results, setResults] = useState<UserResult[]>([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<
    EducationLevel | "all"
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("user_results")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      console.log("Raw fetched data:", data);

      if (!data) {
        setResults([]);
        return;
      }

      // データの検証
      const validation = validateUserResults(data);
      if (!validation.isValid) {
        console.error("Data validation errors:", validation.errors);
        throw new Error("データの形式が不正です");
      }

      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("データの取得に失敗しました");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const processResults = useMemo(() => {
    console.log("Processing results:", results);

    const processedData = Object.entries(WorryTypes).map(([worryId, worry]) => {
      const counts = {
        worryId,
        worryTitle: worry.title,
        undergraduate: 0,
        master: 0,
        doctor: 0,
        other: 0,
        year1: 0,
        year2: 0,
        year3: 0,
        year4: 0,
      };

      results.forEach((result) => {
        if (result.top_worry === worryId) {
          // 教育レベルのカウント
          const educationLevel = result.education_level as keyof typeof counts;
          //   counts[educationLevel] += 1;

          // 学年のカウント
          if (result.year_number) {
            const yearKey = `year${result.year_number}` as keyof typeof counts;
            // counts[yearKey] += 1;
          }
        }
      });

      return counts;
    });

    console.log("Processed data:", processedData);
    return processedData;
  }, [results]);

  return (
    <div className='w-full p-4'>
      <div className='max-w-full mx-auto space-y-6'>
        <Card className='p-4'>
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
          ) : processResults.length === 0 ? (
            <div className='text-center text-gray-500 py-8'>
              データがありません
            </div>
          ) : (
            <div className='w-full h-full'>
              <WorryDistributionChart
                data={processResults}
                selectedEducationLevel={selectedEducationLevel}
              />
            </div>
          )}
        </Card>

        <Card className='p-4'>
          <h2 className='text-lg md:text-xl font-bold mb-4'>最近の診断結果</h2>
          <div className='space-y-3'>
            {results.slice(0, 10).map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-4 bg-white rounded-lg shadow-sm border border-gray-100
                       hover:shadow-md transition-shadow'
              >
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
                  <div>
                    <span className='font-medium'>{result.nickname}</span>
                    <span className='text-gray-500 ml-2'>
                      ({result.education_level}
                      {result.year_number && ` ${result.year_number}年生`})
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>
                      {
                        WorryTypes[result.top_worry as keyof typeof WorryTypes]
                          ?.title
                      }
                    </span>
                    <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                      {Math.round(result.top_worry_score)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {results.length === 0 && (
              <div className='text-center text-gray-500 py-4'>
                まだ診断結果がありません
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
