"use client";

import { useMemo, useRef, useState, useEffect } from "react";

type LabDataPoint = {
  date: string;
  shortLabel: string;
  value: number;
  note?: string;
};

type LabType = "Ureum" | "Creatinine";

const labData: Record<LabType, LabDataPoint[]> = {
  Ureum: [
    { date: "Mar 2", shortLabel: "Mar 2", value: 3.2 },
    { date: "Mar 20", shortLabel: "Mar 20", value: 6.8 },
    { date: "Apr 7", shortLabel: "Apr 7", value: 8.5 },
    { date: "Apr 17", shortLabel: "Apr 17", value: 9.2 },
    { date: "May 9", shortLabel: "May 9", value: 10.5, note: "Pre-hemodialysis" },
    { date: "May 9", shortLabel: "May 9", value: 7.4, note: "Post-hemodialysis" },
  ],
  Creatinine: [
    { date: "Mar 2", shortLabel: "Mar 2", value: 0.9 },
    { date: "Mar 20", shortLabel: "Mar 20", value: 1.1 },
    { date: "Apr 7", shortLabel: "Apr 7", value: 1.4 },
    { date: "Apr 17", shortLabel: "Apr 17", value: 1.8 },
    { date: "May 9", shortLabel: "May 9", value: 2.2 },
    { date: "May 9", shortLabel: "May 9", value: 1.3 },
  ]
};

const labMeta: Record<LabType, { unit: string; normalMax: number; normalMin: number; color: string }> = {
  Ureum: { unit: "mmol/L", normalMax: 8.1, normalMin: 1.6, color: "#94a3b8" },
  Creatinine: { unit: "mg/dL", normalMax: 1.2, normalMin: 0.6, color: "#94a3b8" }
};

const LEFT_PAD = 24;
const RIGHT_PAD = 24;
const TOP_PAD = 16;
const BOTTOM_PAD = 30;
const CHART_HEIGHT = 168;
const POINT_GAP = 96;
const VISIBLE_POINT_COUNT = 5;

export function LabResultsChart() {
  const [activeType, setActiveType] = useState<LabType>("Ureum");
  const [selectedIndex, setSelectedIndex] = useState(labData["Ureum"].length - 1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const currentData = labData[activeType];
  const meta = labMeta[activeType];
  const selectedPoint = currentData[selectedIndex] ?? currentData[0];
  const chartWidth = LEFT_PAD + RIGHT_PAD + POINT_GAP * Math.max(currentData.length - 1, 1);
  const maxWindowStart = Math.max(currentData.length - VISIBLE_POINT_COUNT, 0);

  const values = currentData.map((point) => point.value);
  const minValue = Math.min(...values) * 0.8;
  const maxValue = Math.max(...values) * 1.2;
  const innerHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;

  const points = useMemo(() => {
    return currentData.map((point, index) => {
      const x = LEFT_PAD + POINT_GAP * index;
      const y = TOP_PAD + ((maxValue - point.value) / Math.max(maxValue - minValue, 1)) * innerHeight;
      return { ...point, index, x, y };
    });
  }, [currentData, maxValue, minValue, innerHeight]);

  const thresholdY = TOP_PAD + ((maxValue - meta.normalMax) / Math.max(maxValue - minValue, 1)) * innerHeight;

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const gradientStops = points.map((point) => {
    let pointColor = point.value >= meta.normalMax ? "#ef4444" : "#10b981";
    return {
      offset: `${(point.x / chartWidth) * 100}%`,
      color: pointColor,
    };
  });

  const isHigh = selectedPoint.value > meta.normalMax;
  const isLow = selectedPoint.value < meta.normalMin;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const targetPoint = points[selectedIndex];
    if (!targetPoint) return;
    const nextScrollLeft = Math.max(0, targetPoint.x - container.clientWidth / 2);
    container.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  }, [points, selectedIndex]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dragStartX = useRef<number | null>(null);
  const dragStartScroll = useRef(0);
  const isDragging = useRef(false);

  function handlePointerDown(clientX: number) {
    const container = scrollRef.current;
    if (!container) return;
    dragStartX.current = clientX;
    dragStartScroll.current = container.scrollLeft;
    isDragging.current = true;
  }

  function handlePointerMove(clientX: number) {
    const container = scrollRef.current;
    if (!container || !isDragging.current || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    container.scrollLeft = dragStartScroll.current - delta;
  }

  function stopDragging() {
    dragStartX.current = null;
    isDragging.current = false;
  }

  return (
    <section className="rounded-[28px] bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900">Lab Results</p>
          <p className="text-sm font-medium text-slate-400">Monthly breakdown</p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-2 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200/50 transition-all active:scale-95"
          >
            {activeType}
            <svg
              className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_20px_40px_rgba(15,23,42,0.15)] ring-1 ring-slate-100 backdrop-blur-xl animate-in fade-in zoom-in duration-200">
              {(["Ureum", "Creatinine"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveType(type);
                    setSelectedIndex(labData[type].length - 1);
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-xl px-4 py-2 text-left text-[11px] font-bold transition-colors ${activeType === type ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-4 overflow-x-auto rounded-[24px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-3 [scrollbar-width:none] touch-pan-x cursor-grab active:cursor-grabbing"
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
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
              <linearGradient id={`gradient-${activeType}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={meta.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={meta.color} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`line-gradient-${activeType}`} x1={LEFT_PAD} y1="0" x2={chartWidth - RIGHT_PAD} y2="0" gradientUnits="userSpaceOnUse">
                {gradientStops.map((stop) => (
                  <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>

              <g className="opacity-50">
                <line
                  x1={0}
                  y1={thresholdY}
                  x2={chartWidth}
                  y2={thresholdY}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={scrollLeft + LEFT_PAD}
                  y={thresholdY - 6}
                  className="text-[9px] font-bold fill-red-500"
                >
                  Threshold: {meta.normalMax}
                </text>
              </g>
            
            <path
              d={`${linePath} L ${points[points.length-1].x} ${CHART_HEIGHT - BOTTOM_PAD} L ${points[0].x} ${CHART_HEIGHT - BOTTOM_PAD} Z`}
              fill={`url(#gradient-${activeType})`}
            />

            <path
              d={linePath}
              fill="none"
              stroke={`url(#line-gradient-${activeType})`}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point) => {
              const isSelected = selectedIndex === point.index;
              let pointColor = point.value >= meta.normalMax ? "#ef4444" : "#10b981";
              return (
                <g key={`${point.date}-${point.index}`} onClick={() => setSelectedIndex(point.index)} className="cursor-pointer">
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 7 : 4.5}
                    fill={isSelected ? pointColor : "#fff"}
                    stroke={pointColor}
                    strokeWidth="2.5"
                  />
                  <text
                    x={point.x}
                    y={CHART_HEIGHT - 8}
                    textAnchor="middle"
                    className={`text-[10px] font-bold ${isSelected ? "fill-slate-900" : "fill-slate-400"}`}
                  >
                    {point.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {selectedPoint.note && (
        <div className="mb-4 rounded-[18px] bg-slate-100/40 p-3 ring-1 ring-slate-100/80">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 rounded-full bg-slate-400 p-1">
              <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Clinical Note</p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600 leading-relaxed italic">
                "{selectedPoint.note}"
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-3 ring-1 ring-slate-100/50">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{activeType} Level</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <p className="text-xl font-bold text-slate-900">{selectedPoint.value}</p>
            <p className="text-xs font-medium text-slate-400">{meta.unit}</p>
          </div>
        </div>
        <div className={`rounded-xl px-3 py-1.5 text-[11px] font-bold ring-1 ${isHigh ? "bg-rose-50 text-rose-600 ring-rose-100" : isLow ? "bg-amber-50 text-amber-600 ring-amber-100" : "bg-emerald-50 text-emerald-600 ring-emerald-100"}`}>
          {isHigh ? "Above Normal" : isLow ? "Below Normal" : "Optimized"}
        </div>
      </div>
    </section>
  );
}
