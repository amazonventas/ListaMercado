document.addEventListener("DOMContentLoaded", () => {
  //localStorage.clear();
});

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  changeLanguage(savedLang);
});

function changeLanguage(Valor) {
  let lang = "";

  if (Valor) {
    lang = Valor;
    Placeholder(lang);
  } else {
    const idioma = document.getElementById("Idioma").value;

    if (idioma == "es") {
      lang = "es";
      Placeholder(lang);
    }
    if (idioma == "en") {
      lang = "en";
      Placeholder(lang);
    }
  }

  fetch(`idiomas/${lang}.json`)
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
      // Guarda el idioma en localStorage
      localStorage.setItem("lang", lang);
    });
}

function Placeholder(idioma) {
  if (idioma === "es") {
    document.getElementById("Area").placeholder = "metros²";
    document.getElementById("Altura").placeholder = "metros";
    document.getElementById("Npersonas").placeholder = "Cantidad";
    document.getElementById("Nelectrodomesticos").placeholder =
      "#Electrodomesticos";
  } else {
    document.getElementById("Area").placeholder = "meters²";
    document.getElementById("Altura").placeholder = "meters";
    document.getElementById("Npersonas").placeholder = "Amount";
    document.getElementById("Nelectrodomesticos").placeholder = "#Appliances";
  }
}

function Page_Acerca_de() {
  window.location.href = "Acerca_de.html";
}

//Inicio Funciones

function Mostrar_menu() {
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menuLateral");
  if (menu.style.right === "0px") {
    menu.style.right = "-200px"; // ocultar
  } else {
    menu.style.right = "0px"; // mostrar
  }
}

function Calcular_BTU() {
  const Area = document.getElementById("Area").value;
  const Altura = document.getElementById("Altura").value;
  const Con_ventanas = document.getElementById("Ventanas_check").checked;
  const Tipo_ambiente = document.getElementById("Tipo_ambiente").value;
  const Npersonas = document.getElementById("Npersonas").value;
  const Nelectrodo = document.getElementById("Nelectrodomesticos").value;
  const Tipo_Cocina = localStorage.getItem("TipoCocina");
  const BTUcocinas = BTU_cocinas(Tipo_Cocina);

  let Factor_ambiente;

  if (Tipo_ambiente == "Sombra") {
    Factor_ambiente = 150;
  }

  if (Tipo_ambiente == "Caluroso") {
    Factor_ambiente = 200;
  }

  const Btu_totales =
    FVentanas(Con_ventanas) *
    (Area * Altura * Factor_ambiente +
      Nro_personas(Npersonas) +
      Nro_electro(Nelectrodo) +
      BTUcocinas);
  document.getElementById("BTU").textContent =
    Formato_Ceros(Btu_totales) + " BTU/h";

  document.getElementById("Valor_comercial").style.display = "block";
  document.getElementById("ninguno").style.display = "none";
  document.getElementById("Fuera_rango").style.display = "none";

  document.getElementById("Valor_comercial").textContent =
    AA_Comercial(Btu_totales);

  document.getElementById("Resultados_BTU").style.display = "block";
}

function Formato_Ceros(num) {
  return parseFloat(num.toFixed(2)).toString();
}

function Nro_personas(valor) {
  if (valor <= 2) {
    return 0;
  } else {
    return valor * 600; //Btu por personas;
  }
}

function Nro_electro(valor) {
  return valor * 400; //Btu por electrodomestico;
}

function FVentanas(Tiene_ventanas) {
  if (Tiene_ventanas == true) {
    return 1.1;
  } else {
    return 1;
  }
}

function Tipo_cocina() {
  const seleccion = document.getElementById("Cocina_check").checked;

  if (seleccion == true) {
    document.getElementById("Cocina").style.display = "block";
  }
}

function Aceptar_cocina() {
  const Seleccion = document.getElementById("Tipo_Cocina").value;
  if (Seleccion == "Ninguna") {
    document.getElementById("Cocina_check").checked = false;
  }
  localStorage.setItem("TipoCocina", Seleccion);
  document.getElementById("Cocina").style.display = "none";
}

function cerrarModal() {
  document.getElementById("Resultados_BTU").style.display = "none";
}

function cerrarModal_cocina() {
  document.getElementById("Cocina").style.display = "none";
  document.getElementById("Cocina_check").checked = false;
}

function Select_cocinas() {
  const Seleccion = document.getElementById("Tipo_Cocina").value;
  if (Seleccion == "Pequena") {
    document.getElementById("Cocina_pequeña").style.display = "block";
    document.getElementById("Cocina_mediana").style.display = "none";
    document.getElementById("Cocina_grande").style.display = "none";
  }
  if (Seleccion == "Mediana") {
    document.getElementById("Cocina_pequeña").style.display = "none";
    document.getElementById("Cocina_mediana").style.display = "block";
    document.getElementById("Cocina_grande").style.display = "none";
  }
  if (Seleccion == "Grande") {
    document.getElementById("Cocina_pequeña").style.display = "none";
    document.getElementById("Cocina_mediana").style.display = "none";
    document.getElementById("Cocina_grande").style.display = "block";
  }
}

function BTU_cocinas(Valor) {
  const Check_cocina = document.getElementById("Cocina_check").checked;

  if (Check_cocina) {
    if (Valor) {
      if (Valor == "Ninguna") {
        return 0;
      }
      if (Valor == "Pequena") {
        return 1000;
      }
      if (Valor == "Mediana") {
        return 1500;
      }
      if (Valor == "Grande") {
        return 2000;
      }
    } else {
      console.log("No existe");
      return 0;
    }
  } else {
    return 0;
  }
}

function AA_Comercial(Valor) {
  if (Valor == 0) {
    document.getElementById("Valor_comercial").style.display = "none";
    document.getElementById("ninguno").style.display = "block";
    document.getElementById("Fuera_rango").style.display = "none";
    return;
  }

  const CAP = new Array(15);
  CAP[1] = 6000;
  CAP[2] = 9000;
  CAP[3] = 12000;
  CAP[4] = 18000;
  CAP[5] = 24000;
  CAP[6] = 30000;
  CAP[7] = 36000;
  CAP[8] = 42000;
  CAP[9] = 48000;
  CAP[10] = 60000;
  CAP[11] = 72000;
  CAP[12] = 84000;
  CAP[13] = 96000;
  CAP[14] = 120000;

  for (let i = 1; i < CAP.length; i++) {
    if (CAP[i] >= Valor) {
      return CAP[i] + " BTU/h";
    }
  }
  document.getElementById("Valor_comercial").style.display = "none";
  document.getElementById("ninguno").style.display = "none";
  document.getElementById("Fuera_rango").style.display = "block";
  return "Valores fuera de rango";
}
