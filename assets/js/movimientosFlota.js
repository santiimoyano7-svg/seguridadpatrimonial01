/* ==========================
   SP360 - MOVIMIENTO FLOTA
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let movimientosFlotaSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_movimientos_flota"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarMovimientosFlota(){

    localStorage.setItem(

        "sp360_movimientos_flota",

        JSON.stringify(
            movimientosFlotaSP360
        )

    );

}

/* ==========================
   REGISTRAR SALIDA
========================== */

function registrarSalidaFlota({

    vehiculoId,

    chofer,

    legajo,

    destino,

    motivo,

    kmSalida,

    combustibleSalida

}){

    const vehiculo =
        obtenerVehiculoPorId(
            vehiculoId
        );

    if(!vehiculo){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    const movimiento = {

        id:
        `MOV-${Date.now()}`,

        vehiculoId,

        interno:
        vehiculo.interno,

        patente:
        vehiculo.patente,

        marca:
        vehiculo.marca,

        modelo:
        vehiculo.modelo,

        chofer,

        legajo,

        destino,

        motivo,

        kmSalida,

        combustibleSalida,

        fechaSalida:
        trazabilidad.fecha,

        horaSalida:
        trazabilidad.hora,

        fechaRegreso:
        null,

        horaRegreso:
        null,

        kmRegreso:
        null,

        combustibleRegreso:
        null,

        observaciones:
        "",

        estado:
        "En Comisión",

        sitio:
        trazabilidad.sitio,

        usuario:
        trazabilidad.usuario,

        rol:
        trazabilidad.rol

    };

    movimientosFlotaSP360.push(
        movimiento
    );

    actualizarEstadoVehiculo(
        vehiculoId,
        estadosFlota.EN_COMISION
    );

    guardarMovimientosFlota();

    return movimiento;

}

/* ==========================
   REGISTRAR REGRESO
========================== */

function registrarRegresoFlota({

    movimientoId,

    kmRegreso,

    combustibleRegreso,

    observaciones

}){

    const movimiento =
        movimientosFlotaSP360.find(

            m =>
            m.id === movimientoId

        );

    if(!movimiento){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    movimiento.kmRegreso =
        kmRegreso;

    movimiento.combustibleRegreso =
        combustibleRegreso;

    movimiento.observaciones =
        observaciones;

    movimiento.fechaRegreso =
        trazabilidad.fecha;

    movimiento.horaRegreso =
        trazabilidad.hora;

    movimiento.estado =
        "Finalizado";

    actualizarEstadoVehiculo(

        movimiento.vehiculoId,

        estadosFlota.EN_PLANTA

    );

    actualizarCombustibleVehiculo(

        movimiento.vehiculoId,

        combustibleRegreso

    );

    guardarMovimientosFlota();

    return true;

}

/* ==========================
   CONSULTAS
========================== */

function obtenerMovimientosFlota(){

    return movimientosFlotaSP360;

}

function obtenerMovimientosActivos(){

    return movimientosFlotaSP360.filter(

        movimiento =>
        movimiento.estado ===
        "En Comisión"

    );

}

function obtenerMovimientosFinalizados(){

    return movimientosFlotaSP360.filter(

        movimiento =>
        movimiento.estado ===
        "Finalizado"

    );

}

/* ==========================
   CALCULO KM
========================== */

function calcularKilometrosRecorridos(
    movimiento
){

    if(

        movimiento.kmSalida === null ||

        movimiento.kmRegreso === null

    ){

        return 0;

    }

    return (

        movimiento.kmRegreso -
        movimiento.kmSalida

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasMovimientosFlota(){

    return {

        total:
        movimientosFlotaSP360.length,

        activos:
        obtenerMovimientosActivos()
        .length,

        finalizados:
        obtenerMovimientosFinalizados()
        .length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPIMovimientosFlota(){

    return obtenerEstadisticasMovimientosFlota();

}

/* ==========================
   MODULO
========================== */

function cargarModuloMovimientosFlota(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasMovimientosFlota();

    content.innerHTML = `

        <h2>
            🔄 Movimiento de Flota
        </h2>

        <div class="card">

            Total Movimientos

            <br><br>

            ${stats.total}

            <br><br>

            En Comisión

            <br>

            ${stats.activos}

            <br><br>

            Finalizados

            <br>

            ${stats.finalizados}

        </div>

        <div class="card">

            ✅ Salida de vehículo

            <br>

            ✅ Regreso de vehículo

            <br>

            ✅ Kilómetros recorridos

            <br>

            ✅ Control combustible

            <br>

            ✅ Trazabilidad completa

        </div>

    `;

}
