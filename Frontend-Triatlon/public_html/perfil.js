document.addEventListener('DOMContentLoaded', function () {
  // Botones de navegación
  document.getElementById('btn-cerrar-sesion').onclick = () => {
    localStorage.clear();
    window.location.href = 'index.html';
  };
  document.getElementById('btn-home').onclick = () => {
    window.location.href = 'home.html';
  };

  // Cargar datos del usuario del localStorage
  let usuario = {};
  try {
    usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  } catch {
    usuario = {};
  }

  // Si no hay usuario, redirige
  if (!usuario.identificacion) {
    window.location.href = 'inicio-sesion.html';
    return;
  }

  // Mostrar los datos en su sitio
  document.getElementById('foto-usuario').src              = usuario.urlFoto || '';
  document.getElementById('nombre-text').textContent        = usuario.nombre || '';
  document.getElementById('identificacion-text').textContent= usuario.identificacion || '';
  document.getElementById('categoria-text').textContent     = usuario.categoria || '';
  document.getElementById('correo-text').textContent        = usuario.correo || '';
  document.getElementById('especialidad-text').textContent  = usuario.especialidad || '';
  document.getElementById('genero-text').textContent        = usuario.genero || '';
  document.getElementById('cross-text').textContent         = usuario.modalidadCross || '';
  document.getElementById('fecha-text').textContent         = usuario.fechaNacimiento || '';

  // --- Edición en línea ---
  // Utiliza función genérica para los tres campos
  function activarEdicion(campo, patchUrl, propiedad, labelId, btnId) {
    const valorSpan = document.getElementById(labelId);
    const boton     = document.getElementById(btnId);

    // Guarda el valor original por si el usuario cancela edición
    const valorOriginal = valorSpan.textContent;

    // Cambiar el span por un input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-inline';
    input.value = valorOriginal;
    valorSpan.replaceWith(input);

    // Cambia el botón a "Guardar"
    boton.textContent = "Guardar";
    boton.onclick = async function () {
      const nuevoValor = input.value.trim();
      if (!nuevoValor) return;

      let payload = {};
      payload[propiedad] = nuevoValor;

      // PATCH al backend
      try {
        const resp = await fetch(patchUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const mensajeDiv = document.getElementById('mensaje-perfil');
        if (resp.ok) {
          // Actualiza localStorage también
          usuario[propiedad] = nuevoValor;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          // Vuelve a mostrar en span
          input.replaceWith(valorSpan);
          valorSpan.textContent = nuevoValor;
          boton.textContent = "Editar";
          mensajeDiv.textContent = "¡Campo actualizado!";
          mensajeDiv.className = "mensaje-exito";
          // Vuelve al modo editar
          boton.onclick = () => activarEdicion(campo, patchUrl, propiedad, labelId, btnId);
        } else {
          mensajeDiv.textContent = "No se pudo actualizar. Intenta más tarde.";
          mensajeDiv.className = "mensaje-error";
        }
      } catch {
        document.getElementById('mensaje-perfil').textContent =
          "Error de red al actualizar.";
        document.getElementById('mensaje-perfil').className = "mensaje-error";
      }
    };
  }

  // Define las urls de patch (ajústalas si tu back es distinto)
  const API_ROUT = 'http://localhost:9000/api/triatleta';
  const idUsuario = usuario.id;

  document.getElementById('btn-editar-nombre').onclick = () =>
    activarEdicion('nombre', `${API_ROUT}/actualizarnombre/${idUsuario}/nombre`, 'nombre', 'nombre-text', 'btn-editar-nombre');

  document.getElementById('btn-editar-identificacion').onclick = () =>
    activarEdicion('identificacion', `${API_ROUT}/actualizaridentificacion/${idUsuario}/identificacion`, 'identificacion', 'identificacion-text', 'btn-editar-identificacion');

  document.getElementById('btn-editar-categoria').onclick = () =>
    activarEdicion('categoria', `${API_ROUT}/actualizarcategoria/${idUsuario}/categoria`, 'categoria', 'categoria-text', 'btn-editar-categoria');

  // Botón eliminar cuenta
  document.getElementById('btn-eliminar-cuenta').onclick = async function () {
    if (!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    try {
      const resp = await fetch(`${API_ROUT}/borrartriatleta/${idUsuario}`, {
        method: 'DELETE'
      });
      if (resp.ok) {
        localStorage.clear();
        window.location.href = 'index.html';
      } else {
        document.getElementById('mensaje-perfil').textContent = "No se pudo eliminar la cuenta.";
        document.getElementById('mensaje-perfil').className = "mensaje-error";
      }
    } catch {
      document.getElementById('mensaje-perfil').textContent = "Error de red al eliminar.";
      document.getElementById('mensaje-perfil').className = "mensaje-error";
    }
  };

});