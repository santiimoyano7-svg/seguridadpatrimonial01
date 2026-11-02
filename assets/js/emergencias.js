/* ==========================
   SP360 - EMERGENCIAS
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let emergenciasSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_emergencias"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarEmergencias(){

    localStorage.setItem(

        "sp360_emergencias",

        JSON.stringify(
            emergenciasSP360
        )

    );

}

/* ==========================
   ORGANISMOS
========================== */

const organismosEmergencia = [

    "Ambulancia",
    "Bomberos",
    "Policía",
    "MAHPI",
    "SUM",
    "Defensa Civil",
    "Otro"

];

/* ==========================
   TIPOS DE EMERGENCIA
========================== */

const tiposEmergencia = [

    "Accidente",
    "Incidente",
    "Enfermedad",
    "Control Preventivo"

];

/* ==========================
   REGISTRAR EMERGENCIA
========================== */

function registrarEmergencia({

    tipo,

    organismo,

    sector,

    movil,

    personalActuante,

    personalMAHPI,

    descripcion,

    resultado

}){

    const trazabilidad =
        crearTrazabilidad();

    const emergencia = {

        id:
            `EMG-${Date.now()}`,

        sitio:
            trazabilidad.sitio,

        tipo,

        organismo,

        sector,

        movil,

        personalActuante,

        personalMAHPI,

        descripcion,

        resultado,

        fecha:
            trazabilidad.fecha,

        hora:
            trazabilidad.hora,

        usuario:
            trazabilidad.usuario,

        rol:
            trazabilidad.rol

    };

    emergenciasSP360.push(
        emergencia
    );

    guardarEmergencias();

    generarNovedadEmergencia(
        emergencia
    );

    return emergencia;

}

/* ==========================
   NOVEDAD AUTOMÁTICA
========================== */

function generarNovedadEmergencia(
    emergencia
){

    let criticidad =
        criticidades.MEDIA;

    if(
        emergencia.tipo ===
        "Accidente"
    ){

        criticidad =
        criticidades.CRITICA;

    }

    if(
        emergencia.tipo ===
        "Incidente"
    ){

        criticidad =
        criticidades.ALTA;

    }

    crearNovedad({

        modulo:
        "Servicios de Emergencia",

        titulo:
        `${emergencia.tipo} - ${emergencia.sector}`,

        descripcion:

        `
Tipo:
${emergencia.tipo}

Organismo:
${emergencia.organismo}

Sector:
${emergencia.sector}

Descripción:
${emergencia.descripcion}

Resultado:
${emergencia.resultado}
        `,

        criticidad

    });

}

/* ==========================
   CONSULTAS
========================== */

function obtenerEmergencias(){

    return emergenciasSP360;

}

function obtenerEmergenciaPorId(
    id
){

    return emergenciasSP360.find(

        e =>
        e.id === id

    );

}

/* ==========================
   FILTROS
========================== */

function obtenerEmergenciasPorTipo(
    tipo
){

    return emergenciasSP360.filter(

        emergencia =>

        emergencia.tipo === tipo

    );

}

function obtenerEmergenciasPorSitio(
    sitio
){

    return emergenciasSP360.filter(

        emergencia =>

        emergencia.sitio === sitio

    );

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasEmergencias(){

    return {

        total:
        emergenciasSP360.length,

        accidentes:

        obtenerEmergenciasPorTipo(
            "Accidente"
        ).length,

        incidentes:

        obtenerEmergenciasPorTipo(
            "Incidente"
        ).length,

        enfermedades:

        obtenerEmergenciasPorTipo(
            "Enfermedad"
        ).length,

        controles:

        obtenerEmergenciasPorTipo(
            "Control Preventivo"
        ).length

    };

}

/* ==========================
   DASHBOARD
========================== */

function obtenerKPIEmergencias(){

    return obtenerEstadisticasEmergencias();

}

/* ==========================
   RENDER MÓDULO
========================== */

function cargarModuloEmergencias(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasEmergencias();

    content.innerHTML = `

        <h2>
            🚑 Servicios de Emergencia
        </h2>

        <div class="card">

            <strong>
                Total Registros
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                🟥 Accidentes
            </strong>

            <br>

            ${stats.accidentes}

            <br><br>

            <strong>
                🟧 Incidentes
            </strong>

            <br>

            ${stats.incidentes}

            <br><br>

            <strong>
                🟨 Enfermedades
            </strong>

            <br>

            ${stats.enfermedades}

            <br><br>

            <strong>
                🟦 Controles
            </strong>

            <br>

            ${stats.controles}

        </div>

    `;

}
