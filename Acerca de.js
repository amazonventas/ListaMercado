
window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Lista Activa: <br><strong>" + Nombre + "</strong>";
  document.getElementById("movil-menu").hidden = true;


  if (Listado != null){
    var Cuerpo = document.getElementById("Body_Acerca");
    Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  } else {
    var Cuerpo = document.getElementById("Body_Acerca");
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

