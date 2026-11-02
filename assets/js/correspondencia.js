/* ==========================
   SP360 - CORRESPONDENCIA
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let correspondenciaSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_correspondencia"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarCorrespondencia(){

    localStorage.setItem(

        "sp360_correspondencia",

        JSON.stringify(
            correspondenciaSP360
        )

    );

}

/* ==========================
   ESTADOS
========================== */

const estadosCorrespondencia = [

    "Pendiente",

    "Entregado"

];

/* ==========================
   REGISTRAR RECEPCIÓN
========================== */

function registrarCorrespondencia({

    empresa,

    remitente,

    destinatario,

    area,

    tipo,

    fotografia

}){

    const trazabilidad =
        crearTrazabilidad();

    const registro = {

        id:
        `COR-${Date.now()}`,

        empresa,

        remitente,

        destinatario,

        area,

        tipo,

        fotografia,

        estado:
        "Pendiente",

        recibidoPor:
        trazabilidad.usuario,

        fechaRecepcion:
        trazabilidad.fecha,

        horaRecepcion:
        trazabilidad.hora,

        sitio:
        trazabilidad.sitio,

        rol:
        trazabilidad.rol

    };

    correspondenciaSP360.push(
        registro
    );

    guardarCorrespondencia();

    return registro;

}

/* ==========================
   ENTREGAR
========================== */

function entregarCorrespondencia({

    id,

    entregadoA

}){

    const registro =
        correspondenciaSP360.find(

            c =>
            c.id === id

        );

    if(!registro){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    registro.estado =
        "Entregado";

    registro.entregadoA =
        entregadoA;

    registro.fechaEntrega =
        trazabilidad.fecha;

    registro.horaEntrega =
        trazabilidad.hora;

    registro.usuarioEntrega =
        trazabilidad.usuario;

    guardarCorrespondencia();

    return true;

}

/* ==========================
   CONSULTAS
========================== */

function obtenerCorrespondencia(){

    return correspondenciaSP360;

}

function obtenerCorrespondenciaPorId(
    id
){

    return correspondenciaSP360.find(

        c =>
        c.id === id

    );

}

/* ==========================
   FILTROS
========================== */

function obtenerCorrespondenciaPendiente(){

    return correspondenciaSP360.filter(

        c =>
        c.estado ===
        "Pendiente"

    );

}

function obtenerCorrespondenciaEntregada(){

    return correspondenciaSP360.filter(

        c =>
        c.estado ===
        "Entregado"

    );

}

function obtenerCorrespondenciaPorArea(
    area
){

    return correspondenciaSP360.filter(

        c =>
        c.area === area

    );

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasCorrespondencia(){

    return {

        total:
        correspondenciaSP360.length,

        pendientes:
        obtenerCorrespondenciaPendiente().length,

        entregadas:
        obtenerCorrespondenciaEntregada().length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPICorrespondencia(){

    return obtenerEstadisticasCorrespondencia();

}

/* ==========================
   MODULO
========================== */

function cargarModuloCorrespondencia(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasCorrespondencia();

    content.innerHTML = `

        <h2>
            📦 Correspondencia
        </h2>

        <div class="card">

            <strong>
                Total Registros
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                📦 Pendientes
            </strong>

            <br>

            ${stats.pendientes}

            <br><br>

            <strong>
                ✅ Entregadas
            </strong>

            <br>

            ${stats.entregadas}

        </div>

        <div class="card">

            Este módulo permite:

            <br><br>

            ✅ Recepción

            <br>

            ✅ Fotografía de encomienda

            <br>

            ✅ Seguimiento

            <br>

            ✅ Entrega

            <br>

            ✅ Trazabilidad completa

        </div>

    `;

}
