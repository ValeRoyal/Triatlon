document.addEventListener('DOMContentLoaded', function () {
   const btnIndex = document.getElementById('btn-index');
  const btnRegistro = document.getElementById('btn-registrarse');
    const form = document.getElementById('form-login');
  const inputIdentificacion = document.getElementById('identificacion-usuario');
  const mensaje = document.getElementById('mensaje-login');
 

  
  const API_URL = 'http://localhost:9000/api/triatleta/identificacion/';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    mensaje.textContent = ''; // Limpia mensajes previos

    const identificacion = inputIdentificacion.value.trim();

    if (!identificacion) {
      mensaje.textContent = 'Por favor, escribe tu identificación.';
      return;
    }

    try {
      const resp = await fetch(API_URL + encodeURIComponent(identificacion), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
      const datos = await resp.json();
      localStorage.setItem('usuario', JSON.stringify(datos));
        // Usuario encontrado: redirigir a home.html
        window.location.href = 'home.html';
      } else {
        // Usuario no encontrado: mostrar mensaje de error
        mensaje.textContent = 'Ups... Este usuario no se encuentra registrado.';
      }
    } catch (err) {
      mensaje.textContent = 'Error de conexión con el servidor.';
    }
  });

  function animarYRedirigir(boton, destino) {
    if (!boton) return;
    boton.classList.remove('boton-animado');
    void boton.offsetWidth;
    boton.classList.add('boton-animado');
    setTimeout(function () {
      window.location.href = destino;
    }, 280);
  }

  if (btnIndex) {
    btnIndex.addEventListener('click', function (e) {
      e.preventDefault();
      animarYRedirigir(btnIndex, 'index.html');
    });
  }
  if (btnRegistro) {
    btnRegistro.addEventListener('click', function (e) {
      e.preventDefault();
      animarYRedirigir(btnRegistro, 'registrar.html');
    });
  }
});
