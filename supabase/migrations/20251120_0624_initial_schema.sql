-- 초기 콘텐츠 도메인 스키마 및 RLS 정책 생성
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  author text not null,
  summary text,
  published_at date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.emotions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id uuid references public.books (id) on delete cascade,
  label text not null,
  intensity integer not null check (intensity >= 0 and intensity <= 10),
  color_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  value text not null,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.book_keywords (
  book_id uuid not null references public.books (id) on delete cascade,
  keyword_id uuid not null references public.keywords (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (book_id, keyword_id)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  achieved_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.achievement_books (
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (achievement_id, book_id)
);

-- 인덱스 최적화
create index if not exists idx_books_user_id on public.books (user_id);
create index if not exists idx_emotions_user_id on public.emotions (user_id);
create index if not exists idx_emotions_book_id on public.emotions (book_id);
create index if not exists idx_keywords_user_id on public.keywords (user_id);
create index if not exists idx_book_keywords_user_id on public.book_keywords (user_id);
create index if not exists idx_achievements_user_id on public.achievements (user_id);
create index if not exists idx_achievement_books_user_id on public.achievement_books (user_id);

-- RLS 설정
alter table public.books enable row level security;
alter table public.emotions enable row level security;
alter table public.keywords enable row level security;
alter table public.book_keywords enable row level security;
alter table public.achievements enable row level security;
alter table public.achievement_books enable row level security;

-- self-access 정책: user_id 기준
create policy "books_self_access_select" on public.books for select using (auth.uid() = user_id);
create policy "books_self_access_insert" on public.books for insert with check (auth.uid() = user_id);
create policy "books_self_access_update" on public.books for update using (auth.uid() = user_id);
create policy "books_self_access_delete" on public.books for delete using (auth.uid() = user_id);

create policy "emotions_self_access_select" on public.emotions for select using (auth.uid() = user_id);
create policy "emotions_self_access_insert" on public.emotions for insert with check (auth.uid() = user_id);
create policy "emotions_self_access_update" on public.emotions for update using (auth.uid() = user_id);
create policy "emotions_self_access_delete" on public.emotions for delete using (auth.uid() = user_id);

create policy "keywords_self_access_select" on public.keywords for select using (auth.uid() = user_id);
create policy "keywords_self_access_insert" on public.keywords for insert with check (auth.uid() = user_id);
create policy "keywords_self_access_update" on public.keywords for update using (auth.uid() = user_id);
create policy "keywords_self_access_delete" on public.keywords for delete using (auth.uid() = user_id);

create policy "book_keywords_self_access_select" on public.book_keywords for select using (auth.uid() = user_id);
create policy "book_keywords_self_access_insert" on public.book_keywords for insert with check (auth.uid() = user_id);
create policy "book_keywords_self_access_update" on public.book_keywords for update using (auth.uid() = user_id);
create policy "book_keywords_self_access_delete" on public.book_keywords for delete using (auth.uid() = user_id);

create policy "achievements_self_access_select" on public.achievements for select using (auth.uid() = user_id);
create policy "achievements_self_access_insert" on public.achievements for insert with check (auth.uid() = user_id);
create policy "achievements_self_access_update" on public.achievements for update using (auth.uid() = user_id);
create policy "achievements_self_access_delete" on public.achievements for delete using (auth.uid() = user_id);

create policy "achievement_books_self_access_select" on public.achievement_books for select using (auth.uid() = user_id);
create policy "achievement_books_self_access_insert" on public.achievement_books for insert with check (auth.uid() = user_id);
create policy "achievement_books_self_access_update" on public.achievement_books for update using (auth.uid() = user_id);
create policy "achievement_books_self_access_delete" on public.achievement_books for delete using (auth.uid() = user_id);
