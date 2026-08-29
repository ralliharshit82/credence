'use client';

import React from 'react';
import { Smartphone, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Users, MessageSquare, MapPin, Camera, FolderOpen, PhoneCall } from 'lucide-react';
import { PermissionItem } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface PermissionTableProps {
  permissions: PermissionItem[];
}

export function PermissionTable({ permissions }: PermissionTableProps) {
  const getPermissionIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('contact')) return Users;
    if (lower.includes('sms')) return MessageSquare;
    if (lower.includes('location')) return MapPin;
    if (lower.includes('camera')) return Camera;
    if (lower.includes('storage') || lower.includes('photo')) return FolderOpen;
    return PhoneCall;
  };

  const getRiskBadge = (level: PermissionItem['riskLevel']) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
      case 'HIGH':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  const getNecessityBadge = (necessity: PermissionItem['expectedNecessity']) => {
    switch (necessity) {
      case 'PROHIBITED':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      case 'UNNECESSARY':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      case 'OPTIONAL':
        return 'text-blue-400 bg-blue-950/40 border-blue-500/30';
      case 'ESSENTIAL':
      default:
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-4">
      {/* Informative Header */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Android APK & Mobile Permission Forensics
            </h4>
            <p className="text-xs text-slate-400">
              Evaluated against Central Bank Fair Lending & Privacy directives.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Prohibited by RBI:</span>
          <span className="rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 font-bold">
            Contacts, SMS, Media
          </span>
        </div>
      </div>

      {/* Permissions Table / Card List */}
      <div className="space-y-3">
        {permissions.map((perm, idx) => {
          const Icon = getPermissionIcon(perm.name);
          const isDanger = perm.requested && (perm.riskLevel === 'CRITICAL' || perm.riskLevel === 'HIGH');

          return (
            <div
              key={idx}
              className={cn(
                'rounded-2xl border p-4 sm:p-5 transition-all backdrop-blur-sm space-y-3',
                isDanger
                  ? 'bg-rose-950/15 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                  : 'bg-slate-900/40 border-slate-800'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Permission title & icon */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2 rounded-xl border shrink-0',
                    perm.requested ? (isDanger ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-800 text-slate-200 border-slate-700') : 'bg-slate-900 text-slate-400 border-slate-800'
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{perm.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 font-normal">({perm.code})</span>
                    </h5>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-mono font-bold border',
                    perm.requested
                      ? (isDanger ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40')
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  )}>
                    {perm.requested ? (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>REQUESTED IN APK</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>NOT REQUESTED</span>
                      </>
                    )}
                  </span>

                  <span className={cn('rounded-md px-2.5 py-1 text-xs font-mono font-bold border', getNecessityBadge(perm.expectedNecessity))}>
                    {perm.expectedNecessity}
                  </span>

                  <span className={cn('rounded-md px-2.5 py-1 text-xs font-mono font-bold border', getRiskBadge(perm.riskLevel))}>
                    {perm.riskLevel} RISK
                  </span>
                </div>
              </div>

              {/* Explanation of risk */}
              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/60">
                <strong className="text-slate-400 font-mono">Risk Vector:</strong> {perm.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
