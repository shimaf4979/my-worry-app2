// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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

export default function Home() {
  return (
    <main className='min-h-screen p-4 bg-gray-50'>
      <motion.div
        className='max-w-md mx-auto space-y-4'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <Card className='p-4 bg-white shadow-sm'>
          <motion.h1
            variants={itemVariants}
            className='text-2xl font-bold text-center text-gray-800'
          >
            理系大学生の悩み診断
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className='text-center text-gray-600 mt-2'
          >
            あなたの悩みの優先順位を分析します
          </motion.p>
        </Card>

        <motion.div variants={itemVariants}>
          <Link href='/diagnosis'>
            <Button className='w-full p-6 text-lg'>診断を始める</Button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href='/statistics'>
            <Button variant='outline' className='w-full p-6 text-lg'>
              みんなの診断結果を見る
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
