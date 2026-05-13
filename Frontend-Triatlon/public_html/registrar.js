document.addEventListener('DOMContentLoaded', function() {
  // ...botones index y login igual...

  const form = document.getElementById('form-registro');
  const mensaje = document.getElementById('mensaje-registro');

  // Carrete imágenes especialidad (puedes usar otras imágenes si prefieres)
  const especialidades = [
    { nombre: "Distancia SuperSprint", url: "https://cdn.shopify.com/s/files/1/2010/1493/files/image1_7f20f3e7-0046-4e87-b9d3-7b5c8010037b_480x480.png?v=1734345982" },
    { nombre: "Distancia Sprint", url: "https://bettertriathlete.com/wp-content/uploads/2021/01/how-long-sprint-triathlon-distances-lengths-miles-kilometers-1024x641.jpg.webp" },
    { nombre: "Distancia Olímpica", url: "https://bettertriathlete.com/wp-content/uploads/2021/01/how-long-olympic-triathlon-distances-lengths-miles-kilometers-1024x641.jpg.webp" },
    { nombre: "Media Distancia", url: "https://triathlonbuzz.com/wp-content/uploads/2023/09/image-11.png.webp" },
    { nombre: "Larga Distancia", url: "https://triathlonbuzz.com/wp-content/uploads/2023/09/image-10.png.webp" },
    { nombre: "Ultraman", url: "https://triathlonbuzz.com/wp-content/uploads/2023/09/image-8.png.webp" }
  ];
  const carrete = document.getElementById('carrete-especialidad');
  let especialidadSeleccionada = "";

  especialidades.forEach(item => {
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.nombre;
    img.title = item.nombre;
    img.className = 'img-especialidad';
    img.onclick = () => {
      // quitar selección a todas
      document.querySelectorAll('.img-especialidad').forEach(i => i.classList.remove('seleccionada'));
      img.classList.add('seleccionada');
      especialidadSeleccionada = item.nombre;
      // Actualizar el select también
      document.getElementById('especialidad').value = item.nombre;
    };
    carrete.appendChild(img);
  });

  // Si se selecciona en el select, también resalta imagen
  document.getElementById('especialidad').addEventListener('change', function() {
    especialidadSeleccionada = this.value;
    document.querySelectorAll('.img-especialidad').forEach(i => {
      i.classList.toggle('seleccionada', i.title === this.value);
    });
  });

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
      genero: document.getElementById('genero').value, // viene de select
      categoria: document.getElementById('categoria').value,
      especialidad: especialidadSeleccionada || document.getElementById('especialidad').value,
      modalidadCross: document.getElementById('modalidad-cross').value,
      activo: true
    };

    // FOTO: obtén la imagen del file input y sube a tu backend o a cloud (No soportado directamente a tu back, pero te muestro como obtener el base64)
    const archivoFoto = document.getElementById('foto').files[0];
    if (archivoFoto) {
      // Si solo quieres filename, usa: archivoFoto.name
      // Si tu back acepta el archivo como base64 (generalmente no), usa:
      const toBase64 = file => new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });
      const base64 = await toBase64(archivoFoto);
      triatleta.urlFoto = base64;
    } else {
      triatleta.urlFoto = ""; // O como lo acepte tu API
    }

    // Validación simple extra (ya los selects no pueden ir vacíos)
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