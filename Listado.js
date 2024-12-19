
document.addEventListener('click', function(event) {

  if (event.target.classList.contains("form-check-input")) {

    const elementId = event.target.id;
    const Marcado = event.target.checked;
    
    if (elementId !== "Ver_Precios") {

      ArticuloId = "Fila" + elementId; 
      CantidadId = "Cant" + elementId; 
      PrecioId   = "Prec" + elementId; 
    
      if (Marcado == true) {
        var Elemento = document.getElementById(ArticuloId);
            Elemento.style.color ="lightgray";
            Elemento.disabled = true;
        var Elemento = document.getElementById(CantidadId);
            Elemento.style.color ="lightgray";
            Elemento.disabled = true;
        var Elemento = document.getElementById(PrecioId);
            Elemento.style.color ="lightgray";
            Elemento.disabled = true;
      } else {
       var Elemento = document.getElementById(ArticuloId);
           Elemento.style.color ="black";
           Elemento.disabled = false;
       var Elemento = document.getElementById(CantidadId);
           Elemento.style.color ="black";
           Elemento.disabled = false;
       var Elemento = document.getElementById(PrecioId);
           Elemento.style.color ="black";
           Elemento.disabled = false;
      }

    }

  }

});
  

Calcular.addEventListener('click', function(event) {

  var filas = document.querySelectorAll("#tabla1 tr");
  var Resultado  = document.getElementById("Resultado");
  var total = 0;  
  
  for (var i = 1; i < filas.length; i++) {  // Comienza en 1 para omitir el encabezado
   
    var CantidadId = "Cant" + i;      
    var PrecioId   = "Prec" + i;
   
    var Cantidad = document.getElementById(CantidadId).value;
    var Precio   = document.getElementById(PrecioId).value;
    var Marcado  = document.getElementById(i).checked;

    if (Marcado == true) {
       total = total + (Cantidad*Precio); 
    }

  } 

    Resultado.innerHTML = " Costo Total es: "+ total +" $";
});



function GuardarLocal() {

  // Obtener la tabla y sus filas
  var tabla = document.getElementById("tabla1");
  var filas = tabla.getElementsByTagName("tr");
  var NColumnas = filas.length;
  
  let ArrayArticulo = [];
  ArrayArticulo.push(NColumnas);

  let ArrayCantidad = [];
  ArrayCantidad.push(NColumnas);

  let ArrayPrecios = [];
  ArrayPrecios.push(NColumnas);

  let ArrayListo = [];
  ArrayListo.push(NColumnas);


  // Recorrer las filas de la tabla y obtener los datos
  for (var i = 1; i < NColumnas; i++) {  // Comienza en 1 para omitir el encabezado
      var celdas = filas[i].getElementsByTagName("td");
      
      var Cant_Id  = "Cant"+ i;
      var Prec_Id  = "Prec"+ i;
      var List_Id  = i;


      ArrayArticulo[i] = celdas[0].textContent;
      ArrayCantidad[i] = document.getElementById(Cant_Id).value;
      ArrayPrecios[i]  = document.getElementById(Prec_Id).value;
      ArrayListo[i]    = document.getElementById(List_Id).checked;

    }

   localStorage.setItem('Listado' , JSON.stringify(ArrayArticulo));
   localStorage.setItem('Cantidad', JSON.stringify(ArrayCantidad));
   localStorage.setItem('Precio'  , JSON.stringify(ArrayPrecios ));
   localStorage.setItem('Listo'   , JSON.stringify(ArrayListo   ));
};


Guardar.addEventListener('click', function() {
  GuardarLocal();
});  

Editar.addEventListener('click', function() {
  GuardarLocal();
});  


Ver_Precios.addEventListener('click', function() {

  var marcado = document.getElementById("Ver_Precios").checked;
  var tabla = document.getElementById("tabla1");
  var filas = tabla.getElementsByTagName("tr");
  var NColumnas = filas.length;

  if (marcado == true) { 
    for (var i = 0; i < NColumnas; i++) {  
      if (i == 0) {
        var celdas_th = filas[i].getElementsByTagName("th");
            celdas_th[1].hidden = false;
            celdas_th[2].hidden = false;
      } else {
        var celdas_td = filas[i].getElementsByTagName("td");
            celdas_td[1].hidden = false;
            celdas_td[2].hidden = false;
      }
    }

  } else {
    for (var i = 0; i < NColumnas; i++) {  
      if (i == 0) {
        var celdas_th = filas[i].getElementsByTagName("th");
            celdas_th[1].hidden = true;
            celdas_th[2].hidden = true;
      } else {
        var celdas_td = filas[i].getElementsByTagName("td");
            celdas_td[1].hidden = true;
            celdas_td[2].hidden = true;
      }
    }
  }

});  
