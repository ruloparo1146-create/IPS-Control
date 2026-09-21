// js/supabase.js
// Esperar a que la librerÃ­a CDN estÃ© cargada
window.addEventListener('load', () => {
  if (typeof supabase === 'undefined') {
    console.error('Error: La librerÃ­a de Supabase no se cargÃ³.');
    return;
  }
  // Crear el cliente global
  window.db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('Supabase conectado correctamente');
  window.dispatchEvent(new Event('supabase-ready'));
});
