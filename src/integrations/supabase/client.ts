// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wpjqdwcrypdlvpedndnx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwanFkd2NyeXBkbHZwZWRuZG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDE4NzQsImV4cCI6MjA2NDYxNzg3NH0.4poev4-NgKale70YIzUTpPjT6wYzCuYgMgpN9C756AQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);