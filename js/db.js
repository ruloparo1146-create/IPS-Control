// js/db.js
const SUPABASE_URL = 'https://myswiebbatzllqrctw.supabase.co';
const SUPABASE_KEY = 'PEGA_AQUI_TU_CLAVE_COMPLETA_QUE_EMPIEZA_CON_sb_publishable_';

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
script.onload = () => {
  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('Supabase conectado correctamente');
  window.dispatchEvent(new Event('supabase-ready'));
};
document.head.appendChild(script);
