

window.addEventListener("load",function(){


  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Listado Activo: <br><strong>" + Nombre + "</strong>";

  document.getElementById("movil-menu").hidden = true;
  document.getElementById("BtnAceptar").hidden = true;

  var NColumnas= Listado.Articulos.length;
  
  if (NColumnas !== 0) {
    for (var i = 1; i < NColumnas; i++) {
      agregarFila(Listado.Articulos[i],i, 0);
    }
  }
  
  if (Listado.Fondo != null){
    var Cuerpo = document.getElementById("Body1");
    Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  }

  if (NColumnas > 1) {
    document.getElementById("BtnAceptar").hidden = false;
  }

  let tamaño = obtenerTamañoLocalStorage();
  console.log("Espacio ocupado en localStorage (%): " + tamaño);

}); 


hamburguesa.addEventListener("click",function(){
  var Visible = document.getElementById("movil-menu").hidden;
 
  if (Visible == true){
    document.getElementById("movil-menu").hidden = false;
  } else {
    document.getElementById("movil-menu").hidden = true;
  }

}); 



// Verificamos que el navegador soporte la Web Speech API

const startBtn = document.getElementById('start-btn');
const textOutput = document.getElementById('text-output');

if (!('webkitSpeechRecognition' in window)) {
  alert("Lo siento, tu navegador no soporta la función de reconocimiento de voz.");
} else {
  
  const recognition = new webkitSpeechRecognition(); // Creación de la instancia de la API
  recognition.continuous = false; // El reconocimiento se detendrá automáticamente después de un segmento de habla
  recognition.interimResults = false; // No mostrará resultados intermedios
  recognition.lang = "es-ES"; // Establecemos el idioma a español
  recognition.maxAlternatives = 1; // Solo tomamos una alternativa de texto

  startBtn.addEventListener('click', () => {
    startBtn.className = "btn btn-warning";
    recognition.start(); // Inicia el reconocimiento de voz cuando el usuario presiona el botón
    console.log("Iniciando reconocimiento de voz...");
  });


  recognition.onresult = function(event) {

    // La transcripción resultante se obtiene en event.results
    const transcript = event.results[0][0].transcript;

    var EntradaVoz = document.getElementById("Palabras").checked;
 
    if (EntradaVoz == true) {
      var Separadas = transcript.split(' ');
    } else {
      var Separadas = transcript.split('\n');
    }

    var N = Separadas.length;
    var botones = document.querySelectorAll("button");
    var Cantidad = botones.length - 1;

    for (var i = 0; i < N; i++) {
      agregarFila(Separadas[i],i, Cantidad);
    }

    var botones = document.querySelectorAll("button");
    var Cantidad = botones.length - 1;

    if (Cantidad > 0) {
        document.getElementById("BtnAceptar").hidden = false;
    }

  };

  recognition.onerror = function(event) {
    // Si ocurre un error, lo mostramos en consola
    console.error("Error en el reconocimiento de voz: ", event.error);
  };
  
  recognition.onend = function() {
    startBtn.className = "btn btn-success";
    console.log("El reconocimiento de voz ha terminado.");
  };


};


BtnAceptar.addEventListener('click', function() {
  GuardarLocal();
});


Body1.addEventListener('click', function(event) {

  let elementos = document.getElementsByClassName('Eliminar');

  if (event.target.classList.contains('Eliminar')) {

    let filas = event.target.closest('tr');
    filas.remove();
    if (elementos.length === 0) {
       document.getElementById("BtnAceptar").hidden = true;
    }

  }

});


function agregarFila(Articulo, Identificador ,Cantidad) {

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));
 
  var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
  var nuevaFila = tabla.insertRow();
      nuevaFila.classList.add("Space_Tabla");

  var celdaNombre = nuevaFila.insertCell(0);
  var celdaBorrar = nuevaFila.insertCell(1);

  var Total_id = Identificador + Cantidad

    celdaNombre.id = "Fila" + Total_id;

    if (Listado.EstiloLetra !== null){
      var celda_es = document.getElementById(celdaNombre.id);
      celda_es.style.fontFamily = Listado.EstiloLetra;
    }
  
    if (Listado.TamanoLetra !== null){
      var celda_tam = document.getElementById(celdaNombre.id);
      celda_tam.style.fontSize = Listado.TamanoLetra;
    }
 
    celdaNombre.innerHTML   ='<center>'+Articulo+'</center>';
    celdaBorrar.innerHTML   ='<center><button Class="Eliminar" id=Borrar' + Total_id +'>borrar</button></center>';

};


function GuardarLocal() {

  // Obtener la tabla y sus filas
  var tabla = document.getElementById("tabla");
  var filas = tabla.getElementsByTagName("tr");
  var NColumnas = filas.length;
  
  let ArrayArticulo = [];
  ArrayArticulo.push(NColumnas);

  // Recorrer las filas de la tabla y obtener los datos
  for (var i = 1; i < NColumnas; i++) { 
      var celdas = filas[i].getElementsByTagName("td");
      ArrayArticulo[i] = celdas[0].textContent;
  }

   var Nombre = localStorage.getItem("Nombre_Lista");             
   var Listado= JSON.parse(localStorage.getItem(Nombre));
  
   Listado.Articulos = ArrayArticulo;
   localStorage.setItem(Nombre, JSON.stringify(Listado));

};


function mostrarPopup() {
  document.getElementById('popupOverlay').style.display = 'block';
}

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

// Función para borrar la lista
function borrarLista() {

  var Nombre  = localStorage.getItem("Nombre_Lista");             
  localStorage.removeItem(Nombre);
  localStorage.removeItem("Nombre_Lista");
  window.location.href = 'index.html';

}

function obtenerTamañoLocalStorage() {
  let total = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);          
    let value = localStorage.getItem(key);  
    total += key.length + value.length;     
  }

  let tamañoKB = total / 1024;

  // 5000kb   ------ 100%
  //tamanoKB  ------  x

  let OcupacionKB = tamañoKB/50;
  return OcupacionKB.toFixed(2);  // Retornamos el tamaño en KB con dos decimales
}



//Recibir.addEventListener('click', function() {
//
//  if (navigator.share) {
//
//      navigator.share({
//        title: 'Título del contenido',
//        text: 'Aquí va una descripción o el texto del contenido que quieres compartir.',
//        url: 'https://ejemplo.com'  // El enlace que deseas compartir
//      })
//      .then(() => console.log('Contenido compartido exitosamente'))
//      .catch((error) => console.log('Error al compartir: ', error));
//
//
//  } else {
//    console.log('La API Web Share no está disponible en este navegador');
//  }
//
//
//
//});
