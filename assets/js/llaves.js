/* ==========================
   SP360 - GESTIÓN DE LLAVES
========================== */

/* ==========================
   MAESTRO DE LLAVES
========================== */

let llavesSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_llaves"
    )
) || [];

/* ==========================
   PRÉSTAMOS
========================== */

let prestamosLlavesSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_prestamos_llaves"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarLlaves(){

    localStorage.setItem(
        "sp360_llaves",
        JSON.stringify(
            llavesSP360
        )
    );

}

function guardarPrestamosLlaves(){

    localStorage.setItem(
        "sp360_prestamos_llaves",
        JSON.stringify(
            prestamosLlavesSP360
        )
    );

}

/* ==========================
   ALTA DE LLAVE
========================== */

function crearLlave({

    codigo,

    descripcion,

    sector,

    requiereAutorizacion,

    areaAutorizante

}){

    const llave = {

        id:
        Date.now(),

        codigo,

        descripcion,

        sector,

        requiereAutorizacion,

        areaAutorizante,

        estado:
        "Disponible",

        activa:
        true,

        trazabilidad:
        crearTrazabilidad()

    };

    llavesSP360.push(
        llave
    );

    guardarLlaves();

    return llave;

}

/* ==========================
   BUSQUEDAS
========================== */

function obtenerLlaves(){

    return llavesSP360;

}

function obtenerLlavePorId(id){

    return llavesSP360.find(

        llave =>
        llave.id === id

    );

}

/* ==========================
   PRESTAR LLAVE
========================== */

function prestarLlave({

    llaveId,

    persona,

    legajo,

    empresa,

    motivo,

    autorizacionRecibida

}){

    const llave =
        obtenerLlavePorId(
            llaveId
        );

    if(!llave){

        return false;

    }

    if(
        llave.requiereAutorizacion
        &&
        !autorizacionRecibida
    ){

        crearNovedad({

            modulo:
            "Gestión de Llaves",

            titulo:
            `Intento entrega sin autorización - ${llave.codigo}`,

            descripcion:
            `Se intentó entregar una llave que requiere autorización.`,

            criticidad:
            criticidades.ALTA

        });

        return false;
    }

    llave.estado =
    "Prestada";

    const prestamo = {

        id:
        Date.now(),

        llaveId:
        llave.id,

        codigo:
        llave.codigo,

        descripcion:
        llave.descripcion,

        persona,

        legajo,

        empresa,

        motivo,

        fechaEntrega:
        new Date()
        .toLocaleDateString(),

        horaEntrega:
        new Date()
        .toLocaleTimeString(),

        fechaDevolucion:
        null,

        horaDevolucion:
        null,

        estado:
        "Prestada",

        trazabilidad:
        crearTrazabilidad()

    };

    prestamosLlavesSP360.push(
        prestamo
    );

    guardarLlaves();
    guardarPrestamosLlaves();

    return prestamo;

}

/* ==========================
   DEVOLVER LLAVE
========================== */

function devolverLlave(
    prestamoId
){

    const prestamo =
        prestamosLlavesSP360.find(

            p =>
            p.id === prestamoId

        );

    if(!prestamo){

        return false;

    }

    const llave =
        obtenerLlavePorId(
            prestamo.llaveId
        );

    if(llave){

        llave.estado =
        "Disponible";
    }

    prestamo.estado =
    "Devuelta";

    prestamo.fechaDevolucion =
    new Date()
    .toLocaleDateString();

    prestamo.horaDevolucion =
    new Date()
    .toLocaleTimeString();

    guardarLlaves();
    guardarPrestamosLlaves();

    return true;

}

/* ==========================
   CONTROL DEMORAS
========================== */

function verificarLlavesDemoradas(){

    const ahora =
    new Date();

    prestamosLlavesSP360.forEach(

        prestamo => {

            if(
                prestamo.estado !==
                "Prestada"
            ){
                return;
            }

            const entrega =
                new Date(
                    `${prestamo.fechaEntrega} ${prestamo.horaEntrega}`
                );

            const diferencia =
                (ahora - entrega)
                /
                1000
                /
                60;

            if(
                diferencia >= 120
            ){

                const llave =
                    obtenerLlavePorId(
                        prestamo.llaveId
                    );

                if(llave){

                    llave.estado =
                    "Demorada";
                }

                crearNovedad({

                    modulo:
                    "Gestión de Llaves",

                    titulo:
                    `Llave Demorada - ${prestamo.codigo}`,

                    descripcion:
                    `La llave supera las 2 horas sin devolución.`,

                    criticidad:
                    criticidades.MEDIA

                });

            }

        }

    );

    guardarLlaves();

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasLlaves(){

    return {

        total:
        llavesSP360.length,

        disponibles:

        llavesSP360.filter(

            l =>
            l.estado ===
            "Disponible"

        ).length,

        prestadas:

        llavesSP360.filter(

            l =>
            l.estado ===
            "Prestada"

        ).length,

        demoradas:

        llavesSP360.filter(

            l =>
            l.estado ===
            "Demorada"

        ).length

    };

}

/* ==========================
   MÓDULO
========================== */

function cargarModuloLlaves(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasLlaves();

    content.innerHTML = `

        <h2>
            🔑 Gestión de Llaves
        </h2>

        <div class="card">

            <strong>Total:</strong>
            ${stats.total}

            <br><br>

            <strong>Disponibles:</strong>
            ${stats.disponibles}

            <br>

            <strong>Prestadas:</strong>
            ${stats.prestadas}

            <br>

            <strong>Demoradas:</strong>
            ${stats.demoradas}

        </div>

    `;

}
