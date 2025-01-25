// utils/questionGenerator.ts
import { Question, Choice, GameState, WorryType } from "@/types";
import {
  preliminaryTemplates,
  finalTemplates,
  choiceTemplates,
} from "@/data/questionTemplates";

// 未使用の選択肢テキストを取得する関数
const getUnusedChoiceText = (
  worryId: WorryType,
  usedChoiceTexts: Record<WorryType, Set<string>>
): string => {
  const allChoices = choiceTemplates[worryId];
  const usedTexts = usedChoiceTexts[worryId] || new Set();

  // まだ使用されていない選択肢を探す
  const unusedChoices = allChoices.filter((choice) => !usedTexts.has(choice));

  if (unusedChoices.length === 0) {
    console.error("No unused choices available for", worryId);
    return allChoices[0];
  }

  return unusedChoices[Math.floor(Math.random() * unusedChoices.length)];
};

// 問題を生成する関数
const createQuestion = (
  template: any,
  worries: WorryType[],
  usedChoiceTexts: Record<WorryType, Set<string>>
): Question => {
  const choices: Choice[] = worries.map((worryId) => {
    const choiceText = getUnusedChoiceText(worryId, usedChoiceTexts);
    return {
      text: choiceText,
      affects: [{ itemId: worryId }],
    };
  });

  return {
    id: template.id,
    category: template.type,
    text: template.text,
    choices: shuffleArray(choices),
  };
};

// 初期化時に予選の問題を準備
export const initializePreliminaryQuestions = (
  usedChoiceTexts: Record<WorryType, Set<string>>
): Question[] => {
  // 予選テンプレートをシャッフル
  const shuffledTemplates = shuffleArray([...preliminaryTemplates]);

  return shuffledTemplates.map((template) =>
    createQuestion(
      template,
      template.validWorries as WorryType[],
      usedChoiceTexts
    )
  );
};

// 決勝の問題を準備
export const prepareFinalQuestions = (
  topWorries: string[],
  usedChoiceTexts: Record<WorryType, Set<string>>
): Question[] => {
  // 決勝テンプレートをシャッフル
  const shuffledTemplates = shuffleArray([...finalTemplates]);

  return shuffledTemplates.map((template) =>
    createQuestion(
      template,
      shuffleArray([...(topWorries as WorryType[])]).slice(0, 4),
      usedChoiceTexts
    )
  );
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
