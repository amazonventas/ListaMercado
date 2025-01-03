
window.addEventListener("load",function(){

  document.getElementById("movil-menu").hidden = true;

  var Nombre = localStorage.getItem("Nombre_Lista");       
  var Listado= JSON.parse(localStorage.getItem(Nombre));
 
  if (Listado != null){
     var Cuerpo = document.getElementById("body_ayuda");
     Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  } else {
   var Cuerpo = document.getElementById("body_ayuda");
   Cuerpo.style.backgroundImage = "url('./imagenes/Cielo.jpg')";
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

Crear_lista.addEventListener("click",function(){
  document.getElementById('popupOverlay').style.display = 'block';
  document.getElementById('Titulo_Video').innerHTML = "<strong>¿Como crear mi primera lista?</strong>";
  document.getElementById('Crear'   ).style.display = 'block';
  document.getElementById('Exportar' ).style.display = 'none';
  document.getElementById('Importar').style.display = 'none';
}); 

Exportar_lista.addEventListener("click",function(){
  document.getElementById('popupOverlay').style.display = 'block';
  document.getElementById('Titulo_Video').innerHTML = "<strong>¿Como exporta una lista?</strong>";
  document.getElementById('Crear'   ).style.display = 'none';
  document.getElementById('Exportar' ).style.display = 'block';
  document.getElementById('Importar').style.display = 'none';
}); 

Importar_lista.addEventListener("click",function(){
  document.getElementById('popupOverlay').style.display = 'block';
  document.getElementById('Titulo_Video').innerHTML = "<strong>¿Como importar una lista?</strong>";
  document.getElementById('Crear'   ).style.display = 'none';
  document.getElementById('Exportar' ).style.display = 'none';
  document.getElementById('Importar').style.display = 'block';
}); 


Cancelar_Ayuda.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
});  







