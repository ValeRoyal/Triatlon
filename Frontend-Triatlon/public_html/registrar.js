document.addEventListener('DOMContentLoaded', function() {
  // Botones de barra
  const btnIndex = document.getElementById('btn-index');
  const btnInicioSesion = document.getElementById('btn-iniciar-sesion');
  if (btnIndex) {
    btnIndex.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
  if (btnInicioSesion) {
    btnInicioSesion.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'inicio-sesion.html';
    });
  }

  // Manejo de envío del formulario
  const form = document.getElementById('form-registro');
  const mensaje = document.getElementById('mensaje-registro');

  // Cambia la URL a la de tu backend si es diferente
  const API_URL = 'http://localhost:9000/api/triatleta';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    mensaje.textContent = "";

    // Recolecta los valores del formulario
    const triatleta = {
      nombre: document.getElementById('nombre').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      identificacion: document.getElementById('identificacion').value.trim(),
      fechaNacimiento: document.getElementById('fecha-nacimiento').value,
      genero: document.getElementById('genero').value.trim(),
      urlFoto: document.getElementById('foto').value.trim(),
      categoria: document.getElementById('categoria').value.trim(),
      especialidad: document.getElementById('especialidad').value.trim(),
      modalidadCross: document.getElementById('modalidad-cross').value.trim(),
      activo: true
    };

    // Validación simple extra
    for (let key in triatleta) {
      if (!triatleta[key]) {
        mensaje.textContent = "Por favor llene todos los campos.";
        mensaje.style.color = "crimson";
        return;
      }
    }

    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(triatleta)
      });

      if (resp.ok) {
        mensaje.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
        mensaje.style.color = "seagreen";
        // Opcional: redirigir después de unos segundos
        // setTimeout(() => window.location.href="inicio-sesion.html", 2000);
      } else {
        const err = await resp.json().catch(()=>null);
        mensaje.textContent = "Error al registrar: " + (err?.message || "verifica los datos.");
        mensaje.style.color = "crimson";
      }
    } catch (error) {
      mensaje.textContent = "Error de conexión con el servidor.";
      mensaje.style.color = "crimson";
    }
  });
  
});