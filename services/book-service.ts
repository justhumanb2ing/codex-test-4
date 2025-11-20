import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient, getSupabaseClientStatus } from '@/services/supabase-service';
import type { Book } from '@/types/entities';

const FALLBACK_BOOKS: Book[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Server-first Next.js',
    author: 'Codex Team',
    publishedAt: '2024-01-01',
    summary: 'SSR 중심의 Next.js 16 App Router 샘플 데이터입니다.',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Supabase Local Handbook',
    author: 'Local Dev',
    publishedAt: '2024-02-15',
    summary: '로컬에서 Supabase를 띄우는 방법과 RLS 정책 설계를 안내합니다.',
    createdAt: '2024-02-15T00:00:00Z'
  }
];

export type BookListSource = 'supabase' | 'fallback';

export interface BookListResponse {
  source: BookListSource;
  items: Book[];
  error?: PostgrestError | null;
}

/**
 * Supabase에서 최신 책 목록을 가져오거나, 환경 변수가 없을 때는 안전한 샘플 데이터를 반환합니다.
 * Server Component에서 직접 호출할 수 있도록 설계되었으며, 데이터 페칭과 표현을 한 곳에 유지합니다.
 */
export async function fetchRecentBooks(params?: { limit?: number; client?: SupabaseClient }): Promise<BookListResponse> {
  const limit = params?.limit ?? 4;
  const status = getSupabaseClientStatus();

  if (status === 'missing-env') {
    return {
      source: 'fallback',
      items: FALLBACK_BOOKS.slice(0, limit)
    };
  }

  const client = params?.client ?? getSupabaseClient();
  const { data, error } = await client
    .from('books')
    .select('id, user_id, title, author, summary, published_at, created_at')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    return {
      source: 'fallback',
      items: FALLBACK_BOOKS.slice(0, limit),
      error
    };
  }

  return {
    source: 'supabase',
    items: (data ?? []).map((row) => ({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      author: row.author,
      summary: row.summary,
      publishedAt: row.published_at,
      createdAt: row.created_at
    }))
  };
}
