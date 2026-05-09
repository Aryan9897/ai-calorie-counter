import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { SupportedStorage } from "@supabase/supabase-js";
import type { Database } from "@calorie/types";

declare const process: { env: Record<string, string | undefined> };

let _client: SupabaseClient<Database> | null = null;

export function initSupabase(storage?: SupportedStorage) {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;
  if (!url || !key) {
    throw new Error(
      "EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY must be set in .env.local"
    );
  }
  _client = createClient<Database>(url, key, {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  return _client;
}

export function getSupabase(): SupabaseClient<Database> {
  if (!_client) throw new Error("Call initSupabase() before using any service");
  return _client;
}
