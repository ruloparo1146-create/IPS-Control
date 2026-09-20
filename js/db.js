// js/db.js
const SUPABASE_URL = 'https://mlyswiebbatzllqlrctw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IQ8Ckee41etEJRT_c8weCg_YSEcR2sp';

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
script.onload = () => {
  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('Supabase conectado correctamente');
  window.dispatchEvent(new Event('supabase-ready'));
};
document.head.appendChild(script);
