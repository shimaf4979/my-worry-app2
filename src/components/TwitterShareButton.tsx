// components/TwitterShareButton.tsx
import { TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorryTypes } from "@/data/worryTypes";

interface ShareButtonProps {
  topWorry: string;
}

export function TwitterShareButton({ topWorry }: ShareButtonProps) {
  const worry = WorryTypes[topWorry as keyof typeof WorryTypes];

  const shareText =
    `私の最大の悩みは「${worry.title}」でした！\n` +
    `\n` +
    "↓↓担当者からのアドバイス↓↓\n" +
    `\n` +
    `${worry.message}\n` +
    `\n` +
    `「${worry.mokuyoku}」\n` +
    `\n` +
    "みんなも理系大学生の悩みを診断してみてね！\n";
  const shareUrl = "https://www.crti.jp/"; // あなたのウェブサイトのURL
  const hashtags = "CRTI,理系学生の心の声";

  const twitterShareUrl =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` +
    `&hashtags=${encodeURIComponent(hashtags)}` +
    `&url=${encodeURIComponent(shareUrl)}`;

  return (
    <Button
      onClick={() => window.open(twitterShareUrl, "_blank")}
      className='bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white'
    >
      <TwitterIcon className='w-5 h-5 mr-2' />
      結果をツイートする
    </Button>
  );
}
