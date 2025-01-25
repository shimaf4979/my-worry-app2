// components/TwitterShareButton.tsx
import { TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorryTypes } from "@/data/worryTypes";

interface ShareButtonProps {
  topWorry: string;
  score: number;
  educationLevel: string;
  year?: number;
}

export function TwitterShareButton({
  topWorry,
  score,
  educationLevel,
  year,
}: ShareButtonProps) {
  const worry = WorryTypes[topWorry as keyof typeof WorryTypes];

  const shareText =
    `私の最大の悩みは「${worry.title}」でした！（${Math.round(score)}%）\n` +
    `${educationLevel}${year ? ` ${year}年生` : ""}\n\n` +
    "理系大学生の悩み診断で診断してみました！\n";

  const shareUrl = "https://yourwebsite.com"; // あなたのウェブサイトのURL
  const hashtags = "CRTI,理系大学生の悩み診断";

  const twitterShareUrl =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` +
    `&url=${encodeURIComponent(shareUrl)}` +
    `&hashtags=${encodeURIComponent(hashtags)}`;

  return (
    <Button
      onClick={() => window.open(twitterShareUrl, "_blank")}
      className='bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white'
    >
      <TwitterIcon className='w-5 h-5 mr-2' />
      結果をツイート
    </Button>
  );
}
