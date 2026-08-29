import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUrl(url: string): string {
  try {
    const cleaned = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
    return cleaned.toLowerCase();
  } catch {
    return url;
  }
}

export function getVerdictTheme(verdict: 'LOW_RISK' | 'CAUTION' | 'HIGH_RISK') {
  switch (verdict) {
    case 'LOW_RISK':
      return {
        label: 'VERIFIED / LOWER RISK',
        shortLabel: 'VERIFIED',
        color: 'emerald',
        textClass: 'text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        glowClass: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
        indicatorColor: '#10b981',
      };
    case 'CAUTION':
      return {
        label: 'UNVERIFIED / CAUTION',
        shortLabel: 'CAUTION',
        color: 'amber',
        textClass: 'text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        glowClass: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
        indicatorColor: '#f59e0b',
      };
    case 'HIGH_RISK':
    default:
      return {
        label: 'HIGH RISK / SUSPICIOUS',
        shortLabel: 'HIGH RISK',
        color: 'red',
        textClass: 'text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        glowClass: 'shadow-[0_0_30px_rgba(244,63,94,0.25)]',
        indicatorColor: '#f43f5e',
      };
  }
}
