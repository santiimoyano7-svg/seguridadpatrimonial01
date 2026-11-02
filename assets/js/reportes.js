/* ==========================
   SP360 - REPORTES
========================== */

/* ==========================
   OBTENER MES ANTERIOR
========================== */

function obtenerMesAnterior(){

    const hoy = new Date();

    let mes = hoy.getMonth();

    let anio = hoy.getFullYear();

    if(mes === 0){

        mes = 12;
        anio--;

    }

    return {

        mes,
        anio

    };

}

/* ==========================
   NOVEDADES MES
========================== */

function obtenerNovedadesMesAnterior(){

    const periodo =
        obtenerMesAnterior();

    return obtenerNovedadesMes(

        periodo.mes,
        periodo.anio

    );

}

/* ==========================
   RESUMEN NOVEDADES
========================== */

function generarResumenNovedades(
    novedades
){

    return {

        total:

            novedades.length,

        abiertas:

            novedades.filter(

                n =>
                n.estado ===
                "Abierta"

            ).length,

        enCurso:

            novedades.filter(

                n =>
                n.estado ===
                "En Curso"

            ).length,

        cerradas:

            novedades.filter(

                n =>
                n.estado ===
                "Cerrada"

            ).length

    };

}

/* ==========================
   INFORME MENSUAL NOVEDADES
========================== */

function generarInformeMensualNovedades(){

    const novedades =
        obtenerNovedadesMesAnterior();

    const resumen =
        generarResumenNovedades(
            novedades
        );

    return {

        tipo:
        "Informe Mensual Novedades",

        fechaGeneracion:
            new Date()
            .toLocaleString(),

        resumen,

        detalle:
            novedades

    };

}

/* ==========================
   TRANSPORTE SEGURO
========================== */

function obtenerNovedadesTransporteMes(){

    const periodo =
        obtenerMesAnterior();

    const novedades =
        obtenerNovedadesMes(

            periodo.mes,

            periodo.anio

        );

    return novedades.filter(

        novedad =>

        novedad.modulo ===
        "Transporte Seguro"

    );

}

/* ==========================
   INFORME TRANSPORTE
========================== */

function generarInformeMensualTransporte(){

    const novedades =
        obtenerNovedadesTransporteMes();

    const observaciones =

        novedades.filter(

            n =>
            n.criticidad ===
            "Media"

        ).length;

    const altas =

        novedades.filter(

            n =>
            n.criticidad ===
            "Alta"

        ).length;

    const criticas =

        novedades.filter(

            n =>
            n.criticidad ===
            "Crítica"

        ).length;

    return {

        tipo:
        "Informe Transporte Seguro",

        fechaGeneracion:
        new Date()
        .toLocaleString(),

        total:
        novedades.length,

        observaciones,

        altas,

        criticas,

        detalle:
        novedades

    };

}

/* ==========================
   INFORME POR SITIO
========================== */

function generarInformeSitio(
    sitio
){

    const novedades =

        obtenerNovedadesPorSitio(
            sitio
        );

    return {

        sitio,

        fechaGeneracion:
            new Date()
            .toLocaleString(),

        total:
            novedades.length,

        detalle:
            novedades

    };

}

/* ==========================
   INFORME CORPORATIVO
========================== */

function generarInformeCorporativo(){

    const sitios =

        obtenerSitiosActivos();

    const resultado = [];

    sitios.forEach(

        sitio => {

            resultado.push({

                sitio:
                    sitio.nombre,

                cantidad:

                    obtenerNovedadesPorSitio(

                        sitio.nombre

                    ).length

            });

        }

    );

    return {

        fechaGeneracion:
        new Date()
        .toLocaleString(),

        sitios:
        resultado

    };

}

/* ==========================
   NOVEDADES ABIERTAS
========================== */

function obtenerInformeAbiertas(){

    return obternerNovedadesPorEstado
        ?
        obtenerNovedadesPorEstado(
            "Abierta"
        )
        :
        [];

}

/* ==========================
   NOVEDADES EN CURSO
========================== */

function obtenerInformeEnCurso(){

    return obtenerNovedadesPorEstado(

        "En Curso"

    );

}

/* ==========================
   NOVEDADES CERRADAS
========================== */

function obtenerInformeCerradas(){

    return obtenerNovedadesPorEstado(

        "Cerrada"

    );

}

/* ==========================
   DASHBOARD EJECUTIVO
========================== */

function generarDashboardCorporativo(){

    const estadisticas =
        obtenerEstadisticasNovedades();

    return {

        fecha:
        new Date()
        .toLocaleString(),

        total:
        estadisticas.total,

        abiertas:
        estadisticas.abiertas,

        enCurso:
        estadisticas.enCurso,

        cerradas:
        estadisticas.cerradas

    };

}

/* ==========================
   INFORME AUTOMÁTICO
========================== */

function esPrimerDiaMes(){

    const hoy = new Date();

    return hoy.getDate() === 1;

}

/* ==========================
   GENERADOR AUTOMÁTICO
========================== */

function ejecutarInformesAutomaticos(){

    if(
        !esPrimerDiaMes()
    ){

        return;
    }

    const informeNovedades =

        generarInformeMensualNovedades();

    const informeTransporte =

        generarInformeMensualTransporte();

    localStorage.setItem(

        "sp360_ultimo_informe_novedades",

        JSON.stringify(
            informeNovedades
        )

    );

    localStorage.setItem(

        "sp360_ultimo_informe_transporte",

        JSON.stringify(
            informeTransporte
        )

    );

}

/* ==========================
   INICIO
========================== */

ejecutarInformesAutomaticos();
