/* ==========================
   BASE DE DATOS PUNTOS
========================== */

let puntosSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_puntos"
    )
) || [];

/* ==========================
   BASE DE DATOS CIRCUITOS
========================== */

let circuitosSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_circuitos"
    )
) || [];


function guardarCircuitos(){

    localStorage.setItem(

        "sp360_circuitos",

        JSON.stringify(
            circuitosSP360
        )

    );

}

/* ==========================
   BASE DE DATOS RONDAS
========================== */

let rondasSP360 =

JSON.parse(
    localStorage.getItem(
        "sp360_rondas"
    )
) || [];

function guardarRondas(){

    localStorage.setItem(

        "sp360_rondas",

        JSON.stringify(
            rondasSP360
        )

    );

}

/* ==========================
   MODULO RONDAS
========================== */

function cargarModuloRondas(){

    const content =
        document.getElementById(
            "content"
        );
  
   content.innerHTML = `

        <h2>
            🚶 Rondas Inteligentes
        </h2>

        <div class="rondas-menu">

            <button
    class="btn btn-success"
    onclick="
    iniciarRonda()
    ">

    ▶ Iniciar Ronda

</button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloPuntos()
                ">

                📍 Puntos

            </button>

            <button
    class="btn btn-primary"
    onclick="
cargarCircuitos()
">

    🗺*Circuitos

</button>

            <button
    class="btn btn-primary"
    onclick="
    cargarHistorialRondas()
    ">

    📚 Historial

</button>

        </div>

        <br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    🟢 Completadas

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 En Curso

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Pendientes

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🚨 Hallazgos

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

        </div>

        <h3>
            🟡 Rondas Activas
        </h3>

        <div class="rondas-grid">

            <div
                class="ronda-card"
                style="
                background:#FBBF24;
                ">

                <h3>
                    🚶 RONDA A
                </h3>

                🟡 En Curso

                <br><br>

                Juan Pérez

                <br>

                08:15 hs

            </div>

            <div
                class="ronda-card"
                style="
                background:#EF4444;
                ">

                <h3>
                    🚶 RONDA B
                </h3>

                🔴 Pendiente

                <br><br>

                Turno Mañana

                <br>

                09:30 hs

            </div>

            <div
                class="ronda-card"
                style="
                background:#DC2626;
                ">

                <h3>
                    🚨 Hallazgo
                </h3>

                SUBSUELO

                <br><br>

                NOV Activa

            </div>

        </div>

    `;

}

/* ==========================
   MODULO PUNTOS
========================== */

function cargarModuloPuntos(){

    const content =
        document.getElementById(
            "content"
        );

    let tarjetas = "";

    puntosSP360.forEach(

        punto => {

            let color = "#10B981";

            if(
                punto.criticidad === "Alta"
            ){

                color = "#DC2626";

            }
            else if(
                punto.criticidad === "Media"
            ){

                color = "#FBBF24";

            }

            tarjetas += `

                <div
                    class="punto-card"
                    style="
                    background:${color};
                    ">

                    <h3>
                        📍 ${punto.nombre}
                    </h3>

                    ${punto.criticidad}

                    <br><br>

                    QR:
                    ${punto.qr}

                    <br>

                    ${punto.tiempo} min

                </div>

            `;

        }

    );

    content.innerHTML = `

        <h2>
            📍 Puntos de Control
        </h2>

        <div class="rondas-menu">

            <button
                class="btn btn-success"
                onclick="
                abrirNuevoPunto()
                ">

                ➕ Nuevo Punto

            </button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloRondas()
                ">

                🚶 Rondas

            </button>

            <button
                class="btn btn-primary">

                🗺 Circuitos

            </button>

        </div>

        <br>

        <div class="card">

            <input

                id="buscar_punto"

                placeholder="
                Buscar punto"

                onkeyup="
                filtrarPuntos()
                ">

        </div>

        <div
            class="puntos-grid">

            ${tarjetas}

        </div>

    `;

}

/* ==========================
   NUEVO PUNTO
========================== */

function abrirNuevoPunto(){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            📍 Nuevo Punto de Control
        </h2>

        <div class="card">

            <h3>
                Información General
            </h3>

            <input
                id="punto_nombre"
                placeholder="Nombre del Punto">

            <input
                id="punto_sector"
                placeholder="Sector">

            <select
                id="punto_sitio">

                <option>
                    Bagley Totoral
                </option>

                <option>
                    Cartocor Totoral
                </option>

                <option>
                    Arcor Caroya
                </option>

                <option>
                    Bagley Córdoba
                </option>

                <option>
                    Edificio Chacabuco
                </option>

            </select>

        </div>

        <div class="card">

            <h3>
                Configuración
            </h3>

            <input
                id="punto_qr"
                placeholder="Código QR">

            <input
                id="punto_tiempo"
                type="number"
                placeholder="Tiempo Esperado (minutos)">

            <select
                id="punto_criticidad">

                <option>
                    Baja
                </option>

                <option>
                    Media
                </option>

                <option>
                    Alta
                </option>

            </select>

            <select
                id="punto_estado">

                <option>
                    Activo
                </option>

                <option>
                    Inactivo
                </option>

            </select>

        </div>

        <div class="card">

            <button
                class="btn btn-success"
                onclick="
                guardarNuevoPunto()
                ">

                ✅ Guardar Punto

            </button>

            <button
                class="btn btn-danger"
                onclick="
                cargarModuloPuntos()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   GUARDAR NUEVO PUNTO
========================== */

function guardarNuevoPunto(){

    const nombre =
        document.getElementById(
            "punto_nombre"
        ).value;

    const sector =
        document.getElementById(
            "punto_sector"
        ).value;

    const sitio =
        document.getElementById(
            "punto_sitio"
        ).value;

    const qr =
        document.getElementById(
            "punto_qr"
        ).value;

    const tiempo =
        document.getElementById(
            "punto_tiempo"
        ).value;

    const criticidad =
        document.getElementById(
            "punto_criticidad"
        ).value;

    const estado =
        document.getElementById(
            "punto_estado"
        ).value;

    if(
        nombre.trim() === ""
    ){

        alert(
            "Debe ingresar el nombre del punto"
        );

        return;

    }

    if(
        sector.trim() === ""
    ){

        alert(
            "Debe ingresar el sector"
        );

        return;

    }

    if(
        qr.trim() === ""
    ){

        alert(
            "Debe ingresar el código QR"
        );

        return;

    }

    const nuevoPunto = {

        id:
        Date.now(),

        nombre,

        sector,

        sitio,

        qr,

        tiempo,

        criticidad,

        estado

    };

    if(
        typeof puntosSP360 ===
        "undefined"
    ){

        window.puntosSP360 = [];

    }

    puntosSP360.push(
        nuevoPunto
    );

    localStorage.setItem(

        "sp360_puntos",

        JSON.stringify(
            puntosSP360
        )

    );

    alert(
        "Punto creado correctamente"
    );

    cargarModuloPuntos();

}

/* ==========================
   MODULO CIRCUITOS
========================== */

function cargarCircuitos(){

    const content =
        document.getElementById(
            "content"
        );

   let tarjetasCircuitos = "";

circuitosSP360.forEach(

    circuito => {

        tarjetasCircuitos += `

            <div
    class="circuito-card"

    onclick="
    verDetalleCircuito(
        ${circuito.id}
    )
    ">

                <h3>

                    🗺 ${circuito.nombre}

                </h3>

                ${circuito.puntos.length}
                puntos

                <br><br>

                ${circuito.duracion}
                minutos

                <br><br>

                ${
    circuito.activo
    ?
    "✅ Activo"
    :
    "⚫ Inactivo"
}

<br><br>

<button

    class="btn btn-warning"

    onclick="
    toggleCircuito(
        ${circuito.id}
    )
    ">

    ${
        circuito.activo
        ?
        "⚫ Inactivar"
        :
        "✅ Activar"
    }

</button>

        `;

    }

);
   
    content.innerHTML = `

        <h2>
            🗺 Circuitos
        </h2>

        <div class="rondas-menu">

            <button
                class="btn btn-success"
                onclick="
                abrirNuevoCircuito()
                ">

                ➕ Nuevo Circuito

            </button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloRondas()
                ">

                🚶 Rondas

            </button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloPuntos()
                ">

                📍 Puntos

            </button>

        </div>

        <br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    🗺 Circuitos

                </div>

                <div class="stat-value">

                    4

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    📍 Puntos Asociados

                </div>

                <div class="stat-value">

                    ${puntosSP360.length}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Alta Criticidad

                </div>

                <div class="stat-value">

                    7

                </div>

            </div>

        </div>

        <br>

        <div class="circuitos-grid">

    ${tarjetasCircuitos}

</div>

    `;

}

/* ==========================
   NUEVO CIRCUITO
========================== */

function abrirNuevoCircuito(){

    const content =
        document.getElementById(
            "content"
        );

    let opcionesPuntos = "";

    puntosSP360.forEach(

        punto => {

            opcionesPuntos += `

                <option
                    value="${punto.id}">

                    ${punto.nombre}

                </option>

            `;

        }

    );

    content.innerHTML = `

        <h2>
            🗺 Nuevo Circuito
        </h2>

        <div class="card">

            <h3>
                Información General
            </h3>

            <input
                id="circuito_nombre"
                placeholder="Nombre del Circuito">

            <input
                id="circuito_duracion"
                type="number"
                placeholder="Duración estimada (minutos)">

            <select
                id="circuito_sitio">

                <option>
                    Bagley Totoral
                </option>

                <option>
                    Cartocor Totoral
                </option>

                <option>
                    Arcor Caroya
                </option>

                <option>
                    Bagley Córdoba
                </option>

                <option>
                    Edificio Chacabuco
                </option>

            </select>

        </div>

        <div class="card">

            <h3>
                📍 Seleccionar Puntos
            </h3>

            <select
                id="circuito_puntos"
                multiple
                style="
                min-height:250px;
                ">

                ${opcionesPuntos}

            </select>

            <br><br>

            <small>

                Mantener CTRL presionado
                para seleccionar varios puntos.

            </small>

        </div>

        <div class="card">

            <button
                class="btn btn-success"
                onclick="
                guardarNuevoCircuito()
                ">

                ✅ Guardar Circuito

            </button>

            <button
                class="btn btn-danger"
                onclick="
                cargarCircuitos()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   GUARDAR CIRCUITO
========================== */

function guardarNuevoCircuito(){

    const nombre =
        document.getElementById(
            "circuito_nombre"
        ).value;

    const duracion =
        document.getElementById(
            "circuito_duracion"
        ).value;

    const sitio =
        document.getElementById(
            "circuito_sitio"
        ).value;

    const selector =
        document.getElementById(
            "circuito_puntos"
        );

    const puntosSeleccionados =

        Array.from(
            selector.selectedOptions
        ).map(

            item => item.value

        );

    if(
        nombre.trim() === ""
    ){

        alert(
            "Debe ingresar el nombre del circuito"
        );

        return;

    }

    if(
        puntosSeleccionados.length === 0
    ){

        alert(
            "Debe seleccionar al menos un punto"
        );

        return;

    }

    const nuevoCircuito = {

        id:
        Date.now(),

        nombre,

        sitio,

        duracion,

        puntos:
        puntosSeleccionados,

        activo:
        true,

        trazabilidad:
        crearTrazabilidad()

    };

    circuitosSP360.push(
        nuevoCircuito
    );

    guardarCircuitos();

    alert(
        "Circuito guardado correctamente"
    );

    cargarCircuitos();

}

/* ==========================
   ACTIVAR / INACTIVAR
========================== */

function toggleCircuito(id){

    const circuito =

        circuitosSP360.find(

            c => c.id == id

        );

    if(
        !circuito
    ){

        return;

    }

    circuito.activo =
        !circuito.activo;

    guardarCircuitos();

    cargarCircuitos();

}

/* ==========================
   DETALLE CIRCUITO
========================== */

function verDetalleCircuito(id){

    const circuito =

        circuitosSP360.find(

            c => c.id == id

        );

    if(
        !circuito
    ){

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    let puntosCircuito = "";

    circuito.puntos.forEach(

        puntoId => {

            const punto =

                puntosSP360.find(

                    p =>

                    p.id == puntoId

                );

            if(
                punto
            ){

                puntosCircuito += `

                    <li>

                        ${punto.nombre}

                        (${punto.criticidad})

                    </li>

                `;

            }

        }

    );

    content.innerHTML = `

        <h2>

            🗺 ${circuito.nombre}

        </h2>

        <div class="card">

            <p>

                <strong>
                    Sitio:
                </strong>

                ${circuito.sitio}

            </p>

            <p>

                <strong>
                    Duración:
                </strong>

                ${circuito.duracion}
                minutos

            </p>

            <p>

                <strong>
                    Estado:
                </strong>

                ${

                    circuito.activo

                    ?

                    "✅ Activo"

                    :

                    "⚫ Inactivo"

                }

            </p>

        </div>

        <div class="card">

            <h3>

                📍 Puntos del Circuito

            </h3>

            <ol>

                ${puntosCircuito}

            </ol>

        </div>

        <div class="card">

            <button

    class="btn btn-warning"

    onclick="
    editarCircuito(
        ${circuito.id}
    )
    ">

    ✏ Editar

</button>

<button

    class="btn btn-primary"

    onclick="
    cargarCircuitos()
    ">

    ⬅ Volver

</button>

        </div>

    `;

}

/* ==========================
   EDITAR CIRCUITO
========================== */

function editarCircuito(id){

    const circuito =

        circuitosSP360.find(

            c => c.id == id

        );

    if(
        !circuito
    ){

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    let opcionesPuntos = "";

    puntosSP360.forEach(

        punto => {

            const seleccionado =

                circuito.puntos.includes(

                    String(
                        punto.id
                    )

                )

                ?

                "selected"

                :

                "";

            opcionesPuntos += `

                <option

                    value="${punto.id}"

                    ${seleccionado}>

                    ${punto.nombre}

                </option>

            `;

        }

    );

    content.innerHTML = `

        <h2>
            ✏ Editar Circuito
        </h2>

        <div class="card">

            <input

                id="editar_circuito_nombre"

                value="${circuito.nombre}"

                placeholder="Nombre">

            <input

                id="editar_circuito_duracion"

                type="number"

                value="${circuito.duracion}"

                placeholder="Duración">

            <select
                id="editar_circuito_sitio">

                <option
                    ${circuito.sitio === "Bagley Totoral" ? "selected" : ""}>
                    Bagley Totoral
                </option>

                <option
                    ${circuito.sitio === "Cartocor Totoral" ? "selected" : ""}>
                    Cartocor Totoral
                </option>

                <option
                    ${circuito.sitio === "Arcor Caroya" ? "selected" : ""}>
                    Arcor Caroya
                </option>

                <option
                    ${circuito.sitio === "Bagley Córdoba" ? "selected" : ""}>
                    Bagley Córdoba
                </option>

                <option
                    ${circuito.sitio === "Edificio Chacabuco" ? "selected" : ""}>
                    Edificio Chacabuco
                </option>

            </select>

        </div>

        <div class="card">

            <h3>
                📍 Puntos
            </h3>

            <select

                id="editar_circuito_puntos"

                multiple

                style="
                min-height:250px;
                ">

                ${opcionesPuntos}

            </select>

        </div>

        <div class="card">

            <button

                class="btn btn-success"

                onclick="
                guardarEdicionCircuito(
                    ${circuito.id}
                )
                ">

                ✅ Guardar Cambios

            </button>

            <button

                class="btn btn-danger"

                onclick="
                verDetalleCircuito(
                    ${circuito.id}
                )
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   GUARDAR EDICION CIRCUITO
========================== */

function guardarEdicionCircuito(id){

    const circuito =

        circuitosSP360.find(

            c => c.id == id

        );

    if(
        !circuito
    ){

        return;

    }

    circuito.nombre =

        document.getElementById(
            "editar_circuito_nombre"
        ).value;

    circuito.duracion =

        document.getElementById(
            "editar_circuito_duracion"
        ).value;

    circuito.sitio =

        document.getElementById(
            "editar_circuito_sitio"
        ).value;

    circuito.puntos =

        Array.from(

            document.getElementById(
                "editar_circuito_puntos"
            ).selectedOptions

        ).map(

            item => item.value

        );

    guardarCircuitos();

    alert(
        "Circuito actualizado correctamente"
    );

    verDetalleCircuito(id);

}

/* ==========================
   INICIAR RONDA
========================== */

function iniciarRonda(){

    const circuitosActivos =

        circuitosSP360.filter(

            circuito => circuito.activo

        );

    if(
        circuitosActivos.length === 0
    ){

        alert(
            "No existen circuitos activos."
        );

        return;

    }

    const circuito =

        circuitosActivos[
            Math.floor(
                Math.random() *
                circuitosActivos.length
            )
        ];

    const puntosCircuito =

        puntosSP360.filter(

            punto =>

            circuito.puntos.includes(
                String(
                    punto.id
                )
            )

        );

    const nuevaRonda = {

        id:
        Date.now(),

        circuitoId:
        circuito.id,

        circuito:
        circuito.nombre,

        inicio:
        new Date().toISOString(),

        estado:
        "En Curso",

        guardia:

        usuarioActivo
        ?
        usuarioActivo.nombre
        :
        "Guardia",

        puntos:

        puntosCircuito.map(

            punto => ({

                id:
                punto.id,

                nombre:
                punto.nombre,

                completado:
                false,

                observacion:
                "",

                evidencia:
                [],

                fechaControl:
                null

            })

        )

    };

    rondasSP360.push(
        nuevaRonda
    );

    guardarRondas();

    mostrarRondaActiva(
        nuevaRonda.id
    );

}
/* ==========================
   MOSTRAR RONDA ACTIVA
========================== */

function mostrarRondaActiva(
    rondaId
){

    const ronda =

        rondasSP360.find(

            r => r.id == rondaId

        );

    if(
        !ronda
    ){

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    let puntosHTML = "";

    ronda.puntos.forEach(

        (punto,index) => {

            const estado =

                punto.completado

                ?

                "✅ Verificado"

                :

                "⏳ Pendiente";

            const color =

                punto.completado

                ?

                "#10B981"

                :

                "#FBBF24";

            puntosHTML += `

                <div
                    class="punto-card"

                    style="
                    background:${color};
                    "

                    onclick="
abrirPuntoRonda(
    ${ronda.id},
    ${punto.id}
)
">

                    <h3>

                        📍 ${index + 1}

                    </h3>

                    <strong>

                        ${punto.nombre}

                    </strong>

                    <br><br>

                    ${estado}

                </div>

            `;

        }

    );

    content.innerHTML = `

        <h2>

            🚶 Ronda en Curso

        </h2>

        <div class="card">

            <strong>
                Circuito:
            </strong>

            ${ronda.circuito}

            <br><br>

            <strong>
                Estado:
            </strong>

            ${ronda.estado}

            <br><br>

            <strong>
                Guardia:
            </strong>

            ${ronda.guardia}

            <br><br>

            <strong>
                Inicio:
            </strong>

            ${new Date(
                ronda.inicio
            ).toLocaleString()}

        </div>

        <div
            class="puntos-grid">

            ${puntosHTML}

        </div>

        <br>

        <button

            class="btn btn-success"

            onclick="
            finalizarRonda(
                ${ronda.id}
            )
            ">

            ✅ Finalizar Ronda

        </button>

        <button

            class="btn btn-danger"

            onclick="
            cargarModuloRondas()
            ">

            ❌ Cancelar

        </button>

    `;

}

/* ==========================
   ABRIR PUNTO RONDA
========================== */

function abrirPuntoRonda(

    rondaId,
    puntoId

){

    const ronda =

        rondasSP360.find(

            r => r.id == rondaId

        );

    if(!ronda){

        return;

    }

    const punto =

        ronda.puntos.find(

            p => p.id == puntoId

        );

    if(!punto){

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>

            📍 ${punto.nombre}

        </h2>

        <div class="card">

            <strong>
                Circuito:
            </strong>

            ${ronda.circuito}

            <br><br>

            <strong>
                Estado:
            </strong>

            ${
                punto.completado

                ?

                "✅ Verificado"

                :

                "⏳ Pendiente"

            }

        </div>

        <div class="card">

            <h3>
                Resultado del Control
            </h3>

            <select
                id="resultado_punto">

                <option>
                    Conforme
                </option>

                <option>
                    Observación
                </option>

                <option>
                    Hallazgo
                </option>

            </select>

<select
    id="categoria_hallazgo"
    onchange="actualizarSubcategorias()">

    <option>
        Seguridad Patrimonial
    </option>

    <option>
        Producción
    </option>

    <option>
        Mantenimiento
    </option>

    <option>
        Eléctrico
    </option>

    <option>
        Accesos
    </option>

    <option>
        MAHPI
    </option>

    <option>
        Transporte
    </option>

    <option>
        Recursos Humanos
    </option>

    <option>
        Food Defense
    </option>

    <option>
        Edilicio/Limpieza
    </option>

    <option>
        Calidad
    </option>

</select>

<select
    id="subcategoria_hallazgo">
    
<select
    id="criticidad_hallazgo">
    
</select>

<br><br>

<label>

    Criticidad

</label>

<select
    id="criticidad_hallazgo">

    <option>
        Baja
    </option>

    <option selected>
        Media
    </option>

    <option>
        Alta
    </option>

</select>

            <textarea

                id="observacion_punto"

                placeholder="
Observaciones del punto">

            </textarea>

<textarea

    id="hallazgo_detalle"

    placeholder="
Descripción detallada del hallazgo">

</textarea>

            <br><br>

            <input

                id="evidencia_punto"

                type="file"

                accept="image/*">

        </div>

        <div class="card">

            <button

                class="btn btn-success"

                onclick="
                guardarPuntoRonda(
                    ${ronda.id},
                    ${punto.id}
                )
                ">

                ✅ Guardar Punto

            </button>

            <button

                class="btn btn-danger"

                onclick="
                mostrarRondaActiva(
                    ${ronda.id}
                )
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   SUBCATEGORIAS HALLAZGO
========================== */

function actualizarSubcategorias(){

    const categoria =
        document.getElementById(
            "categoria_hallazgo"
        ).value;

    const combo =
        document.getElementById(
            "subcategoria_hallazgo"
        );

    let opciones = "";

    const categorias = {

        "Seguridad Patrimonial":[
            "Acceso no autorizado",
            "Puerta abierta",
            "Candado dañado",
            "Precinto violado",
            "Presencia sospechosa",
            "Objeto abandonado"
        ],

        "Producción":[
            "Detención de línea",
            "Desvío operativo",
            "Producto expuesto",
            "Producto abandonado"
        ],

        "Mantenimiento":[
            "Fuga",
            "Rotura",
            "Equipo dañado",
            "Desgaste"
        ],

        "Eléctrico":[
            "Cable expuesto",
            "Tablero abierto",
            "Protección faltante",
            "Luminaria fuera de servicio"
        ],

        "Accesos":[
            "Portón abierto",
            "Puerta forzada",
            "Acceso indebido",
            "Control omitido"
        ],

        "MAHPI":[
            "Acto inseguro",
            "Condición insegura",
            "Incumplimiento EPP",
            "Derrame",
            "Extintor vencido",
            "Extintor descargado",
            "Salida de emergencia bloqueada",
            "Residuo mal segregado",
            "Riesgo ambiental",
            "Riesgo de incendio",
            "Trabajo inseguro"
        ],

        "Transporte":[
            "Precinto incorrecto",
            "Cabina observada",
            "Carga insegura",
            "Documentación irregular"
        ],

        "Recursos Humanos":[
            "Personal no identificado",
            "Visitante sin autorización",
            "Conducta indebida"
        ],

        "Food Defense":[
            "Acceso no autorizado",
            "Elemento extraño",
            "Manipulación sospechosa",
            "Producto vulnerable"
        ],

        "Edilicio/Limpieza":[
            "Daño edilicio",
            "Falta de limpieza",
            "Derrame",
            "Obstrucción"
        ],

        "Calidad":[
            "Producto fuera de especificación",
            "Material mal identificado",
            "Incumplimiento GMP",
            "Contaminación"
        ]

    };

    categorias[categoria].forEach(

        item => {

            opciones += `

                <option>

                    ${item}

                </option>

            `;

        }

    );

    combo.innerHTML =
        opciones;

}

/* ==========================
   GUARDAR PUNTO RONDA
========================== */

function guardarPuntoRonda(

    rondaId,
    puntoId

){

    const ronda =

        rondasSP360.find(

            r => r.id == rondaId

        );

    if(!ronda){

        return;

    }

    const punto =

        ronda.puntos.find(

            p => p.id == puntoId

        );

    if(!punto){

        return;

    }

    const resultado =

        document.getElementById(
            "resultado_punto"
        ).value;
   
const evidencia =

    document.getElementById(
        "evidencia_punto"
    ).files[0];
   
    const observacion =

    document.getElementById(
        "hallazgo_detalle"
    ).value;

const categoria =

    document.getElementById(
        "categoria_hallazgo"
    ).value;

   const subcategoria =
    document.getElementById(
        "subcategoria_hallazgo"
    ).value;

   const criticidad =

    document.getElementById(
        "criticidad_hallazgo"
    ).value;
   
    if(

        (
            resultado ===
            "Observación"

            ||

            resultado ===
            "Hallazgo"

        )

        &&

        observacion.trim() === ""

    ){

        alert(
            "Debe completar la observación."
        );

        return;

    }

    punto.completado =
        true;

    punto.resultado =
        resultado;

    punto.observacion =
        observacion;
   
punto.evidencia =

    evidencia

    ?

    evidencia.name

    :

    "";

    punto.fechaControl =
        new Date().toISOString();

    if(
    resultado ===
    "Hallazgo"
){

    registrarHallazgo(

    rondaId,

    puntoId,

    categoria,

    subcategoria,

    criticidad,

    observacion

);

    return;

}

    guardarRondas();

    mostrarRondaActiva(
        rondaId
    );

}

/* ==========================
   REGISTRAR HALLAZGO
========================== */

function registrarHallazgo(

    rondaId,
    puntoId,

    categoria,

    subcategoria,

    criticidad,

    descripcion

){

    const ronda =

        rondasSP360.find(

            r => r.id == rondaId

        );

    if(
        !ronda
    ){

        return;

    }

    const punto =

        ronda.puntos.find(

            p => p.id == puntoId

        );

    if(
        !punto
    ){

        return;

    }

    punto.completado = true;

    punto.hallazgo = true;

    punto.observacion =
        descripcion;
   
punto.evidencia =

    document.getElementById(
        "evidencia_punto"
    ).files[0]

    ?

    document.getElementById(
        "evidencia_punto"
    ).files[0].name

    :

    "";
   
    punto.fechaControl =
        new Date().toISOString();

    crearNovedad({

        modulo:
        "Rondas Inteligentes",

        titulo:
`${categoria} - ${subcategoria}`,

        descripcion:
        `
Punto: ${punto.nombre}

Circuito: ${ronda.circuito}

Categoría:
${categoria}

Subcategoría:
${subcategoria}

Criticidad:
${criticidad}

Hallazgo:
${descripcion}

Evidencia:
${punto.evidencia || "Sin evidencia"}
        `,

        criticidad:

    criticidad === "Alta"

    ?

    criticidades.ALTA

    :

    criticidad === "Media"

    ?

    criticidades.MEDIA

    :

    criticidades.BAJA

    });

    guardarRondas();

    mostrarRondaActiva(
        rondaId
    );

}

/* ==========================
   FINALIZAR RONDA
========================== */

function finalizarRonda(
    rondaId
){

    const ronda =

        rondasSP360.find(

            r => r.id == rondaId

        );

    if(
        !ronda
    ){

        return;

    }

    const pendientes =

        ronda.puntos.filter(

            p => !p.completado

        );

    if(
        pendientes.length > 0
    ){

        alert(
            "Existen puntos pendientes."
        );

        return;

    }

    ronda.estado =
        "Finalizada";

    ronda.fin =
        new Date().toISOString();

    guardarRondas();

    alert(
        "Ronda finalizada correctamente"
    );

    cargarModuloRondas();

}

/* ==========================
   HISTORIAL RONDAS
========================== */

function cargarHistorialRondas(){

    const content =
        document.getElementById(
            "content"
        );

    let filas = "";

    rondasSP360.forEach(

        ronda => {

            const totalPuntos =

                ronda.puntos.length;

            const completados =

                ronda.puntos.filter(

                    p => p.completado

                ).length;

            let hallazgos = 0;

            ronda.puntos.forEach(

                punto => {

                    if(

                        punto.resultado ===
                        "Hallazgo"

                    ){

                        hallazgos++;

                    }

                }

            );

            filas += `

                <tr>

                    <td>

                        ${
                            new Date(
                                ronda.inicio
                            )
                            .toLocaleDateString()
                        }

                    </td>

                    <td>

                        ${ronda.circuito}

                    </td>

                    <td>

                        ${ronda.guardia}

                    </td>

                    <td>

                        ${completados}
                        /
                        ${totalPuntos}

                    </td>

                    <td>

                        ${hallazgos}

                    </td>

                    <td>

    ${ronda.estado}

</td>

<td>

    <button

        class="btn btn-primary"

        onclick="
        verDetalleRonda(
            ${ronda.id}
        )
        ">

        👁 Ver

    </button>

</td>

                </tr>

            `;

        }

    );

    content.innerHTML = `

        <h2>

            📚 Historial de Rondas

        </h2>

        <div class="card">

            <input

                id="buscar_ronda"

                placeholder="
Buscar Circuito o Guardia"

                onkeyup="
                filtrarHistorialRondas()
                ">

        </div>

        <div class="card">

            <table>

                <thead>

                    <tr>

                        <th>
                            Fecha
                        </th>

                        <th>
                            Circuito
                        </th>

                        <th>
                            Guardia
                        </th>

                        <th>
                            Puntos
                        </th>

                        <th>
                            Hallazgos
                        </th>

                        <th>
    Estado
</th>

<th>
    Acción
</th>

                    </tr>

                </thead>

                <tbody
                    id="historial_rondas">

                    ${filas}

                </tbody>

            </table>

        </div>

        <br>

        <button

            class="btn btn-primary"

            onclick="
            cargarModuloRondas()
            ">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   DETALLE RONDA
========================== */

function verDetalleRonda(id){

    const ronda =

        rondasSP360.find(

            r => r.id == id

        );

    if(
        !ronda
    ){

        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    let puntosHTML = "";

    ronda.puntos.forEach(

        punto => {

            const resultado =

                punto.resultado ||
                "Sin Registrar";

            const observacion =

                punto.observacion ||
                "-";

            const fechaControl =

                punto.fechaControl

                ?

                new Date(
                    punto.fechaControl
                ).toLocaleString()

                :

                "-";

            puntosHTML += `

                <tr>

                    <td>

                        ${punto.nombre}

                    </td>

                    <td>

                        ${resultado}

                    </td>

                    <td>

                        ${observacion}

                    </td>

                    <td>

    ${fechaControl}

</td>

<td>

    ${
        punto.evidencia

        ?

        `📸 ${punto.evidencia}`

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

            📚 Detalle de Ronda

        </h2>

        <div class="card">

            <p>

                <strong>
                    Circuito:
                </strong>

                ${ronda.circuito}

            </p>

            <p>

                <strong>
                    Guardia:
                </strong>

                ${ronda.guardia}

            </p>

            <p>

                <strong>
                    Estado:
                </strong>

                ${ronda.estado}

            </p>

            <p>

                <strong>
                    Inicio:
                </strong>

                ${new Date(
                    ronda.inicio
                ).toLocaleString()}

            </p>

            <p>

                <strong>
                    Fin:
                </strong>

                ${
                    ronda.fin

                    ?

                    new Date(
                        ronda.fin
                    ).toLocaleString()

                    :

                    "-"

                }

            </p>

        </div>

        <div class="card">

            <h3>

                📍 Puntos Recorridos

            </h3>

            <table>

                <thead>

                    <tr>

                        <th>
                            Punto
                        </th>

                        <th>
                            Resultado
                        </th>

                        <th>
                            Observación
                        </th>

                        <th>
                            Fecha Control
                        </th>
                        
<th>
    Evidencia
</th>

                    </tr>

                </thead>

                <tbody>

                    ${puntosHTML}

                </tbody>

            </table>

        </div>

        <br>

        <button

            class="btn btn-primary"

            onclick="
            cargarHistorialRondas()
            ">

            ⬅ Volver

        </button>

    `;

}
/* ==========================
   FILTRAR HISTORIAL
========================== */

function filtrarHistorialRondas(){

    const texto =

        document.getElementById(
            "buscar_ronda"
        )
        .value
        .toUpperCase();

    const filas =

        document.querySelectorAll(
            "#historial_rondas tr"
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

}
