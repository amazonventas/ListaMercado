
window.addEventListener("load",function(){

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  document.getElementById("Nombre-Lista").innerHTML ="Lista Activa: <br><strong>" + Nombre + "</strong>";
  document.getElementById("movil-menu").hidden = true;
  document.getElementById("Guardado_Lista").style.display ="none";

  var NColumnas = Listado.Articulos.length;
  var NVarios   = Listado.Cantidad.length;

  let Lista_Articulos = [];
        Lista_Articulos.push(NColumnas);

  let Lista_Cantidad = [];
      Lista_Cantidad.push(NColumnas);
      
  let Lista_Precios = [];
      Lista_Precios.push(NColumnas);

  let Lista_Listo = [];
      Lista_Listo.push(NColumnas);


  if (NVarios == 0) {

    Listado.Cantidad.push(NColumnas);
    Listado.Precios.push(NColumnas);
    Listado.Listo.push(NColumnas);

    Listado.Cantidad.fill("");
    Listado.Precios.fill("");
    Listado.Listo.fill(false);

  }

  Lista_Articulos = Listado.Articulos;
  Lista_Cantidad  = Listado.Cantidad;
  Lista_Precios   = Listado.Precios;
  Lista_Listo     = Listado.Listo;

  for (var i = 1; i < NColumnas; i++) {
    agregarFila(Lista_Articulos[i], Lista_Cantidad[i], Lista_Precios[i], Lista_Listo[i] , i , 0);
  };


  if (Listado.Fondo != null){
    var Cuerpo = document.getElementById("Body2");
    Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
  }

  Ocultar_celdas();

}); 


hamburguesa.addEventListener("click",function(){
  var Visible = document.getElementById("movil-menu").hidden;
 
  if (Visible == true){
    document.getElementById("movil-menu").hidden = false;
  } else {
    document.getElementById("movil-menu").hidden = true;
  }

}); 


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


Editar.addEventListener('click', function() {
  GuardarLocal();
});  

Guardar_Listado.addEventListener('click', function() {
  GuardarLocal();
  document.getElementById("Guardado_Lista").style.display ="block";

  // Ejecutar una acción después de 2 segundos
  setTimeout(() => {
    document.getElementById("Guardado_Lista").style.display ="none";
  }, 2000);

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


function agregarFila(Articulo, Cantidad, Precio, Listo, Identificador ,Sumar) {
  
  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

  // Obtén el cuerpo de la tabla
  var tabla = document.getElementById("tabla1").getElementsByTagName('tbody')[0];
  
  // Crea una nueva fila
  var nuevaFila = tabla.insertRow();
      nuevaFila.classList.add("Space_Tabla");
  
  // Crea las celdas para la nueva fila
  var celdaNombre   = nuevaFila.insertCell(0);
  var celdaCantidad = nuevaFila.insertCell(1);
  var celdaPrecio   = nuevaFila.insertCell(2);
  var celdaListo    = nuevaFila.insertCell(3);
 
  var Total_id = Identificador + Sumar;

  celdaNombre.id = "Fila" + Total_id;
  
  if (Cantidad === undefined) {
    Cantidad = "";
  };
  
  if (Precio === undefined) {
    Precio = "";
  };

  if (Listado.EstiloLetra != null){
    celdaNombre.style.fontFamily   = Listado.EstiloLetra;
    celdaCantidad.style.fontFamily = Listado.EstiloLetra;
    celdaPrecio.style.fontFamily   = Listado.EstiloLetra;
  }
  
  if (Listado.TamanoLetra != null){
    celdaNombre.style.fontSize   = Listado.TamanoLetra;
    celdaCantidad.style.fontSize = Listado.TamanoLetra;
    celdaPrecio.style.fontSize   = Listado.TamanoLetra;
  }

  celdaNombre.innerHTML   ='<center>'+Articulo+'</center>';
  celdaCantidad.innerHTML ='<center><input style="width: 50px;"  Class="form-control" type="number" id=Cant'   + Total_id    +' value ='+ Cantidad +'></center>';
  celdaPrecio.innerHTML   ='<center><input style="width: 50px;" Class="form-control" type="number" id=Prec'   + Total_id    +' value ='+ Precio   +'></center>';   
  celdaListo.innerHTML    ='<center><input style="height: 15px;" class="form-check-input" type="checkbox" id='+ Total_id +'></center>';    
 
  var Listo_Check = document.getElementById(Total_id);
      Listo_Check.checked = Listo;
      
  if (Listo_Check.checked == true) {
   var Elemento = document.getElementById(celdaNombre.id);
       Elemento.style.color ="lightgray";
       Elemento.disabled = true;

   var Elemento = document.getElementById("Cant"+Total_id);
       Elemento.style.color ="lightgray";
       Elemento.disabled = true;

   var Elemento = document.getElementById("Prec"+Total_id);
       Elemento.style.color ="lightgray";
       Elemento.disabled = true;
  }
        

  if (Listo_Check.checked == false) {
   var Elemento = document.getElementById(celdaNombre.id);
       Elemento.style.color ="black";
       Elemento.disabled = false;
  var Elemento = document.getElementById("Cant"+Total_id);
       Elemento.style.color ="black";
       Elemento.disabled = false;
  var Elemento = document.getElementById("Prec"+Total_id);
       Elemento.style.color ="black";
       Elemento.disabled = false;
  }

};


function GuardarLocal() {

  var Nombre = localStorage.getItem("Nombre_Lista");             
  var Listado= JSON.parse(localStorage.getItem(Nombre));

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

  Listado.Articulo = ArrayArticulo;
  Listado.Cantidad = ArrayCantidad;
  Listado.Precios  = ArrayPrecios;
  Listado.Listo    = ArrayListo;

  localStorage.setItem(Nombre, JSON.stringify(Listado)); //Guardo Lista con sus componentes

};


Borrar_Campos.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'block';
});


Aceptar.addEventListener('click', function() {

  let filas = document.getElementById("tabla1").rows;

  for (let i = 1; i < filas.length; i++) {

    var ArticuloId = "Fila" + i;
    var CantidadId = "Cant" + i;  
    var PrecioId   = "Prec" + i;  
    var ListoId   = i;

    document.getElementById(ArticuloId).style.color ="black";


    document.getElementById(CantidadId).value = "";
    document.getElementById(CantidadId).style.color ="black";
    document.getElementById(CantidadId).disabled =false;
    
    document.getElementById(PrecioId  ).value = "";
    document.getElementById(PrecioId).style.color ="black";
    document.getElementById(PrecioId).disabled =false;

    document.getElementById(ListoId  ).checked = false;

  }

  document.getElementById('popupOverlay').style.display = 'none';

});


Cancelar.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
});



function Ocultar_celdas() {

  var tabla = document.getElementById("tabla1");
  var filas = tabla.getElementsByTagName("tr");
  var NColumnas = filas.length;  

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


function ordenarPorCheckbox() {

  const tabla = document.getElementById("tabla1");
  const cuerpoTabla = tabla.querySelector("tbody");
  const filas = Array.from(cuerpoTabla.rows);

  // Ordenar las filas en función del estado del checkbox
  filas.sort((filaA, filaB) => {
      const checkboxA = filaA.querySelector("input[type='checkbox']");
      const checkboxB = filaB.querySelector("input[type='checkbox']");
      return checkboxB.checked - checkboxA.checked; // Orden descendente: checkboxes marcados primero
  });

  // Reinsertar las filas en el cuerpo de la tabla en el nuevo orden
  filas.forEach(fila => cuerpoTabla.appendChild(fila));

}