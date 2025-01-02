

window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Listado Activo: <br><strong>" + Nombre + "</strong>";

  document.getElementById("movil-menu").hidden = true;
  
  if (Listado.Fondo != null){
    var Cuerpo = document.getElementById("Body_Exportar");
    Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
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


Exportar.addEventListener("click",function(){

  var Whassapp = document.getElementById("Lista_Simple").checked;

  if (Whassapp == true) { Compartir_Whatsapp() }
                  else  { Compartir_App()      };

}); 



function Compartir_Whatsapp() {

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  var NColumnas= Listado.Articulos.length;
  var Texto ="";

  if (NColumnas !== 0) {
    for (var i = 1; i < NColumnas; i++) {
    Texto = Texto + Listado.Articulos[i] + "\n";
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(Texto)}`, "_blank");
}



function Compartir_App() {

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= localStorage.getItem(Nombre);

  window.open(`https://wa.me/?text=${encodeURIComponent(Listado)}`, "_blank");
}

