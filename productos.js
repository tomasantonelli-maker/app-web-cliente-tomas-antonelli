// 1. Datos de conexión
const SUPABASE_URL = 'https://saxszmuidhmepoaqhskp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YA9GWZowJ-b62BwvArhq2Q_FQYyEv6p';

// 2. Convierte "Memorias RAM" en "memorias-ram", que es el formato que
//    usan los filtros de index.html y las reglas de style.css.
function aSlug(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

// 3. Función que dibuja los productos en la página
function mostrarProductos(productos) {
  const lista = document.getElementById('lista-productos');

  if (!lista) {
    return;
  }

  // La lista del HTML está vacía: Supabase es la única fuente de productos.
  lista.textContent = '';

  productos.forEach(function (p) {
    if (!p.categoria) {
      console.warn('El producto "' + p.nombre + '" no tiene categoría: no se va a poder filtrar.');
    }

    const li = document.createElement('li');
    li.dataset.categoria = aSlug(p.categoria);

    if (p.subcategoria) {
      li.dataset.subcategoria = aSlug(p.subcategoria);
    }

    if (p.destacado) {
      li.dataset.destacado = '';
    }

    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    const enlace = document.createElement('a');
    enlace.href = p.ancla ? 'producto.html#' + p.ancla : 'producto.html';
    enlace.textContent = p.nombre;
    h2.append(enlace);

    const img = document.createElement('img');
    img.src = p.imagen || 'logo.png';
    img.alt = p.nombre;
    img.loading = 'lazy';

    const precio = document.createElement('p');
    precio.textContent = 'Precio: $' + Number(p.precio).toLocaleString('es-AR');

    const agregar = document.createElement('a');
    agregar.href = '#';
    agregar.textContent = 'Agregar al carrito';

    article.append(h2, img);

    if (p.descripcion) {
      const descripcion = document.createElement('p');
      descripcion.textContent = p.descripcion;
      article.append(descripcion);
    }

    article.append(precio, agregar);
    li.append(article);
    lista.append(li);
  });

  // Avisa al buscador y a los filtros de index.html que ya hay productos nuevos.
  document.dispatchEvent(new CustomEvent('productos:cargados'));
}

// 4. Función que pide los productos a Supabase
async function cargarProductos() {
  try {
    const response = await fetch(SUPABASE_URL + '/rest/v1/productos?select=*&order=id.asc', {
      headers: {
        apikey: SUPABASE_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Error ' + response.status);
    }

    const datos = await response.json();
    mostrarProductos(datos);
  } catch (error) {
    console.error('No se pudieron cargar los productos:', error);
  }
}

// 5. Ejecutar
cargarProductos();
