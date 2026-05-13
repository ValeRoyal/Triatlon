let consultarPorIdentificacion= async() =>{
    let identificacion = document.getElementById("identificacionTriatleta").value;
    
    const peticion = fetch("http://localhost:9000/api/triatleta/"+identificacion,
    {
    method: 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
}

let consultarPorGenero= async() =>{
    let genero = document.getElementById("generoTriatleta").value;
    
    const peticion = await fetch("http://localhost:9000/api/triatleta/genero?genero="+genero,
    {
    method: 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
}

let consultarPorCategoria= async() =>{
    let categoria = document.getElementById("categoriaTriatleta").value;
    
    const peticion = await fetch("http://localhost:9000/api/triatleta/categoria?categoria="+categoria,
    {
    method: 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
}

let consultarPorEspecialidad= async() =>{
    let especialidad = document.getElementById("especialidadTriatleta").value;
    
    const peticion = await fetch("http://localhost:9000/api/triatleta/especialidad?especialidad="+especialidad,
    {
    method: 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
}

let consultarPorModalidadCross= async() =>{
    let modalidadCross = document.getElementById("crossTriatleta").value;
    
    const peticion = await  fetch("http://localhost:9000/api/triatleta/modalidadcross?cross="+modalidadCross,
    {
    method: 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
}
