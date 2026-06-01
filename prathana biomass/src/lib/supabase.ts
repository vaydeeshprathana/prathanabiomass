import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type InquiryStatus = 'new' | 'read' | 'replied';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  quantity_tonnes: number | null;
  status: InquiryStatus;
  created_at: string;
}
