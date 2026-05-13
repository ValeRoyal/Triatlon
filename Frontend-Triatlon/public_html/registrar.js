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

  const form = document.getElementById('form-registro');
  const mensaje = document.getElementById('mensaje-registro');

  // Carrete imágenes especialidad
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

  
  document.getElementById('especialidad').addEventListener('change', function() {
    especialidadSeleccionada = this.value;
    document.querySelectorAll('.img-especialidad').forEach(i => {
      i.classList.toggle('seleccionada', i.title === this.value);
    });
  });


  let createTriatleta = async (e) => {
    e.preventDefault();
    const mensaje = document.getElementById("mensaje-registro");
    mensaje.textContent = "";

    let nuevoTriatleta = {};
    nuevoTriatleta.nombre = document.getElementById("nombre").value.trim();
    nuevoTriatleta.identificacion = document.getElementById("identificacion").value.trim();
    nuevoTriatleta.categoria = document.getElementById("categoria").value;
    nuevoTriatleta.genero = document.getElementById("genero").value;
    nuevoTriatleta.fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    nuevoTriatleta.modalidadCross = document.getElementById("modalidad-cross").value;
    nuevoTriatleta.especialidad = especialidadSeleccionada || document.getElementById("especialidad").value;
    nuevoTriatleta.correo = document.getElementById("correo").value.trim();
    nuevoTriatleta.activo = true;

    const archivoFoto = document.getElementById("foto").files[0];
    if (archivoFoto) {
        const toBase64 = file => new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.onerror = rej;
            reader.readAsDataURL(file);
        });
        nuevoTriatleta.urlFoto = await toBase64(archivoFoto);
    }

    const camposObligatorios = [
      "nombre",
      "identificacion",
      "categoria",
      "genero",
      "fechaNacimiento",
      "modalidadCross",
      "especialidad",
      "correo"
    ];

    for (let key of camposObligatorios) {
        if (!nuevoTriatleta[key] && nuevoTriatleta[key] !== false) {
            mensaje.textContent = "Por favor llene todos los campos.";
            mensaje.style.color = "crimson";
            return;
        }
    }

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoTriatleta)
        });

        if (peticion.ok) {
            mensaje.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
            mensaje.style.color = "seagreen";
        } else {
            const err = await peticion.json().catch(() => null);
            mensaje.textContent = "Error al registrar: " + (err?.message || "verifica los datos.");
            mensaje.style.color = "crimson";
        }
    } catch (error) {
        mensaje.textContent = "Error de conexión con el servidor.";
        mensaje.style.color = "crimson";
    }
}

document.getElementById("form-registro").addEventListener("submit", createTriatleta);
});
