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
    recognition.start(); // Inicia el reconocimiento de voz cuando el usuario presiona el botón
    console.log("Iniciando reconocimiento de voz...");
  });


  recognition.onresult = function(event) {

     // La transcripción resultante se obtiene en event.results
    const transcript = event.results[0][0].transcript;

    // Separa el parrafo en
    const Separadas = transcript.split(" ");

    //textOutput.textContent = "Texto reconocido: " + transcript ; // Mostramos el texto transcrito
    var N = Separadas.length;

    
    var botones = document.querySelectorAll("button");
    var Cantidad = botones.length - 1;

    for (var i = 0; i < N; i++) {
      agregarFila(Separadas[i],i, Cantidad);
    }

    console.log(Cantidad);

    var botones = document.querySelectorAll("button");

    botones.forEach(function(boton) {
      boton.addEventListener("click", function(event) {
          // El objeto event.target es el elemento que fue clicado
          //console.log("Se ha clicado el elemento:", event.target);
          //console.log("ID del elemento clicado:", event.target.id);


        });
    });


      // Obtener todas las filas con el botón "Eliminar"
      const botonesEliminar = document.querySelectorAll('.Eliminar');
  
      console.log(botonesEliminar);
  
      // Iterar sobre cada botón y agregar un evento de clic
      botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {

          let respuesta = confirm("¿Estás seguro que quieres Borrar?");
          if (respuesta) {
           // Obtener la fila en la que se hizo clic
           const fila = this.parentNode.parentNode.parentNode; // el botón está dentro de una celda <td>, que a su vez está dentro de una fila <tr>
           fila.remove(); // Eliminar la fila
          }
          
        });
      });
    
  };

  recognition.onerror = function(event) {
    // Si ocurre un error, lo mostramos en consola
    console.error("Error en el reconocimiento de voz: ", event.error);
  };
  
  recognition.onend = function() {
    console.log("El reconocimiento de voz ha terminado.");
  };

};



function agregarFila(Articulo, Identificador ,Cantidad) {

  // Obtén el cuerpo de la tabla
  var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];

  // Crea una nueva fila
  var nuevaFila = tabla.insertRow();

  // Crea las celdas para la nueva fila
  var celdaNombre   = nuevaFila.insertCell(0);
  var celdaBorrar   = nuevaFila.insertCell(1);
  
  var Total_id = Identificador + Cantidad

  celdaNombre.id = "Fila" + Total_id;

  celdaNombre.innerHTML   ='<center>'+Articulo+'</center>';
  celdaBorrar.innerHTML   ='<center><button Class="Eliminar" id=Borrar' + Total_id +'>borrar</button></center>';


}


