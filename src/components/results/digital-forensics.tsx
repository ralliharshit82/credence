'use client';

import React from 'react';
import {
  Calendar,
  Lock,
  Globe2,
  Building,
  Mail,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  Server,
  UserX,
  Phone
} from 'lucide-react';
import { DigitalForensicsData } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface DigitalForensicsProps {
  forensics: DigitalForensicsData;
}

export function DigitalForensics({ forensics }: DigitalForensicsProps) {
  const isDomainRisky = forensics.domainAge.days < 30;
  const isFreeMail = forensics.contactInfo.emailType === 'FREE_WEBMAIL';
  const hasGrievance = forensics.governance.grievanceOfficerListed;

  return (
    <div className="space-y-6">
      
      {/* 4 Primary Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Domain Age */}
        <div className={cn(
          'rounded-2xl border p-4 backdrop-blur-sm space-y-2',
          isDomainRisky ? 'bg-rose-950/20 border-rose-500/30' : 'bg-slate-900/60 border-slate-800'
        )}>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-cyan-400" /> DOMAIN AGE</span>
            <span className={cn('font-bold', isDomainRisky ? 'text-rose-400' : 'text-emerald-400')}>
              {isDomainRisky ? 'HIGH RISK' : 'ESTABLISHED'}
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            {forensics.domainAge.formatted}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Registered: {forensics.domainAge.registeredDate}
          </div>
        </div>

        {/* SSL / HTTPS */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-cyan-400" /> SSL / TLS</span>
            <span className={cn('font-bold', forensics.ssl.type === 'EV' ? 'text-emerald-400' : 'text-amber-400')}>
              {forensics.ssl.type} CERT
            </span>
          </div>
          <div className="text-xl font-bold text-white truncate">
            {forensics.ssl.issuer}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Expires: {forensics.ssl.expiryDate}
          </div>
        </div>

        {/* Registrar & Privacy */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-cyan-400" /> REGISTRAR</span>
            <span className={cn('font-bold', forensics.registrar.privacyProtected ? 'text-amber-400' : 'text-slate-300')}>
              {forensics.registrar.privacyProtected ? 'PRIVACY GUARD' : 'PUBLIC WHOIS'}
            </span>
          </div>
          <div className="text-xl font-bold text-white truncate">
            {forensics.registrar.name}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Country: {forensics.registrar.country}
          </div>
        </div>

        {/* Grievance & Ombudsman */}
        <div className={cn(
          'rounded-2xl border p-4 backdrop-blur-sm space-y-2',
          hasGrievance ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'
        )}>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-cyan-400" /> GOVERNANCE</span>
            <span className={cn('font-bold', hasGrievance ? 'text-emerald-400' : 'text-rose-400')}>
              {hasGrievance ? 'VERIFIED' : 'MISSING'}
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            {hasGrievance ? 'Grievance Officer' : 'No Redressal'}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            RBI Ombudsman: {forensics.governance.rbiOmbudsmanDetailsListed ? 'Disclosed' : 'Not Listed'}
          </div>
        </div>

      </div>

      {/* Detailed Technical & Forensic Inspection Table */}
      <div className="rounded-2xl bg-[#060a17] border border-slate-800 p-6 space-y-6">
        
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Server className="h-4 w-4 text-cyan-400" />
          <span>Forensic Footprint Breakdown</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Identity & Contact Checks */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Corporate & Contact Identity</h5>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Declared Legal Entity:</span>
                <span className="font-mono text-white text-right font-medium">{forensics.websiteIdentity.legalEntityType || 'Not Listed'}</span>
              </div>

              <div className="flex items-start justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Official Contact Email:</span>
                <div className="text-right">
                  <span className="font-mono text-white block">{forensics.contactInfo.email}</span>
                  {isFreeMail && (
                    <span className="text-[10px] text-rose-400 font-mono font-bold">⚠️ Free Webmail (High Risk for Lenders)</span>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Customer Helpline:</span>
                <span className="font-mono text-white text-right">{forensics.contactInfo.phone}</span>
              </div>

              <div className="flex items-start justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Physical Office Address:</span>
                <div className="text-right max-w-xs">
                  <span className="text-slate-200 block">{forensics.physicalAddress.claimedAddress}</span>
                  {forensics.physicalAddress.isVirtualOfficeOrCoworking && (
                    <span className="text-[10px] text-amber-400 font-mono">⚠️ Virtual / Co-working Office</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Governance & Disclosures */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Regulatory Governance & Policies</h5>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Privacy Policy Status:</span>
                <div className="flex items-center gap-1.5">
                  {forensics.governance.privacyPolicyValidUrl ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono"><CheckCircle2 className="h-3.5 w-3.5" /> Valid Document</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-mono"><XCircle className="h-3.5 w-3.5" /> 404 Dead Link / Missing</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Grievance Redressal Officer:</span>
                <div className="flex items-center gap-1.5">
                  {forensics.governance.grievanceOfficerListed ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono"><CheckCircle2 className="h-3.5 w-3.5" /> Appointed</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-mono"><XCircle className="h-3.5 w-3.5" /> Not Disclosed</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">RBI Ombudsman Escalation Matrix:</span>
                <div className="flex items-center gap-1.5">
                  {forensics.governance.rbiOmbudsmanDetailsListed ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono"><CheckCircle2 className="h-3.5 w-3.5" /> Compliant</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-mono"><XCircle className="h-3.5 w-3.5" /> Missing</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Hosting Infrastructure & Country:</span>
                <span className="font-mono text-slate-200">{forensics.technical.hostingProvider} ({forensics.technical.serverCountry})</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
