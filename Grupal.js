window.addEventListener("load", function () {
  //localStorage.clear();
  const Moneda = localStorage.getItem("Moneda");
  document.getElementById("costo_Kwh").placeholder =
    "Costo Kwh (" + Moneda + ")";

  const tabla = document.getElementById("Tabla_cargas"); // o como se llame tu tabla
  const celdas = tabla.querySelectorAll("td");
  celdas.forEach((celda) => {
    celda.style.backgroundColor = "white"; // Fondo blaco
    celda.style.color = "black";
    celda.style.backgroundColor = "white";
  });
});

//Inicio Funciones
function Unidad_potencia(Unidad) {
  if (Unidad === "KW") {
    return 1;
  }

  if (Unidad === "W") {
    return 1 / 1000;
  }

  if (Unidad === "Hp") {
    return 0.745;
  }
}

function Unidad_tiempo(Unidad) {
  if (Unidad === "horas") {
    return 1;
  } else {
    return 1 / 60;
  }
}

let contador = 1;

function agregarTabla() {
  contador++;

  const contenedor = document.getElementById("contenedor-tablas");

  const nuevaTabla = document.createElement("table");
  nuevaTabla.id = `Tabla${contador}`;
  nuevaTabla.className = "Tabla_elementos";

  nuevaTabla.innerHTML = `
      <tbody>
        <tr>
          <td>Equipo</td>
          <td>
            <input type="text" class="form-control" id="equipo${contador}"placeholder="ejemplo: Nevera" />
          </td>
        </tr>
        <tr>
          <td>Potencia</td>
          <td style="display: flex">
            <input type="number" class="form-control Input_potencia_grup" id="potencia${contador}" />
            <select id="Unidad${contador}" class="form-select Select_unidad_grup">
              <option value="W">W</option>
              <option value="KW">KW</option>
              <option value="Hp">Hp</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Cantidad</td>
          <td>
            <input type="number" class="form-control Input_potencia_grup" id="cantidad${contador}" placeholder="# de equipos" />
          </td>
        </tr>
        <tr>
          <td>Uso diario</td>
          <td style="display: flex">
            <input type="number" class="form-control Input_potencia_grup" id="tiempo${contador}" placeholder="horas o min." />
            <select id="Unidad_tiempo${contador}" class="form-select Select_unidad_grup">
              <option value="horas">horas</option>
              <option value="minutos">min.</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Días</td>
          <td>
            <input type="number" class="form-control Input_potencia_grup" id="dias${contador}" placeholder="# días al mes" />
          </td>
        </tr>
        <tr>
          <td>
            <button style="border-radius: 5px" onclick="carga_predeterminada('Tabla${contador}')">Archivo</button>
          </td>  
          <td>
            <button style="border-radius: 5px" onclick="eliminar_carga('Tabla${contador}')">Eliminar carga</button>
          </td>
        </tr>
      </tbody>
    `;
  contenedor.appendChild(nuevaTabla);
}

function carga_seleccionada(boton) {
  const tdPadre = boton.parentElement;

  const tdEquipo = tdPadre.previousElementSibling.previousElementSibling;
  const tdPotencia = tdPadre.previousElementSibling;

  const Equipo = tdEquipo.textContent.trim();
  const Potencia = tdPotencia.textContent.trim();

  // Aquí puedes usar `nombre` y `potencia` como necesites

  const Id = localStorage.getItem("Id_select");
  const Id_potencia = "potencia" + Id.replace(/\D/g, ""); // Elimina todo lo que NO es dígito;
  const Id_equipo = "equipo" + Id.replace(/\D/g, ""); // Elimina todo lo que NO es dígito;

  document.getElementById(Id_potencia).value = Potencia;
  document.getElementById(Id_equipo).value = Equipo;

  cerrarModal();
}

function carga_predeterminada(Id_select) {
  localStorage.setItem("Id_select", Id_select);
  document.getElementById("modalResultado").style.display = "flex";
}

function Calcular() {
  const Moneda = localStorage.getItem("Moneda");
  const tarifa = document.getElementById("costo_Kwh").value;
  let Proceso_validado = true;

  if (!Moneda) {
    return;
  }

  let KWHdiarios = [];
  let Costo_hora = [];
  let Costo_dia = [];
  let Costo_mes = [];
  let Costo_year = [];

  const todasLasTablas = document.querySelectorAll("table");

  todasLasTablas.forEach((table) => {
    if (table.id) {
      if (table.id !== "tablaEquipos" && table.id !== "Tabla_cargas") {
        let i = table.id.match(/\d+/g); // ["1", "3", "45"]

        let Id_equipo = "equipo" + i;
        let Id_potencia = "potencia" + i;
        let Id_unidad_pot = "Unidad" + i;
        let Id_cantidad = "cantidad" + i;
        let Id_tiempo = "tiempo" + i;
        let Id_unidad_tiempo = "Unidad_tiempo" + i;
        let Id_dias = "dias" + i;

        let equipo = document.getElementById(Id_equipo).value;
        let potencia = document.getElementById(Id_potencia).value;
        let unidad_pot = document.getElementById(Id_unidad_pot).value;
        let cantidad = document.getElementById(Id_cantidad).value;
        let uso_diario = document.getElementById(Id_tiempo).value;
        let unidad_tiempo = document.getElementById(Id_unidad_tiempo).value;
        let dias = document.getElementById(Id_dias).value; //dias al mes

        if (
          Validar_datos(
            tarifa,
            equipo,
            potencia,
            cantidad,
            uso_diario,
            unidad_tiempo,
            dias
          )
        ) {
          Proceso_validado = false;
          return;
        }

        let KWH_diarios =
          cantidad *
          potencia *
          Unidad_potencia(unidad_pot) *
          uso_diario *
          Unidad_tiempo(unidad_tiempo);

        let Costohora =
          cantidad * potencia * Unidad_potencia(unidad_pot) * tarifa;
        let Costodia = Costohora * uso_diario * Unidad_tiempo(unidad_tiempo);
        let Costomes = Costodia * dias;
        let Costoyear = Costomes * 12;

        console.log(Costodia);

        KWHdiarios.push(KWH_diarios);
        Costo_hora.push(Costohora);
        Costo_dia.push(Costodia);
        Costo_mes.push(Costomes);
        Costo_year.push(Costoyear);

        agregarFila(equipo, cantidad, KWH_diarios);
      }
    }
  });

  if (Proceso_validado) {
    const suma_KWHdiarios = KWHdiarios.reduce((a, b) => a + b, 0);
    const suma_Costo_hora = Costo_hora.reduce((a, b) => a + b, 0);
    const suma_Costo_dia = Costo_dia.reduce((a, b) => a + b, 0);
    const suma_Costo_mes = Costo_mes.reduce((a, b) => a + b, 0);
    const suma_Costo_year = Costo_year.reduce((a, b) => a + b, 0);

    document.getElementById("Total_kwh_diario").innerHTML =
      "<strong>Consumo diario Total:" +
      "&nbsp;" +
      "</strong>" +
      " " +
      suma_KWHdiarios.toFixed(2) +
      " Kwh";

    document.getElementById("Precio_hora").innerHTML =
      " " +
      suma_Costo_hora.toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      Moneda;

    document.getElementById("Precio_dia").innerHTML =
      " " +
      suma_Costo_dia.toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      Moneda;
    document.getElementById("Precio_mes").innerHTML =
      " " +
      suma_Costo_mes.toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      Moneda;
    document.getElementById("Precio_ano").innerHTML =
      " " +
      suma_Costo_year.toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      Moneda;
    document.getElementById("modalResultado1").style.display = "flex";
  }
}

function agregarFila(Name_equipo, Cantidad, Kwh_equipo) {
  const tbody = document.querySelector("#tablaEquipos tbody");

  // Crear nueva fila
  const fila = document.createElement("tr");

  // Celda para el nombre del equipo
  const tdEquipo = document.createElement("td");
  tdEquipo.textContent = Name_equipo;

  // Celda para Cantidad de equipos
  const tdCantidad = document.createElement("td");
  tdCantidad.textContent = Cantidad;

  // Celda para el kWh diario
  const tdKwh = document.createElement("td");
  tdKwh.textContent = Kwh_equipo.toFixed(2) + " Kwh";

  // Agregar celdas a la fila
  fila.appendChild(tdEquipo);
  fila.appendChild(tdCantidad);
  fila.appendChild(tdKwh);

  // Agregar fila al cuerpo de la tabla
  tbody.appendChild(fila);
}

function agregarFila_equipos() {
  const tbody = document.querySelector("#Tabla_cargas tbody");

  // Crear nueva fila
  const fila = document.createElement("tr");

  // Celda para el nombre del equipo
  const tdEquipo = document.createElement("td");
  tdEquipo.textContent = "Equipo Nuevo";
  tdEquipo.className = "filas";
  tdEquipo.onclick = function () {
    eliminar_equipo(this);
  };
  // Celda para los Watts del equipo
  const tdKwh = document.createElement("td");
  tdKwh.textContent = "";
  tdKwh.className = "filas";
  tdKwh.onclick = function () {
    eliminar_equipo(this);
  };

  // Celda para el botón
  const tdBoton = document.createElement("td");
  const boton = document.createElement("button");
  boton.className = "btn_carga";
  boton.textContent = "+";
  boton.style.borderRadius = "5px";
  boton.onclick = function () {
    carga_seleccionada(this);
  };
  tdBoton.appendChild(boton);

  // Agregar celdas a la fila
  fila.appendChild(tdEquipo);
  fila.appendChild(tdKwh);
  fila.appendChild(tdBoton);

  // Insertar fila al principio
  tbody.insertBefore(fila, tbody.firstChild);

  // Hacer scroll a la nueva fila
  fila.scrollIntoView({ behavior: "smooth", block: "center" });

  // Hacer las dos primeras celdas editables y con estilo
  [tdEquipo, tdKwh].forEach((celda) => {
    celda.setAttribute("contenteditable", "true");
    celda.style.backgroundColor = "#ffffcc";
    celda.style.color = "#d60000";
  });
}

function accion_tabla() {
  const accion = document.getElementById("acciones").value;
  const tabla = document.getElementById("Tabla_cargas");
  const celdas = tabla.querySelectorAll("td");
  celdas.forEach((celda) => {
    celda.setAttribute("contenteditable", "false");
    celda.style.backgroundColor = "white"; // Fondo blaco
    celda.style.color = "black";
  });

  if (accion === "Editar") {
    celdas.forEach((celda) => {
      celda.setAttribute("contenteditable", "true");
      celda.style.backgroundColor = "#ffffcc"; // Fondo amarillo claro
    });
  }

  if (accion == "Agregar") {
    agregarFila_equipos();
  }

  if (accion == "Eliminar") {
    celdas.forEach((celda) => {
      celda.setAttribute("contenteditable", "false");
      celda.style.backgroundColor = "#ffe6e6"; // Fondo rojo claro
    });
  }

  if (accion == "Recargar") {
    localStorage.clear();
    cargar_tabla_inicial();
    cerrarModal();
  }
}

function cerrarModal() {
  document.getElementById("modalResultado").style.display = "none";
  document.getElementById("modalResultado1").style.display = "none";

  // Eliminar todas las filas del tbody
  const tbody = document.querySelector("#tablaEquipos tbody");
  tbody.innerHTML = ""; // Elimina todo el contenido del tbody
}

function eliminar_carga(idTabla) {
  const tabla = document.getElementById(idTabla);
  if (tabla) {
    tabla.remove();
  }
}

function eliminar_equipo(td) {
  const Acciones = document.getElementById("acciones").value;

  if (Acciones == "Eliminar") {
    const fila = td.closest("tr"); // obtiene el <tr> más cercano
    fila.remove(); // elimina la fila
  }
}

function Validar_datos(
  tarifa,
  equipo,
  potencia,
  cantidad,
  uso_diario,
  unidad_tiempo,
  dias
) {
  if (tarifa == "") {
    document.getElementById("warning").innerText =
      "Debe ingresar el valor de la tarifa de sus Kwh.";
    document.getElementById("modalResultado2").style.display = "flex";
    setTimeout(() => {
      document.getElementById("modalResultado2").style.display = "none";
    }, 3000);
    return true;
  }

  if (equipo == "") {
    document.getElementById("warning").innerText =
      "Debe ingresar el nombre de todos los equipos.";
    document.getElementById("modalResultado2").style.display = "flex";
    setTimeout(() => {
      document.getElementById("modalResultado2").style.display = "none";
    }, 3000);
    return true;
  }

  if (potencia == "") {
    document.getElementById("warning").innerText =
      "Debe ingresar el valor de potencia de todos los equipos.";
    document.getElementById("modalResultado2").style.display = "flex";
    setTimeout(() => {
      document.getElementById("modalResultado2").style.display = "none";
    }, 3000);
    return true;
  }

  if (cantidad == "") {
    document.getElementById("warning").innerText =
      "Debe ingresar las cantidades de todos los equipos.";
    document.getElementById("modalResultado2").style.display = "flex";
    setTimeout(() => {
      document.getElementById("modalResultado2").style.display = "none";
    }, 3000);
    return true;
  }

  if (unidad_tiempo == "horas") {
    if (uso_diario > 24) {
      document.getElementById("warning").innerText =
        "Debe ingresar un valor de horas diarias de uso que no supere las 24 horas.";
      document.getElementById("modalResultado2").style.display = "flex";
      setTimeout(() => {
        document.getElementById("modalResultado2").style.display = "none";
      }, 3000);
      return true;
    }
  } else {
    if (uso_diario > 1440) {
      document.getElementById("warning").innerText =
        "Debe ingresar un valor de minutos diarios de uso que no supere los 1440 minutos (24 horas).";
      document.getElementById("modalResultado2").style.display = "flex";
      setTimeout(() => {
        document.getElementById("modalResultado2").style.display = "none";
      }, 3000);
      return true;
    }
  }

  if (dias > 31) {
    document.getElementById("warning").innerText =
      "Debe ingresar un valor de dias de uso al mes que no supere los 31 dias.";
    document.getElementById("modalResultado2").style.display = "flex";
    setTimeout(() => {
      document.getElementById("modalResultado2").style.display = "none";
    }, 3000);
    return true;
  }

  return false;
}

function guardar_tabla() {
  const tabla = document.getElementById("Tabla_cargas"); // o como se llame tu tabla
  localStorage.setItem("Tabla_cargas", tabla.outerHTML);

  const celdas = tabla.querySelectorAll("td");
  celdas.forEach((celda) => {
    celda.setAttribute("contenteditable", "false");
    celda.style.backgroundColor = "white"; // Fondo blaco
    celda.style.color = "black";
  });

  cerrarModal();
}

function cargar_tabla_inicial() {
  const contenedor = document.getElementById("Contenedor_tabla_cargas"); // el div donde quieres colocarla

  contenedor.innerHTML = `
                       <table id="Tabla_cargas" class="Tabla_elementos_predefinidos">
                         <thead>
                           <tr>
                             <th class="filas">Nombre Equipo</th>
                             <th class="filas">Potencia (Watts)</th>
                             <th></th>
                           </tr>
                         </thead>
                         <tbody>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Refrigerador
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">200</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Congelador
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">300</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Estufa eléctrica (hornilla)
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1500
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Horno eléctrico
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               3500
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Microondas
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1200
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Cafetera eléctrica
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1000
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Licuadora
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">500</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Lavadora de ropa
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">400</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Secadora eléctrica
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               4500
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Ventilador de techo
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">75</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Plancha eléctrica
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1500
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Secador de pelo
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1200
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               TV LED
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">100</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Computadora de escritorio
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">200</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Laptop
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">60</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Router / Módem WiFi
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">10</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Bombillo LED
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">10</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Bomba de agua (1 HP)
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">745</td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Calentador de agua eléctrico
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               4500
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                           <tr>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               Horno tostador
                             </td>
                             <td class="filas" onclick="eliminar_equipo(this)">
                               1200
                             </td>
                             <td>
                               <button class ="btn_carga"
                                 style="border-radius: 5px"
                                 onclick="carga_seleccionada(this)"
                               >
                                 +
                               </button>
                             </td>
                           </tr>
                         </tbody>
                       </table> `;
}
//Fin Funciones
