function cambio_valores() {
  const valor = document.getElementById("unidades").value;

  if (valor == "BTU") {
    const select = document.getElementById("BTU");

    select.options[0].value = "6000";
    select.options[0].textContent = "6000";

    select.options[1].value = "9000";
    select.options[1].textContent = "9000";

    select.options[2].value = "12000";
    select.options[2].textContent = "12000";

    select.options[3].value = "18000";
    select.options[3].textContent = "18000";

    select.options[4].value = "24000";
    select.options[4].textContent = "24000";

    select.options[5].value = "30000";
    select.options[5].textContent = "30000";

    select.options[6].value = "36000";
    select.options[6].textContent = "36000";

    select.options[7].value = "42000";
    select.options[7].textContent = "42000";

    select.options[8].value = "48000";
    select.options[8].textContent = "48000";

    select.options[9].value = "60000";
    select.options[9].textContent = "60000";

    select.options[10].value = "72000";
    select.options[10].textContent = "72000";

    select.options[11].value = "84000";
    select.options[11].textContent = "84000";

    select.options[12].value = "96000";
    select.options[12].textContent = "96000";

    select.options[13].value = "120000";
    select.options[13].textContent = "120000";
  } else {
    const select = document.getElementById("BTU");
    select.options[0].value = "0.5";
    select.options[0].textContent = "0.5";

    select.options[1].value = "0.75";
    select.options[1].textContent = "0.75";

    select.options[2].value = "1";
    select.options[2].textContent = "1";

    select.options[3].value = "1.5";
    select.options[3].textContent = "1.5";

    select.options[4].value = "2";
    select.options[4].textContent = "2";

    select.options[5].value = "2.5";
    select.options[5].textContent = "2.5";

    select.options[6].value = "3";
    select.options[6].textContent = "3";

    select.options[7].value = "3.5";
    select.options[7].textContent = "3.5";

    select.options[8].value = "4";
    select.options[8].textContent = "4";

    select.options[9].value = "5";
    select.options[9].textContent = "5";

    select.options[10].value = "6";
    select.options[10].textContent = "6";

    select.options[11].value = "7";
    select.options[11].textContent = "7";

    select.options[12].value = "8";
    select.options[12].textContent = "8";

    select.options[13].value = "10";
    select.options[13].textContent = "10";
  }
}

function Tipo_calculo() {
  const calculo = document.getElementById("Tipo_calculo").value;

  if (calculo == "basico") {
    document.getElementById("Contenedor_temperaturas").style.display = "none";
    document.getElementById("Contenedor_tipo_equipo").style.display = "none";
  } else {
    document.getElementById("Contenedor_temperaturas").style.display = "flex";
    document.getElementById("Contenedor_tipo_equipo").style.display = "flex";
  }
}

function Calcular_KW() {
  const Tipo_equipo = document.getElementById("Tipo_equipo").value;
  const BTU_h = Conversion_BTU(document.getElementById("BTU").value);
  const Tipo_calculo = document.getElementById("Tipo_calculo").value;
  const SEER = Valor_SEER();
  console.log(SEER);

  if (Tipo_calculo == "basico") {
    const KW_nominal = (BTU_h / (SEER * 1000)).toFixed(3);
    document.getElementById("Resultados_AA").style.display = "flex";
    document.getElementById("potencia").innerText = KW_nominal + " KW";
  }

  if (Tipo_calculo == "avanzado") {
    const T_amb = document.getElementById("Temp_amb").value;
    const T_equip = document.getElementById("Temp_equipo").value;
    const F_uso = Factor_uso(T_amb, T_equip, Tipo_equipo);
    const KW_nominal = BTU_h / (SEER * 1000);
    const KW = (KW_nominal * F_uso).toFixed(3);
    document.getElementById("Resultados_AA").style.display = "flex";
    document.getElementById("potencia").innerText = KW + " KW";
  }
}

function Conversion_BTU(BTU) {
  if (BTU == "0.5" || BTU == "6000") {
    return 6000;
  }
  if (BTU == "0.75" || BTU == "9000") {
    return 9000;
  }
  if (BTU == "1" || BTU == "12000") {
    return 12000;
  }
  if (BTU == "1.5" || BTU == "18000") {
    return 18000;
  }
  if (BTU == "2" || BTU == "24000") {
    return 24000;
  }
  if (BTU == "2.5" || BTU == "30000") {
    return 30000;
  }
  if (BTU == "3" || BTU == "36000") {
    return 36000;
  }
  if (BTU == "3.5" || BTU == "42000") {
    return 42000;
  }
  if (BTU == "4" || BTU == "48000") {
    return 48000;
  }
  if (BTU == "5" || BTU == "60000") {
    return 60000;
  }
  if (BTU == "6" || BTU == "72000") {
    return 72000;
  }
  if (BTU == "7" || BTU == "84000") {
    return 84000;
  }
  if (BTU == "8" || BTU == "96000") {
    return 96000;
  }
  if (BTU == "10" || BTU == "120000") {
    return 120000;
  }

  return false;
}

function Factor_uso(Tamb, Tajuste, equipo) {
  const DeltaT = Tamb - Tajuste;
  console.log(DeltaT);

  if (equipo == "Convencional") {
    if (DeltaT <= 0) {
      return "El equipo no requiere enfriar — ambiente ya está más frío que la temperatura deseada";
    }
    if (DeltaT > 0 && DeltaT <= 2) {
      return 0.2;
    }
    if (DeltaT >= 3 && DeltaT <= 4) {
      return 0.4;
    }
    if (DeltaT >= 5 && DeltaT <= 6) {
      return 0.6;
    }
    if (DeltaT >= 7 && DeltaT <= 8) {
      return 0.8;
    }
    if (DeltaT >= 9) {
      return 1;
    }
  } else {
    if (DeltaT <= 0) {
      return "El equipo no requiere enfriar — ambiente ya está más frío que la temperatura deseada";
    }
    if (DeltaT > 0 && DeltaT <= 2) {
      return 0.6;
    }
    if (DeltaT == 3) {
      return 0.65;
    }
    if (DeltaT == 4) {
      return 0.7;
    }
    if (DeltaT == 5) {
      return 0.75;
    }
    if (DeltaT == 6) {
      return 0.8;
    }
    if (DeltaT == 7) {
      return 0.85;
    }
    if (DeltaT == 8) {
      return 0.9;
    }
    if (DeltaT == 9) {
      return 0.95;
    }
    if (DeltaT >= 10) {
      return 1;
    }
  }
}

function cerrarModal() {
  document.getElementById("Resultados_AA").style.display = "none";
}

function Tipo_equipo() {
  const equipo = document.getElementById("Tipo_equipo").value;

  if (equipo == "Convencional") {
    document.getElementById("convencional").style.display = "flex";
    document.getElementById("gama_media").style.display = "none";
    document.getElementById("gama_alta").style.display = "none";
    document.getElementById("gama_premium").style.display = "none";
  }
  if (equipo == "Inverter_media") {
    document.getElementById("convencional").style.display = "none";
    document.getElementById("gama_media").style.display = "flex";
    document.getElementById("gama_alta").style.display = "none";
    document.getElementById("gama_premium").style.display = "none";
  }
  if (equipo == "Inverter_alta") {
    document.getElementById("convencional").style.display = "none";
    document.getElementById("gama_media").style.display = "none";
    document.getElementById("gama_alta").style.display = "flex";
    document.getElementById("gama_premium").style.display = "none";
  }
  if (equipo == "Inverter_premium") {
    document.getElementById("convencional").style.display = "none";
    document.getElementById("gama_media").style.display = "none";
    document.getElementById("gama_alta").style.display = "none";
    document.getElementById("gama_premium").style.display = "flex";
  }
}

function Valor_SEER() {
  const equipo = document.getElementById("Tipo_equipo").value;

  if (equipo == "Convencional") {
    const SEER = document.getElementById("convencional").value;
    return SEER;
  }
  if (equipo == "Inverter_media") {
    const SEER = document.getElementById("gama_media").value;
    return SEER;
  }
  if (equipo == "Inverter_alta") {
    const SEER = document.getElementById("gama_alta").value;
    return SEER;
  }
  if (equipo == "Inverter_premium") {
    const SEER = document.getElementById("gama_premium").value;
    return SEER;
  }
}
