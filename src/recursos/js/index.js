import { obtenerCabanas } from './datos.js';
import { renderizarCabanas } from './funciones.js';
import { inicializarMenu } from './menu.js';
import { inicializarFiltro } from './filtro.js';
import { inicializarModales, activarBotonesModal } from './modales.js';
import { inicializarGaleria } from './galeria.js';
import { inicializarFormulario } from './formulario.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorCabanas = document.getElementById('contenedor-cabanas');

    inicializarMenu();
    inicializarModales();
    inicializarGaleria();
    inicializarFormulario();

    if (contenedorCabanas) {
        const cabanas = await obtenerCabanas();

        if (cabanas.length === 0) {
            contenedorCabanas.innerHTML = '<p>No se pudo cargar el catálogo de cabañas. Intentá nuevamente más tarde.</p>';
            return;
        }

        renderizarCabanas(contenedorCabanas, cabanas);
        activarBotonesModal(contenedorCabanas, cabanas);
        inicializarFiltro(contenedorCabanas, cabanas);
    }
});