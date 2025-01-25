import { WorryTypes } from "@/data/worryTypes";
// // types/index.ts
// export type Category =
//   | "self"
//   | "others"
//   | "money"
//   | "time"
//   | "academic"
//   | "life";
// export type EducationLevel = "undergraduate" | "master" | "doctor" | "other";

// export interface ChartData {
//   worryId: string;
//   worryTitle: string;
//   undergraduate?: number;
//   master?: number;
//   doctor?: number;
//   other?: number;
//   year1?: number;
//   year2?: number;
//   year3?: number;
//   year4?: number;
// }

export interface UserInfo {
  nickname: string;
  educationLevel: EducationLevel;
  yearNumber: number | null;
}

export interface Choice {
  text: string;
  affects: Array<{ itemId: keyof typeof WorryTypes }>;
}

export interface Question {
  id: string;
  category: Category | "preliminary" | "final";
  text: string;
  choices: Choice[];
}

// export interface WorryType {
//   id: string;
//   title: string;
//   message: string;
//   category: Category;
// }

// export interface GameState {
//   preliminaryRound: boolean;
//   currentQuestion: number;
//   selectedAnswers: Record<string, number>;
//   topWorries: string[];
//   usedWorryIds: Set<string>;
// }

// export interface UserResult {
//   id: string;
//   created_at: string;
//   nickname: string;
//   education_level: EducationLevel;
//   year_number: number | null;
//   top_worry: string;
//   top_worry_score: number;
// }

// export interface WorryDistribution {
//   worryId: string;
//   undergraduate: number;
//   master: number;
//   doctor: number;
//   other: number;
// }

// types/index.ts
export type Category =
  | "self"
  | "others"
  | "money"
  | "time"
  | "academic"
  | "life";

export type EducationLevel = "undergraduate" | "master" | "doctor" | "other";

export interface UserResult {
  id: string;
  created_at: string;
  nickname: string;
  education_level: EducationLevel;
  year_number: number | null;
  top_worry: string;
  top_worry_score: number;
}

export interface ChartData {
  worryId: string;
  worryTitle: string;
  undergraduate: number;
  master: number;
  doctor: number;
  other: number;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
}

// バリデーション用の型
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
