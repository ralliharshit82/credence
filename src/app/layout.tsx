import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'CREDENCE | Explainable Digital Lender Trust Engine',
  description: 'An explainable trust engine for detecting fraudulent digital lenders - before you trust them.',
  keywords: ['credence loan scanner', 'digital lending scam detector', 'loan fraud detection', 'explainable AI', 'RBI NBFC verification', 'fintech cybersecurity'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased selection:bg-blue-500/20 selection:text-blue-700">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
