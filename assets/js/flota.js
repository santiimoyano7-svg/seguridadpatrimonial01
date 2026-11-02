/* ==========================
   SP360 - FLOTA
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let flotaSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_flota"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarFlota(){

    localStorage.setItem(

        "sp360_flota",

        JSON.stringify(
            flotaSP360
        )

    );

}

/* ==========================
   ESTADOS VEHICULO
========================== */

const estadosFlota = {

    EN_PLANTA:
    "En Planta",

    EN_COMISION:
    "En Comisión",

    MANTENIMIENTO:
    "Mantenimiento",

    FUERA_SERVICIO:
    "Fuera de Servicio"

};

/* ==========================
   NIVELES COMBUSTIBLE
========================== */

const nivelesCombustible = [

    "Reserva",

    "1/4 de Tanque",

    "1/2 de Tanque",

    "3/4 de Tanque",

    "Lleno"

];

/* ==========================
   CREAR VEHICULO
========================== */

function crearVehiculo({

    interno,

    patente,

    marca,

    modelo,

    anio,

    areaResponsable,

    combustible =
    "Lleno"

}){

    const trazabilidad =
        crearTrazabilidad();

    const vehiculo = {

        id:
        `VEH-${Date.now()}`,

        interno,

        patente,

        marca,

        modelo,

        anio,

        areaResponsable,

        combustible,

        estado:
        estadosFlota.EN_PLANTA,

        sitio:
        trazabilidad.sitio,

        creadoPor:
        trazabilidad.usuario,

        fechaAlta:
        trazabilidad.fecha,

        horaAlta:
        trazabilidad.hora

    };

    flotaSP360.push(
        vehiculo
    );

    guardarFlota();

    return vehiculo;

}

/* ==========================
   CONSULTAS
========================== */

function obtenerVehiculos(){

    return flotaSP360;

}

function obtenerVehiculoPorId(id){

    return flotaSP360.find(

        vehiculo =>
        vehiculo.id === id

    );

}

function obtenerVehiculoPorPatente(
    patente
){

    return flotaSP360.find(

        vehiculo =>

        vehiculo.patente
        === patente

    );

}

/* ==========================
   ACTUALIZAR ESTADO
========================== */

function actualizarEstadoVehiculo(

    id,

    estado

){

    const vehiculo =
        obtenerVehiculoPorId(id);

    if(!vehiculo){

        return false;

    }

    vehiculo.estado =
        estado;

    vehiculo.ultimaActualizacion =
        crearTrazabilidad();

    guardarFlota();

    return true;

}

/* ==========================
   ACTUALIZAR COMBUSTIBLE
========================== */

function actualizarCombustibleVehiculo(

    id,

    combustible

){

    const vehiculo =
        obtenerVehiculoPorId(id);

    if(!vehiculo){

        return false;

    }

    vehiculo.combustible =
        combustible;

    vehiculo.ultimaActualizacion =
        crearTrazabilidad();

    guardarFlota();

    return true;

}

/* ==========================
   FILTROS
========================== */

function obtenerVehiculosPorEstado(
    estado
){

    return flotaSP360.filter(

        vehiculo =>

        vehiculo.estado ===
        estado

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasFlota(){

    return {

        total:
        flotaSP360.length,

        enPlanta:

        obtenerVehiculosPorEstado(
            estadosFlota.EN_PLANTA
        ).length,

        enComision:

        obtenerVehiculosPorEstado(
            estadosFlota.EN_COMISION
        ).length,

        mantenimiento:

        obtenerVehiculosPorEstado(
            estadosFlota.MANTENIMIENTO
        ).length,

        fueraServicio:

        obtenerVehiculosPorEstado(
            estadosFlota.FUERA_SERVICIO
        ).length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPIFlota(){

    return obtenerEstadisticasFlota();

}

/* ==========================
   MODULO
========================== */

function cargarModuloFlota(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasFlota();

    content.innerHTML = `

        <h2>
            🚙 Flota
        </h2>

        <div class="card">

            <strong>
                Total Vehículos
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                🟢 En Planta
            </strong>

            <br>

            ${stats.enPlanta}

            <br><br>

            <strong>
                🟡 En Comisión
            </strong>

            <br>

            ${stats.enComision}

            <br><br>

            <strong>
                🔵 Mantenimiento
            </strong>

            <br>

            ${stats.mantenimiento}

            <br><br>

            <strong>
                🔴 Fuera de Servicio
            </strong>

            <br>

            ${stats.fueraServicio}

        </div>

        <div class="card">

            Funciones disponibles:

            <br><br>

            ✅ Maestro de vehículos

            <br>

            ✅ Estado operativo

            <br>

            ✅ Control combustible

            <br>

            ✅ Trazabilidad

            <br>

            ✅ Integración Dashboard

        </div>

    `;

}
