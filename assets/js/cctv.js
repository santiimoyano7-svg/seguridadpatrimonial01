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

let controlesCCTVSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_controles_cctv"
    )
) || [];

let grabacionCCTVSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_grabacion_cctv"
    )
) || [];

/* ==========================
   ESTADOS
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

function guardarControlesCCTV(){

    localStorage.setItem(

        "sp360_controles_cctv",

        JSON.stringify(
            controlesCCTVSP360
        )

    );

}

function guardarGrabacionCCTV(){

    localStorage.setItem(

        "sp360_grabacion_cctv",

        JSON.stringify(
            grabacionCCTVSP360
        )

    );

}

/* ==========================
   ALTA DE CAMARA
========================== */

function crearCamara({

    codigo,
    nombre,
    sector,
    criticidad,
    sitio

}){

    cctvSP360.push({

        id:
        Date.now(),

        codigo,

        nombre,

        sector,

        criticidad,

        sitio,

        estado:
        estadosCCTV.FUNCIONANDO,

        activa:
        true,

        trazabilidad:
        crearTrazabilidad()

    });

    guardarCCTV();

}

/* ==========================
   CONTROL HORARIO
========================== */

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

/* ==========================
   TIEMPO DE GRABACION
========================== */

function registrarTiempoGrabacion({

    dias,

    horas,

    observacion,

    usuario

}){

    grabacionCCTVSP360.push({

        fecha:
        new Date().toISOString(),

        dias,

        horas,

        observacion,

        usuario

    });

    guardarGrabacionCCTV();

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadistic*sCCTV(){

    return {

        total:
        cctvSP360.length,

      funcionando:

        cctvSP360.filter(

            c =>

           c.estado ===
            estadosCCTV.FUNCIONANDO

        ).length,

        conFalla:

        cctvSP360.filter(

            c =>

           c.estado ===
           estadosCCTV.CON_FALLA

        ).length,

        noFunciona:

       cctvSP360.filter(

            c =>

            c.estado ===
           estadosCCTV.NO_FUNCIONA

       ).length

    };

}
