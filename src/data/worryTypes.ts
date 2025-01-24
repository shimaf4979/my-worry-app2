// data/worryTypes.ts
export const WorryTypes = {
  motivation: {
    id: "motivation",
    title: "モチベーション",
    message: "自分に自信がないの？沐浴に行こう！",
    category: "self",
  },
  future: {
    id: "future",
    title: "将来への不安",
    message: "将来なんて考えても何も生まれない！沐浴に行こう！",
    category: "self",
  },
  growth: {
    id: "growth",
    title: "自己成長",
    message: "成長ばっかり考えてるみたいだけど、何か達成した？沐浴に行こう！",
    category: "self",
  },
  friendshipRelations: {
    id: "friendshipRelations",
    title: "友情関係",
    message:
      "友達関係ズタボロだね！一度失った友情は取り戻せないから、沐浴に行こう！",
    category: "others",
  },
  loveRelations: {
    id: "loveRelations",
    title: "恋愛関係",
    message:
      "彼女/彼氏いなくて残念だね、でも修羅の道を選んだのは自分じゃん！沐浴に行こう！",
    category: "others",
  },
  comparison: {
    id: "comparison",
    title: "他人との比較",
    message: "嫉妬マシマシ人間だね！他人を意識しないために沐浴に行こう！",
    category: "others",
  },
  livingCost: {
    id: "livingCost",
    title: "生活費",
    message: "お疲れ様です。見直せる箇所を探していきましょう。",
    category: "money",
  },
  wastedMoney: {
    id: "wastedMoney",
    title: "浪費癖",
    message: "お金なくなったら自己責任だよ！沐浴に行こう！",
    category: "money",
  },
  freeTime: {
    id: "freeTime",
    title: "自由時間",
    message: "自由な時間？研究を選んだのは君じゃん！沐浴に行こう",
    category: "time",
  },
  assignments: {
    id: "assignments",
    title: "課題",
    message: "日々課題課題言ってそうだね。人生大変なんだろな。沐浴いこう。",
    category: "academic",
  },
  health: {
    id: "health",
    title: "健康",
    message:
      "健康を意識する君は素晴らしい。理系の鏡だ。もっと健康になるために沐浴に行こう！",
    category: "life",
  },
} as const;

export type WorryTypeKey = keyof typeof WorryTypes;
