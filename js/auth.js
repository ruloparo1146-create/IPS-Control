// js/auth.js

// FunciÃ³n para iniciar sesiÃ³n
async function iniciarSesion(email, password) {
  const { data, error } = await window.db.auth.signInWithPassword({ email, password });
  return { data, error };
}

// FunciÃ³n para cerrar sesiÃ³n
async function cerrarSesion() {
  await window.db.auth.signOut();
  window.location.href = 'login.html';
}

// FunciÃ³n para verificar si hay sesiÃ³n activa
async function verificarSesion() {
  const { data: { session } } = await window.db.auth.getSession();
  return session;
}
