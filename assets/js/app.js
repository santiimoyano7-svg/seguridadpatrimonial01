/* ==========================
   SP360 APP
========================== */

let alertas =
JSON.parse(
    localStorage.getItem("sp360_alertas")
) || [];

let novedadesTransporte =
JSON.parse(
    localStorage.getItem(
        "sp360_novedades_transporte"
    )
) || [];

let novedadesGuardia =
JSON.parse(
    localStorage.getItem(
        "sp360_libro_guardia"
    )
) || [];

/* ==========================
   GUARDAR DATOS
========================== */

function guardarDatos(){

    localStorage.setItem(
        "sp360_alertas",
        JSON.stringify(alertas)
    );

    localStorage.setItem(
        "sp360_novedades_transporte",
        JSON.stringify(
            novedadesTransporte
        )
    );

    localStorage.setItem(
        "sp360_libro_guardia",
        JSON.stringify(
            novedadesGuardia
        )
    );

}

/* ==========================
   ALERTAS
========================== */

function generarAlerta(
    titulo,
    detalle
){

    alertas.push({

        fecha:
        new Date().toLocaleString(),

        titulo,
        detalle

    });

    guardarDatos();

}

/* ==========================
   NOVEDAD TRANSPORTE
========================== */

function generarNovedadTransporte(
    control,
    estado,
    observacion
){

    const novedad = {

        fecha:
        new Date().toLocaleString
