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
    <header className="sticky top-0 z-50 w-full border-b border-blue-200/90 bg-[#e6f1fe]/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            CREDEN<span className="text-blue-600">CE</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-xl px-4 py-1.5 text-sm font-bold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-blue-100/80'
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
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/90 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm">
              <span className={cn('h-2 w-2 rounded-full', isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500')} />
              <span>{isOnline ? 'Trust Engine Active' : 'Backend Offline'}</span>
            </div>
          )}
        </div>

      </div>

      {/* Mobile nav bottom bar */}
      <div className="flex md:hidden border-t border-blue-200 bg-[#eaf2fe] px-3 py-2 justify-around text-xs font-bold">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1 rounded-lg transition-colors',
                isActive ? 'text-white bg-blue-600 shadow-sm' : 'text-slate-700'
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
