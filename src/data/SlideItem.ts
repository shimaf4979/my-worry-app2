interface SlideItem {
  id: number;
  title: string;
  desc: string;
  bgColor: string;
  imageUrl: string;
}

export const slides: { [key: string]: SlideItem[] } = {
  "コワーキング(社畜)沐浴": [
    {
      id: 1,
      title: "全体像",
      desc: "忙しいあなたのために",
      bgColor: "#000000",
      imageUrl: "mokuyoku/syatiku1.webp",
    },
    {
      id: 2,
      title: "作業風景",
      desc: "あなたの大好きな作業と共に",
      bgColor: "#000000",
      imageUrl: "mokuyoku/syatiku2.webp",
    },
    {
      id: 3,
      title: "豊かな風景",
      desc: "作業が捗ること間違いなし",
      bgColor: "#000000",
      imageUrl: "mokuyoku/syatiku3.webp",
    },
  ],
  リフレッシュ沐浴: [
    {
      id: 1,
      title: "全体像",
      desc: "リラックスに最適な空間",
      bgColor: "#2563eb",
      imageUrl: "mokuyoku/sizen1.webp",
    },
    {
      id: 2,
      title: "風景",
      desc: "川の音や自然に囲まれて気分上昇",
      bgColor: "#3b82f6",
      imageUrl: "mokuyoku/sizen2.webp",
    },
    {
      id: 3,
      title: "太陽を浴びよう",
      desc: "家にこもってないで、出てみないか",
      bgColor: "#60a5fa",
      imageUrl: "mokuyoku/sizen3.webp",
    },
  ],
  ノーマネー沐浴: [
    {
      id: 1,
      title: "全体像",
      desc: "お金がないあなたのために",
      bgColor: "#2563eb",
      imageUrl: "mokuyoku/kane1.webp",
    },
    {
      id: 2,
      title: "風景",
      desc: "お金がなくてもいいんだよ、それが人生さ",
      bgColor: "#3b82f6",
      imageUrl: "mokuyoku/kane2.webp",
    },
    {
      id: 3,
      title: "",
      desc: "どうにかなるんだよ、時に委ねよう",
      bgColor: "#60a5fa",
      imageUrl: "mokuyoku/kane3.webp",
    },
  ],
};
