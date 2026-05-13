let updateNombre = async() =>{
    let id = document.getElementById("id").value;
    let nuevoNombre= document.getElementById("nuevoNombre").value;
    
    const peticion = fetch("http://localhost:9000/api/triatleta/actualizarnombre/"+id+"/nombre",
    {
        method:'PATCH',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({"nombre":nuevoNombre})
    
    }).then((res)=>{
                
    })
}

let updateIdentificacion = async() =>{
    let id = document.getElementById("id").value;
    let nuevaIdentificacion= document.getElementById("nuevaIdentificacion").value;
    
    const peticion = fetch("http://localhost:9000/api/triatleta/actualizaridentificacion/"+id+"/identificacion",
    {
        method:'PATCH',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({"identificacion":nuevaIdentificacion})
    
    }).then((res)=>{
                
    })
}

let updateCategoria = async() =>{
    let id = document.getElementById("id").value;
    let nuevaCategoria= document.getElementById({"categoria":nuevaCategoria}).value;
    
    const peticion = fetch("http://localhost:9000/api/triatleta/actualizarcategoria/"+id+"/categoria",
    {
        method:'PATCH',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(nuevaCategoria)
    
    }).then((res)=>{
                
    })
}

let updateTodo = async() =>{
    let id = document.getElementById("id").value;
    let triatleta = {};
    
    triatleta.nombre=document.getElementById("nombreTriatleta").value;
    triatleta.identificacion=document.getElementById("identificacionTriatleta").value;
    triatleta.categoria=document.getElementById("categoriaTriatleta").value;
    triatleta.modalidadCross=document.getElementById("crossTriatleta").value;
    triatleta.especialidad=document.getElementById("especialidadTriatleta").value;
    triatleta.correo=document.getElementById("correoTriatleta").value;
    triatleta.activo=document.getElementById("activoTriatleta").value;
    
    const peticion = await fetch("http://localhost:9000/api/triatleta/actualizar/"+id,
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(triatleta)
    })
            .then((res)=>{
                
    })
}