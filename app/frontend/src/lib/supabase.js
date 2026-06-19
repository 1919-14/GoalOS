import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY  = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,   // no user auth needed — public form
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] ✅ client initialized');
  } catch (err) {
    console.warn('[Supabase] client init failed — falling back to localStorage:', err.message);
  }
} else {
  console.info('[Supabase] env vars not set — waitlist uses localStorage fallback');
}

export { supabase };
