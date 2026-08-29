'use client';

import React, { useState } from 'react';
import {
  Network,
  Globe,
  Server,
  Building2,
  FileCheck2,
  Smartphone,
  UserCheck,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Info,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { GraphNode, IdentityGraphData, NodeStatus } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface IdentityGraphProps {
  data: IdentityGraphData;
}

export function IdentityGraph({ data }: IdentityGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(data.nodes[0] || null);

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'USER_URL':
        return Globe;
      case 'DOMAIN':
        return Server;
      case 'WEBSITE':
        return Globe;
      case 'CLAIMED_LENDER':
        return Building2;
      case 'REGULATED_ENTITY':
        return FileCheck2;
      case 'APP':
        return Smartphone;
      case 'DEVELOPER':
      default:
        return UserCheck;
    }
  };

  const getStatusStyles = (status: NodeStatus) => {
    switch (status) {
      case 'VERIFIED':
        return {
          color: 'emerald',
          border: 'border-emerald-500/50 hover:border-emerald-400',
          bg: 'bg-emerald-950/30',
          text: 'text-emerald-300',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
          dot: 'bg-emerald-400',
        };
      case 'PARTIAL':
        return {
          color: 'amber',
          border: 'border-amber-500/50 hover:border-amber-400',
          bg: 'bg-amber-950/30',
          text: 'text-amber-300',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
          dot: 'bg-amber-400',
        };
      case 'UNVERIFIED':
        return {
          color: 'orange',
          border: 'border-orange-500/50 hover:border-orange-400',
          bg: 'bg-orange-950/30',
          text: 'text-orange-300',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          glow: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
          dot: 'bg-orange-400',
        };
      case 'CONFLICT':
      default:
        return {
          color: 'rose',
          border: 'border-rose-500/60 hover:border-rose-400',
          bg: 'bg-rose-950/30',
          text: 'text-rose-300',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          glow: 'shadow-[0_0_25px_rgba(244,63,94,0.3)]',
          dot: 'bg-rose-400',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Key Principle Callout Banner */}
      <div className="rounded-2xl bg-cyan-950/30 border border-cyan-500/40 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-sm">
        <div className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 p-2 shrink-0 text-cyan-300">
          <Network className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-cyan-200">
            Core Graph Principle: Association vs Existence
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            &ldquo;An entity existing in regulatory data does <strong>NOT</strong> automatically mean that this website is associated with that entity.&rdquo;
          </p>
        </div>
      </div>

      {/* Graph Visual Container */}
      <div className="relative rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-8 overflow-hidden backdrop-blur-xl">
        
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

        {/* Legend */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-slate-400">GRAPH STATUS:</span>
            <p className="text-sm font-bold text-white mt-0.5">{data.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> VERIFIED</span>
            <span className="flex items-center gap-1.5 text-amber-400"><span className="h-2 w-2 rounded-full bg-amber-400" /> PARTIAL</span>
            <span className="flex items-center gap-1.5 text-orange-400"><span className="h-2 w-2 rounded-full bg-orange-400" /> UNVERIFIED</span>
            <span className="flex items-center gap-1.5 text-rose-400"><span className="h-2 w-2 rounded-full bg-rose-400" /> CONFLICT</span>
          </div>
        </div>

        {/* Node Pipeline Flow Visualizer */}
        <div className="relative z-10 py-8 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-2 px-2">
            {data.nodes.map((node, index) => {
              const styles = getStatusStyles(node.status);
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode?.id === node.id;
              const hasNext = index < data.nodes.length - 1;
              const edge = data.edges[index];

              return (
                <React.Fragment key={node.id}>
                  {/* Node Card */}
                  <button
                    type="button"
                    onClick={() => setSelectedNode(node)}
                    className={cn(
                      'group relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-200 w-32 shrink-0 cursor-pointer',
                      styles.bg,
                      styles.border,
                      isSelected ? cn(styles.glow, 'ring-2 ring-cyan-400 scale-105') : 'opacity-90 hover:opacity-100 hover:scale-102'
                    )}
                  >
                    {/* Status dot */}
                    <span className={cn('absolute top-2 right-2 h-2 w-2 rounded-full', styles.dot)} />

                    {/* Icon */}
                    <div className={cn('p-2.5 rounded-xl border mb-2 group-hover:scale-110 transition-transform', styles.badge)}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Type & Label */}
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      {node.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-white line-clamp-2 mt-0.5 max-w-[110px]">
                      {node.label}
                    </span>

                    {/* Status Badge */}
                    <span className={cn('mt-2 text-[9px] font-mono font-bold uppercase rounded-md px-1.5 py-0.5 border', styles.badge)}>
                      {node.status}
                    </span>
                  </button>

                  {/* Connecting Edge Connector */}
                  {hasNext && (
                    <div className="flex flex-col items-center justify-center shrink-0 px-1">
                      <div className="text-[9px] font-mono text-slate-400 mb-1">
                        {edge?.label || 'Link'}
                      </div>
                      <div className="flex items-center">
                        <div className={cn(
                          'h-0.5 w-6 sm:w-10 transition-all',
                          edge?.status === 'VERIFIED' ? 'bg-emerald-500' :
                          edge?.status === 'PARTIAL' ? 'bg-amber-500' :
                          edge?.status === 'UNVERIFIED' ? 'bg-orange-500' : 'bg-rose-500'
                        )} />
                        <ArrowRight className={cn(
                          'h-3.5 w-3.5 -ml-1',
                          edge?.status === 'VERIFIED' ? 'text-emerald-400' :
                          edge?.status === 'PARTIAL' ? 'text-amber-400' :
                          edge?.status === 'UNVERIFIED' ? 'text-orange-400' : 'text-rose-400'
                        )} />
                      </div>
                      {edge?.status === 'CONFLICT' && (
                        <span className="text-[8px] font-mono text-rose-400 mt-1 font-bold">MISMATCH</span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Detail Panel */}
        {selectedNode && (
          <div className="relative z-10 mt-6 rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-xl border', getStatusStyles(selectedNode.status).badge)}>
                  <Network className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                    INSPECTED IDENTITY GRAPH NODE: {selectedNode.type}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {selectedNode.label} {selectedNode.sublabel && <span className="text-slate-400 font-normal">({selectedNode.sublabel})</span>}
                  </h4>
                </div>
              </div>
              <span className={cn('text-xs font-mono font-bold uppercase rounded-md px-2.5 py-1 border', getStatusStyles(selectedNode.status).badge)}>
                STATUS: {selectedNode.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedNode.details}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
