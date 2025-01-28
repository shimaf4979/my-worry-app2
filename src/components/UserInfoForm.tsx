import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { EducationLevel } from "@/types";

interface ButtonGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const ButtonGroup = ({ options, value, onChange }: ButtonGroupProps) => (
  <div className='grid grid-cols-2 gap-2'>
    {options.map((option) => (
      <motion.button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`p-3 rounded-lg font-medium transition-all ${
          value === option.value
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {option.label}
      </motion.button>
    ))}
  </div>
);

export default function UserInfoForm({
  onSubmit,
}: {
  onSubmit: (info: any) => void;
}) {
  const [nickname, setNickname] = useState("");
  const [educationLevel, setEducationLevel] =
    useState<EducationLevel>("undergraduate");
  const [yearNumber, setYearNumber] = useState<number>(1);

  const educationOptions = [
    { value: "undergraduate", label: "学部" },
    { value: "master", label: "修士" },
    { value: "doctor", label: "博士" },
    { value: "other", label: "その他" },
  ];

  const yearOptions = [
    { value: "1", label: "1年生" },
    { value: "2", label: "2年生" },
    { value: "3", label: "3年生" },
    { value: "4", label: "4年生" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='space-y-6'
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-center space-y-4'
        >
          <h2 className='text-2xl font-bold text-gray-800 mt-3'>
            CRTIへようこそ
          </h2>
          <p className='text-lg text-gray-600'>
            表示される質問を優先度の順で選ぶことで
            <br />
            あなたの悩みを特定します
          </p>
          <p className='text-lg font-semibold text-blue-600'>
            ニックネームと学年を記入して
            <br />
            早速やってみよう！
          </p>
        </motion.div>

        <Card className='p-6 space-y-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              ニックネーム
            </label>
            <Input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='ニックネームを入力'
              className='w-full'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              学年区分
            </label>
            <ButtonGroup
              options={educationOptions}
              value={educationLevel}
              onChange={(value) => setEducationLevel(value as EducationLevel)}
            />
          </div>

          {educationLevel !== "other" && (
            <motion.div
              className='space-y-2'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className='block text-sm font-medium text-gray-700'>
                学年
              </label>
              <ButtonGroup
                options={yearOptions}
                value={yearNumber.toString()}
                onChange={(value) => setYearNumber(Number.parseInt(value))}
              />
            </motion.div>
          )}

          <motion.button
            onClick={() =>
              onSubmit({
                nickname,
                educationLevel,
                yearNumber: educationLevel === "other" ? null : yearNumber,
              })
            }
            className='w-full bg-blue-500 text-white py-3 rounded-lg font-medium shadow-lg
                       hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!nickname || (educationLevel !== "other" && !yearNumber)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            診断を始める
          </motion.button>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
