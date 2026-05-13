document.addEventListener('DOMContentLoaded', function () {
    // Navegación
    document.getElementById('btn-cerrar-sesion').onclick = () => window.location.href = 'index.html';
    document.getElementById('btn-perfil').onclick = () => window.location.href = 'perfil.html';

    // Datos del usuario logueado
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    document.getElementById('nombre-usuario').textContent = usuario.nombre || "Usuario";
    document.getElementById('foto-usuario').src = usuario.urlFoto || "https://via.placeholder.com/160";



    // Campos a mostrar en la tabla (sin id, identificacion, fechaNacimiento)
    const camposMostrar = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'correo', label: 'Correo' },
        { key: 'categoria', label: 'Categoría' },
        { key: 'genero', label: 'Género' },
        { key: 'especialidad', label: 'Especialidad' },
        { key: 'modalidadCross', label: '¿Cross?' },
        { key: 'activo', label: 'Activo' },
        { key: 'urlFoto', label: 'Foto' }
    ];

    // Función general para renderizar tabla de usuarios
    function renderTabla(destino, datos) {
        if (!datos || datos.length === 0) {
            destino.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }
        const header = camposMostrar
            .map(col => `<th>${col.label}</th>`).join('');
        const rows = datos.map(p =>
            '<tr>' +
            camposMostrar.map(col => col.key === 'urlFoto'
                ? `<td><img class="img-fila-tabla" src="${p.urlFoto}" alt="foto"></td>`
                : `<td>${p[col.key]}</td>`
            ).join('') +
            '</tr>'
        ).join('');
        destino.innerHTML = `<table class='resultado-tabla'><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
    }

    // Buscar por género
    let consultarPorGenero = async (e) => {
    e.preventDefault();
    let genero = document.getElementById("genero-select").value;
    const tabla = document.getElementById("tabla-genero");

    if (!genero) return tabla.innerHTML = "<p>Seleccione un género.</p>";

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta/genero?genero=" + encodeURIComponent(genero), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = peticion.ok ? await peticion.json() : [];
        renderTabla(tabla, data);

    } catch (error) {
        tabla.innerHTML = "<p>Error al buscar.</p>";
    }
}

    // Buscar por categoría
   let consultarPorCategoria = async (e) => {
    e.preventDefault();
    let categoria = document.getElementById("categoria-input").value.trim();
    const tabla = document.getElementById("tabla-categoria");

    if (!categoria) return tabla.innerHTML = "<p>Ingrese la categoría.</p>";

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta/categoria?categoria=" + encodeURIComponent(categoria), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = peticion.ok ? await peticion.json() : [];
        renderTabla(tabla, data);

    } catch (error) {
        tabla.innerHTML = "<p>Error al buscar.</p>";
    }
}
    // Buscar por especialidad
    let consultarPorEspecialidad = async (e) => {
    e.preventDefault();
    let especialidad = document.getElementById("especialidad-input").value.trim();
    const tabla = document.getElementById("tabla-especialidad");

    if (!especialidad) return tabla.innerHTML = "<p>Ingrese la especialidad.</p>";

    try {
        const peticion = await fetch("http://localhost:9000/api/triatleta/especialidad?especialidad=" + encodeURIComponent(especialidad), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = peticion.ok ? await peticion.json() : [];
        renderTabla(tabla, data);

    } catch (error) {
        tabla.innerHTML = "<p>Error al buscar.</p>";
    }
}

    // Buscar por cross
    let consultarPorModalidadCross = async (e) => {
    e.preventDefault();
    let modalidadCross = document.getElementById("cross-select").value;
    const tabla = document.getElementById("tabla-cross");

    if (!modalidadCross) return tabla.innerHTML = "<p>Seleccione una opción.</p>";

    try {
        const value = modalidadCross.toLowerCase() === "sí" ? "si" : modalidadCross.toLowerCase();

        const peticion = await fetch("http://localhost:9000/api/triatleta/modalidadcross?cross=" + encodeURIComponent(value), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = peticion.ok ? await peticion.json() : [];
        renderTabla(tabla, data);

    } catch (error) {
        tabla.innerHTML = "<p>Error al buscar.</p>";
    }
}
});