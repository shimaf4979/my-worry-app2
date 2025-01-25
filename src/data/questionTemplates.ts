// data/questionTemplates.ts
export const preliminaryTemplates = [
  {
    id: "p1",
    text: "お祈りするとしたらどんな悩みを祈りますか？",
    type: "preliminary",
    validWorries: ["motivation", "wastedMoney", "livingCost", "health"],
  },
  {
    id: "p2",
    text: "人と関わるときの優先度は？",
    type: "preliminary",
    validWorries: [
      "friendshipRelations",
      "loveRelations",
      "comparison",
      "freeTime",
    ],
  },
  {
    id: "p3",
    text: "お金を使うときに思うことの優先度は？",
    type: "preliminary",
    validWorries: ["livingCost", "wastedMoney", "future", "loveRelations"],
  },
  {
    id: "p4",
    text: "時間の使い方で思うことの優先度は？",
    type: "preliminary",
    validWorries: ["freeTime", "assignments", "health", "loveRelations"],
  },
  {
    id: "p5",
    text: "生活習慣でよく思うことの優先度は？",
    type: "preliminary",
    validWorries: ["health", "freeTime", "assignments", "motivation"],
  },
  {
    id: "p6",
    text: "周りと比べた時、よく感じるのは？",
    type: "preliminary",
    validWorries: [
      "comparison",
      "assignments",
      "friendshipRelations",
      "future",
    ],
  },
];

export const finalTemplates = [
  {
    id: "f1",
    text: "直近で最も改善したい課題は？",
    type: "final",
  },
  {
    id: "f2",
    text: "長期的に見て、最も重要な課題は？",
    type: "final",
  },
  {
    id: "f3",
    text: "今の生活の中で、最も気がかりなことは？",
    type: "final",
  },
  {
    id: "f4",
    text: "理想の状態に近づくために、まず取り組むべきことは？",
    type: "final",
  },
];

// 選択肢のテンプレート
export const choiceTemplates: Record<string, string[]> = {
  motivation: [
    "多方面に興味があるが、続けられない",
    "自分に自信がない",
    "やる気が出ても、すぐに飽きてしまう",
    "多方面に興味があるが、続けられない",
    "自分に自信がない",
    "やる気が出ても、すぐに飽きてしまう",
  ],
  future: [
    "将来がすごく心配である",
    "進路がよくわからない",
    "今の勉強が将来につながるのか心配",
    "進路がよくわからない",
    "今の勉強が将来につながるのか心配",
    "長期的な目標設定をしがち",
  ],

  friendshipRelations: [
    "人間関係の維持するのが難しい",
    "新歓など人が多いところが苦手だ",
    "グループワークが苦手だ",
    "人間関係の維持するのが難しい",
    "新歓など人が多いところが苦手だ",
    "グループワークが苦手だ",
  ],
  loveRelations: [
    "そんなことより彼氏/彼女が欲しい",
    "異性との出会いってどこにあるんですか？",
    "恋愛の機会、欲しいけど行動してない",
    "そんなことより彼氏/彼女が欲しい",
    "異性との出会いってどこにあるんですか？",
    "恋愛の機会、欲しいけど行動してない",
  ],
  comparison: [
    "ブランド品に目が奪われる",
    "他人を意識してしまう",
    "周囲との差",
    "他人を意識してしまう",
    "周囲との差",
    "他の人が羨ましい",
  ],
  livingCost: [
    "食費を常に意識している",
    "経済的な自立をしたい",
    "家計の見直しをしたい",
    "食費を常に意識している",
    "経済的な自立をしたい",
    "家計の見直しをしたい",
  ],
  wastedMoney: [
    "オプションを無駄につけてしまう",
    "期間限定品に弱い",
    "サブスクを無駄につけてしまう",
    "オプションを無駄につけてしまう",
    "期間限定品に弱い",
    "サブスクを無駄につけてしまう",
  ],
  freeTime: [
    "自由な時間が欲しい",
    "できればニートになりたい",
    "ニートが羨ましい",
    "何も考えない時間が欲しい",
    "ニートになりたい人生だった",
    "拘束されない生活が羨ましい",
  ],
  assignments: [
    "課題はあたためておいた方が良いと思う",
    "課題は締め切りが来ないとできない",
    "課題を後回しにしてしまう",
    "課題はあたためておいた方が良いと思う",
    "課題は締め切りが来ないとできない",
    "課題を後回しにしてしまう",
  ],
  health: [
    "アラームを大量に設定してしまう",
    "運動習慣が足りない",
    "間食をよくしてしまう",
    "もっと健康になりたい",
    "もっと健康になりたい",
    "運動習慣が足りない",
  ],
};
