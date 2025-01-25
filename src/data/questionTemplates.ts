// data/questionTemplates.ts

export const preliminaryTemplates = [
  {
    text: "今すぐに実行したいことは？",
    type: "preliminary",
    validWorries: ["motivation", "growth", "future", "health"],
  },
  {
    text: "最近、人間関係で最も気になることは？",
    type: "preliminary",
    validWorries: [
      "friendshipRelations",
      "loveRelations",
      "comparison",
      "growth",
    ],
  },
  {
    text: "お金に関して最も心配なことは？",
    type: "preliminary",
    validWorries: ["livingCost", "wastedMoney", "future", "growth"],
  },
  {
    text: "時間の使い方で困っていることは？",
    type: "preliminary",
    validWorries: ["freeTime", "assignments", "health", "growth"],
  },
  {
    text: "研究生活で最もストレスを感じるのは？",
    type: "preliminary",
    validWorries: ["assignments", "motivation", "future", "health"],
  },
  {
    text: "ふとした時に気になることは？",
    type: "preliminary",
    validWorries: ["growth", "future", "friendshipRelations", "health"],
  },
  {
    text: "生活習慣でよく思うことは？",
    type: "preliminary",
    validWorries: ["health", "freeTime", "assignments", "motivation"],
  },
  {
    text: "周りと比べた時、よく感じるのは？",
    type: "preliminary",
    validWorries: ["comparison", "growth", "motivation", "future"],
  },
  {
    text: "休日に最も気がかりなことは？",
    type: "preliminary",
    validWorries: ["freeTime", "assignments", "friendshipRelations", "health"],
  },
  {
    text: "将来に向けて不安なことは？",
    type: "preliminary",
    validWorries: ["future", "livingCost", "growth", "motivation"],
  },
];

export const finalTemplates = [
  {
    text: "今最も優先して解決したい課題は？",
    type: "final",
    validWorries: ["all"],
  },
  {
    text: "理想の状態に近づくために必要なことは？",
    type: "final",
    validWorries: ["all"],
  },
  {
    text: "生活の質を向上させるために重要なことは？",
    type: "final",
    validWorries: ["all"],
  },
  {
    text: "現状の生活を充実させるために必要なことは？",
    type: "final",
    validWorries: ["all"],
  },
  {
    text: "より良い未来のために改善すべきことは？",
    type: "final",
    validWorries: ["all"],
  },
];

// 選択肢のテンプレート
export const choiceTemplates: Record<string, string[]> = {
  motivation: [
    "何かを続けるものがない",
    "多方面に興味があるが、続けられない",
    "自分に自信がない",
    "やる気が出ても、すぐに飽きてしまう",
  ],
  future: [
    "将来がすごく心配である",
    "進路がよくわからない",
    "今の勉強が将来につながるのか心配",
    "長期的な目標設定をしがち",
  ],
  growth: [
    "他の時間よりTOEICなどを勉強したい",
    "他の時間より資格を取りたい",
    "遊ぶより勉強がしたい",
    "それよりも自己投資の時間を大事にしたい",
  ],
  friendshipRelations: [
    "友達と話した後に、その話題が頭によぎる。",
    "人間関係の維持するのが難しい",
    "新歓など人が多いところが苦手だ",
    "グループワークが苦手だ",
  ],
  loveRelations: [
    "そんなんどうでもいいから彼氏/彼女が欲しい",
    "異性との出会いってどこにあるんですか？",
    "恋愛の機会、欲しいけど行動してない",
  ],
  comparison: [
    "ブランド品に目が奪われる",
    "他人を意識してしまう",
    "周囲との差",
    "他の人が羨ましい",
  ],
  livingCost: [
    "食費を常に意識している",
    "経済的な自立をしたい",
    "奨学金を借りたい/借りている",
    "家計の見直しをしないといけない",
  ],
  wastedMoney: [
    "オプションを無駄につけてしまう",
    "期間限定品に弱い",
    "サブスクを無駄につけてしまう",
  ],
  freeTime: [
    "自由な時間が欲しい",
    "できればニートになりたい",
    "ニートが羨ましい",
  ],
  assignments: [
    "課題はあたためておいた方が良いと思う",
    "課題は締め切りが来ないとできない",
    "課題を後回しにしてしまう",
  ],
  health: [
    "アラームを大量に設定してしまう",
    "運動するといってもう1年以上経っている",
    "油",
    "ストレス管理は叫んで発散してしまう",
  ],
};
