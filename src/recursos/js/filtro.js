import { renderizarCabanas, filtrarPorCapacidad } from './funciones.js';
import { activarBotonesModal } from './modales.js';

export function inicializarFiltro(contenedorCabanas, cabanas) {
    const filtroCustom = document.getElementById('filtro-custom');
    const filtroSeleccionado = document.getElementById('filtro-seleccionado');
    const opcionesFiltro = document.querySelectorAll('.filtro-custom__opcion');

    if (filtroSeleccionado && filtroCustom) {

        function aplicarFiltro(opcion) {
            filtroSeleccionado.textContent = opcion.textContent;
            opcionesFiltro.forEach(o => o.classList.remove('seleccionado'));
            opcion.classList.add('seleccionado');
            filtroCustom.classList.remove('activo');

            const valorFiltro = opcion.dataset.value;
            const cabanasFiltradas = filtrarPorCapacidad(cabanas, valorFiltro);

            renderizarCabanas(contenedorCabanas, cabanasFiltradas);
            activarBotonesModal(contenedorCabanas, cabanas);

            localStorage.setItem('filtroCapacidad', valorFiltro);
        }

        filtroSeleccionado.addEventListener('click', () => {
            filtroCustom.classList.toggle('activo');
        });

        opcionesFiltro.forEach((opcion) => {
            opcion.addEventListener('click', () => {
                aplicarFiltro(opcion);
            });
        });

        document.addEventListener('click', (evento) => {
            if (!filtroCustom.contains(evento.target)) filtroCustom.classList.remove('activo');
        });

        const filtroGuardado = localStorage.getItem('filtroCapacidad');

        if (filtroGuardado) {
            opcionesFiltro.forEach((opcion) => {
                if (opcion.dataset.value === filtroGuardado) {
                    aplicarFiltro(opcion);
                }
            });
        }
    }
}