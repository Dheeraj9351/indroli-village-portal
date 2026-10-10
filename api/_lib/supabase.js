import { createClient } from '@supabase/supabase-js';

let cachedClient = null;

/**
 * Returns a configured Supabase client instance using server-side environment variables.
 * Uses Service Role Key if available to allow administrative database operations,
 * falling back to the anon key.
 */
export function getSupabaseClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                      process.env.SUPABASE_ANON_KEY || 
                      process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    return cachedClient;
  } catch (err) {
    console.error('[Supabase Init Error]', err);
    return null;
  }
}
