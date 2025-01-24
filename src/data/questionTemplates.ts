// data/questionTemplates.ts

export const preliminaryTemplates = [
  {
    text: "最近の自分に足りないと感じるのは？",
    type: "preliminary",
    validWorries: ["motivation", "growth", "future", "health"],
  },
  {
    text: "人間関係で最も気になることは？",
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
    text: "1日の終わりに最も気になるのは？",
    type: "preliminary",
    validWorries: ["growth", "future", "friendshipRelations", "health"],
  },
  {
    text: "生活習慣で改善したいことは？",
    type: "preliminary",
    validWorries: ["health", "freeTime", "assignments", "motivation"],
  },
  {
    text: "周りと比べて劣っていると感じるのは？",
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
    text: "研究生活を充実させるために必要なことは？",
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
    "モチベーションを維持する力",
    "目標に向かう意欲",
    "やる気の持続性",
    "自己啓発の意欲",
  ],
  future: [
    "将来のキャリアプラン",
    "進路の明確さ",
    "将来への準備",
    "長期的な目標設定",
  ],
  growth: [
    "専門性の向上",
    "スキルアップの機会",
    "成長のスピード",
    "自己投資の時間",
  ],
  friendshipRelations: [
    "友人との関係構築",
    "人間関係の維持",
    "コミュニケーション能力",
    "信頼関係の構築",
  ],
  loveRelations: [
    "恋愛の機会",
    "異性との出会い",
    "プライベートの充実",
    "感情面での充実",
  ],
  comparison: [
    "他者との競争",
    "相対的な立ち位置",
    "周囲との差",
    "比較による焦り",
  ],
  livingCost: [
    "生活費の管理",
    "経済的な自立",
    "収支のバランス",
    "家計の見直し",
  ],
  wastedMoney: ["支出の管理", "無駄遣いの改善", "計画的な支出", "貯金の習慣"],
  freeTime: [
    "自由時間の確保",
    "プライベートの時間",
    "趣味の時間",
    "リフレッシュの時間",
  ],
  assignments: ["課題の管理", "研究の進捗", "締切の遵守", "学業の質"],
  health: ["睡眠の質", "運動習慣", "食生活", "ストレス管理"],
};
