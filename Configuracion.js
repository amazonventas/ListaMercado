
window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Lista Activa: <br><strong>" + Nombre + "</strong>";
  document.getElementById("movil-menu").hidden = true;
  
  var Fondo = document.getElementById("Fondo_Pantalla");
  Fondo.src ='./imagenes/Azul Claro.jpg';    
  
  document.getElementById('tamano').style.fontSize = 'medium';
  document.getElementById('tamano').style.color = 'blue';
  document.getElementById('Estilo').style.fontFamily = 'Courier New';    
  
  if (Listado.Fondo != null){
      var Cuerpo = document.getElementById("Body3");
      Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
    }

  if (Listado.EstiloLetra != null){
    var resultado = document.getElementById('Estilo');
    resultado.style.fontFamily = Listado.EstiloLetra;
  }

  if (Listado.TamanoLetra != null){
    var resultado = document.getElementById('tamano');
    resultado.style.fontSize = Listado.TamanoLetra;
  }

  document.getElementById("alert-success").style.display ="none";
  document.getElementById("Volver").style.display ="none";    

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
            resultado.src = './imagenes/Azul Solido.jpg';
            break;
        case '3':
            resultado.src = './imagenes/Blanco Elegante.jpg';
            break;

        case '4':
            resultado.src = './imagenes/Cielo.jpg';
            break;
        case '5':
            resultado.src = './imagenes/Claridad.jpg';
            break;
        case '6':
            resultado.src = './imagenes/Degradado Azul.jpg';
            break;
        case '7':
            resultado.src = './imagenes/Estrellas.jpg';
        break;        
        case '8':
            resultado.src = './imagenes/Gris Azulado.jpg';
        break;        
        case '9':
            resultado.src = './imagenes/Tela morada.jpg';
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
        case 'Courier New':
            resultado.style.fontFamily = 'Courier New';
            break;
        case 'Franklin Gothic':
            resultado.style.fontFamily = 'Franklin Gothic Medium';
            break;
        case 'Times New Roman':
            resultado.style.fontFamily = 'Times New Roman';
            break;
        case 'Segoe UI':
            resultado.style.fontFamily = 'Segoe UI';
            break;
        
    }

});

Aceptar_Config.addEventListener('click', function() {

  var Fondo = document.getElementById("Fondo_Pantalla").src;
  var Letrasize = document.getElementById('tamano').style.fontSize;
  var FamiliaFont = document.getElementById('Estilo').style.fontFamily;

  var Letrasize = document.getElementById("Select_Letra");
  var LetrasizeValue = Letrasize.value;

  var FamiliaFont = document.getElementById("Select_Estilo");
  var FamiliaFontValue = FamiliaFont.value;

  var Cuerpo = document.getElementById("Body3");
  Cuerpo.style.backgroundImage = "url("+ Fondo +")";

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  Listado.Fondo = Fondo;
  Listado.TamanoLetra = LetrasizeValue;
  Listado.EstiloLetra = FamiliaFontValue;

  localStorage.setItem(Nombre, JSON.stringify(Listado));


  document.getElementById("alert-success").style.display ="block";

  setTimeout(() => {
    document.getElementById("alert-success").style.display ="none";
  }, 2000);

  document.getElementById("Volver").style.display ="block";

});
  
