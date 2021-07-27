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

            return inicioExitoso();
        }
    }
    console.log("Error");  
}    


//Función que hace que se muestren los formularios de Contacto y Reserva
function logIn() {
    inicioSesion(() => {
        $("#reserva").show();
        $("#inscripciones").hide();
        $("#inscripcionesid").hide();
        $("#reservaid").show();
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
    let mail        = event.target[5].value;
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    event.target[4].value = "";
    event.target[5].value = "";

    if(nombre && apellido && contrasenia && edad && dni && mail){
        validarEmail(mail).then(r => {
            if(r.is_valid_format.value) {
                guardarUsuario(nombre, apellido, contrasenia, edad, dni, mail);
                document.getElementById("output").innerHTML=`${nombre} se pudo registrar de forma correcta.`;
            }
            else {
                alert("Formato de documento inválido");
            }
        });
        
    }
    else {
        document.getElementById("output").innerHTML='Complete bien los campos.';
    }

}


//Nueva persona para Inicio de Sesión
function guardarUsuario(nombre, apellido, contrasenia, edad, dni, mail) {
    let registros = localStorage.getItem("REGISTROS");
  
    if(!registros) registros = "[]";

    let objetoRegistro = JSON.parse(registros);
    objetoRegistro.push({
        nombre, apellido, contrasenia, edad, dni, mail
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

//Slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


//Validar email

function validarEmail(email) {

    let APIURL = `https://emailvalidation.abstractapi.com/v1/?api_key=340e88c2f56d4c47b4371f72f1ffd4fe&email=${email}`
    
    return new Promise((res, rej) => {
        
        $.ajax({
            method: "GET",
            url: APIURL,
            
            success: function (respuesta) {
                res(respuesta)        
            }
        });

    })

}


//Animación imágenes

// $(".categoria").hover(function(){
//     $(this).animate(
//         {
//         width: "80%"
//     });
// },
// function() {
//     $(this).animate(
//     {
//         width: "60%"
//     });
// });