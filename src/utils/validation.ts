// utils/validation.ts
import type { ValidationResult } from "@/types";

export const validateUserResults = (data: any[]): ValidationResult => {
  const errors: string[] = [];

  data.forEach((item, index) => {
    if (!item.id) {
      errors.push(`Item ${index}: Missing id`);
    }
    if (!item.nickname) {
      errors.push(`Item ${index}: Missing nickname`);
    }
    if (!item.education_level) {
      errors.push(`Item ${index}: Missing education_level`);
    }
    if (!item.top_worry) {
      errors.push(`Item ${index}: Missing top_worry`);
    }
    if (typeof item.top_worry_score !== "number") {
      errors.push(`Item ${index}: Invalid top_worry_score`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateChartData = (data: any[]): ValidationResult => {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    return {
      isValid: false,
      errors: ["Data must be an array"],
    };
  }

  data.forEach((item, index) => {
    if (!item.worryId || !item.worryTitle) {
      errors.push(`Item ${index}: Missing required fields`);
    }

    const numericFields = [
      "undergraduate",
      "master",
      "doctor",
      "other",
      "year1",
      "year2",
      "year3",
      "year4",
    ];

    numericFields.forEach((field) => {
      if (typeof item[field] !== "number") {
        errors.push(`Item ${index}: Invalid ${field} value`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
