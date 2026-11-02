/* ==========================
   SP360 - ACCESOS VEHICULARES
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let accesosSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_accesos"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarAccesos(){

    localStorage.setItem(

        "sp360_accesos",

        JSON.stringify(
            accesosSP360
        )

    );

}

/* ==========================
   ESTADOS
========================== */

const estadosAcceso = {

    DENTRO:
    "Dentro de Planta",

    EGRESADO:
    "Egresado"

};

/* ==========================
   REGISTRAR INGRESO
========================== */

function registrarIngresoVehicular({

    patente,

    empresa,

    conductor,

    dni,

    tipoVehiculo,

    sectorDestino,

    personaVisitada,

    motivo,

    observaciones

}){

    const trazabilidad =
        crearTrazabilidad();

    const acceso = {

        id:
        `ACC-${Date.now()}`,

        patente,

        empresa,

        conductor,

        dni,

        tipoVehiculo,

        sectorDestino,

        personaVisitada,

        motivo,

        observaciones,

        estado:
        estadosAcceso.DENTRO,

        fechaIngreso:
        trazabilidad.fecha,

        horaIngreso:
        trazabilidad.hora,

        fechaEgreso:
        null,

        horaEgreso:
        null,

        observacionEgreso:
        "",

        sitio:
        trazabilidad.sitio,

        usuario:
        trazabilidad.usuario,

        rol:
        trazabilidad.rol

    };

    accesosSP360.push(
        acceso
    );

    guardarAccesos();

    return acceso;

}

/* ==========================
   REGISTRAR EGRESO
========================== */

function registrarEgresoVehicular(

    id,

    observacionEgreso = ""

){

    const acceso =
        obtenerAccesoPorId(id);

    if(!acceso){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    acceso.estado =
        estadosAcceso.EGRESADO;

    acceso.fechaEgreso =
        trazabilidad.fecha;

    acceso.horaEgreso =
        trazabilidad.hora;

    acceso.observacionEgreso =
        observacionEgreso;

    guardarAccesos();

    return true;

}

/* ==========================
   CONSULTAS
========================== */

function obtenerAccesos(){

    return accesosSP360;

}

function obtenerAccesoPorId(id){

    return accesosSP360.find(

        acceso =>
        acceso.id === id

    );

}

/* ==========================
   FILTROS
========================== */

function obtenerAccesosActivos(){

    return accesosSP360.filter(

        acceso =>

        acceso.estado ===
        estadosAcceso.DENTRO

    );

}

function obtenerAccesosEgresados(){

    return accesosSP360.filter(

        acceso =>

        acceso.estado ===
        estadosAcceso.EGRESADO

    );

}

function obtenerAccesosPorPatente(
    patente
){

    return accesosSP360.filter(

        acceso =>

        acceso.patente
        .toUpperCase()
        .includes(
            patente.toUpperCase()
        )

    );

}

function obtenerAccesosPorEmpresa(
    empresa
){

    return accesosSP360.filter(

        acceso =>

        acceso.empresa
        .toUpperCase()
        .includes(
            empresa.toUpperCase()
        )

    );

}

function obtenerAccesosPorSitio(
    sitio
){

    return accesosSP360.filter(

        acceso =>

        acceso.sitio === sitio

    );

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasAccesos(){

    return {

        total:
        accesosSP360.length,

        dentro:

        obtenerAccesosActivos()
        .length,

        egresados:

        obtenerAccesosEgresados()
        .length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPIAccesos(){

    return obtenerEstadisticasAccesos();

}

/* ==========================
   MODULO
========================== */

function cargarModuloAccesos(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasAccesos();

    content.innerHTML = `

        <h2>
            🚗 Accesos Vehiculares
        </h2>

        <div class="card">

            <strong>
                Total Registros
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                🚗 Dentro de Planta
            </strong>

            <br>

            ${stats.dentro}

            <br><br>

            <strong>
                ✅ Egresados
            </strong>

            <br>

            ${stats.egresados}

        </div>

        <div class="card">

            Este módulo controla:

            <br><br>

            ✅ Ingresos

            <br>

            ✅ Egresos

            <br>

            ✅ Patentes

            <br>

            ✅ Empresas

            <br>

            ✅ Conductores

            <br>

            ✅ Destinos

            <br>

            ✅ Trazabilidad completa

        </div>

    `;

}
