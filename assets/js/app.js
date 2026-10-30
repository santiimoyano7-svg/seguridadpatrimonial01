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
