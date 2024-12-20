window.addEventListener("load",function(){
  document.getElementById("movil-menu").hidden = true;
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
    console.log(startBtn.style.color);
    recognition.start(); // Inicia el reconocimiento de voz cuando el usuario presiona el botón
    console.log("Iniciando reconocimiento de voz...");
  });


  recognition.onresult = function(event) {

    var boton = document.getElementById("start-btn");


     // La transcripción resultante se obtiene en event.results
    const transcript = event.results[0][0].transcript;

    var EntradaVoz = document.getElementById("Palabras").checked;
 
    if (EntradaVoz == true) {
      var Separadas = transcript.split(' ');
    } else {
      var Separadas = transcript.split('\n');
    }



    //textOutput.textContent = "Texto reconocido: " + transcript ; // Mostramos el texto transcrito
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



function agregarFila(Articulo, Identificador ,Cantidad) {

  // Obtén el cuerpo de la tabla
  var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];

  // Crea una nueva fila
  var nuevaFila = tabla.insertRow();
      nuevaFila.classList.add("Space_Tabla");

  // Crea las celdas para la nueva fila
  var celdaNombre = nuevaFila.insertCell(0);
  var celdaBorrar = nuevaFila.insertCell(1);

  var Total_id = Identificador + Cantidad
  
    celdaNombre.id = "Fila" + Total_id;
  
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
  for (var i = 1; i < NColumnas; i++) {  // Comienza en 1 para omitir el encabezado
      var celdas = filas[i].getElementsByTagName("td");
      ArrayArticulo[i] = celdas[0].textContent;
   }

  localStorage.setItem('Listado', JSON.stringify(ArrayArticulo));
};




BtnAceptar.addEventListener('click', function() {
  GuardarLocal();
});

Borrar_Todo.addEventListener('click', function() {
  localStorage.clear();
});


Cuerpo.addEventListener('click', function(event) {

  let elementos = document.getElementsByClassName('Eliminar');

  if (event.target.classList.contains('Eliminar')) {

    let filas = event.target.closest('tr');
    filas.remove();
    if (elementos.length === 0) {
       document.getElementById("BtnAceptar").hidden = true;
       localStorage.removeItem('Listado' );
       localStorage.removeItem('Cantidad');
       localStorage.removeItem('Precio'  );
       localStorage.removeItem('Listo'   );
    }

  }
 

});

