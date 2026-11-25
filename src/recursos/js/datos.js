export async function obtenerCabanas() {
    try {
        const respuesta = await fetch('src/datos/cabanas.json');

        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo de cabañas');
        }

        const cabanas = await respuesta.json();
        return cabanas;
    } catch (error) {
        console.error('Error al obtener las cabañas:', error);
        return [];
    }
}