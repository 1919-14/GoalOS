import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.REACT_APP_SUPABASE_URL  || '';
const supabaseKey  = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Returns null when env vars are not set (falls back to localStorage in the UI)
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;
