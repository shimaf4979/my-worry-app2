// components/WorryDistributionChart.tsx
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { EducationLevel, ChartData } from "@/types";

interface Props {
  data: ChartData[];
  selectedEducationLevel: EducationLevel | "all";
}

export default function WorryDistributionChart({
  data,
  selectedEducationLevel,
}: Props) {
  console.log("Chart rendering with data:", data);

  // カラー設定
  const COLORS = {
    education: {
      undergraduate: "#60A5FA", // ブルー
      master: "#34D399", // グリーン
      doctor: "#F87171", // レッド
      other: "#A78BFA", // パープル
    },
    years: {
      year1: "#93C5FD", // ライトブルー
      year2: "#60A5FA", // ブルー
      year3: "#3B82F6", // ミディアムブルー
      year4: "#2563EB", // ダークブルー
    },
  };

  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-200'>
        <p className='font-semibold text-gray-800 mb-2'>{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-gray-600'>
              {entry.name}: {entry.value}人
            </span>
          </div>
        ))}
      </div>
    );
  };

  // X軸の最大値を計算
  const maxValue = useMemo(() => {
    return Math.max(
      ...data.map((item) => {
        if (selectedEducationLevel === "all") {
          return Math.max(
            item.undergraduate,
            item.master,
            item.doctor,
            item.other
          );
        } else {
          return Math.max(item.year1, item.year2, item.year3, item.year4);
        }
      })
    );
  }, [data, selectedEducationLevel]);

  // 最小の最大値を5に設定
  const chartMaxValue = Math.max(maxValue + 1, 5);

  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={data.length * 80 + 100}>
        <BarChart
          data={data}
          layout='vertical'
          margin={{
            top: 20, // 上部の余白
            right: 30, // 右側の余白
            bottom: 50, // 下部の余白（凡例のスペース）
            left: -60, // 左側の余白（ラベルのスペース）
          }}
          barGap={2}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            horizontal={true}
            vertical={true}
          />
          <XAxis
            type='number'
            domain={[0, chartMaxValue]}
            tickCount={chartMaxValue + 1}
            tickFormatter={(value) => `${value}人`}
          />
          <YAxis
            type='category'
            dataKey='worryTitle'
            width={180}
            tick={{
              fill: "#374151",
              fontSize: 14,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign='bottom'
            height={36}
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
            }}
          />

          {selectedEducationLevel === "all" ? (
            // 全体表示（教育レベル別）
            <>
              <Bar
                dataKey='undergraduate'
                name='学部'
                fill={COLORS.education.undergraduate}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='master'
                name='修士'
                fill={COLORS.education.master}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='doctor'
                name='博士'
                fill={COLORS.education.doctor}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='other'
                name='その他'
                fill={COLORS.education.other}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
            </>
          ) : (
            // 学年別表示
            <>
              <Bar
                dataKey='year1'
                name='1年生'
                fill={COLORS.years.year1}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='year2'
                name='2年生'
                fill={COLORS.years.year2}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='year3'
                name='3年生'
                fill={COLORS.years.year3}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
              <Bar
                dataKey='year4'
                name='4年生'
                fill={COLORS.years.year4}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
