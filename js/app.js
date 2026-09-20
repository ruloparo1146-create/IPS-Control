// js/app.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Iniciando app...');

  // PequeÃ±a espera para asegurar que la librerÃ­a de Supabase se cargÃ³
  let intentos = 0;
  while (typeof window.supabase === 'undefined' || !window.supabase.from) {
    await new Promise(r => setTimeout(r, 200));
    intentos++;
    if (intentos > 10) {
      document.getElementById('tabla-cobros').innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error: La librerÃ­a de Supabase no cargÃ³.</td></tr>`;
      return;
    }
  }

  console.log('Supabase listo, haciendo consulta...');
  const app = document.getElementById('tabla-cobros');
  
  try {
    // 1. Obtener los datos de Supabase (Ãºltimos 10)
    const { data, error } = await window.supabase
      .from('cobros')
      .select('*')
      .order('recibo_vision_fecha', { ascending: false })
      .limit(10);

    if (error) throw error;

    // 2. Si no hay datos
    if (!data || data.length === 0) {
      app.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay datos visibles.</td></tr>`;
      document.getElementById('ultimo-cobro').innerText = "--";
      document.getElementById('total-historico').innerText = "--";
      return;
    }

    // 3. Llenar la tabla
    let html = '';
    let totalEuros = 0;
    
    data.forEach(cobro => {
      if (cobro.monto_euros) totalEuros += parseFloat(cobro.monto_euros);
      
      html += `
        <tr>
          <td>${cobro.recibo_vision_fecha || '-'}</td>
          <td>$${cobro.monto_pesos ? cobro.monto_pesos.toLocaleString('es-AR') : '-'}</td>
          <td>â‚¬${cobro.monto_euros ? cobro.monto_euros.toLocaleString('es-ES') : '-'}</td>
          <td><small>${cobro.banco_detalle || '-'}</small></td>
        </tr>
      `;
    });
    app.innerHTML = html;

    // 4. Actualizar los resÃºmenes
    const ultimo = data[0];
    document.getElementById('ultimo-cobro').innerText = `â‚¬${ultimo.monto_euros ? ultimo.monto_euros.toLocaleString('es-ES') : 'Pendiente'}`;
    document.getElementById('total-historico').innerText = `â‚¬${totalEuros.toLocaleString('es-ES')}`;

    // 5. LÃ³gica de Supervivencia
    const panel = document.getElementById('panel-supervivencia');
    panel.className = 'card mb-4 shadow-sm border-success';
    panel.querySelector('.card-body').classList.add('bg-success', 'text-white');
    document.getElementById('supervivencia-texto').innerHTML = `
      <strong>Â¡Todo en orden!</strong><br>
      PrÃ³ximo trÃ¡mite estimado: <strong>${new Date(new Date(ultimo.recibo_vision_fecha).setMonth(new Date(ultimo.recibo_vision_fecha).getMonth() + 5)).toLocaleDateString('es-ES')}</strong>
    `;

  } catch (error) {
    console.error('Error:', error);
    app.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar datos: ${error.message}</td></tr>`;
  }
});
