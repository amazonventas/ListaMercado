
// Asignar un solo event listener al contenedor común
document.addEventListener('click', function(event) {
    if (event.target.classList.contains("form-check-input")) {
        
        // Obtener el ID del elemento clickeado
        
        const elementId = event.target.id;
        const Marcado = event.target.checked;
    
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
