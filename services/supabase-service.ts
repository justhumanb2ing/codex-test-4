import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/config/supabase';

/**
 * Supabase 서비스 클라이언트를 생성하거나 재사용하여 서버 로직에서 일관된 연결을 제공합니다.
 */
export function getSupabaseClient(): SupabaseClient {
  return supabaseClient;
}

/**
 * 서버 전용 권한이 필요한 경우 서비스 롤 키를 사용해 별도의 클라이언트를 만듭니다.
 */
export function getServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_LOCAL_URL ?? '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'local-service-role';

  return createClient(url || 'http://localhost:54321', serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

/**
 * 현재 환경 변수 상태를 기준으로 클라이언트 준비 여부를 문자열로 반환합니다.
 */
export function getSupabaseClientStatus(): 'ready' | 'missing-env' {
  if ((process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_LOCAL_URL) && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return 'ready';
  }

  return 'missing-env';
}
