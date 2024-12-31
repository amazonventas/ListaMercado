
window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById('alert-danger').style.display  = 'none';
  document.getElementById('alert-warning').style.display = 'none';
  document.getElementById('alert-Listas_Disponibles').style.display = 'none';

  if (Listado.Fondo != null){
      var Cuerpo = document.getElementById("Body_index");
      Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  } else {
    var Cuerpo = document.getElementById("Body_index");
    Cuerpo.style.backgroundImage = "url('./imagenes/Cielo.jpg')";
  }


}); 


mostrarPopup_Lista_Nueva.addEventListener('click', function() {
  document.getElementById('popupOverlay' ).style.display = 'block';
  document.getElementById('Crear_Listado').style.display = 'block';
  document.getElementById('Abrir_Listado').style.display = 'none';
});  


mostrarPopup_Listado.addEventListener('click', function() {
  document.getElementById('popupOverlay' ).style.display = 'block';
  document.getElementById('Crear_Listado').style.display = 'none';
  document.getElementById('Abrir_Listado').style.display = 'block';

  const tbody = document.querySelector('#tabla_Index tbody');
  tbody.innerHTML = '';

  console.log(localStorage.length);

  if (localStorage.length > 0) {

    for (let i = 0; i < localStorage.length; i++) {
      Agregar_Listado_LocalStorage(localStorage.key(i));
    }

  } else {
    document.getElementById('alert-Listas_Disponibles').style.display = 'block';
  };
  
});  


Aceptar_Lista_New.addEventListener('click', function() {

  var ListaNueva = document.getElementById("Nombre_Listado").value;
  var N = localStorage.length;
  

  if (ListaNueva !== "") {

    document.getElementById('alert-danger').style.display   = 'none';
    document.getElementById('alert-warning').style.display  = 'none' ;

    var Nueva_Lista = {
      Articulos: [],
      Cantidad: [],
      Precios: [],
      Listo: [],
      Fondo:'./imagenes/Cielo.jpg',
      TamanoLetra: 'medium',
      EstiloLetra:'Courier New'
    };

    if (N == 0) {
      console.log("Se grabo Registro");
      localStorage.setItem("Nombre_Lista", ListaNueva);              //Guardo Nombre de la lista Nueva
      localStorage.setItem(ListaNueva, JSON.stringify(Nueva_Lista)); //Guardo Lista con sus componentes
      window.location.href = 'Entrada_Voz.html';
    }
    

    if (N !== 0) {
      
      var Contador = 0;
  
      for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
           
        console.log(key);
        console.log(ListaNueva);

        if (ListaNueva == key){
          document.getElementById('alert-danger').style.display   = 'block';
          document.getElementById('alert-warning').style.display  = 'none' ;
          break;
        } else { Contador++;}
  
      }
  
      if (Contador == localStorage.length){
          console.log("Se agrego lista");
          localStorage.setItem("Nombre_Lista", ListaNueva);              //Guardo Nombre de la lista Nueva
          localStorage.setItem(ListaNueva, JSON.stringify(Nueva_Lista)); //Guardo Lista con sus componentes
          window.location.href = 'Entrada_Voz.html';
        }
    }
  
  } else {
    document.getElementById('alert-danger').style.display   = 'none';
    document.getElementById('alert-warning').style.display  = 'block' ;
  }

});  
  

Cancelar_Lista_New.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('alert-danger').style.display   = 'none';
  document.getElementById('alert-warning').style.display  = 'none' ;
});  

Cancelar_Listado.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('alert-danger').style.display   = 'none';
  document.getElementById('alert-warning').style.display  = 'none' ;
  //localStorage.clear();
});  

function Agregar_Listado_LocalStorage(Nombre_Lista) {

  let value;
  try {
      value = JSON.parse(localStorage.getItem(Nombre_Lista));
  } catch (e) {

  }

 if (value !== null && typeof value === 'object') {

   if (Nombre_Lista !== "Nombre_Lista") {
    
      var tabla = document.getElementById("tabla_Index").getElementsByTagName('tbody')[0];
      
      var nuevaFila = tabla.insertRow();
          
      var celdaNombre   = nuevaFila.insertCell(0);
      celdaNombre.classList.add("Tabla_Listados_Existentes");
  
      celdaNombre.innerHTML   ='<center>'+ Nombre_Lista +'</center>';
    }

  }
 
};  


mostrarPopup_Listado.addEventListener('click', function() {

  const celdas = document.querySelectorAll('#tabla_Index td');
  
  celdas.forEach(celda => {
    celda.addEventListener('click', function() {
      const Listado_seleccionado = celda.textContent;

      localStorage.setItem("Nombre_Lista", Listado_seleccionado);

      window.location.href = 'Entrada_Voz.html';

    });
  });
});






