import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Supabase Local Sandbox',
  description: 'Next.js App Router project configured for local Supabase development',
  metadataBase: new URL('http://localhost:3000')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
