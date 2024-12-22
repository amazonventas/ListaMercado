window.addEventListener("load",function(){

    document.getElementById("movil-menu").hidden = true;
    
    var Fondo = document.getElementById("Fondo_Pantalla");
    Fondo.src ='./imagenes/Blanco Elegante.jpg';    

    document.getElementById('tamano').style.fontSize = 'medium';
    document.getElementById('tamano').style.color = 'blue';
    document.getElementById('Estilo').style.fontFamily = 'Courier New';    

    var Fondo_Pantalla  = localStorage.getItem('Fondo');

    if (Fondo_Pantalla != null){
        var Cuerpo = document.getElementById("Body3");
        Cuerpo.style.backgroundImage = "url("+ Fondo_Pantalla +")";
      }
    
}); 

hamburguesa.addEventListener("click",function(){
    var Visible = document.getElementById("movil-menu").hidden;
   
    if (Visible == true){
      document.getElementById("movil-menu").hidden = false;
    } else {
      document.getElementById("movil-menu").hidden = true;
    }
  
  }); 
  

document.getElementById('Select_Fondo').addEventListener('change', function() {
    var seleccion = this.value; // Obtiene el valor de la opción seleccionada
    var resultado = document.getElementById('Fondo_Pantalla');

    // Dependiendo de la opción seleccionada, realiza una acción
    switch(seleccion) {
        case '1':
            resultado.src = './imagenes/Blanco Elegante.jpg';
            break;
        case '2':
            resultado.src = './imagenes/Claridad.jpg';
            break;
        case '3':
            resultado.src = './imagenes/Gris Azulado.jpg';
            break;
    }
});

document.getElementById('Select_Letra').addEventListener('change', function() {
    var seleccion = this.value; // Obtiene el valor de la opción seleccionada
    var resultado = document.getElementById('tamano');

    // Dependiendo de la opción seleccionada, realiza una acción
    switch(seleccion) {
        case 'small':
            resultado.style.fontSize = 'small';
            break;
        case 'medium':
            resultado.style.fontSize = 'medium';
            break;
        case 'large':
            resultado.style.fontSize = 'large';
            break;
    }
});


document.getElementById('Select_Estilo').addEventListener('change', function() {
    var seleccion = this.value; // Obtiene el valor de la opción seleccionada
    var resultado = document.getElementById('Estilo');

    // Dependiendo de la opción seleccionada, realiza una acción
    switch(seleccion) {
        case '1':
            resultado.style.fontFamily = 'Courier New', Courier, monospace;
            break;
        case '2':
            resultado.style.fontFamily = 'Franklin Gothic Medium', 'Arial Narrow';
            break;
        case '3':
            resultado.style.fontFamily = 'Times New Roman';
            break;
        case '4':
            resultado.style.fontFamily = 'Segoe UI';
            break;
        
    }
});

Aceptar_Config.addEventListener('click', function() {
  var Cuerpo = document.getElementById("Body3");
  var Fondo = document.getElementById("Fondo_Pantalla").src;
  var Letrasize = document.getElementById('tamano').style.fontSize;
  var FamiliaFont = document.getElementById('Estilo').style.fontFamily;


  Cuerpo.style.backgroundImage = "url("+ Fondo +")";

  localStorage.setItem('Letra_Size', Letrasize);
  localStorage.setItem('Fondo', Fondo);
  localStorage.setItem('TipoLetra', FamiliaFont);


});
  

Guardar_TXT.addEventListener('click', function() {
  // Obtener datos desde localStorage
  let datos = localStorage.getItem('Fondo');
  
  
   // Verificar si hay datos
   if (datos) {
       // Crear un Blob con los datos en formato de texto
       let blob = new Blob([datos], { type: 'text/plain' });
  
       // Crear un enlace de descarga
       let enlace = document.createElement('a');
       enlace.href = URL.createObjectURL(blob);
       enlace.download = 'localStorage.txt'; // Nombre del archivo a descargar
  
       // Simular el clic en el enlace para iniciar la descarga
       enlace.click();
   } else {
       alert("No hay datos en localStorage.");
   }

});
    
  
