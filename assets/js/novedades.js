/* ==========================
   SP360 - NOVEDADES
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let novedadesSP360 =

    JSON.parse(
        localStorage.getItem(
            "sp360_novedades"
        )
    ) || [];

/* ==========================
   ESTADOS
========================== */

const estadosNovedad = {

    ABIERTA:
        "Abierta",

    EN_SEGUIMIENTO:
        "En Seguimiento",

    CERRADA:
        "Cerrada"

};

/* ==========================
   CRITICIDADES
========================== */

const criticidades = {

    BAJA:
        "Baja",

    MEDIA:
        "Media",

    ALTA:
        "Alta",

    CRITICA:
        "Crítica"

};

/* ==========================
   GUARDAR NOVEDADES
========================== */

function guardarNovedades(){

    localStorage.setItem(
        "sp360_novedades",
        JSON.stringify(
            novedadesSP360
        )
    );

}

/* ==========================
   CREAR NOVEDAD
========================== */

function crearNovedad({

    modulo,
    titulo,
    descripcion,
    criticidad,
    sitio

}){

    novedadesSP360.push({

        id:
            Date.now(),

        fecha:
            new Date()
            .toLocaleDateString(
                "es-AR"
            ),

        hora:
            new Date()
            .toLocaleTimeString(),

        modulo:
            modulo || "General",

        titulo:
            titulo || "",

        descripcion:
            descripcion || "",

        criticidad:
            criticidad
            ||
            criticidades.MEDIA,

        estado:
            estadosNovedad.ABIERTA,

        usuario:

            typeof usuarioActivo !==
            "undefined"

            &&

            usuarioActivo

            ?

            usuarioActivo.nombre

            :

            "Sistema",

        sitio:

            sitio

            ||

            (
                typeof sitioActivo !==
                "undefined"

                ?

                sitioActivo

                :

                "Sin Sitio"
            ),

        seguimiento: [],

        fechaCierre: "",

        horaCierre: "",

        usuarioCierre: ""

    });

    guardarNovedades();

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasNovedades(){

    return {

        total:
            novedadesSP360.length,

        abiertas:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.ABIERTA
            ).length,

        seguimiento:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.EN_SEGUIMIENTO
            ).length,

        cerradas:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.CERRADA
            ).length

    };

}
