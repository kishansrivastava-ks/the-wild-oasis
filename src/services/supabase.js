import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vihllwgsvptoqsjyvlyx.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaGxsd2dzdnB0b3Fzanl2bHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODczNTksImV4cCI6MjAyMTY2MzM1OX0.ferjP9yNiyhjqUO8HHqgm23jUnbU0htTQ2NYKgZ--cw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
