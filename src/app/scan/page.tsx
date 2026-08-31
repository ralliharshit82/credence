'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ScanRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      router.replace(`/?url=${encodeURIComponent(url)}`);
    } else {
      router.replace('/');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-blue-600 animate-pulse">
      Redirecting to Credence Home Scanner...
    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">
          Loading Credence Scanner...
        </div>
      }
    >
      <ScanRedirectContent />
    </Suspense>
  );
}
