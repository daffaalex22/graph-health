"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Header, Icon, StatusBadge } from "@/components/graph-health-app";
import { TrendsChart } from "@/components/trends-chart";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function HomeScreen() {
  return (
    <div className="pb-28">
      <Header title="GraphHealth" />

      <div className="space-y-4 px-4">
        <section className="overflow-hidden rounded-[30px] bg-[linear-gradient(140deg,#fff2f3_0%,#ffe3e8_100%)] p-4 shadow-[0_18px_40px_rgba(219,39,119,0.12)] ring-1 ring-white/80">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <Icon name="alert" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-rose-600">Health Alert</p>
                <p className="text-xs text-slate-500">Action Required</p>
              </div>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-rose-500">ESRD</span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[1.65rem] leading-none font-semibold text-slate-900">Daniel Kim, 63</p>
              <p className="mt-3 text-sm text-slate-500">BP rising for 3 days</p>
              <p className="mt-2 text-[2.1rem] leading-none font-semibold text-rose-600">148 / 95</p>
              <p className="mt-2 text-xs text-slate-500">Today, 8:45 AM</p>
            </div>
            <div className="flex min-w-[112px] flex-col items-end">
              <svg viewBox="0 0 120 72" className="h-18 w-full">
                <path d="M5 60 C20 59, 28 58, 40 52 S60 43, 70 41 S85 30, 95 18 S108 12, 115 8" fill="none" stroke="#ef5a72" strokeWidth="3" strokeLinecap="round" />
                {[40, 70, 95, 115].map((x, index) => (
                  <circle key={x} cx={x} cy={[52, 41, 18, 8][index]} r="4" fill="#fff" stroke="#ef5a72" strokeWidth="2" />
                ))}
              </svg>
              <Link
                href="/scan"
                className="mt-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(239,90,114,0.25)]"
              >
                Take Photo
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[26px] bg-white/86 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Quick Actions</p>
            <button className="text-xs font-medium text-slate-400">See All</button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Take Photo", icon: "camera" as const, caption: "1 tap", href: "/scan", active: true },
              { label: "Add Medication", icon: "pill" as const, caption: "Log dose", href: "/insight", active: false },
              { label: "Emergency Call", icon: "doctor" as const, caption: "Quick help", href: "/", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={item.active ? "rounded-[22px] bg-cyan-600 p-3 text-left text-white shadow-[0_16px_28px_rgba(8,145,178,0.24)]" : "rounded-[22px] bg-slate-50 p-3 text-left text-slate-700"}
              >
                <div className={item.active ? "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/16" : "flex h-11 w-11 items-center justify-center rounded-2xl bg-white"}>
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <p className={item.active ? "mt-4 text-sm font-semibold text-cyan-50" : "mt-4 text-sm font-semibold"}>{item.label}</p>
                <p className={item.active ? "mt-1 text-xs text-cyan-50" : "mt-1 text-xs text-slate-400"}>{item.caption}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] bg-white/86 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Today&apos;s Health Summary</p>
            <button className="text-xs font-medium text-slate-400">See All</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex flex-col rounded-[22px] bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/50">
                  <Icon name="drop" className="h-3.5 w-3.5 text-rose-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">BP</span>
              </div>
              <p className="mt-4 text-[1.65rem] font-bold leading-none text-rose-600">148 / 95</p>
              <p className="mt-2 text-xs font-semibold text-rose-500/80">Stage 2</p>
            </div>
            <div className="flex flex-col rounded-[22px] bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/50">
                  <Icon name="glucose" className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Glucose</span>
              </div>
              <p className="mt-4 text-[1.65rem] font-bold leading-none text-slate-900">85</p>
              <p className="mt-2 text-xs font-semibold text-emerald-600/80">Normal</p>
            </div>
          </div>
        </section>

        <section className="rounded-[26px] bg-white/86 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <Icon name="spark" className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">AI Health Insight</p>
                <span className="text-lg text-amber-400">☀</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your BP increased after missing medication yesterday.
              </p>
              <Link href="/insight" className="mt-4 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white">
                Take Progress
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ScanScreen() {
  return (
    <div className="pb-28">
      <Header title="Scan Photo" showBack />
      <div className="space-y-4 px-4">
        <section className="rounded-[30px] bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <div className="scanner-area rounded-[28px] bg-[linear-gradient(180deg,#dce4ef_0%,#cad4e4_100%)] p-4">
            <div className="flex h-[320px] items-center justify-center rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(238,244,251,0.88))]">
              <div className="relative h-[194px] w-[148px] rounded-[34px] bg-[linear-gradient(180deg,#fcfeff,#d9e4ef)] p-4 shadow-[0_22px_40px_rgba(30,41,59,0.18)]">
                <div className="absolute inset-3 rounded-[28px] border-2 border-white/70" />
                <div className="flex h-full flex-col justify-between rounded-[28px] bg-[linear-gradient(180deg,#f7fbff,#edf3f9)] px-4 py-5">
                  <div className="rounded-[24px] bg-slate-700 p-4 text-center text-cyan-50">
                    <p className="text-[2rem] font-semibold leading-none">148</p>
                    <p className="mt-1 text-xl leading-none">95</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-9 rounded-full bg-slate-400/70" />
                    <div className="h-4 w-9 rounded-full bg-cyan-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 px-3 text-center text-base leading-7 text-slate-600">
            Place your health document or device within the frame.
          </p>
        </section>

        <Link
          href="/reading"
          className="flex w-full items-center gap-3 rounded-[24px] bg-white/88 px-5 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600 text-white">
            <Icon name="camera" className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-slate-900">Take Photo</p>
          </div>
        </Link>

        {[
          { label: "Upload from Gallery", icon: "upload" as const },
          { label: "Enter Manually", icon: "manual" as const },
        ].map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-[22px] bg-white/88 px-5 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Icon name={item.icon} className="h-5 w-5" />
            </div>
            <span className="flex-1 text-base font-medium text-slate-700">{item.label}</span>
            <span className="text-slate-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReadingScreen() {
  return (
    <div className="pb-28">
      <Header title="Reading" showBack />
      <div className="space-y-4 px-4">
        <section className="rounded-[28px] bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <p className="text-base font-medium text-slate-500">Blood Pressure</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <p className="text-[3rem] leading-none font-semibold text-slate-900">148 / 95</p>
            <StatusBadge tone="rose">Stage 2</StatusBadge>
          </div>
          <div className="mt-6">
            <p className="text-base font-medium text-slate-500">Pulse: 82</p>
          </div>
        </section>

        <button className="w-full rounded-full bg-cyan-600 px-5 py-4 text-base font-semibold text-white shadow-[0_18px_34px_rgba(8,145,178,0.24)]">
          Confirm Reading
        </button>
        <button className="w-full rounded-full bg-white/88 px-5 py-4 text-base font-semibold text-slate-500 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          Retake
        </button>
      </div>
    </div>
  );
}

export function InsightScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartScroll = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (clientX: number) => {
    if (!scrollRef.current) return;
    dragStartX.current = clientX;
    dragStartScroll.current = scrollRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || dragStartX.current === null || !scrollRef.current) return;
    const delta = clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragStartScroll.current - delta;
  };

  const stopDragging = () => {
    setIsDragging(false);
    dragStartX.current = null;
  };

  const medicationHistory = Array.from({ length: 11 }, (_, i) => ({
    day: i + 1,
    status: "taken",
    color: i === 3 ? "rose" : "cyan",
    marker: i === 2 ? "2" : (i === 3 ? "✻" : undefined)
  }));

  return (
    <div className="pb-28">
      <Header title="Medication" />
      <div className="space-y-5 px-4">
        {/* Progress & Medication Card */}
        <section className="overflow-hidden rounded-[30px] bg-white/94 shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-white/80">
          <div className="px-5 py-4">
            <h2 className="text-[1.05rem] font-bold text-slate-800">Progress & Medication</h2>
          </div>

          <div className="mx-2 mb-2 overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)] ring-1 ring-slate-100/60">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-[1.4rem] font-bold tracking-tight text-cyan-950">Amlodipine 5mg</h3>
                <p className="mt-0.5 text-sm font-medium text-slate-500">Every day</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-slate-200/50 px-2 py-1 shadow-sm backdrop-blur-sm">
                <div className="h-3.5 w-5 rounded-[3px] bg-slate-300 shadow-inner" />
                <span className="text-[11px] font-bold text-slate-500">3</span>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto [scrollbar-width:none] touch-pan-x cursor-grab active:cursor-grabbing pb-2"
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchStart={(e) => handlePointerDown(e.touches[0]?.clientX ?? 0)}
              onTouchMove={(e) => handlePointerMove(e.touches[0]?.clientX ?? 0)}
              onTouchEnd={stopDragging}
            >
              {medicationHistory.map((item, i) => (
                <div key={i} className="flex min-w-[70px] flex-col items-center">
                  <p className="mb-3 whitespace-nowrap text-[13px] font-bold text-slate-400">
                    Day <span className="text-slate-600 font-extrabold">{item.day}</span>
                  </p>
                  <div className="relative mb-3 flex h-16 w-full items-center justify-center rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] ring-1 ring-slate-100">
                    <div className={cn(
                      "relative h-10 w-6 rotate-[35deg] overflow-hidden rounded-full shadow-sm ring-1 ring-white/50",
                      item.color === "cyan" ? "bg-cyan-500" : "bg-rose-500"
                    )}>
                      <div className="h-1/2 w-full bg-slate-50/90" />
                      {item.marker && (
                        <div className="absolute inset-0 flex items-end justify-center pb-0.5">
                           <span className={cn(
                             "text-[10px] font-black -rotate-[35deg]",
                             item.color === "cyan" ? "text-cyan-600" : "text-rose-100"
                           )}>{item.marker}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex h-6 w-11 items-center justify-center rounded-full bg-cyan-100/70 text-cyan-600 shadow-sm ring-1 ring-cyan-200/50">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-7 flex w-full items-center justify-between rounded-2xl bg-white/60 px-4 py-3.5 text-slate-600 shadow-sm ring-1 ring-slate-100 transition-active active:scale-[0.98]">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 ring-1 ring-cyan-100">
                  <span className="text-xs font-bold leading-none">4</span>
                </div>
                <p className="text-[13px] font-semibold text-slate-600">Panat J V-mbak duku!</p>
              </div>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        {/* AI Note Card */}
        <section className="rounded-[30px] bg-white/94 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-white/80">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 shadow-sm ring-1 ring-slate-200">
              <Icon name="doctor" className="h-4 w-4" />
            </div>
            <h2 className="text-[1.05rem] font-bold text-slate-800">AI Note</h2>
          </div>

          <div className="mt-5">
            <p className="text-[1.15rem] leading-snug font-medium text-slate-700">
              <span className="font-extrabold text-slate-900 underline decoration-rose-500/30 decoration-4 underline-offset-2">BP naik</span> berbarengan dengan lupa minum obat.
            </p>
          </div>

          <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,#fff8f4_0%,#fff2e8_100%)] p-5 ring-1 ring-[#ffe4d1] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-[10px]">🧡</span>
              </div>
              <p className="text-[13px] font-medium leading-[1.6] text-[#8a5d3b]">
                Ingat, jangan asal stop obat dan rutin minumnya, ya!
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-2 py-4">
            <div className="flex gap-4">
                <Icon name="bell" className="h-4 w-4 text-slate-300" />
                <Icon name="clock" className="h-4 w-4 text-slate-300" />
                <Icon name="manual" className="h-4 w-4 text-slate-300" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300">GraphHealth © 2026</p>
        </section>
      </div>
    </div>
  );
}

export function TrendsScreen() {
  return (
    <div className="pb-28">
      <Header title="GraphHealth" />
      <div className="space-y-4 px-4">
        <TrendsChart />
      </div>
    </div>
  );
}

export function HistoryScreen() {
  return (
    <div className="pb-28">
      <Header title="GraphHealth" />
      <div className="space-y-4 px-4">
        <section className="rounded-[28px] bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-slate-900">History</p>
              <p className="mt-1 text-sm text-slate-500">Previous health activity</p>
            </div>
            <StatusBadge tone="emerald">Synced</StatusBadge>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { title: "Blood pressure uploaded", meta: "Today, 8:45 AM", detail: "148 / 95 confirmed" },
              { title: "Medication logged", meta: "Yesterday, 8:10 PM", detail: "Evening dose missed" },
              { title: "Doctor notified", meta: "Yesterday, 8:52 PM", detail: "BP trend summary sent" },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-base font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.meta}</p>
                <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
