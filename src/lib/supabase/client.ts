import { createClient } from '@supabase/supabase-js';
import { clientEnv } from '../dotenv/env';

const supabaseUrl = clientEnv.supabase.url;
const supabaseAnonKey = clientEnv.supabase.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});

export const BUCKET_NAME = 'cloudkeep';