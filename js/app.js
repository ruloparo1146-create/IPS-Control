window.addEventListener('supabase-ready', async () => {
  document.getElementById('app').innerHTML = `
    <h1>IPS Control</h1>
    <p>Conectando a la base de datos...</p>
  `;

  try {
    const { data, error } = await window.supabase
      .from('cobros')
      .select('*')
      .limit(5);

    if (error) throw error;

    document.getElementById('app').innerHTML = `
      <h1>IPS Control</h1>
      <p style="color:green">âœ… Â¡ConexiÃ³n exitosa!</p>
      <p>Se encontraron registros en la base de datos.</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (error) {
    document.getElementById('app').innerHTML = `
      <h1>IPS Control</h1>
      <p style="color:red">âŒ Error de conexiÃ³n:</p>
      <p>${error.message}</p>
    `;
  }
});
