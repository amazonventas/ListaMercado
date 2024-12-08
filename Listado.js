
// Asignar un solo event listener al contenedor común
document.addEventListener('click', function(event) {
    if (event.target.classList.contains("form-check-input")) {
        
        // Obtener el ID del elemento clickeado
        
        const elementId = event.target.id;
        const Marcado = event.target.checked;
    
        ArticuloId = "Fila" + elementId; 
        
        if (Marcado == true) {
          document.getElementById(ArticuloId).style.color ="red";

        } else {
          document.getElementById(ArticuloId).style.color ="black";
        }
        



    }
  });
  