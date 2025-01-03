
window.addEventListener("load",function(){

  document.getElementById("Permiso_Microfono").style.display  = 'none';
  document.getElementById("movil-menu").hidden = true;

  document.getElementById("Contenedor_Acerca").style.display ="none";

  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
      console.log("Permiso concedido.");
  })
  .catch(function(err) {
      console.error("Permiso denegado: ", err);
      document.getElementById("Permiso_Microfono").style.display  = 'block';
  });

  var Nombre = localStorage.getItem("Nombre_Lista");       
  var Listado= JSON.parse(localStorage.getItem(Nombre));
 
  document.getElementById('alert-danger').style.display  = 'none';
  document.getElementById('alert-warning').style.display = 'none';
  document.getElementById('alert-Listas_Disponibles').style.display = 'none';
  document.getElementById('alert-danger-import').style.display  = 'none';
  document.getElementById('alert-warning-import').style.display = 'none';
  document.getElementById('alert-info-import').style.display = 'none';

 if (Listado != null){
     var Cuerpo = document.getElementById("Body_index");
     Cuerpo.style.backgroundImage = "url("+ Listado.Fondo +")";
 } else {
   var Cuerpo = document.getElementById("Body_index");
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

Acerca_Index.addEventListener("click",function(){
  document.getElementById("tabla_index"      ).style.display ="none";
  document.getElementById("Contenedor_Acerca").style.display ="block";

  document.getElementById("Ayuda").style.display ="none";
  document.getElementById("Permiso_Microfono").style.display ="none";

  hamburguesa.click();
}); 


mostrarPopup_Lista_Nueva.addEventListener('click', function() {
  document.getElementById('popupOverlay'    ).style.display = 'block';
  document.getElementById('Crear_Listado'   ).style.display = 'block';
  document.getElementById('Abrir_Listado'   ).style.display = 'none';
  document.getElementById('Importar_Listado').style.display = 'none';
});  


mostrarPopup_Listado.addEventListener('click', function() {
  document.getElementById('popupOverlay'    ).style.display = 'block';
  document.getElementById('Crear_Listado'   ).style.display = 'none';
  document.getElementById('Abrir_Listado'   ).style.display = 'block';
  document.getElementById('Importar_Listado').style.display = 'none';

  const tbody = document.querySelector('#tabla_Index tbody');
  tbody.innerHTML = '';

  if (localStorage.length > 0) {

    for (let i = 0; i < localStorage.length; i++) {
      Agregar_Listado_LocalStorage(localStorage.key(i));
    }

  } else {
    document.getElementById('alert-Listas_Disponibles').style.display = 'block';
  };
  
});  


mostrarPopup_Importar.addEventListener('click', function() {
  document.getElementById('popupOverlay'    ).style.display = 'block';
  document.getElementById('Crear_Listado'   ).style.display = 'none';
  document.getElementById('Abrir_Listado'   ).style.display = 'none';
  document.getElementById('Importar_Listado').style.display = 'block';
});  



Aceptar_Lista_New.addEventListener('click', function() {

  var ListaNueva = document.getElementById("Nombre_Listado").value;
  var N = localStorage.length;
  
  if (ListaNueva !== "") {

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

          setTimeout(() => {
            document.getElementById('alert-danger').style.display ="none";
          }, 2000);

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
    document.getElementById('alert-warning').style.display  = 'block' ;

    setTimeout(() => {
      document.getElementById('alert-warning').style.display ="none";
    }, 2000);

  }

});  



Aceptar_Importada.addEventListener('click', function() {

  var Nombre_ListaNueva = document.getElementById("Nombre_Listado_Importado").value;
  var Lista_Recibida = document.getElementById("textarea").value;
  var N = localStorage.length;

  if (Nombre_ListaNueva !== "") {
  
    if (N == 0) {
      console.log("Se grabo Registro");
      localStorage.setItem("Nombre_Lista", Nombre_ListaNueva);            //Guardo Nombre de la lista Nueva
      localStorage.setItem(Nombre_ListaNueva, Lista_Recibida);   //Guardo Lista recibida con sus componentes
  
      let value;
      try {
          value = JSON.parse(localStorage.getItem(Nombre_ListaNueva));
          window.location.href = 'Entrada_Voz.html';
      } catch (e) {
        localStorage.removeItem("Nombre_Lista");
        localStorage.removeItem(Nombre_ListaNueva);
        console.log("Error, se borro "+ Nombre_ListaNueva);
        document.getElementById('alert-info-import').style.display = 'block';

        setTimeout(() => {
          document.getElementById('alert-info-import').style.display ="none";
        }, 2000);

      }
  
    } else {

      var Contador = 0;
  
      for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
           
        if (Nombre_ListaNueva == key){
          document.getElementById('alert-danger-import').style.display   = 'block';

          setTimeout(() => {
            document.getElementById('alert-danger-import').style.display ="none";
          }, 2000);

          break;
        } else { Contador++;}
  
      }
  
      if (Contador == localStorage.length){
        
        console.log("Se grabo Registro");
        localStorage.setItem("Nombre_Lista", Nombre_ListaNueva);            //Guardo Nombre de la lista Nueva
        localStorage.setItem(Nombre_ListaNueva, Lista_Recibida);   //Guardo Lista recibidacon sus componentes
  
        let value;
        try {
            value = JSON.parse(localStorage.getItem(Nombre_ListaNueva));
            window.location.href = 'Entrada_Voz.html';
        } catch (e) {
          localStorage.removeItem("Nombre_Lista");
          localStorage.removeItem(Nombre_ListaNueva);
          console.log("Error, se borro "+ Nombre_ListaNueva);
          document.getElementById('alert-info-import').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alert-info-import').style.display ="none";
          }, 2000);

        }
      
      }

    }


  } else { 
    document.getElementById('alert-warning-import').style.display  = 'block';

    setTimeout(() => {
      document.getElementById('alert-warning-import').style.display ="none";
    }, 2000);

  }

});  



Cancelar_Lista_New.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
});  

Cancelar_Listado.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
});  

Cancelar_Importada.addEventListener('click', function() {
  document.getElementById('popupOverlay').style.display = 'none';
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






