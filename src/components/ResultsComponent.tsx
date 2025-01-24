// components/ResultsComponent.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorryTypes } from "@/data/worryTypes";

interface Props {
  scores: Record<string, number>;
  userInfo: any;
  onReturnHome: () => void;
}

export default function ResultsComponent({
  scores,
  userInfo,
  onReturnHome,
}: Props) {
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

  const topSixScores = sortedScores.slice(0, 6);
  const bottomFourScores = sortedScores.slice(6);

  const topWorryId = sortedScores[0][0] as keyof typeof WorryTypes;
  const topWorry = WorryTypes[topWorryId];

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
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <motion.div variants={itemVariants}>
        <Card className='p-4'>
          <h2 className='text-2xl font-bold text-center mb-2'>診断結果</h2>
          <p className='text-center text-gray-600 mb-4'>
            {userInfo.nickname}さんの分析結果
          </p>

          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='text-xl font-semibold mb-2'>
              最大の悩み: {topWorry.title}
            </h3>
            <p className='text-lg'>{topWorry.message}</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className='p-4'>
          <h3 className='font-semibold text-lg mb-4'>重要度の高い6つの悩み:</h3>
          <div className='space-y-3'>
            {topSixScores.map(([key, score], index) => (
              <div key={key} className='space-y-1'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>
                    {WorryTypes[key as keyof typeof WorryTypes].title}
                  </span>
                  <span className='text-sm text-gray-600'>
                    {Math.round(score)}%
                  </span>
                </div>
                <motion.div
                  className='w-full h-2 bg-gray-200 rounded overflow-hidden'
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                >
                  <motion.div
                    className='h-full bg-blue-500 rounded'
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className='p-4'>
          <h3 className='font-semibold text-lg mb-4'>
            あまり意識していない4つの悩み:
          </h3>
          <div className='space-y-3'>
            {bottomFourScores.map(([key, score], index) => (
              <div key={key} className='space-y-1'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>
                    {WorryTypes[key as keyof typeof WorryTypes].title}
                  </span>
                  <span className='text-sm text-gray-600'>
                    {Math.round(score)}%
                  </span>
                </div>
                <motion.div
                  className='w-full h-2 bg-gray-200 rounded overflow-hidden'
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                >
                  <motion.div
                    className='h-full bg-gray-400 rounded'
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className='pt-4'>
        <Button onClick={onReturnHome} className='w-full'>
          トップページに戻る
        </Button>
      </motion.div>
    </motion.div>
  );
}
