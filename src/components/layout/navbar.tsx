'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Scan, LayoutDashboard, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { healthCheck } from '@/lib/api';

export function Navbar() {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      try {
        const res = await healthCheck();
        if (isMounted) setIsOnline(res.status === 'ok');
      } catch {
        if (isMounted) setIsOnline(false);
      }
    };
    check();
    const interval = setInterval(check, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/scan', label: 'Scanner' },
    { href: '/dashboard', label: 'Threat Intel' },
    { href: '/how-it-works', label: 'Methodology' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#090d16]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            LOAN<span className="text-blue-400">SHIELD</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side status & action */}
        <div className="flex items-center gap-3">
          {/* Subtle status dot */}
          {isOnline !== null && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span className={cn('h-1.5 w-1.5 rounded-full', isOnline ? 'bg-emerald-500' : 'bg-rose-500')} />
              <span>{isOnline ? 'Engine Online' : 'Backend Offline'}</span>
            </div>
          )}

          <Link
            href="/scan"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors"
          >
            <Scan className="h-3.5 w-3.5" />
            <span>Scan URL</span>
          </Link>
        </div>

      </div>

      {/* Mobile nav bottom bar */}
      <div className="flex md:hidden border-t border-slate-800/60 bg-[#090d16] px-2 py-1.5 justify-around text-xs">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-2.5 py-1 rounded',
                isActive ? 'text-blue-400 font-semibold' : 'text-slate-400'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
