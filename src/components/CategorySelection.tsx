// components/CategorySelection.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

const categories: { id: Category; title: string }[] = [
  { id: "self", title: "自分について" },
  { id: "others", title: "他人との関係" },
  { id: "money", title: "お金の問題" },
  { id: "time", title: "時間の使い方" },
  { id: "academic", title: "学業・研究" },
  { id: "life", title: "生活習慣" },
];

interface Props {
  onSelect: (category: Category) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function CategorySelection({ onSelect }: Props) {
  return (
    <motion.div variants={containerVariants} initial='hidden' animate='visible'>
      <Card className='p-4'>
        <motion.h2
          variants={itemVariants}
          className='text-xl font-semibold mb-4 text-center'
        >
          最も気になる分野を選んでください
        </motion.h2>
        <div className='grid grid-cols-2 gap-2'>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onSelect(category.id)}
                className='w-full p-4 h-auto text-lg font-medium'
                variant='outline'
              >
                {category.title}
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
