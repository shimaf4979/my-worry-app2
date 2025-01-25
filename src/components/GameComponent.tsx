// components/GameComponent.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  generatePreliminaryQuestion,
  generateFinalQuestion,
  getTopWorries,
} from "@/utils/questionGenerator";

interface Props {
  gameState: any;
  setGameState: (state: any) => void;
  userInfo: any;
  onComplete: (scores: Record<string, number>) => void;
}

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const choiceVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export default function GameComponent({
  gameState,
  setGameState,
  userInfo,
  onComplete,
}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // 1. アニメーション用の状態を追加
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. キーを更新するための関数を追加
  const getAnimationKey = () => {
    return `${currentQuestion?.id}-${gameState.currentQuestion}`;
  };

  // GameComponentでの質問生成時の処理
  useEffect(() => {
    if (gameState.currentQuestion >= 10) {
      const finalScores = calculateFinalScores(gameState.selectedAnswers);
      onComplete(finalScores);
      return;
    }

    let newQuestion;
    if (gameState.preliminaryRound) {
      newQuestion = generatePreliminaryQuestion(gameState);
    } else {
      if (gameState.currentQuestion === 6) {
        // 予選終了時に上位6つの悩みを特定
        const topWorries = getTopWorries(gameState.selectedAnswers);
        setGameState((prev: any) => ({ ...prev, topWorries }));
      }
      newQuestion = generateFinalQuestion(gameState);
    }

    if (newQuestion) {
      setCurrentQuestion(newQuestion);
      // 使用した問題IDを記録
      setGameState((prev: any) => ({
        ...prev,
        usedPreliminaryQuestionIds: new Set([
          ...prev.usedPreliminaryQuestionIds,
          newQuestion.id,
        ]),
      }));
    }
  }, [gameState.currentQuestion]);
  // 3. 遷移ロジックを修正
  const handleChoiceSelect = (index: any) => {
    if (selectedOrder.includes(index) || isTransitioning || isAnimating) return;

    const newOrder = [...selectedOrder, index];
    setSelectedOrder(newOrder);

    if (newOrder.length === 4) {
      setIsTransitioning(true);
      setIsAnimating(true);
      updateScores(newOrder);

      // アニメーション完了を待ってから次の状態に遷移
      setTimeout(() => {
        setSelectedOrder([]);
        setGameState((prev: any) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          preliminaryRound: prev.currentQuestion < 5,
        }));
        setIsTransitioning(false);
        setIsAnimating(false);
      }, 300); // containerVariantsのdurationと同じ
    }
  };

  const handleReset = () => {
    if (isTransitioning) return;
    setSelectedOrder([]);
  };

  const updateScores = (order: any[]) => {
    if (!currentQuestion) return;

    const scores = { ...gameState.selectedAnswers };

    order.forEach((choiceIndex, orderIndex) => {
      const points = [100, 66, 33, 0][orderIndex];
      const affects = currentQuestion.choices[choiceIndex].affects;

      affects.forEach(({ itemId }: { itemId: string }) => {
        scores[itemId] = (scores[itemId] || 0) + points;
      });
    });

    setGameState((prev: any) => ({
      ...prev,
      selectedAnswers: scores,
    }));
  };

  const calculateFinalScores = (
    scores: Record<string, number>
  ): Record<string, number> => {
    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores: Record<string, number> = {};

    Object.entries(scores).forEach(([key, value]: [string, any]) => {
      normalizedScores[key] = (value / maxScore) * 100;
    });

    return normalizedScores;
  };

  if (!currentQuestion) {
    return (
      <Card className='p-6'>
        <div className='flex items-center justify-center h-40'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500' />
        </div>
      </Card>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={getAnimationKey()} // キーを動的に生成
        variants={containerVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <Card className='p-6'>
          <div className='mb-6'>
            <div className='flex justify-between items-center my-2'>
              <h2 className='text-xl font-bold p-3'>
                質問 - {gameState.currentQuestion + 1}/10
              </h2>
              {selectedOrder.length > 0 && (
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={handleReset}
                  className='text-sm hover:bg-red-50 p-2'
                >
                  選択をリセット
                </Button>
              )}
            </div>
            <motion.p
              className='text-base text-gray-600'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {currentQuestion.text}
            </motion.p>
            <p className='text-sm text-gray-500 mt-2'>
              残り{4 - selectedOrder.length}つ選択してください
            </p>
          </div>

          <div className='space-y-3'>
            {currentQuestion.choices.map((choice: any, index: any) => (
              <motion.div
                key={index}
                variants={choiceVariants}
                initial='initial'
                animate='animate'
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleChoiceSelect(index)}
                  variant={
                    selectedOrder.includes(index) ? "secondary" : "outline"
                  }
                  className='w-full p-4 h-auto relative text-left justify-start'
                  disabled={selectedOrder.includes(index) || isTransitioning}
                >
                  <span className='pr-8'>{choice.text}</span>
                  {selectedOrder.includes(index) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='absolute right-3 w-6 h-6 bg-blue-500 text-white rounded-full
                               flex items-center justify-center font-bold'
                    >
                      {selectedOrder.indexOf(index) + 1}
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
          {/* 
          <div className='mt-4 text-sm text-gray-500'>
            {gameState.preliminaryRound ? (
              <p>予選ラウンド: 全体的な傾向を把握します</p>
            ) : (
              <p>決勝ラウンド: より詳細な分析を行います</p>
            )}
          </div> */}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
