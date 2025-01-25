// components/WorryDistributionChart.tsx
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { EducationLevel, ChartData } from "@/types";
import { EDUCATION_COLORS, YEAR_COLORS } from "@/constants/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: ChartData[];
  selectedEducationLevel: EducationLevel | "all";
}

export default function WorryDistributionChart({
  data,
  selectedEducationLevel,
}: Props) {
  console.log("Chart rendering with data:", data);

  const chartData = {
    labels: data.map((item) => item.worryTitle),
    datasets:
      selectedEducationLevel === "all"
        ? [
            {
              label: "学部",
              data: data.map((item) => item.undergraduate),
              backgroundColor: EDUCATION_COLORS.undergraduate.bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "修士",
              data: data.map((item) => item.master),
              backgroundColor: EDUCATION_COLORS.master.bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "博士",
              data: data.map((item) => item.doctor),
              backgroundColor: EDUCATION_COLORS.doctor.bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "その他",
              data: data.map((item) => item.other),
              backgroundColor: EDUCATION_COLORS.other.bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
          ]
        : [
            {
              label: "1年生",
              data: data.map((item) => item.year1),
              backgroundColor: YEAR_COLORS[1].bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "2年生",
              data: data.map((item) => item.year2),
              backgroundColor: YEAR_COLORS[2].bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "3年生",
              data: data.map((item) => item.year3),
              backgroundColor: YEAR_COLORS[3].bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
            {
              label: "4年生",
              data: data.map((item) => item.year4),
              backgroundColor: YEAR_COLORS[4].bg,
              borderRadius: 4,
              barPercentage: 0.8,
              categoryPercentage: 0.9,
            },
          ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 10,
            family: "'Noto Sans JP', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1F2937",
        bodyColor: "#4B5563",
        titleFont: {
          size: 11,
          weight: "bold",
          family: "'Noto Sans JP', sans-serif",
        },
        bodyFont: {
          size: 10,
          family: "'Noto Sans JP', sans-serif",
        },
        padding: 8,
        borderColor: "rgba(203, 213, 225, 0.5)",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.x}人`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "rgba(203, 213, 225, 0.2)",
        },
        ticks: {
          font: {
            size: 9,
          },
        },
        afterFit: (context: any) => {
          context.paddingRight = 20;
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            family: "'Noto Sans JP', sans-serif",
          },
          maxRotation: -45,
          minRotation: -45,
          padding: 4,
        },
        afterFit: (context: any) => {
          context.paddingLeft = 20;
        },
      },
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 10,
        bottom: 30,
      },
    },
    barThickness: 12,
  };

  return (
    <div className='w-full h-screen max-h-[700px] px-4'>
      <div className='relative w-full h-full'>
        <Bar
          data={chartData}
          options={options as any}
          className='w-full h-full'
        />
      </div>
    </div>
  );
}
