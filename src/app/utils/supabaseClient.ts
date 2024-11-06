import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tgaonwuoxeptkrveauru.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYW9ud3VveGVwdGtydmVhdXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MzU0NzAsImV4cCI6MjA0NjQxMTQ3MH0.SIsTsocK2LDd8QEjeaW439_QKP9-v_DZMT8Eibp7ARg";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
