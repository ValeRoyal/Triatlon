document.addEventListener('DOMContentLoaded', function () {
    // Navegación
    document.getElementById('btn-cerrar-sesion').onclick = () => window.location.href = 'index.html';
    document.getElementById('btn-perfil').onclick = () => window.location.href = 'perfil.html';

    // Datos del usuario logueado
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    document.getElementById('nombre-usuario').textContent = usuario.nombre || "Usuario";
    document.getElementById('foto-usuario').src = usuario.urlFoto || "https://via.placeholder.com/160";


    // === Funciones para buscar y renderizar tablas ===
    // Ajusta la url base si tu backend cambia de puerto/ruta
    const API_BASE = 'http://localhost:9000/api/triatleta';

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
    document.getElementById('form-genero').onsubmit = async function (e) {
        e.preventDefault();
        const genero = document.getElementById('genero-select').value;
        const tabla = document.getElementById('tabla-genero');
        if (!genero) return tabla.innerHTML = "<p>Seleccione un género.</p>";
        try {
            const resp = await fetch(`${API_BASE}/genero?genero=${encodeURIComponent(genero)}`);
            const datos = resp.ok ? await resp.json() : [];
            renderTabla(tabla, datos);
        } catch {
            tabla.innerHTML = "<p>Error al buscar.</p>";
        }
    };

    // Buscar por categoría
    document.getElementById('form-categoria').onsubmit = async function (e) {
        e.preventDefault();
        const categoria = document.getElementById('categoria-input').value.trim();
        const tabla = document.getElementById('tabla-categoria');
        if (!categoria) return tabla.innerHTML = "<p>Ingrese la categoría.</p>";
        try {
            const resp = await fetch(`${API_BASE}/categoria?categoria=${encodeURIComponent(categoria)}`);
            const datos = resp.ok ? await resp.json() : [];
            renderTabla(tabla, datos);
        } catch {
            tabla.innerHTML = "<p>Error al buscar.</p>";
        }
    };

    // Buscar por especialidad
    document.getElementById('form-especialidad').onsubmit = async function (e) {
        e.preventDefault();
        const espec = document.getElementById('especialidad-input').value.trim();
        const tabla = document.getElementById('tabla-especialidad');
        if (!espec) return tabla.innerHTML = "<p>Ingrese la especialidad.</p>";
        try {
            const resp = await fetch(`${API_BASE}/especialidad?especialidad=${encodeURIComponent(espec)}`);
            const datos = resp.ok ? await resp.json() : [];
            renderTabla(tabla, datos);
        } catch {
            tabla.innerHTML = "<p>Error al buscar.</p>";
        }
    };

    // Buscar por cross
    document.getElementById('form-cross').onsubmit = async function (e) {
        e.preventDefault();
        const cross = document.getElementById('cross-select').value;
        const tabla = document.getElementById('tabla-cross');
        if (!cross) return tabla.innerHTML = "<p>Seleccione una opción.</p>";
        try {
            // El backend espera "sí"/"no" o "Si"/"No", ajústalo según sea necesario
            const value = cross.toLowerCase() === "sí" ? "si" : cross.toLowerCase();
            const resp = await fetch(`${API_BASE}/modalidadcross?cross=${encodeURIComponent(value)}`);
            const datos = resp.ok ? await resp.json() : [];
            renderTabla(tabla, datos);
        } catch {
            tabla.innerHTML = "<p>Error al buscar.</p>";
        }
    };

});