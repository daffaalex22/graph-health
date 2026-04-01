"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ReadingPoint = {
  date: string;
  shortLabel: string;
  value: number;
  reading: string;
  risk: string;
};

const chartData: ReadingPoint[] = [
  { date: "Apr 28", shortLabel: "Apr 28", value: 134, reading: "134 / 86", risk: "Stable" },
  { date: "Apr 29", shortLabel: "Apr 29", value: 136, reading: "136 / 88", risk: "Stable" },
  { date: "Apr 30", shortLabel: "Apr 30", value: 137, reading: "137 / 88", risk: "Watch" },
  { date: "May 1", shortLabel: "May 1", value: 140, reading: "140 / 92", risk: "Watch" },
  { date: "May 2", shortLabel: "May 2", value: 142, reading: "142 / 92", risk: "Rising" },
  { date: "May 3", shortLabel: "May 3", value: 144, reading: "144 / 93", risk: "Rising" },
  { date: "May 4", shortLabel: "May 4", value: 146, reading: "146 / 94", risk: "High" },
  { date: "May 5", shortLabel: "May 5", value: 148, reading: "148 / 95", risk: "High" },
  { date: "May 6", shortLabel: "May 6", value: 145, reading: "145 / 93", risk: "Improving" },
  { date: "May 7", shortLabel: "May 7", value: 141, reading: "141 / 90", risk: "Improving" },
  { date: "May 8", shortLabel: "May 8", value: 139, reading: "139 / 89", risk: "Stable" },
];

const LEFT_PAD = 24;
const RIGHT_PAD = 24;
const TOP_PAD = 16;
const BOTTOM_PAD = 30;
const CHART_HEIGHT = 168;
const POINT_GAP = 72;
const VISIBLE_POINT_COUNT = 5;

function describeRisk(risk: string) {
  if (risk === "High") {
    return "text-rose-500 bg-rose-50";
  }

  if (risk === "Rising" || risk === "Watch") {
    return "text-amber-600 bg-amber-50";
  }

  if (risk === "Improving") {
    return "text-cyan-700 bg-cyan-50";
  }

  return "text-emerald-700 bg-emerald-50";
}

export function TrendsChart() {
  const [selectedIndex, setSelectedIndex] = useState(7);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartScroll = useRef(0);
  const isDragging = useRef(false);

  const selectedPoint = chartData[selectedIndex] ?? chartData[0];
  const chartWidth = LEFT_PAD + RIGHT_PAD + POINT_GAP * Math.max(chartData.length - 1, 1);
  const maxWindowStart = Math.max(chartData.length - VISIBLE_POINT_COUNT, 0);

  const points = useMemo(() => {
    const values = chartData.map((point) => point.value);
    const minValue = Math.min(...values) - 4;
    const maxValue = Math.max(...values) + 4;
    const innerHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;

    return chartData.map((point, index) => {
      const x = LEFT_PAD + POINT_GAP * index;
      const y =
        TOP_PAD + ((maxValue - point.value) / Math.max(maxValue - minValue, 1)) * innerHeight;

      return {
        ...point,
        index,
        x,
        y,
      };
    });
  }, []);

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const viewportStart = Math.min(
    Math.max(Math.round(scrollLeft / POINT_GAP), 0),
    maxWindowStart,
  );
  const viewportPoints = chartData.slice(viewportStart, viewportStart + VISIBLE_POINT_COUNT);
  const activeViewportIndex = Math.min(
    Math.max(selectedIndex - viewportStart, 0),
    Math.max(viewportPoints.length - 1, 0),
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const targetPoint = points[selectedIndex];
    if (!targetPoint) {
      return;
    }

    const nextScrollLeft = Math.max(
      0,
      targetPoint.x - container.clientWidth / 2,
    );

    container.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }, [points, selectedIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const updateScroll = () => {
      setScrollLeft(container.scrollLeft);
    };

    updateScroll();
    container.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateScroll);
    };
  }, []);

  function handlePointerDown(clientX: number) {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    dragStartX.current = clientX;
    dragStartScroll.current = container.scrollLeft;
    isDragging.current = true;
  }

  function handlePointerMove(clientX: number) {
    const container = scrollRef.current;
    if (!container || !isDragging.current || dragStartX.current === null) {
      return;
    }

    const delta = clientX - dragStartX.current;
    container.scrollLeft = dragStartScroll.current - delta;
  }

  function stopDragging() {
    dragStartX.current = null;
    isDragging.current = false;
  }

  return (
    <div className="rounded-[28px] bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-slate-900">Blood Pressure Trend</p>
        <span className="text-sm text-slate-300">Placeholder</span>
      </div>

      <div
        ref={scrollRef}
        className="mt-4 overflow-x-auto rounded-[24px] bg-[linear-gradient(180deg,#fff7f8_0%,#ffffff_100%)] p-3 [scrollbar-width:none] touch-pan-x cursor-grab active:cursor-grabbing"
        onMouseDown={(event) => handlePointerDown(event.clientX)}
        onMouseMove={(event) => handlePointerMove(event.clientX)}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={(event) => handlePointerDown(event.touches[0]?.clientX ?? 0)}
        onTouchMove={(event) => handlePointerMove(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={stopDragging}
      >
        <div className="min-w-full" style={{ width: `${chartWidth}px` }}>
          <svg viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`} className="h-44 w-full">
            <path
              d={`M ${LEFT_PAD} ${CHART_HEIGHT - BOTTOM_PAD} H ${chartWidth - RIGHT_PAD}`}
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <path
              d={linePath}
              fill="none"
              stroke="#ef5a72"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point) => {
              const isSelected = selectedPoint.date === point.date;

              return (
                <g key={point.date}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? "#ef5a72" : "#fff"}
                    stroke="#ef5a72"
                    strokeWidth="3"
                    className="cursor-pointer"
                    onClick={() => setSelectedIndex(point.index)}
                  />
                  <text
                    x={point.x}
                    y={CHART_HEIGHT - 8}
                    textAnchor="middle"
                    className={isSelected ? "fill-rose-500" : "fill-slate-400"}
                    style={{ fontSize: "11px", fontWeight: isSelected ? 700 : 500 }}
                  >
                    {point.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] leading-4 text-slate-400">
            Drag the chart left or right
            <br />
            to explore the timeline
          </p>
        </div>
        <div className="flex gap-1">
          {viewportPoints.map((point, index) => (
            <span
              key={point.date}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${activeViewportIndex === index ? "bg-rose-500" : "bg-slate-200"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Selected Point</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-lg font-semibold text-slate-900">{selectedPoint.reading}</p>
            <span className="text-xs text-slate-400">{selectedPoint.date}</span>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${describeRisk(selectedPoint.risk)}`}>
          {selectedPoint.risk}
        </span>
      </div>
    </div>
  );
}
