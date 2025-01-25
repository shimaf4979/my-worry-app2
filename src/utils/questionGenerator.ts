// // utils/questionGenerator.ts
// import { WorryTypes } from "@/data/worryTypes";
// import {
//   preliminaryTemplates,
//   finalTemplates,
//   choiceTemplates,
// } from "@/data/questionTemplates";

// export const generatePreliminaryQuestion = (
//   usedWorryIds: Set<string> = new Set()
// ) => {
//   // すべての利用可能な悩みIDを取得
//   const allWorryIds = Object.keys(WorryTypes);

//   // まだ使用されていない悩みを取得
//   const unusedWorryIds = allWorryIds.filter((id) => !usedWorryIds.has(id));

//   let selectedWorryIds: string[] = [];

//   if (unusedWorryIds.length >= 4) {
//     // 未使用の悩みが4つ以上ある場合はそこからランダムに4つ選択
//     selectedWorryIds = shuffleArray(unusedWorryIds).slice(0, 4);
//   } else {
//     // 未使用の悩みが4つ未満の場合
//     selectedWorryIds = [
//       ...unusedWorryIds, // まず未使用の悩みをすべて使用
//       ...shuffleArray(allWorryIds) // 残りは全ての悩みからランダムに選択
//         .filter((id) => !unusedWorryIds.includes(id))
//         .slice(0, 4 - unusedWorryIds.length),
//     ];
//   }

//   // 4つの選択肢があることを確認
//   if (selectedWorryIds.length !== 4) {
//     console.error("Selected worries is not 4:", selectedWorryIds);
//     // 足りない場合は全ての悩みから補完
//     const remainingCount = 4 - selectedWorryIds.length;
//     const additionalWorries = shuffleArray(allWorryIds)
//       .filter((id) => !selectedWorryIds.includes(id))
//       .slice(0, remainingCount);
//     selectedWorryIds = [...selectedWorryIds, ...additionalWorries];
//   }

//   // 選択された悩みを含む質問テンプレートをフィルタリング
//   const validTemplates = preliminaryTemplates.filter((template) =>
//     selectedWorryIds.some((id) => template.validWorries.includes(id))
//   );

//   // ランダムに質問テンプレートを選択（有効なテンプレートがない場合は最初のテンプレートを使用）
//   const template =
//     validTemplates.length > 0
//       ? validTemplates[Math.floor(Math.random() * validTemplates.length)]
//       : preliminaryTemplates[0];

//   // 選択肢の生成
//   const choices = selectedWorryIds.map((worryId) => ({
//     text: choiceTemplates[worryId][
//       Math.floor(Math.random() * choiceTemplates[worryId].length)
//     ],
//     affects: [{ itemId: worryId as keyof typeof WorryTypes }],
//   }));

//   return {
//     id: `preliminary-${Date.now()}`,
//     category: "final",
//     text: template.text,
//     choices: shuffleArray(choices),
//   };
// };

// export const generateFinalQuestion = (topWorryIds: string[]) => {
//   if (topWorryIds.length < 4) {
//     // トップの悩みが4つ未満の場合、他の悩みから補完
//     const allWorryIds = Object.keys(WorryTypes);
//     const additionalWorries = shuffleArray(allWorryIds)
//       .filter((id) => !topWorryIds.includes(id))
//       .slice(0, 4 - topWorryIds.length);
//     topWorryIds = [...topWorryIds, ...additionalWorries];
//   }

//   const template =
//     finalTemplates[Math.floor(Math.random() * finalTemplates.length)];

//   const selectedWorryIds = shuffleArray(topWorryIds).slice(0, 4);

//   const choices = selectedWorryIds.map((worryId) => ({
//     text: choiceTemplates[worryId][
//       Math.floor(Math.random() * choiceTemplates[worryId].length)
//     ],
//     affects: [{ itemId: worryId as keyof typeof WorryTypes }],
//   }));

//   return {
//     id: `final-${Date.now()}`,
//     category: "final",
//     text: template.text,
//     choices: shuffleArray(choices),
//   };
// };

// function shuffleArray<T>(array: T[]): T[] {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//   }
//   return newArray;
// }

// export const getTopWorries = (scores: Record<string, number>): string[] => {
//   return Object.entries(scores)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 6)
//     .map(([key]) => key);
// };

// utils/questionGenerator.ts
import { Question, Choice } from "@/types";
import { WorryTypes } from "@/data/worryTypes";
import {
  preliminaryTemplates,
  finalTemplates,
  choiceTemplates,
} from "@/data/questionTemplates";

interface GameState {
  usedPreliminaryQuestionIds: Set<string>;
  usedFinalQuestionIds: Set<string>;
  topWorries: string[];
}

export const generatePreliminaryQuestion = (
  gameState: GameState
): Question | null => {
  const availableTemplates = preliminaryTemplates.filter(
    (template) => !gameState.usedPreliminaryQuestionIds.has(template.id)
  );

  if (availableTemplates.length === 0) {
    return null;
  }

  // ランダムにテンプレートを選択
  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  const template = availableTemplates[randomIndex];

  // 選択肢を生成
  const choices: Choice[] = template.validWorries.map((worryId) => ({
    text: choiceTemplates[worryId][
      Math.floor(Math.random() * choiceTemplates[worryId].length)
    ],
    affects: [{ itemId: worryId as keyof typeof WorryTypes }],
  }));

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

  // ランダムにテンプレートを選択
  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  const template = availableTemplates[randomIndex];

  // 上位6つの悩みから4つをランダムに選択
  const selectedWorries = shuffleArray([...gameState.topWorries]).slice(0, 4);

  // 選択肢を生成
  const choices: Choice[] = selectedWorries.map((worryId) => ({
    text: choiceTemplates[worryId][
      Math.floor(Math.random() * choiceTemplates[worryId].length)
    ],
    affects: [{ itemId: worryId as keyof typeof WorryTypes }],
  }));

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
