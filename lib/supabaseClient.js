import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xaqlurvsposvkzbvmllg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcWx1cnZzcG9zdmt6YnZtbGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzI2NzcsImV4cCI6MjA1NTQ0ODY3N30.K0WdN0mhXDEsl_acjSeqbPyjdRxZCUhTY6XbDCRiKOQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
