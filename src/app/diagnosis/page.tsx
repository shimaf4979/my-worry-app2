// app/diagnosis/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import UserInfoForm from "@/components/UserInfoForm";
import GameComponent from "@/components/GameComponent";
import ResultsComponent from "@/components/ResultsComponent";
import { supabase } from "@/lib/supabase";
import { initialGameState } from "@/types/index";

export default function DiagnosisPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [gameState, setGameState] = useState<any>(initialGameState);
  const [showResults, setShowResults] = useState(false);

  const handleGameComplete = async (finalScores: Record<string, number>) => {
    setGameState((prev: any) => ({ ...prev, selectedAnswers: finalScores }));
    setShowResults(true);

    // 結果をSupabaseに保存
    const sortedScores = Object.entries(finalScores).sort(
      ([, a], [, b]) => b - a
    );

    const [topWorryId, topWorryScore] = sortedScores[0];

    if (userInfo) {
      try {
        await supabase.from("user_results").insert({
          nickname: userInfo.nickname,
          education_level: userInfo.educationLevel,
          year_number: userInfo.yearNumber,
          top_worry: topWorryId,
          top_worry_score: topWorryScore,
        });
      } catch (error) {
        console.error("Error saving results:", error);
      }
    }
  };

  return (
    <main className='min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md mx-auto space-y-4'>
        <AnimatePresence mode='wait'>
          {!userInfo && <UserInfoForm onSubmit={setUserInfo} />}

          {userInfo && !showResults && (
            <GameComponent
              gameState={gameState}
              setGameState={setGameState}
              userInfo={userInfo}
              onComplete={handleGameComplete}
            />
          )}

          {showResults && (
            <ResultsComponent
              scores={gameState.selectedAnswers}
              userInfo={userInfo}
              onReturnHome={() => router.push("/")}
              onReturnStatistics={() => router.push("/statistics")}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
