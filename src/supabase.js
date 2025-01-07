import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정
const supabaseUrl = `${process.env.REACT_APP_SUPABASE_URL}`; // 대시보드에서 복사한 URL
const supabaseKey = `${process.env.REACT_APP_SUPABASE_API_KEY}`; // 대시보드에서 복사한 API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
