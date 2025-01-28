// utils/questionGenerator.ts
import { Question, Choice, GameState, WorryType } from "@/types";
import {
  preliminaryTemplates,
  finalTemplates,
  choiceTemplates,
} from "@/data/questionTemplates";

// 未使用の選択肢テキストを取得する関数を修正
const getUnusedChoiceText = (
  worryId: WorryType,
  usedChoiceTexts: Record<WorryType, Set<string>>
): string => {
  const allChoices = choiceTemplates[worryId];

  // usedChoiceTextsが未初期化の場合は初期化
  if (!usedChoiceTexts[worryId]) {
    usedChoiceTexts[worryId] = new Set();
  }

  // 使用可能な選択肢を取得
  const unusedChoices = allChoices.filter(
    (choice) => !usedChoiceTexts[worryId].has(choice)
  );

  // 使用可能な選択肢がない場合は、使用済みをリセット
  if (unusedChoices.length === 0) {
    usedChoiceTexts[worryId].clear();
    return allChoices[Math.floor(Math.random() * allChoices.length)];
  }

  // ランダムに未使用の選択肢を選択
  const selectedChoice =
    unusedChoices[Math.floor(Math.random() * unusedChoices.length)];
  usedChoiceTexts[worryId].add(selectedChoice);
  return selectedChoice;
};

// 問題を生成する関数
const createQuestion = (
  template: any,
  worries: WorryType[],
  usedChoiceTexts: Record<WorryType, Set<string>>
): Question => {
  const choices: Choice[] = worries.map((worryId) => ({
    text: getUnusedChoiceText(worryId, usedChoiceTexts),
    affects: [{ itemId: worryId }],
  }));

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
  return preliminaryTemplates.map((template) =>
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
  return finalTemplates.map((template) =>
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
