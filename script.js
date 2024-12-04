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
    const Separadas = transcript.split(" ");
    //textOutput.textContent = "Texto reconocido: " + transcript ; // Mostramos el texto transcrito
    var N = Separadas.length;
    console.log(transcript);
    console.log(Separadas);
    console.log(N);

    for (var i = 0; i < N; i++) {

      console.log(Separadas[i]);
      agregarFila(Separadas[i],i);
    }

    var botones = document.querySelectorAll("input");
    console.log(botones);
    
    botones.forEach(function(boton) {
      boton.addEventListener("click", function(event) {
          // El objeto event.target es el elemento que fue clicado
          console.log("Se ha clicado el elemento:", event.target);
          console.log("ID del elemento clicado:", event.target.id);

          var Fila = document.getElementById("Fila" + event.target.id);
          var Marcado = document.getElementById(event.target.id).checked;


          if ( Marcado == true) {
            Fila.style.color = "red";
          } else {
            Fila.style.color = "black";
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
}



function agregarFila(Articulo, Identificador) {
  // Obtén el cuerpo de la tabla
  var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];

  // Crea una nueva fila
  var nuevaFila = tabla.insertRow();

  // Crea las celdas para la nueva fila
  var celdaNombre = nuevaFila.insertCell(0);
  var celdaAcciones = nuevaFila.insertCell(1);
      
  celdaNombre.id = "Fila" + Identificador;

  // Asigna valores a las celdas
  celdaNombre.innerHTML = Articulo;
  celdaAcciones.innerHTML = '<input id =' + Identificador + ' type="checkbox">';


}


