import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { filtrarPorCapacidad } from '../src/recursos/js/funciones.js';

const cabanas = JSON.parse(readFileSync('src/datos/cabanas.json', 'utf-8'));

function obtenerNombres(listaCabanas) {
    return listaCabanas.map((cabana) => cabana.nombre);
}

test('El JSON tiene las 6 unidades con sus datos', () => {
    assert.strictEqual(cabanas.length, 6);

    cabanas.forEach((cabana) => {
        assert.ok(cabana.id);
        assert.ok(cabana.nombre);
        assert.ok(cabana.imagen);
        assert.strictEqual(typeof cabana.capacidad, 'number');
    });
});

test('Ver todas devuelve las 6 unidades', () => {
    const resultado = filtrarPorCapacidad(cabanas, 'todas');
    assert.strictEqual(resultado.length, 6);
});

test('Para 2 personas muestra solo la cabaña Individual y el Quincho', () => {
    const resultado = filtrarPorCapacidad(cabanas, '2');
    assert.deepStrictEqual(obtenerNombres(resultado), ['Cabaña Individual', 'Quincho y Pileta']);
});

test('Para 5 personas muestra solo la cabaña con Cochera y el Quincho', () => {
    const resultado = filtrarPorCapacidad(cabanas, '5');
    assert.deepStrictEqual(obtenerNombres(resultado), ['Cabaña con Cochera', 'Quincho y Pileta']);
});
