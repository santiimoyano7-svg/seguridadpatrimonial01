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

    let tarjetas = "";

    llavesSP360

        .filter(

            llave =>

            llave.estado === "Prestada"

            ||

            llave.estado === "Demorada"

        )

        .forEach(llave => {

            let color = "#FBBF24";
            let icono = "🟡";

            if(
                llave.estado ===
                "Demorada"
            ){

                color = "#EF4444";
                icono = "🔴";

            }

            let datosPrestamo = "";

            const prestamo =
                prestamosLlavesSP360.find(

                    p =>

                    p.llaveId === llave.id

                    &&

                    p.estado ===
                    "Prestada"

                );

            if(prestamo){

                datosPrestamo = `

                    <br>

                    <strong>
                    ${prestamo.persona}
                    </strong>

                    <br>

                    Legajo:
                    ${prestamo.legajo}

                    <br>

                    Empresa:
                    ${prestamo.empresa}

                    <br>

                    Entrega:
                    ${prestamo.horaEntrega}

                `;

            }

            tarjetas += `

                <div
                    class="llave-card"

                    style="
                    background:${color};
                    ">

                    <h3>
                        🔑 ${llave.codigo}
                    </h3>

                    <strong>
                        ${llave.descripcion}
                    </strong>

                    <br><br>

                    Sector:
                    ${llave.sector}

                    <br><br>

                    ${icono}
                    ${llave.estado}

                    ${datosPrestamo}

                    <br><br>

                    <button

                        class="btn btn-primary"

                        onclick="
                        abrirDevolucionLlave(
                            ${llave.id}
                        )
                        ">

                        🔄 Devolver

                    </button>

                </div>

            `;

        });

    content.innerHTML = `

        <h2>
            🔑 Gestión de Llaves
        </h2>

        <div
            class="llaves-menu">

            <button

                class="btn btn-success"

                onclick="
                abrirEntregaLlave()
                ">

                ➕ Entregar Llave

            </button>

            <button

                class="btn btn-primary"

                onclick="
                cargarInventarioLlaves()
                ">

                📚 Inventario

            </button>

        </div>

        <br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    🟢 Disponibles

                </div>

                <div class="stat-value">

                    ${stats.disponibles}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 Prestadas

                </div>

                <div class="stat-value">

                    ${stats.prestadas}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Demoradas

                </div>

                <div class="stat-value">

                    ${stats.demoradas}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    ⚫ Inactivas

                </div>

                <div class="stat-value">

                    ${
                        stats.total -
                        stats.disponibles -
                        stats.prestadas -
                        stats.demoradas
                    }

                </div>

            </div>

        </div>

        <div class="llaves-grid">

            ${
                tarjetas !== ""

                ?

                tarjetas

                :

                `<div class="card">

                    No existen llaves prestadas
                    o demoradas actualmente.

                </div>`

            }

        </div>

    `;

}

/* ==========================
   ALTA DE LLAVE
========================== */

function abrirAltaLlave(){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            ➕ Nueva Llave
        </h2>

        <div class="card">

            <input
                id="llave_codigo"
                placeholder="Código">

            <input
                id="llave_descripcion"
                placeholder="Descripción">

            <input
                id="llave_sector"
                placeholder="Sector">

            <select
                id="llave_autorizacion">

                <option>
                    No
                </option>

                <option>
                    Sí
                </option>

            </select>

            <select
                id="llave_area">

                <option>
                    Producción
                </option>

                <option>
                    Mantenimiento
                </option>

                <option>
                    Calidad
                </option>

                <option>
                    Ingeniería
                </option>

                <option>
                    RRHH
                </option>

                <option>
                    Seguridad Patrimonial
                </option>

            </select>

            <button
                class="btn btn-success"
                onclick="
                guardarNuevaLlave()
                ">

                ✅ Guardar Llave

            </button>

            <button
                class="btn btn-danger"
                onclick="
                cargarModuloLlaves()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

function guardarNuevaLlave(){

    crearLlave({

        codigo:
        document.getElementById(
            "llave_codigo"
        ).value,

        descripcion:
        document.getElementById(
            "llave_descripcion"
        ).value,

        sector:
        document.getElementById(
            "llave_sector"
        ).value,

        requiereAutorizacion:

        document.getElementById(
            "llave_autorizacion"
        ).value === "Sí",

        areaAutorizante:
        document.getElementById(
            "llave_area"
        ).value

    });

    alert(
        "Llave creada correctamente"
    );

    cargarModuloLlaves();

}

/* ==========================
   ENTREGA DE LLAVE
========================== */

function abrirEntregaLlave(){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            ✅ Entrega de Llave
        </h2>

        <div class="card">

            <h3>
                🔍 Buscar Llave
            </h3>

            <input
                id="buscar_llave"
                placeholder="Número de Llave"
                onkeyup="
                buscarLlaveEntrega()
                ">

        </div>

        <div
            id="detalle_llave">

        </div>

    `;

}

function buscarLlaveEntrega(){

    const codigo =
        document.getElementById(
            "buscar_llave"
        ).value;

    const llave =
        llavesSP360.find(

            l =>
            l.codigo === codigo

        );

    const detalle =
        document.getElementById(
            "detalle_llave"
        );

    if(!llave){

        detalle.innerHTML = "";

        return;

    }

    detalle.innerHTML = `

        <div class="card">

            <h3>
                🔑 Información de la Llave
            </h3>

            <p>

                <strong>Código:</strong>

                ${llave.codigo}

            </p>

            <p>

                <strong>Descripción:</strong>

                ${llave.descripcion}

            </p>

            <p>

                <strong>Sector:</strong>

                ${llave.sector}

            </p>

            <p>

                <strong>Estado:</strong>

                ${llave.estado}

            </p>

        </div>

        <div class="card">

            <h3>
                👤 Datos de quien retira
            </h3>

            <input
                id="entrega_nombre"
                placeholder="Apellido y Nombre">

            <input
                id="entrega_legajo"
                placeholder="Legajo">

            <input
                id="entrega_empresa"
                placeholder="Empresa">

            <textarea
                id="entrega_motivo"
                placeholder="Motivo de préstamo">
            </textarea>

        </div>

        ${
            llave.requiereAutorizacion

            ?

            `

            <div class="card">

                <h3>
                    🔒 Autorización MAHPI
                </h3>

                <p>

                    Área:

                    ${llave.areaAutorizante}

                </p>

                <input

                    id="autoriza_nombre"

                    placeholder="
                    Nombre de quien autoriza"

                >

            </div>

            `

            :

            ""

        }

        <div class="card">

            <button

                class="btn btn-success"

                onclick="
                confirmarEntregaLlave(
                    '${llave.id}'
                )
                ">

                ✅ Confirmar Entrega

            </button>

            <button

                class="btn btn-danger"

                onclick="
                cargarModuloLlaves()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   CONFIRMAR ENTREGA
========================== */

function confirmarEntregaLlave(id){

    const nombre =
        document.getElementById(
            "entrega_nombre"
        ).value;

    const legajo =
        document.getElementById(
            "entrega_legajo"
        ).value;

    const empresa =
        document.getElementById(
            "entrega_empresa"
        ).value;

    const motivo =
        document.getElementById(
            "entrega_motivo"
        ).value;

    if(
        nombre.trim() === ""
    ){

        alert(
            "Debe ingresar Apellido y Nombre"
        );

        return;

    }

    if(
        legajo.trim() === ""
    ){

        alert(
            "Debe ingresar Legajo"
        );

        return;

    }

    const llave =
        obtenerLlavePorId(id);

    if(
        llave.requiereAutorizacion
    ){

        const autorizante =
            document.getElementById(
                "autoriza_nombre"
            ).value;

        if(
            autorizante.trim() === ""
        ){

            alert(
                "Debe indicar quién autoriza la entrega"
            );

            return;

        }

    }

    prestarLlave({

    llaveId: id,

    persona: nombre,

    legajo: legajo,

    empresa: empresa,

    motivo: motivo,

    autorizacionRecibida: true

});

alert(
    "Llave entregada correctamente"
);

cargarModuloLlaves();

}

/* ==========================
   DEVOLUCIÓN DE LLAVE
========================== */

function abrirDevolucionLlave(id){

    const llave =
        obtenerLlavePorId(id);

    if(!llave){

        return;

    }

    const prestamo =
        prestamosLlavesSP360.find(

            p =>

            p.llaveId === id

            &&

            p.estado ===
            "Prestada"

        );

    if(!prestamo){

        alert(
            "No se encontró el préstamo activo."
        );

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            🔄 Devolución de Llave
        </h2>

        <div class="card">

            <h3>
                🔑 Información de la Llave
            </h3>

            <p>
                <strong>Código:</strong>
                ${llave.codigo}
            </p>

            <p>
                <strong>Descripción:</strong>
                ${llave.descripcion}
            </p>

            <p>
                <strong>Sector:</strong>
                ${llave.sector}
            </p>

        </div>

        <div class="card">

            <h3>
                👤 Préstamo Actual
            </h3>

            <p>
                <strong>Nombre:</strong>
                ${prestamo.persona}
            </p>

            <p>
                <strong>Legajo:</strong>
                ${prestamo.legajo}
            </p>

            <p>
                <strong>Empresa:</strong>
                ${prestamo.empresa}
            </p>

            <p>
                <strong>Fecha Entrega:</strong>
                ${prestamo.fechaEntrega}
            </p>

            <p>
                <strong>Hora Entrega:</strong>
                ${prestamo.horaEntrega}
            </p>

        </div>

        <div class="card">

            <h3>
                ✅ Datos de Devolución
            </h3>

            <input
                id="devolucion_nombre"
                placeholder="Apellido y Nombre">

            <input
                id="devolucion_legajo"
                placeholder="Legajo">

            <textarea
                id="devolucion_observacion"
                placeholder="Observación">
            </textarea>

        </div>

        <div class="card">

            <button

                class="btn btn-success"

                onclick="
                confirmarDevolucionLlave(
                    ${prestamo.id}
                )
                ">

                ✅ Confirmar Devolución

            </button>

            <button

                class="btn btn-danger"

                onclick="
                cargarModuloLlaves()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   CONFIRMAR DEVOLUCIÓN
========================== */

function confirmarDevolucionLlave(

    prestamoId

){

    const nombre =
        document.getElementById(
            "devolucion_nombre"
        ).value;

    const legajo =
        document.getElementById(
            "devolucion_legajo"
        ).value;

    if(
        nombre.trim() === ""
    ){

        alert(
            "Debe ingresar Apellido y Nombre"
        );

        return;

    }

    if(
        legajo.trim() === ""
    ){

        alert(
            "Debe ingresar Legajo"
        );

        return;

    }

    devolverLlave(
        prestamoId
    );

    alert(
        "Llave devuelta correctamente"
    );

    cargarModuloLlaves();

}

/* ==========================
   INVENTARIO INICIAL
========================== */
   
const inventarioInicialLlaves = [

    // PEGAR AQUÍ TODAS LAS LLAVES DEL RELEVAMIENTO

    {
        codigo: "85",
        descripcion: "3° PISO SILOS MAYORES PARA BLOQUEO DE FUMIGACION"
    },

    {
        codigo: "86",
        descripcion: "3° PISO VENTANA ACCESO AL TECHO"
    },

    {
        codigo: "90",
        descripcion: "ACCESO ESCALERA DE TANQUE DE AGUA"
    },

    {
        codigo: "119",
        descripcion: "ACCESO SUBSUELO PARA BLOQUEO DE FUMIGACION"
    },

    {
        codigo: "149",
        descripcion: "3° PISO - ACCESO AL MOTOR DEL MONTACARGAS"
    },

    {
        codigo: "150",
        descripcion: "ELEVADOR JLG"
    }

];

function cargarInventarioInicialLlaves(){

    inventarioInicialLlaves.forEach(

        llave => {

            const requiereMAHPI = [

                "85",
                "86",
                "90",
                "119",
                "149",
                "150"

            ].includes(
                llave.codigo
            );

            llavesSP360.push({

                id:
                Date.now() +
                Math.random(),

                codigo:
                llave.codigo,

                descripcion:
                llave.descripcion,

                sector:
                llave.descripcion,

                requiereAutorizacion:
                requiereMAHPI,

                areaAutorizante:

                requiereMAHPI
                ?
                "MAHPI"
                :
                "",

                estado:
                "Disponible",

                activa:
                true,

                trazabilidad:
                crearTrazabilidad()

            });

        }

    );

    guardarLlaves();

    alert(
        "Inventario inicial cargado correctamente"
    );

    cargarModuloLlaves();

}

function buscarLlave(){

    const texto =
        document.getElementById(
            "buscar_llave"
        ).value.toUpperCase();

    return llavesSP360.filter(

        llave =>

        llave.codigo
        .toUpperCase()
        .includes(texto)

        ||

        llave.descripcion
        .toUpperCase()
        .includes(texto)

    );

}

/* ==========================
   INVENTARIO DE LLAVES
========================== */

function cargarInventarioLlaves(){

    const content =
        document.getElementById(
            "content"
        );

    let filas = "";

    llavesSP360.forEach(

        llave => {

            let estado = "🟢 Disponible";

            if(
                llave.estado ===
                "Prestada"
            ){

                estado =
                "🟡 Prestada";

            }

            if(
                llave.estado ===
                "Demorada"
            ){

                estado =
                "🔴 Demorada";

            }

            if(
                llave.activa ===
                false
            ){

                estado =
                "⚫ Inactiva";

            }

            filas += `

                <tr>

                    <td>
                        ${llave.codigo}
                    </td>

                    <td>
                        ${llave.descripcion}
                    </td>

                    <td>
                        ${estado}
                    </td>

                    <td>

                        ${
                            llave.requiereAutorizacion

                            ?

                            "MAHPI"

                            :

                            "-"

                        }

                    </td>

                </tr>

            `;

        }

    );

    content.innerHTML = `

        <h2>
            📚 Inventario de Llaves
        </h2>

        <div class="card">

            <input

                id="buscar_llave"

                placeholder="
                Buscar por número o sector"

                onkeyup="
                filtrarInventarioLlaves()
                ">

        </div>

        <div class="card">

            <table>

                <thead>

                    <tr>

                        <th>
                            Código
                        </th>

                        <th>
                            Sector
                        </th>

                        <th>
                            Estado
                        </th>

                        <th>
                            Requiere Autorización
                        </th>

                    </tr>

                </thead>

                <tbody
                    id="inventario_llaves">

                    ${filas}

                </tbody>

            </table>

        </div>

    `;

}

/* ==========================
   FILTRO INVENTARIO
========================== */

function filtrarInventarioLlaves(){

    const texto =
        document.getElementById(
            "buscar_llave"
        )
        .value
        .toUpperCase();

    const filas =
        document.querySelectorAll(
            "#inventario_llaves tr"
        );

    filas.forEach(

        fila => {

            const contenido =
                fila.innerText
                .toUpperCase();

            fila.style.display =

                contenido.includes(
                    texto
                )

                ?

                ""

                :

                "none";

        }

    );
