"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const backgrounds = [
  "background/back2.JPG",
  "background/back3.JPG",
  "background/back4.JPG",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className='min-h-screen relative'>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className='absolute inset-0'
        >
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${backgrounds[currentBg]})`,
              filter: "brightness(0.85)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* オーバーレイ */}
      <div className='absolute inset-0 bg-black/40' />

      <motion.div
        className='relative z-10 max-w-md mx-auto px-4 py-12 min-h-screen flex flex-col justify-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.section
          className='text-center space-y-6 mb-8'
          variants={itemVariants}
        >
          <h1 className='text-3xl font-bold text-white'>理系大学生の皆さん</h1>
          <p className='text-xl text-gray-200'>こんな経験、ありませんか？</p>
          <p className='text-2xl font-medium text-white bg-black/30 p-4 rounded-lg inline-block'>
            悩みがモヤモヤしている。 どう解決しようか。
          </p>
        </motion.section>

        <motion.section
          className='bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8'
          variants={itemVariants}
        >
          <h2 className='text-xl font-bold text-center text-gray-800 mb-2'>
            あなたの悩みを10問で特定。
          </h2>
          <h2 className='text-xl font-bold text-center text-gray-800 mb-2'>
            ベストな解決策を提案します！
          </h2>
          <p className='text-gray-700'>悩みといっても、人それぞれ。</p>
          <p className='text-gray-700'>お金、時間、友達、なんだろう...</p>
          <p className='text-gray-700'>
            結局漠然として、何に追われてるかもわからない...
          </p>
        </motion.section>

        <motion.div className='flex flex-col space-y-4' variants={itemVariants}>
          <Link href='/diagnosis' className='block'>
            <Button className='w-full bg-white/90 hover:bg-white text-gray-800 font-bold py-4 rounded-full text-lg transition-all duration-300'>
              今すぐ開始する
            </Button>
          </Link>
          <Link href='/statistics' className='block'>
            <Button
              variant='outline'
              className='w-full bg-black/50 text-white hover:bg-black/70 font-bold py-4 rounded-full text-lg transition-all duration-300'
            >
              みんなの回答を見る
            </Button>
          </Link>
        </motion.div>

        {/* <motion.footer
          className='text-center text-white mt-8'
          variants={itemVariants}
        >
          <p>ぜひお試しください！</p>
        </motion.footer> */}
      </motion.div>
    </main>
  );
}
