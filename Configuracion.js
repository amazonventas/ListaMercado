window.addEventListener("load",function(){

    document.getElementById("movil-menu").hidden = true;
    
    var Fondo = document.getElementById("Fondo_Pantalla");
    Fondo.src = './imagenes/Degradado Azul.jpg';    

    document.getElementById('tamano').style.fontSize = 'medium';
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
            resultado.src = './imagenes/Azul Claro.jpg';
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
        case 'medium':
            resultado.style.fontSize = 'medium';
            break;
        case 'large':
            resultado.style.fontSize = 'large';
            break;
        case 'xx-Large':
            resultado.style.fontSize = 'xx-Large';
            break;
    }
});


Aceptar_Config.addEventListener('click', function() {
  var Cuerpo = document.getElementById("Cuerpo");
  var Fondo = document.getElementById("Fondo_Pantalla").src;
  var Letrasize = document.getElementById('tamano').style.fontSize;

  Cuerpo.style.backgroundImage = "url("+ Fondo +")";

  localStorage.setItem('Letra_Size', Letrasize);
  localStorage.setItem('Fondo', Fondo);


});
  


