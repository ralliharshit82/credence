import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'LOANSHIELD | Explainable Digital Lender Trust Engine',
  description: 'Investigate digital lenders across regulatory identity, digital footprint, permissions, claims, and language — and explain the risk.',
  keywords: ['digital lending scam detector', 'loan fraud detection', 'explainable AI', 'RBI NBFC verification', 'fintech cybersecurity'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#040711] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="relative flex min-h-screen flex-col">
          {/* Ambient background glows */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
            <div className="absolute top-[30%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
            <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
          </div>

          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
