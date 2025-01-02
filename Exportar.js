

window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Listado Activo: <br><strong>" + Nombre + "</strong>";

  document.getElementById("movil-menu").hidden = true;
  
  if (Listado.Fondo != null){
    var Cuerpo = document.getElementById("Body_Exportar");
    Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  }

  if (Listado != null){
    document.getElementById("Listado_Exportar_Articulos"  ).value = Listado.Articulos;
    document.getElementById("Listado_Exportar_Cantidad"   ).value = Listado.Cantidad;
    document.getElementById("Listado_Exportar_Precios"    ).value = Listado.Precios;
    document.getElementById("Listado_Exportar_Listo"      ).value = Listado.Listo;
    document.getElementById("Listado_Exportar_Fondo"      ).value = Listado.Fondo;
    document.getElementById("Listado_Exportar_LetraEstilo").value = Listado.TamanoLetra;
    document.getElementById("Listado_Exportar_LetraTamano").value = Listado.EstiloLetra;
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



function compartirWhatsapp(mensaje) {

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= localStorage.getItem(Nombre);

  window.open(`https://wa.me/?text=${encodeURIComponent(Listado)}`, "_blank");
}

