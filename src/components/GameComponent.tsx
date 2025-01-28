// components/GameComponent.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  initializePreliminaryQuestions,
  prepareFinalQuestions,
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
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 初期化時に予選問題を準備
  useEffect(() => {
    if (
      !gameState.preliminaryQuestions ||
      gameState.preliminaryQuestions.length === 0
    ) {
      const preliminaryQuestions = initializePreliminaryQuestions(
        gameState.usedChoiceTexts
      );
      setGameState((prev: any) => ({
        ...prev,
        preliminaryQuestions,
      }));
    }
  }, []);

  // 現在の問題を設定
  useEffect(() => {
    if (gameState.currentQuestion >= 10) {
      const finalScores = calculateFinalScores(gameState.selectedAnswers);
      onComplete(finalScores);
      return;
    }

    if (
      gameState.currentQuestion === 6 &&
      (!gameState.finalQuestions || gameState.finalQuestions.length === 0)
    ) {
      const topWorries = getTopWorries(gameState.selectedAnswers);
      const finalQuestions = prepareFinalQuestions(
        topWorries,
        gameState.usedChoiceTexts
      );
      setGameState((prev: any) => ({
        ...prev,
        finalQuestions,
        topWorries,
      }));
      return;
    }

    const questions =
      gameState.currentQuestion < 6
        ? gameState.preliminaryQuestions
        : gameState.finalQuestions;

    if (!questions) return;

    const questionIndex =
      gameState.currentQuestion < 6
        ? gameState.currentQuestion
        : gameState.currentQuestion - 6;

    if (questions && questions[questionIndex]) {
      setCurrentQuestion(questions[questionIndex]);
    }
  }, [
    gameState.currentQuestion,
    gameState.preliminaryQuestions,
    gameState.finalQuestions,
  ]);

  const handleChoiceSelect = (index: number) => {
    if (selectedOrder.includes(index) || isTransitioning || isAnimating) return;

    const newOrder = [...selectedOrder, index];
    setSelectedOrder(newOrder);

    if (newOrder.length === 4) {
      setIsTransitioning(true);
      setIsAnimating(true);
      updateScores(newOrder);

      setTimeout(() => {
        setSelectedOrder([]);
        setGameState((prev: any) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
        setIsTransitioning(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleReset = () => {
    if (isTransitioning) return;
    setSelectedOrder([]);
  };

  const updateScores = (order: number[]) => {
    if (!currentQuestion) return;

    const scores = { ...gameState.selectedAnswers };

    order.forEach((choiceIndex, orderIndex) => {
      const points = [100, 66, 33, 0][orderIndex];
      const affects = currentQuestion.choices[choiceIndex].affects;

      affects.forEach(({ itemId }: { itemId: string }) => {
        const currentScore = scores[itemId] || 0;
        scores[itemId] = currentScore + points;
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
    if (Object.keys(scores).length === 0) return {};

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) return scores;

    const normalizedScores: Record<string, number> = {};
    Object.entries(scores).forEach(([key, value]) => {
      normalizedScores[key] = Math.round((value / maxScore) * 100);
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
        key={`${currentQuestion.id}-${gameState.currentQuestion}`}
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
            {currentQuestion.choices.map((choice: any, index: number) => (
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
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
