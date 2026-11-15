// 1. Datos de conexión
const SUPABASE_URL = 'https://saxszmuidhmepoaqhskp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YA9GWZowJ-b62BwvArhq2Q_FQYyEv6p';

// 2. Función que pide los productos a Supabase
async function cargarProductos() {
  try {
    const response = await fetch(SUPABASE_URL + '/rest/v1/productos?select=*', {
      headers: {
        apikey: SUPABASE_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Error ' + response.status);
    }

    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.error('No se pudieron cargar los productos:', error);
  }
}

// 3. Ejecutar la función
cargarProductos();