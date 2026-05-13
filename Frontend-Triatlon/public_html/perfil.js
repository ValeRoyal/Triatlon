document.addEventListener('DOMContentLoaded', function () {
  // --- Botones de navegación ---
  // Botón "Cerrar sesión": borra el localStorage y vuelve al index
  document.getElementById('btn-cerrar-sesion').onclick = () => {
    localStorage.clear();
    window.location.href = 'index.html';
  };

  // Botón "Inicio": lleva a la página principal/home del usuario
  document.getElementById('btn-home').onclick = () => {
    window.location.href = 'home.html';
  };

  // --- Cargar datos de usuario desde localStorage ---
  let usuario = {};
  try {
    // Se intenta leer y parsear el objeto de usuario guardado
    usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  } catch {
    // Si hay error en formato, establece usuario como vacío
    usuario = {};
  }

  // Si el usuario no tiene el campo 'identificacion', se forzará a loguearse
  if (!usuario.identificacion) {
    window.location.href = 'inicio-sesion.html';
    return;
  }

  // --- Mostrar todos los datos del usuario en los campos correspondientes ---
  document.getElementById('foto-usuario').src                = usuario.urlFoto || '';
  document.getElementById('nombre-text').textContent         = usuario.nombre || '';
  document.getElementById('identificacion-text').textContent = usuario.identificacion || '';
  document.getElementById('categoria-text').textContent      = usuario.categoria || '';
  document.getElementById('correo-text').textContent         = usuario.correo || '';
  document.getElementById('especialidad-text').textContent   = usuario.especialidad || '';
  document.getElementById('genero-text').textContent         = usuario.genero || '';
  document.getElementById('cross-text').textContent          = usuario.modalidadCross || '';
  document.getElementById('fecha-text').textContent          = usuario.fechaNacimiento || '';

  // --- Función editable en línea para los campos modificables ---
  /**
   * campo:     solo para diferenciar qué tipo de input usar (input/text o select)
   * patchUrl:  endpoint PATCH del atributo a modificar
   * propiedad: nombre del atributo en el objeto usuario/localStorage
   * labelId:   id del span que contiene el valor mostrado
   * btnId:     id del botón de editar/guardar correspondiente
   */
 function activarEdicion(campo, patchUrl, propiedad, labelId, btnId) {
    const valorSpan = document.getElementById(labelId);
    const boton = document.getElementById(btnId);
    const valorOriginal = valorSpan.textContent;
    let input;

    if (campo === 'categoria') {
        const categorias = [
            "Pre-Benjamín","Benjamín","Alevín","Infantil","Cadetes","Juvenil","Júnior",
            "Sub-23","Absoluta","Veterano 1","Veterano 2","Veterano 3"
        ];
        input = document.createElement('select');
        input.className = 'input-inline';
        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            if (cat === valorOriginal) opt.selected = true;
            input.appendChild(opt);
        });
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-inline';
        input.value = valorOriginal;
    }

    valorSpan.replaceWith(input);
    boton.textContent = "Guardar";

    boton.onclick = async function () {
        const nuevoValor = input.value.trim();
        if (!nuevoValor) return;

        let payload = {};
        payload[propiedad] = nuevoValor;

        try {
            const peticion = await fetch(patchUrl, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const mensajeDiv = document.getElementById('mensaje-perfil');

            if (peticion.ok) {
                usuario[propiedad] = nuevoValor;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                input.replaceWith(valorSpan);
                valorSpan.textContent = nuevoValor;
                boton.textContent = "Editar";
                mensajeDiv.textContent = "¡Campo actualizado!";
                mensajeDiv.className = "mensaje-exito";
                boton.onclick = () => activarEdicion(campo, patchUrl, propiedad, labelId, btnId);
            } else {
                mensajeDiv.textContent = "No se pudo actualizar. Intenta más tarde.";
                mensajeDiv.className = "mensaje-error";
            }
        } catch (error) {
            const mensajeDiv = document.getElementById('mensaje-perfil');
            mensajeDiv.textContent = "Error de red al actualizar.";
            mensajeDiv.className = "mensaje-error";
        }
    };
}

// Conexión de botones con sus URLs y propiedades
document.getElementById("btn-editar-nombre").onclick = () =>
    activarEdicion('nombre', `http://localhost:9000/api/triatleta/actualizarnombre/${usuario.id}/nombre`, 'nombre', 'nombre-text', 'btn-editar-nombre');

document.getElementById("btn-editar-identificacion").onclick = () =>
    activarEdicion('identificacion', `http://localhost:9000/api/triatleta/actualizaridentificacion/${usuario.id}/identificacion`, 'identificacion', 'identificacion-text', 'btn-editar-identificacion');

document.getElementById("btn-editar-categoria").onclick = () =>
    activarEdicion('categoria', `http://localhost:9000/api/triatleta/actualizarcategoria/${usuario.id}/categoria`, 'categoria', 'categoria-text', 'btn-editar-categoria');



let updateTodo = async () => {
    let id = usuario.id;
    let triatleta = {};

    triatleta.nombre = document.getElementById("nombreTriatleta").value;
    triatleta.identificacion = document.getElementById("identificacionTriatleta").value;
    triatleta.categoria = document.getElementById("categoriaTriatleta").value;
    triatleta.modalidadCross = document.getElementById("crossTriatleta").value;
    triatleta.especialidad = document.getElementById("especialidadTriatleta").value;
    triatleta.correo = document.getElementById("correoTriatleta").value;
    triatleta.activo = document.getElementById("activoTriatleta").value;

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta/actualizar/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(triatleta)
        });

        const mensajeDiv = document.getElementById('mensaje-perfil');
        if (peticion.ok) {
            mensajeDiv.textContent = "¡Datos actualizados!";
            mensajeDiv.className = "mensaje-exito";
        } else {
            mensajeDiv.textContent = "Error al actualizar.";
            mensajeDiv.className = "mensaje-error";
        }
    } catch (error) {
        document.getElementById('mensaje-perfil').textContent = "Error de red al actualizar.";
        document.getElementById('mensaje-perfil').className = "mensaje-error";
    }
}

  // --- Rutas PATCH ---
  const API_ROUT = 'http://localhost:9000/api/triatleta';
  // ID único del usuario con el cual se hacen operaciones de backend
  const idUsuario = usuario.id;

  // Asigna la función editar/guardar a cada campo editable
  document.getElementById('btn-editar-nombre').onclick = () =>
    activarEdicion('nombre', `${API_ROUT}/actualizarnombre/${idUsuario}/nombre`, 'nombre', 'nombre-text', 'btn-editar-nombre');

  document.getElementById('btn-editar-identificacion').onclick = () =>
    activarEdicion('identificacion', `${API_ROUT}/actualizaridentificacion/${idUsuario}/identificacion`, 'identificacion', 'identificacion-text', 'btn-editar-identificacion');

  document.getElementById('btn-editar-categoria').onclick = () =>
    activarEdicion('categoria', `${API_ROUT}/actualizarcategoria/${idUsuario}/categoria`, 'categoria', 'categoria-text', 'btn-editar-categoria');

  // --- Botón eliminar cuenta ---
  document.getElementById('btn-eliminar-cuenta').onclick = async function () {
    if (!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta/borrartriatleta/" + usuario.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (peticion.ok) {
            localStorage.clear();
            window.location.href = 'index.html';
        } else {
            document.getElementById('mensaje-perfil').textContent = "No se pudo eliminar la cuenta.";
            document.getElementById('mensaje-perfil').className = "mensaje-error";
        }
    } catch (error) {
        document.getElementById('mensaje-perfil').textContent = "Error de red al eliminar.";
        document.getElementById('mensaje-perfil').className = "mensaje-error";
    }
};

});