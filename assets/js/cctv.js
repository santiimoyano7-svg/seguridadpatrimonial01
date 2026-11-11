/* ==========================
   SP360 - CCTV
========================== */

/* ==========================
   BASE DE DATOS
========================== */

{
    id:
    Date.now(),

    codigo:
    "CAM-001",

    nombre:
    "Portería Principal",

    sector:
    "Portería",

    criticidad:
    "Alta",

    estado:
    "Funcionando",

    activa:
    true,

    sitio:
    "Bagley Totoral"
}

let controlesCCTVSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_controles_cctv"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarCCTV(){

    localStorage.setItem(

        "sp360_cctv",

        JSON.stringify(
            cctvSP360
        )

    );

}

/* ==========================
   ESTADOS DE CÁMARA
========================== */

const estadosCCTV = {

    FUNCIONANDO:
    "Funcionando",

    CON_FALLA:
    "Con Falla",

    NO_FUNCIONA:
    "No Funciona"

};

/* ==========================
   ALTA DE CÁMARA
========================== */

function crearCamara({

    nombre,

    sector

}){

    const trazabilidad =
        crearTrazabilidad();

   const camara = {

    id:
    `CAM-${Date.now()}`,

    codigo:
    `CAM-${cctvSP360.length + 1}`,

    nombre,

    sector,

    criticidad:
    "Media",

    estado:
    estadosCCTV.FUNCIONANDO,

    observaciones: [],

    controles: [],

    sitio:
    trazabilidad.sitio,

        observaciones: [],

        creadoPor:
        trazabilidad.usuario,

        fechaAlta:
        trazabilidad.fecha,

        horaAlta:
        trazabilidad.hora

    };

    cctvSP360.push(
        camara
    );

    guardarCCTV();

    return camara;

}

/* ==========================
   OBTENER CÁMARA
========================== */

function obtenerCamaraPorId(id){

    return cctvSP360.find(

        camara =>
        camara.id === id

    );

}

/* ==========================
   LISTAR TODAS
========================== */

function obtenerCamaras(){

    return cctvSP360;

}

/* ==========================
   CAMBIAR ESTADO
========================== */

function actualizarEstadoCamara({

    id,

    estado,

    observacion

}){

    const camara =
        obtenerCamaraPorId(id);

    if(!camara){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    camara.estado =
        estado;

    camara.observaciones.push({

        fecha:
        trazabilidad.fecha,

        hora:
        trazabilidad.hora,

        usuario:
        trazabilidad.usuario,

        observacion

    });

    camara.ultimaActualizacion =
        trazabilidad;

    guardarCCTV();

    /*
    GENERA NOVEDAD
    */

    if(

        estado ===
estadosCCTV.CON_FALLA

        ||

        estado ===
        estadosCCTV.FUERA_SERVICIO

    ){

        crearNovedad({

            modulo:
            "CCTV",

            titulo:
            `${camara.nombre} - ${estado}`,

            descripcion:

            `

Cámara:
${camara.nombre}

Sector:
${camara.sector}

Estado:
${estado}

Observación:
${observacion}

            `,

            criticidad:

            estado ===
            estadosCCTV.FUERA_SERVICIO

            ?

            criticidades.ALTA

            :

            criticidades.MEDIA

        });

    }

    return true;

}

/* ==========================
   FILTROS
========================== */

function obtenerCamarasOperativas(){

    return cctvSP360.filter(

        camara =>

        camara.estado ===
        estadosCCTV.OPERATIVA

    );

}

function obtenerCamarasConFalla(){

    return cctvSP360.filter(

        camara =>

        camara.estado ===
        estadosCCTV.CON_FALLA

    );

}

function obtenerCamarasFueraServicio(){

    return cctvSP360.filter(

        camara =>

        camara.estado ===
        estadosCCTV.FUERA_SERVICIO

    );

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasCCTV(){

    return {

        total:
        cctvSP360.length,

        operativas:

        obtenerCamarasOperativas()
        .length,

        conFalla:

        obtenerCamarasConFalla()
        .length,

        fueraServicio:

        obtenerCamarasFueraServicio()
        .length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPICCTV(){

    return obtenerEstadisticasCCTV();

}

/* ==========================
   MÓDULO
========================== */

function cargarModuloCCTV(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasCCTV();

    content.innerHTML = `

        <h2>
            📹 CCTV
        </h2>

        <div class="card">

            <strong>
                Total Cámaras
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                🟢 Operativas
            </strong>

            <br>

            ${stats.operativas}

            <br><br>

            <strong>
                🟡 Con Falla
            </strong>

            <br>

            ${stats.conFalla}

            <br><br>

            <strong>
                🔴 Fuera de Servicio
            </strong>

            <br>

            ${stats.fueraServicio}

        </div>

        <div class="card">

            ✅ Alta de cámaras

            <br>

            ✅ Gestión de estado

            <br>

            ✅ Registro de fallas

            <br>

            ✅ Trazabilidad completa

            <br>

            ✅ Generación automática de novedades

        </div>

    `;

}

function guardarControlesCCTV(){

    localStorage.setItem(

        "sp360_controles_cctv",

        JSON.stringify(
            controlesCCTVSP360
        )

    );

}

function registrarControlCamara({

    camaraId,

    rangoHorario,

    horaControl,

    estado,

    observacion,

    usuario

}){

    controlesCCTVSP360.push({

        id:
        Date.now(),

        camaraId,

        rangoHorario,

        horaControl,

        estado,

        observacion,

        usuario,

        fecha:
        new Date().toISOString()

    });

    guardarControlesCCTV();

}

let grabacionCCTVSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_grabacion_cctv"
    )
) || [];

function registrarTiempoGrabacion(){

}
{

    fecha:

    "11/11/2026",

    dias:
    21,

    horas:
    4,

    observacion:
    "Sin novedades",

    usuario:
    "MEDRANO"

}
