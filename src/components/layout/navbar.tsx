'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
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
    { href: '/dashboard', label: 'Threat Intel' },
    { href: '/how-it-works', label: 'Methodology' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100/80 border border-blue-300 text-blue-600 shadow-sm">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            CREDEN<span className="text-blue-600">CE</span>
          </span>
        </Link>

        {/* Navigation Items (Single Home Scanner Architecture) */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side status indicator */}
        <div className="flex items-center gap-3">
          {isOnline !== null && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className={cn('h-2 w-2 rounded-full', isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500')} />
              <span>{isOnline ? 'Trust Engine Active' : 'Backend Offline'}</span>
            </div>
          )}
        </div>

      </div>

      {/* Mobile nav bottom bar */}
      <div className="flex md:hidden border-t border-slate-200 bg-white px-3 py-2 justify-around text-xs font-medium">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1 rounded-md transition-colors',
                isActive ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-600'
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
