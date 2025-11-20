import { SiteHeader } from '@/components/site-header';
import { getSupabaseClientStatus } from '@/services/supabase-service';

export default async function HomePage() {
  const status = getSupabaseClientStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <SiteHeader />
      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        <section className="space-y-4" id="setup">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Setup</p>
          <h2 className="text-3xl font-semibold text-white">Next.js 16 + Supabase 로컬 개발</h2>
          <p className="text-slate-300">
            App Router 기반으로 Supabase 로컬 환경을 바로 시도할 수 있도록 초기 설정을 준비했습니다.
            환경 변수만 채우고 <code className="rounded bg-slate-800 px-2 py-1">npm run dev</code>로 시작하세요.
          </p>
          <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-emerald-500/10 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">환경 변수</h3>
              <ul className="list-disc space-y-2 pl-5 text-slate-200">
                <li><code>NEXT_PUBLIC_SUPABASE_URL</code>과 <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>를 로컬 Supabase 프로젝트에 맞게 입력</li>
                <li><code>SUPABASE_SERVICE_ROLE_KEY</code>를 서버 전용 작업용으로 지정</li>
                <li><code>SUPABASE_LOCAL_URL</code>로 Docker 기반 로컬 인스턴스를 명시</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">현재 상태</h3>
              <p className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-200">
                Supabase 클라이언트 준비 상태: <span className="font-semibold text-emerald-300">{status}</span>
              </p>
              <p className="text-xs text-slate-400">환경 변수가 비어 있어도 오류를 던지지 않고, 로컬 개발 단계에서 안전하게 동작합니다.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6" id="schemas">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Entities</p>
            <h2 className="text-2xl font-semibold text-white">콘텐츠 모델</h2>
          </div>
          <dl className="grid gap-4 md:grid-cols-2">
            {["Book", "Emotion", "Keyword", "Achievement"].map((model) => (
              <div key={model} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <dt className="text-lg font-semibold text-white">{model}</dt>
                <dd className="mt-2 text-sm text-slate-300">docs/models.md 에 정의된 JSON Schema를 기준으로 타입과 규칙을 공유합니다.</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6" id="services">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Services</p>
            <h2 className="text-2xl font-semibold text-white">Supabase 서비스 계층</h2>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>공용 Supabase 클라이언트를 <code className="rounded bg-slate-800 px-2 py-1">config/supabase.ts</code>에서 생성하고,</p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1">services/supabase-service.ts</code>에서 안전한 서버 호출 헬퍼를 제공합니다.
            </p>
            <p>테스트는 <code className="rounded bg-slate-800 px-2 py-1">tests</code> 디렉토리에서 확인할 수 있습니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
