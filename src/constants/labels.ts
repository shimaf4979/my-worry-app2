// constants/labels.ts
export const EDUCATION_LEVEL_LABELS = {
  undergraduate: "学部",
  master: "修士",
  doctor: "博士",
  other: "その他",
} as const;

// 型定義も追加
export type EducationLevelKey = keyof typeof EDUCATION_LEVEL_LABELS;
