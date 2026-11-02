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
   GUARDAR
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
   ENUMS
========================== */

const estadosNovedad = {

    ABIERTA: "Abierta",

    EN_CURSO: "En Curso",

    CERRADA: "Cerrada"

};

const criticidades = {

    BAJA: "Baja",

    MEDIA: "Media",

    ALTA: "Alta",

    CRITICA: "Crítica"

};

/* ==========================
   CREAR NOVEDAD
========================== */

function crearNovedad({

    modulo,

    titulo,

    descripcion,

    criticidad = criticidades.MEDIA

}){

    const trazabilidad =
        crearTrazabilidad();

    const novedad = {

        id:
            generarIdNovedad(),

        sitio:
            trazabilidad.sitio,

        modulo,

        titulo,

        descripcion,

        criticidad,

        estado:
            estadosNovedad.ABIERTA,

        fechaApertura:
            trazabilidad.fecha,

        horaApertura:
            trazabilidad.hora,

        usuarioApertura:
            trazabilidad.usuario,

        rolApertura:
            trazabilidad.rol,

        seguimientos: [],

        fechaCierre: null,

        horaCierre: null,

        usuarioCierre: null,

        observacionCierre: null

    };

    novedadesSP360.push(
        novedad
    );

    guardarNovedades();

    return novedad;

}

/* ==========================
   OBTENER TODAS
========================== */

function obtenerNovedades(){

    return novedadesSP360;

}

/* ==========================
   BUSCAR POR ID
========================== */

function obtenerNovedadPorId(
    id
){

    return novedadesSP360.find(

        novedad =>
        novedad.id === id

    );

}

/* ==========================
   FILTRAR POR ESTADO
========================== */

function obtenerNovedadesPorEstado(
    estado
){

    return novedadesSP360.filter(

        novedad =>

        novedad.estado ===
        estado

    );

}

/* ==========================
   FILTRAR POR SITIO
========================== */

function obtenerNovedadesPorSitio(
    sitio
){

    return novedadesSP360.filter(

        novedad =>

        novedad.sitio ===
        sitio

    );

}

/* ==========================
   FILTRAR POR MODULO
========================== */

function obtenerNovedadesPorModulo(
    modulo
){

    return novedadesSP360.filter(

        novedad =>

        novedad.modulo ===
        modulo

    );

}

/* ==========================
   AGREGAR SEGUIMIENTO
========================== */

function agregarSeguimiento(

    id,

    comentario

){

    const novedad =
        obtenerNovedadPorId(
            id
        );

    if(!novedad){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    novedad.seguimientos.push({

        fecha:
            trazabilidad.fecha,

        hora:
            trazabilidad.hora,

        usuario:
            trazabilidad.usuario,

        rol:
            trazabilidad.rol,

        comentario

    });

    if(
        novedad.estado ===
        estadosNovedad.ABIERTA
    ){

        novedad.estado =
        estadosNovedad.EN_CURSO;

    }

    guardarNovedades();

    return true;

}

/* ==========================
   CERRAR NOVEDAD
========================== */

function cerrarNovedad(

    id,

    observacion

){

    const novedad =
        obtenerNovedadPorId(
            id
        );

    if(!novedad){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    novedad.estado =
        estadosNovedad.CERRADA;

    novedad.fechaCierre =
        trazabilidad.fecha;

    novedad.horaCierre =
        trazabilidad.hora;

    novedad.usuarioCierre =
        trazabilidad.usuario;

    novedad.observacionCierre =
        observacion;

    guardarNovedades();

    return true;

}

/* ==========================
   REABRIR NOVEDAD
========================== */

function reabrirNovedad(id){

    const novedad =
        obtenerNovedadPorId(
            id
        );

    if(!novedad){

        return false;

    }

    novedad.estado =
        estadosNovedad.EN_CURSO;

    novedad.fechaCierre =
        null;

    novedad.horaCierre =
        null;

    novedad.usuarioCierre =
        null;

    novedad.observacionCierre =
        null;

    guardarNovedades();

    return true;

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasNovedades(){

    return {

        total:
            novedadesSP360.length,

        abiertas:

            obtenerNovedadesPorEstado(
                estadosNovedad.ABIERTA
            ).length,

        enCurso:

            obtenerNovedadesPorEstado(
                estadosNovedad.EN_CURSO
            ).length,

        cerradas:

            obtenerNovedadesPorEstado(
                estadosNovedad.CERRADA
            ).length

    };

}

/* ==========================
   INFORME MENSUAL
========================== */

function obtenerNovedadesMes(

    mes,

    anio

){

    return novedadesSP360.filter(

        novedad => {

            const fecha =
            new Date(

                novedad.fechaApertura
            );

            return (

                fecha.getMonth() + 1
                === mes

                &&

                fecha.getFullYear()
                === anio

            );

        }

    );

}

/* ==========================
   MODULOS AUTORIZADOS
========================== */

const modulosGeneranNovedad = [

    "Transporte Seguro",

    "Rondas Inteligentes",

    "Gestión de Llaves",

    "CCTV",

    "Precintos",

    "Servicios de Emergencia"

];

/* ==========================
   VALIDACION
========================== */

function moduloGeneraNovedad(
    modulo
){

    return modulosGeneranNovedad.includes(
        modulo
    );

}
