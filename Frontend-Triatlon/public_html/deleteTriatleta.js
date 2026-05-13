let deleteTriatleta = async() =>{
    let id = document.getElementById("idTriatleta").value;
    
    const peticion =await  fetch("http://localhost:9000/api/triatleta/borrartriatleta/"+id,
    {
    method:'DELETE',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
    
    }).then(response => response.json())
}