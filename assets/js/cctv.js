/* ==========================
   SP360 - CCTV
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let cctvSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_cctv"
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

    OPERATIVA:
    "Operativa",

    FALLA:
    "Con Falla",

    FUERA_SERVICIO:
    "Fuera de Servicio"

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

        nombre,

        sector,

        estado:
        estadosCCTV.OPERATIVA,

        observaciones: [],

        sitio:
        trazabilidad.sitio,

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
        estadosCCTV.FALLA

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
        estadosCCTV.FALLA

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
