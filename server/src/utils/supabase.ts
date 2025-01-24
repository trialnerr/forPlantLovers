import { createClient } from "@supabase/supabase-js";
import { env } from "process"; 
import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
let supabase; 
if (supabaseUrl && supabaseKey) {
  supabase: SupabaseClient = createClient(supabaseKey, supabaseUrl);
}

export default supabase;
