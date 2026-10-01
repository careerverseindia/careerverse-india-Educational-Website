import { createClient } from '@supabase/supabase-js';

// Read from Vite environment variables with user-configured production credentials as fallback
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://casdsedbtzcjrchctrpq.supabase.co';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_iRa_6PmAyYPVkHzGeVzqHw_0_UMxwPw';

// Normalize URL to always start with https://
const normalizeUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const supabaseUrl = normalizeUrl(rawUrl);
export const supabaseAnonKey = rawKey ? rawKey.trim() : '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    !supabaseUrl.includes('placeholder') &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

// Singleton Supabase Client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;
