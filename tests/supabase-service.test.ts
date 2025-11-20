import { getSupabaseClientStatus } from '@/services/supabase-service';

describe('getSupabaseClientStatus', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns missing-env when variables are absent', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_LOCAL_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(getSupabaseClientStatus()).toBe('missing-env');
  });

  it('returns ready when required variables exist', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon';

    expect(getSupabaseClientStatus()).toBe('ready');
  });
});
