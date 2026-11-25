const CORREO_DESTINO = 'mirkogordillo31@gmail.com';

export function inicializarFormulario() {
    const formulario = document.getElementById('formulario-contacto');

    if (!formulario) return;

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const mensaje = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');

    const campos = [nombre, email, telefono, mensaje];

    campos.forEach((campo) => {
        campo.addEventListener('input', () => {
            document.getElementById('error-' + campo.id).textContent = '';
            mensajeExito.textContent = '';
        });
    });

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        let formularioValido = true;

        campos.forEach((campo) => {
            document.getElementById('error-' + campo.id).textContent = '';
        });

        if (!nombre.value.trim().includes(' ')) {
            document.getElementById('error-nombre').textContent = 'Ingresá tu nombre y apellido.';
            formularioValido = false;
        }

        if (!email.value.includes('@') || !email.value.includes('.')) {
            document.getElementById('error-email').textContent = 'Ingresá un correo electrónico válido.';
            formularioValido = false;
        }

        if (telefono.value.length < 8 || telefono.value.length > 15) {
            document.getElementById('error-telefono').textContent = 'El teléfono debe tener entre 8 y 15 números.';
            formularioValido = false;
        }

        if (mensaje.value.trim().length < 10) {
            document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 10 caracteres.';
            formularioValido = false;
        }

        if (!formularioValido) return;

        const datosConsulta = {
            nombre: nombre.value.trim(),
            email: email.value.trim(),
            telefono: telefono.value,
            mensaje: mensaje.value.trim(),
            _subject: 'Nueva consulta desde la web de Cabañas Suyana'
        };

        mensajeExito.textContent = 'Enviando consulta...';

        try {
            const respuesta = await fetch('https://formsubmit.co/ajax/' + CORREO_DESTINO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(datosConsulta)
            });

            if (!respuesta.ok) {
                throw new Error('No se pudo enviar la consulta');
            }

            mensajeExito.textContent = '¡Gracias, ' + datosConsulta.nombre + '! Recibimos tu consulta y te responderemos a la brevedad.';
            formulario.reset();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            mensajeExito.textContent = 'No se pudo enviar la consulta. Intentá nuevamente o escribinos por WhatsApp.';
        }
    });
}