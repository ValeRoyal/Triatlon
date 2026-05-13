let createTriatleta= async()  => {
    let nuevoTriatleta={};
    nuevoTriatleta.nombre=document.getElementById("nombreTriatleta").value;
    nuevoTriatleta.identificacion=document.getElementById("identificacionTriatleta").value;
    nuevoTriatleta.categoria=document.getElementById("categoriaTriatleta").value;
    nuevoTriatleta.genero=document.getElementById("generoTriatleta").value;
    nuevoTriatleta.fecha_nacimiento=document.getElementById("fechaNacimientoTriatleta").value;
    nuevoTriatleta.modalidadCross=document.getElementById("crossTriatleta").value;
    nuevoTriatleta.especialidad=document.getElementById("especialidadTriatleta").value;
    nuevoTriatleta.correo=document.getElementById("correoTriatleta").value;
    nuevoTriatleta.urlFoto=document.getElementById("urlFotoTriatleta").value;
    nuevoTriatleta.activo=document.getElementById("activoTriatleta").value;
    
    const peticion = await fetch("http://localhost:9000/api/triatleta", 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoTriatleta)
    })
            .then((res)=>{
                
    })
}

function calcularEdad(fechaNacimientoString){
    const hoy = new Date();
    const fechaNacimiento= new Date(fechaNacimientoString);
    let edad = hoy.getFullYear()-fechaNacimiento.getFullYear();
    return edad;
}