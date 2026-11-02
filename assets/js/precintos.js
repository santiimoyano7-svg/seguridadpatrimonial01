/* ==========================
   SP360 - PRECINTOS
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let precintosSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_precintos"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarPrecintos(){

    localStorage.setItem(

        "sp360_precintos",

        JSON.stringify(
            precintosSP360
        )

    );

}

/* ==========================
   ESTADOS
========================== */

const estadosPrecinto = {

    CONFORME:
    "Conforme",

    OBSERVACION:
    "Observación",

    NO_CONFORME:
    "No Conforme"

};

/* ==========================
   REGISTRAR CONTROL
========================== */

function registrarControlPrecinto({

    salidaEmergencia,

    numeroPrecinto,

    estado,

    observacion

}){

    const trazabilidad =
        crearTrazabilidad();

    const registro = {

        id:
        `PRE-${Date.now()}`,

        salidaEmergencia,

        numeroPrecinto,

        estado,

        observacion,

        sitio:
        trazabilidad.sitio,

        usuario:
        trazabilidad.usuario,

        rol:
        trazabilidad.rol,

        fecha:
        trazabilidad.fecha,

        hora:
        trazabilidad.hora

    };

    precintosSP360.push(
        registro
    );

    guardarPrecintos();

    validarPrecinto(
        registro
    );

    return registro;

}

/* ==========================
   VALIDAR
========================== */

function validarPrecinto(
    registro
){

    if(
        registro.estado ===
        estadosPrecinto.CONFORME
    ){

        return;

    }

    let criticidad =
        criticidades.MEDIA;

    if(
        registro.estado ===
        estadosPrecinto.NO_CONFORME
    ){

        criticidad =
        criticidades.ALTA;

    }

    crearNovedad({

        modulo:
        "Precintos",

        titulo:
        `Precinto ${registro.numeroPrecinto}`,

        descripcion:

        `
Salida de Emergencia:
${registro.salidaEmergencia}

Precinto:
${registro.numeroPrecinto}

Estado:
${registro.estado}

Observación:
${registro.observacion}
        `,

        criticidad

    });

}

/* ==========================
   CONSULTAS
========================== */

function obtenerPrecintos(){

    return precintosSP360;

}

function obtenerPrecintoPorId(id){

    return precintosSP360.find(

        precinto =>
        precinto.id === id

    );

}

/* ==========================
   FILTROS
========================== */

function obtenerPrecintosConformes(){

    return precintosSP360.filter(

        p =>

        p.estado ===
        estadosPrecinto.CONFORME

    );

}

function obtenerPrecintosObservados(){

    return precintosSP360.filter(

        p =>

        p.estado ===
        estadosPrecinto.OBSERVACION

    );

}

function obtenerPrecintosNoConformes(){

    return precintosSP360.filter(

        p =>

        p.estado ===
        estadosPrecinto.NO_CONFORME

    );

}

function obtenerPrecintosPorSalida(
    salidaEmergencia
){

    return precintosSP360.filter(

        p =>

        p.salidaEmergencia ===
        salidaEmergencia

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasPrecintos(){

    return {

        total:
        precintosSP360.length,

        conformes:

        obtenerPrecintosConformes()
        .length,

        observaciones:

        obtenerPrecintosObservados()
        .length,

        noConformes:

        obtenerPrecintosNoConformes()
        .length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPIPrecintos(){

    return obtenerEstadisticasPrecintos();

}

/* ==========================
   MODULO
========================== */

function cargarModuloPrecintos(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasPrecintos();

    content.innerHTML = `

        <h2>
            🚪 Precintos
        </h2>

        <div class="card">

            <strong>
                Total Controles
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                ✅ Conformes
            </strong>

            <br>

            ${stats.conformes}

            <br><br>

            <strong>
                ⚠ Observaciones
            </strong>

            <br>

            ${stats.observaciones}

            <br><br>

            <strong>
                ❌ No Conformes
            </strong>

            <br>

            ${stats.noConformes}

        </div>

        <div class="card">

            Funciones disponibles:

            <br><br>

            ✅ Control por salida de emergencia

            <br>

            ✅ Registro de precintos

            <br>

            ✅ Observaciones

            <br>

            ✅ Generación automática de novedades

            <br>

            ✅ Trazabilidad completa

        </div>

    `;

}
