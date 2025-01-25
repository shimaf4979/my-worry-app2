// utils/questionGenerator.ts
import { Question, Choice, GameState, WorryType } from "@/types";
import { WorryTypes } from "@/data/worryTypes";
import {
  preliminaryTemplates,
  finalTemplates,
  choiceTemplates,
} from "@/data/questionTemplates";

// 未使用の選択肢テキストを取得する関数
const getUnusedChoiceText = (
  worryId: string,
  usedChoiceTexts: Record<WorryType, Set<string>>
): string => {
  const allChoices = choiceTemplates[worryId];
  const usedTexts = usedChoiceTexts[worryId as WorryType] || new Set();

  // まだ使用されていない選択肢を探す
  const unusedChoices = allChoices.filter((choice) => !usedTexts.has(choice));

  // 未使用の選択肢がない場合は、既存の選択肢をリセット
  if (unusedChoices.length === 0) {
    return allChoices[Math.floor(Math.random() * allChoices.length)];
  }

  return unusedChoices[Math.floor(Math.random() * unusedChoices.length)];
};

export const generatePreliminaryQuestion = (
  gameState: GameState
): Question | null => {
  const availableTemplates = preliminaryTemplates.filter(
    (template) => !gameState.usedPreliminaryQuestionIds.has(template.id)
  );

  if (availableTemplates.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  const template = availableTemplates[randomIndex];
  const usedChoiceTexts = { ...gameState.usedChoiceTexts };

  // 選択肢を生成
  const choices: Choice[] = template.validWorries.map((worryId) => {
    const choiceText = getUnusedChoiceText(worryId, usedChoiceTexts);
    return {
      text: choiceText,
      affects: [{ itemId: worryId as keyof typeof WorryTypes }],
    };
  });

  return {
    id: template.id,
    category: "preliminary",
    text: template.text,
    choices: shuffleArray(choices),
  };
};

export const generateFinalQuestion = (
  gameState: GameState
): Question | null => {
  const availableTemplates = finalTemplates.filter(
    (template) => !gameState.usedFinalQuestionIds.has(template.id)
  );

  if (availableTemplates.length === 0 || gameState.topWorries.length < 4) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  const template = availableTemplates[randomIndex];
  const selectedWorries = shuffleArray([...gameState.topWorries]).slice(0, 4);
  const usedChoiceTexts = { ...gameState.usedChoiceTexts };

  // 選択肢を生成
  const choices: Choice[] = selectedWorries.map((worryId) => {
    const choiceText = getUnusedChoiceText(worryId, usedChoiceTexts);
    return {
      text: choiceText,
      affects: [{ itemId: worryId as keyof typeof WorryTypes }],
    };
  });

  return {
    id: template.id,
    category: "final",
    text: template.text,
    choices: shuffleArray(choices),
  };
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const getTopWorries = (scores: Record<string, number>): string[] => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([key]) => key);
};
