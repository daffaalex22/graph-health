"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabId = "home" | "scan" | "reading" | "insight" | "trends";

type IconName =
  | "home"
  | "trend"
  | "plus"
  | "pill"
  | "clock"
  | "bell"
  | "camera"
  | "upload"
  | "manual"
  | "spark"
  | "doctor"
  | "alert"
  | "drop"
  | "glucose"
  | "arrow-left";

const tabs: Array<{ id: TabId; label: string; icon: IconName; href: string }> = [
  { id: "home", label: "Home", icon: "home", href: "/" },
  { id: "trends", label: "Trends", icon: "trend", href: "/trends" },
  { id: "scan", label: "Add", icon: "plus", href: "/scan" },
  { id: "insight", label: "Medication", icon: "pill", href: "/insight" },
  { id: "reading", label: "History", icon: "clock", href: "/history" },
];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M6.5 9.5V20h11V9.5" />
        </svg>
      );
    case "trend":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 18.5h16" />
          <path d="m6.5 15.5 4-4 3 2.5L18 8.5" />
          <path d="M15.5 8.5H18V11" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9.3 5.3a4.3 4.3 0 0 1 6.1 0l3.3 3.3a4.3 4.3 0 0 1 0 6.1l-4 4a4.3 4.3 0 0 1-6.1 0l-3.3-3.3a4.3 4.3 0 0 1 0-6.1l4-4Z" />
          <path d="m9 15 6-6" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6.5 16.5h11l-1.3-2.2V10a4.2 4.2 0 1 0-8.4 0v4.3l-1.3 2.2Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="6.5" width="17" height="12" rx="3.5" />
          <path d="M8 6.5 9.7 4.5h4.6L16 6.5" />
          <circle cx="12" cy="12.5" r="3.2" />
        </svg>
      );
    case "upload":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 15V5" />
          <path d="m8.5 8.5 3.5-3.5 3.5 3.5" />
          <path d="M5 16.5v1A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-1" />
        </svg>
      );
    case "manual":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        </svg>
      );
    case "doctor":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="3" />
          <path d="M5.5 19c1.6-2.8 4-4.2 6.5-4.2S16.9 16.2 18.5 19" />
        </svg>
      );
    case "alert":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4 3.8 18h16.4L12 4Z" />
          <path d="M12 9v4.5M12 17h.01" />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4c3.5 4 5.5 6.8 5.5 9.3A5.5 5.5 0 0 1 6.5 13.3C6.5 10.8 8.5 8 12 4Z" />
        </svg>
      );
    case "glucose":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 12h10" />
          <path d="M12 7v10" />
          <circle cx="12" cy="12" r="7.5" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m14.5 6.5-5 5 5 5" />
        </svg>
      );
    default:
      return null;
  }
}

export function StatusBadge({
  children,
  tone = "cyan",
}: {
  children: React.ReactNode;
  tone?: "cyan" | "rose" | "amber" | "emerald";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
        tone === "cyan" && "bg-cyan-50 text-cyan-700",
        tone === "rose" && "bg-rose-50 text-rose-600",
        tone === "amber" && "bg-amber-50 text-amber-700",
        tone === "emerald" && "bg-emerald-50 text-emerald-700",
      )}
    >
      {children}
    </span>
  );
}

export function Header({ title, showBack = false }: { title: string; showBack?: boolean }) {
  return (
    <header className="sticky top-0 z-40 mb-4 px-4 pt-3">
      <div className="flex items-center justify-between rounded-[24px] bg-white/84 px-4 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.07)] ring-1 ring-white/85 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm ring-1 ring-slate-100"
            >
              <Icon name="arrow-left" className="h-5 w-5" />
            </Link>
          ) : (
            <div className="overflow-hidden rounded-full shadow-sm ring-1 ring-[#a31b39]/15">
              <Image
                src="/logo.png"
                alt="GraphHealth logo"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
                priority
              />
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-slate-900">{title}</p>
            <p className="text-xs text-slate-500">GraphHealth</p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-rose-500 shadow-sm ring-1 ring-slate-100">
          <Icon name="bell" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] rounded-t-[28px] bg-white/96 px-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(15,23,42,0.08)] ring-1 ring-white/80 backdrop-blur">
      <div className="grid grid-cols-5 items-end gap-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const isCenter = tab.id === "scan";

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 text-[11px] font-medium",
                isActive ? "text-cyan-700" : "text-slate-400",
              )}
            >
              {isCenter ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-[0_18px_34px_rgba(8,145,178,0.3)]">
                  <Icon name="plus" className="h-6 w-6" />
                </span>
              ) : (
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full", isActive && "bg-cyan-50")}>
                  <Icon name={tab.icon} className="h-5 w-5" />
                </span>
              )}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#a31b39_0%,#b33a59_12%,#f3edf6_36%,#eff7fc_100%)]">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0)_34%)] shadow-[0_0_0_1px_rgba(255,255,255,0.55)]">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />
          <div className="relative min-h-screen pb-32">{children}</div>
          <BottomNav />
        </div>
      </div>
    </main>
  );
}
