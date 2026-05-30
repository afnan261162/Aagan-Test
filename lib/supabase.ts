/**
 * Supabase client instances.
 *
 *   supabase      — anon/public key, safe for public reads (client or server)
 *   supabaseAdmin — service-role key, server-side writes ONLY, never expose to browser
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? anon;

/** Public anon client — use for SELECT queries */
export const supabase = createClient(url, anon);

/** Service-role admin client — use for INSERT / UPDATE / DELETE (server only) */
export const supabaseAdmin = createClient(url, service);
