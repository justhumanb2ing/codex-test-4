import Link from 'next/link';
import { clsx } from 'clsx';

export function SiteHeader() {
  return (
    <header className={clsx('border-b border-slate-800/70 bg-slate-900/60 backdrop-blur')}> 
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 ring-2 ring-emerald-500/50" aria-hidden />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Supabase</p>
            <h1 className="text-lg font-semibold text-white">Local Playground</h1>
          </div>
        </div>
        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href="#setup" className="hover:text-white">로컬 준비</Link>
          <Link href="#schemas" className="hover:text-white">모델</Link>
          <Link href="#services" className="hover:text-white">서비스</Link>
        </nav>
      </div>
    </header>
  );
}
