import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_LOCAL_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseClient = createClient(supabaseUrl || 'http://localhost:54321', supabaseAnonKey || 'local-anon-key', {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});
