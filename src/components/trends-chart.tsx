"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ReadingPoint = {
  date: string;
  shortLabel: string;
  systolic: number;
  diastolic: number;
};

const chartData: ReadingPoint[] = [
  { date: "Apr 28", shortLabel: "Apr 28", systolic: 112, diastolic: 72 },
  { date: "Apr 29", shortLabel: "Apr 29", systolic: 115, diastolic: 74 },
  { date: "Apr 30", shortLabel: "Apr 30", systolic: 122, diastolic: 78 },
  { date: "May 1", shortLabel: "May 1", systolic: 126, diastolic: 79 },
  { date: "May 2", shortLabel: "May 2", systolic: 132, diastolic: 84 },
  { date: "May 3", shortLabel: "May 3", systolic: 135, diastolic: 86 },
  { date: "May 4", shortLabel: "May 4", systolic: 140, diastolic: 90 },
  { date: "May 5", shortLabel: "May 5", systolic: 144, diastolic: 92 },
  { date: "May 6", shortLabel: "May 6", systolic: 148, diastolic: 94 },
  { date: "May 7", shortLabel: "May 7", systolic: 152, diastolic: 96 },
  { date: "May 8", shortLabel: "May 8", systolic: 115, diastolic: 76 },
];

const LEFT_PAD = 24;
const RIGHT_PAD = 24;
const TOP_PAD = 16;
const BOTTOM_PAD = 30;
const CHART_HEIGHT = 168;
const POINT_GAP = 72;
const VISIBLE_POINT_COUNT = 5;
const CATEGORY_THRESHOLDS = [
  { label: "120", value: 120 },
  { label: "130", value: 130 },
  { label: "140", value: 140 },
] as const;

function getCategory(point: ReadingPoint) {
  if (point.systolic > 180 || point.diastolic > 120) {
    return "Crisis";
  }

  if (point.systolic >= 140 || point.diastolic >= 90) {
    return "Stage 2";
  }

  if (
    (point.systolic >= 130 && point.systolic <= 139) ||
    (point.diastolic >= 80 && point.diastolic <= 89)
  ) {
    return "Stage 1";
  }

  if (point.systolic >= 120 && point.systolic <= 129 && point.diastolic < 80) {
    return "Elevated";
  }

  return "Normal";
}

function getCategoryColor(category: string) {
  if (category === "Crisis") {
    return "#b91c1c";
  }

  if (category === "Stage 2") {
    return "#e11d48";
  }

  if (category === "Stage 1") {
    return "#ea580c";
  }

  if (category === "Elevated") {
    return "#d97706";
  }

  return "#15803d";
}

function describeCategory(category: string) {
  if (category === "Crisis") {
    return "text-red-700 bg-red-50";
  }

  if (category === "Stage 2") {
    return "text-rose-600 bg-rose-50";
  }

  if (category === "Stage 1") {
    return "text-orange-600 bg-orange-50";
  }

  if (category === "Elevated") {
    return "text-amber-600 bg-amber-50";
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
  const selectedCategory = getCategory(selectedPoint);
  const chartWidth = LEFT_PAD + RIGHT_PAD + POINT_GAP * Math.max(chartData.length - 1, 1);
  const maxWindowStart = Math.max(chartData.length - VISIBLE_POINT_COUNT, 0);

  const points = useMemo(() => {
    const values = chartData.map((point) => point.systolic);
    const minValue = Math.min(...values) - 4;
    const maxValue = Math.max(...values) + 4;
    const innerHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;

    return chartData.map((point, index) => {
      const x = LEFT_PAD + POINT_GAP * index;
      const y =
        TOP_PAD + ((maxValue - point.systolic) / Math.max(maxValue - minValue, 1)) * innerHeight;

      return {
        ...point,
        index,
        x,
        y,
      };
    });
  }, []);

  const values = chartData.map((point) => point.systolic);
  const minValue = Math.min(...values) - 4;
  const maxValue = Math.max(...values) + 4;
  const innerHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;

  const thresholdLines = CATEGORY_THRESHOLDS.map((threshold) => ({
    ...threshold,
    y:
      TOP_PAD +
      ((maxValue - threshold.value) / Math.max(maxValue - minValue, 1)) * innerHeight,
  })).filter((threshold) => threshold.y >= TOP_PAD && threshold.y <= CHART_HEIGHT - BOTTOM_PAD);

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const gradientStops = points.map((point) => {
    const category = getCategory(point);
    return {
      offset: `${(point.x / chartWidth) * 100}%`,
      color: getCategoryColor(category),
    };
  });

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
            <defs>
              <linearGradient id="bpTrendGradient" x1={LEFT_PAD} y1="0" x2={chartWidth - RIGHT_PAD} y2="0" gradientUnits="userSpaceOnUse">
                {gradientStops.map((stop) => (
                  <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            {thresholdLines.map((threshold) => (
              <g key={threshold.value}>
                <path
                  d={`M ${LEFT_PAD} ${threshold.y} H ${chartWidth - RIGHT_PAD}`}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="5 6"
                />
                <text
                  x={chartWidth - RIGHT_PAD}
                  y={threshold.y - 6}
                  textAnchor="end"
                  className="fill-slate-300"
                  style={{ fontSize: "10px", fontWeight: 600 }}
                >
                  {threshold.label}
                </text>
              </g>
            ))}
            <path
              d={`M ${LEFT_PAD} ${CHART_HEIGHT - BOTTOM_PAD} H ${chartWidth - RIGHT_PAD}`}
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <path
              d={linePath}
              fill="none"
              stroke="url(#bpTrendGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point) => {
              const isSelected = selectedPoint.date === point.date;
              const category = getCategory(point);
              const pointColor = getCategoryColor(category);

              return (
                <g key={point.date}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? pointColor : "#fff"}
                    stroke={pointColor}
                    strokeWidth="3"
                    className="cursor-pointer"
                    onClick={() => setSelectedIndex(point.index)}
                  />
                  <text
                    x={point.x}
                    y={CHART_HEIGHT - 8}
                    textAnchor="middle"
                    className={isSelected ? "" : "fill-slate-400"}
                    fill={isSelected ? pointColor : undefined}
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
            <p className="text-lg font-semibold text-slate-900">
              {selectedPoint.systolic} / {selectedPoint.diastolic}
            </p>
            <span className="text-xs text-slate-400">{selectedPoint.date}</span>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${describeCategory(selectedCategory)}`}>
          {selectedCategory}
        </span>
      </div>
    </div>
  );
}
