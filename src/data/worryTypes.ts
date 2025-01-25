// data/worryTypes.ts
export const WorryTypes = {
  future: {
    id: "future",
    title: "将来への不安",
    message:
      "将来ばっかり考えてるけど、何か達成したん？\n気分転換に以下の沐浴に行こう！",
    category: "self",
  },

  motivation: {
    id: "motivation",
    title: "モチベーション",
    message:
      "自分に自信がないの？自分のせいじゃん！\n意識高めるために以下の沐浴に行こう！",
    category: "self",
  },

  friendshipRelations: {
    id: "friendshipRelations",
    title: "友情関係",
    message:
      "友達いたんだ！よかった。いるだけマシだよ。\n気分転換に以下の沐浴に行こう！",
    category: "others",
  },
  loveRelations: {
    id: "loveRelations",
    title: "恋愛関係",
    message:
      "彼女/彼氏いなくて残念だね！でも修羅の道を選んだのは自分じゃん！\n以下の沐浴に行こう！",
    category: "others",
  },
  comparison: {
    id: "comparison",
    title: "他人との比較",
    message:
      "他人とばかり比較してるけど、自分のこと見えてる？\n気分転換に以下の沐浴に行こう！",
    category: "others",
  },
  livingCost: {
    id: "livingCost",
    title: "生活費",
    message:
      "お疲れ様です。\n見直せる箇所を探すために、以下の沐浴に行きましょう。",
    category: "money",
  },
  wastedMoney: {
    id: "wastedMoney",
    title: "浪費癖",
    message: "お金なくなったら自己責任だよ！\n以下の沐浴に行こう！",
    category: "money",
  },
  freeTime: {
    id: "freeTime",
    title: "自由時間",
    message: "自由な時間？でも研究への道を選んだのは君じゃん！\n沐浴に行こう！",
    category: "time",
  },
  assignments: {
    id: "assignments",
    title: "課題",
    message:
      "日々課題課題言ってそうだね。人生大変なんだろな。\n以下の沐浴いこう。",
    category: "academic",
  },
  health: {
    id: "health",
    title: "健康",
    message:
      "健康を意識する君は素晴らしい。理系の鏡だ。\n健康のために以下の沐浴に行こう！",
    category: "life",
  },
} as const;

export type WorryTypeKey = keyof typeof WorryTypes;
