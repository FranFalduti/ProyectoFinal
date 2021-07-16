//Inicio de sesión

function inicioSesion(inicioExitoso) {
    let usuario = document.getElementById("document").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let registros = JSON.parse(localStorage.getItem("REGISTROS"));



    for (let u of registros) {
        if(u.dni == usuario && u.contrasenia == contrasenia) {
            let i = document.createElement("h1");
            i.innerText = "Bienvenido";
            document.getElementById("inicioSesion").appendChild(i);

            inicioExitoso();
            

        }
        else {
            console.log("Error");
        }
    }  


}    

//Función que hace que se muestren los formularios de Contacto y Reserva

function logIn() {
    inicioSesion(() => {
        document.getElementById("reserva").style.display = "block";
        document.getElementById("contacto").style.display = "block";
    });
}



//Inscripcion de persona
document.addEventListener("DOMContentLoaded",function(e){
    let miInscripcion = document.getElementById("formulario");
    miInscripcion.addEventListener("submit", validarInscripcion);
});

function validarInscripcion(event) {
    event.preventDefault();
    let nombre      = event.target[0].value;
    let apellido    = event.target[1].value;
    let contrasenia = event.target[2].value;
    let edad        = event.target[3].value;
    let dni         = event.target[4].value;
    let direccion   = event.target[5].value;
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    event.target[4].value = "";
    event.target[5].value = "";

    if(nombre && apellido && contrasenia && edad && dni && direccion){
        guardarUsuario(nombre, apellido, contrasenia, edad, dni, direccion);
        document.getElementById("output").innerHTML=`${nombre} se pudo registrar de forma correcta.`;
    }
    else {
        document.getElementById("output").innerHTML='Complete bien los campos.';
    }

}




//Nueva persona para Inicio de Sesión
function guardarUsuario(nombre, apellido, contrasenia, edad, dni, direccion) {
    let registros = localStorage.getItem("REGISTROS");
  
    if(!registros) registros = "[]";

    let objetoRegistro = JSON.parse(registros);
    objetoRegistro.push({
        nombre, apellido, contrasenia, edad, dni, direccion
    });
    localStorage.setItem("REGISTROS",JSON.stringify(objetoRegistro));

}








//Contacto envíado
document.addEventListener("DOMContentLoaded", function(i){
    let miFormulario = document.getElementById("contacto");
    miFormulario.addEventListener("submit", validarContacto)
});

function validarContacto(intern) {
    intern.preventDefault();
    let nombre = intern.target[0].value;
    let apellido = intern.target[1].value;

    document.getElementById("contactout").innerHTML=`Muchas gracias ${nombre} ${apellido} por ponerse en contacto con nosotros. Estaremos respondiéndole lo antes posible.`;
}
