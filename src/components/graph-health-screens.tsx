"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Header, Icon, StatusBadge } from "@/components/graph-health-app";
import { TrendsChart } from "@/components/trends-chart";
import { LabResultsChart } from "@/components/lab-results-chart";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function HomeScreen() {
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);

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
          <p className="mb-3 text-sm font-semibold text-slate-900">Diagnosis</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold tracking-wide text-rose-600 shadow-sm ring-1 ring-rose-100">End-Stage Renal Disease</span>
            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold tracking-wide text-rose-600 shadow-sm ring-1 ring-rose-100">Hypertension</span>
            <button onClick={() => setIsDiagnosisOpen(true)} className="rounded-full bg-slate-50 px-4 py-1 text-xs font-bold tracking-wide text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-100">+1</button>
          </div>
        </section>

        {isDiagnosisOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={() => setIsDiagnosisOpen(false)} />
            <div className="relative w-full max-w-sm rounded-[32px] bg-white/95 p-6 shadow-[0_24px_48px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 backdrop-blur-xl animate-in fade-in zoom-in duration-200">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Patient Diagnoses</h3>
                <button onClick={() => setIsDiagnosisOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div className="rounded-[22px] bg-rose-50 p-4 ring-1 ring-rose-100/50">
                  <p className="font-bold text-rose-700">End-Stage Renal Disease (ESRD)</p>
                  <p className="mt-1 text-xs font-medium text-rose-600/80">Diagnosed: Oct 2024</p>
                </div>
                <div className="rounded-[22px] bg-rose-50 p-4 ring-1 ring-rose-100/50">
                  <p className="font-bold text-rose-700">Hypertension</p>
                  <p className="mt-1 text-xs font-medium text-rose-600/80">Diagnosed: Jan 2023</p>
                </div>
                <div className="rounded-[22px] bg-amber-50 p-4 ring-1 ring-amber-100/50">
                  <p className="font-bold text-amber-700">Bronchitis</p>
                  <p className="mt-1 text-xs font-medium text-amber-600/80">Diagnosed: Mar 2021</p>
                </div>
              </div>
              <button
                onClick={() => setIsDiagnosisOpen(false)}
                className="mt-6 w-full rounded-[20px] bg-slate-100 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

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
  const [activeDate, setActiveDate] = useState("May 8");
  const [selectedMonth, setSelectedMonth] = useState("May 2026");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const months = ["April 2026", "May 2026", "June 2026"];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartScroll = useRef(0);
  const isDragging = useRef(false);

  const defaultMandatory = [
    { id: "1", name: "Amlodipine", dosage: "5mg", intakes: { morning: false, afternoon: false, evening: false } },
    { id: "2", name: "Captopril", dosage: "25mg", intakes: { morning: false, afternoon: false, evening: false } },
    { id: "3", name: "Metformin", dosage: "500mg", intakes: { morning: false, afternoon: false, evening: false } },
  ];

  const defaultOptional = [
    { id: "o1", name: "Dopamet", dosage: "250mg", taken: false },
  ];

  const [medsStatus, setMedsStatus] = useState<Record<string, { mandatory: any[], optional: any[] }>>({
    "May 8": {
      mandatory: [
        { id: "1", name: "Amlodipine", dosage: "5mg", intakes: { morning: true, afternoon: false, evening: false } },
        { id: "2", name: "Captopril", dosage: "25mg", intakes: { morning: false, afternoon: false, evening: false } },
        { id: "3", name: "Metformin", dosage: "500mg", intakes: { morning: true, afternoon: true, evening: false } },
      ],
      optional: [
        { id: "o1", name: "Dopamet", dosage: "250mg", taken: false },
      ]
    }
  });

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

  function toggleMandatoryMed(id: string, time: "morning" | "afternoon" | "evening") {
    setMedsStatus(prev => {
      const currentDayData = prev[activeDate] || { mandatory: defaultMandatory, optional: defaultOptional };
      const updatedList = currentDayData.mandatory.map((m: any) => 
        m.id === id ? { 
          ...m, 
          intakes: {
            ...m.intakes,
            [time]: !m.intakes[time]
          } 
        } : m
      );
      return {
        ...prev,
        [activeDate]: { ...currentDayData, mandatory: updatedList }
      };
    });
  }

  function toggleOptionalMed(id: string) {
    setMedsStatus(prev => {
      const currentDayData = prev[activeDate] || { mandatory: defaultMandatory, optional: defaultOptional };
      const updatedList = currentDayData.optional.map((m: any) => 
        m.id === id ? { ...m, taken: !m.taken } : m
      );
      return {
        ...prev,
        [activeDate]: { ...currentDayData, optional: updatedList }
      };
    });
  }

  function getDaysForMonth(monthStr: string) {
    const [monthName, year] = monthStr.split(" ");
    const monthMap: Record<string, number> = { April: 3, May: 4, June: 5 };
    const monthIdx = monthMap[monthName] ?? 4;
    const numDays = new Date(parseInt(year), monthIdx + 1, 0).getDate();
    return Array.from({ length: numDays }, (_, i) => {
      const d = new Date(parseInt(year), monthIdx, i + 1);
      return {
        day: String(i + 1),
        label: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()],
        id: `${monthName.substring(0, 3)} ${i + 1}`
      };
    });
  }

  const scheduleDays = getDaysForMonth(selectedMonth);
  const currentDayData = medsStatus[activeDate] || { mandatory: defaultMandatory, optional: defaultOptional };
  const currentMeds = currentDayData.mandatory;
  const optionalMeds = currentDayData.optional;

  return (
    <div className="pb-28 min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-20 h-96 w-96 rounded-full bg-rose-200/40 mix-blend-multiply blur-3xl" />
        <div className="absolute top-40 -left-20 h-[500px] w-[500px] rounded-full bg-cyan-200/30 mix-blend-multiply blur-3xl" />
      </div>

      <Header title="Medication" />

      <div className="relative px-6 pt-0 space-y-7 z-10">
        <div className="relative z-20">
          <h2 className="text-[36px] font-bold text-slate-100 mix-blend-difference tracking-tight drop-shadow-sm">Schedule</h2>
          <div className="relative mt-5 inline-block">
            <button 
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-slate-100/80 active:scale-95 transition-all"
            >
              <span className="text-[13px] font-bold text-slate-800">{selectedMonth}</span>
              <div className={cn("text-slate-400 transition-transform duration-300", isMonthOpen ? "rotate-90" : "-rotate-90")}>
                <Icon name="arrow-left" className="h-3 w-3" />
              </div>
            </button>
            {isMonthOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_20px_40px_rgba(15,23,42,0.18)] ring-1 ring-slate-100 backdrop-blur-xl animate-in fade-in zoom-in duration-200 z-50">
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      setIsMonthOpen(false);
                      setActiveDate(`${m.substring(0, 3)} 1`);
                      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                    }}
                    className={cn("w-full rounded-xl px-4 py-2 text-left text-[13px] font-bold transition-colors", selectedMonth === m ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:bg-slate-50")}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="mt-6 flex gap-3 overflow-x-auto [scrollbar-width:none] touch-pan-x pb-4 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={(e) => handlePointerDown(e.touches[0]?.clientX ?? 0)}
          onTouchMove={(e) => handlePointerMove(e.touches[0]?.clientX ?? 0)}
          onTouchEnd={stopDragging}
        >
          {scheduleDays.map(item => {
            const isActive = item.id === activeDate;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveDate(item.id)}
                className={cn("flex shrink-0 flex-col items-center justify-center rounded-full h-20 w-[60px] transition-all", isActive ? "bg-white shadow-[0_8px_16px_rgba(0,0,0,0.06)] ring-1 ring-slate-100/50 scale-105" : "bg-white/50 text-slate-600 hover:bg-white/70 backdrop-blur-sm")}
              >
                <span className={cn("text-xl font-bold tracking-tight", isActive ? "text-cyan-600" : "text-slate-600")}>{item.day}</span>
                <span className={cn("mt-1 text-[11px] font-bold uppercase", isActive ? "text-slate-500" : "text-slate-500")}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <section className="rounded-[36px] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.06)] ring-1 ring-white/80">
          <div className="space-y-1 min-h-[220px] mt-2">
            {currentMeds.length > 0 ? (
              currentMeds.map((med: any) => {
                const isAllTaken = med.intakes.morning && med.intakes.afternoon && med.intakes.evening;
                return (
                  <div key={med.id} className="flex items-center justify-between rounded-[28px] p-3 transition-colors hover:bg-slate-50 border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={cn("flex h-[52px] w-[52px] items-center justify-center rounded-[20px] transition-colors", isAllTaken ? "bg-emerald-50 text-emerald-500" : "bg-cyan-50 text-cyan-600")}>
                        <Icon name="pill" className="h-6 w-6" />
                      </div>
                      <div>
                        <p className={cn("text-[16px] font-bold tracking-tight", isAllTaken ? "text-slate-500 line-through" : "text-slate-800")}>{med.name}</p>
                        <p className="text-[11px] font-bold text-slate-400 lowercase tracking-wide">{med.dosage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(["morning", "afternoon", "evening"] as const).map((time) => {
                        const isTaken = med.intakes[time];
                        const colors = {
                          morning: isTaken ? "bg-amber-400 text-white shadow-sm shadow-amber-400/30" : "bg-amber-50 text-amber-500",
                          afternoon: isTaken ? "bg-orange-400 text-white shadow-sm shadow-orange-400/30" : "bg-orange-50 text-orange-500",
                          evening: isTaken ? "bg-indigo-400 text-white shadow-sm shadow-indigo-400/30" : "bg-indigo-50 text-indigo-500"
                        };
                        const icons = {
                          morning: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
                              <path d="M12 2v6"/><path d="M8.4 10.4 6.9 8.9"/><path d="M15.6 10.4l1.5-1.5"/><path d="M22 22H2"/><path d="M8 6l4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>
                            </svg>
                          ),
                          afternoon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px]">
                              <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m19.07 19.07-1.41-1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                            </svg>
                          ),
                          evening: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px]">
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                          )
                        };
                        return (
                          <button
                            key={time}
                            onClick={() => toggleMandatoryMed(med.id, time)}
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-all active:scale-95",
                              colors[time]
                            )}
                          >
                            {isTaken ? (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="4">
                                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              icons[time]
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center pt-10 text-center opacity-40">
                <div className="mb-3 rounded-full bg-slate-100 p-4">
                  <Icon name="pill" className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-600">No intake scheduled</p>
                <p className="text-xs text-slate-400">Rest up and stay hydrated!</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[36px] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.06)] ring-1 ring-white/80">
          <h3 className="px-4 py-2 text-sm font-bold text-slate-400 uppercase tracking-wider">Optional Medication</h3>
          <div className="space-y-1">
            {optionalMeds.map((med: any) => (
              <div key={med.id} className="flex items-center justify-between rounded-[28px] p-3 transition-colors hover:bg-slate-50 border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-[52px] w-[52px] items-center justify-center rounded-[20px] transition-colors", med.taken ? "bg-emerald-50 text-emerald-500" : "bg-slate-50 text-slate-400")}>
                    <Icon name="pill" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className={cn("text-[16px] font-bold tracking-tight", med.taken ? "text-slate-400 line-through" : "text-slate-800")}>{med.name}</p>
                    <p className="text-[11px] font-bold text-slate-400 lowercase tracking-wide">{med.dosage}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleOptionalMed(med.id)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold transition-all active:scale-95",
                    med.taken ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  )}
                >
                  {med.taken ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    "+"
                  )}
                </button>
              </div>
            ))}
          </div>

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
        <LabResultsChart />
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
