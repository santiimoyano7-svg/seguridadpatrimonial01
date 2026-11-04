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
   MODULO RONDAS
========================== */

function cargarModuloRondas(){

    const content =
        document.getElementById(
            "content"
        );
   
let tarjetas = "";

puntosSP360.forEach(

    punto => {

        let color = "#10B981";

        if(
            punto.criticidad ===
            "Alta"
        ){

            color = "#DC2626";

        }

        else if(
            punto.criticidad ===
            "Media"
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
            🚶 Rondas Inteligentes
        </h2>

        <div class="rondas-menu">

            <button
                class="btn btn-success">

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
                class="btn btn-primary">

                🗺 Circuitos

            </button>

            <button
                class="btn btn-primary">

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

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    📍 Total Puntos

                </div>

                <div class="stat-value">

                    10

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Alta Criticidad

                </div>

                <div class="stat-value">

                    6

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 Media Criticidad

                </div>

                <div class="stat-value">

                    3

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟢 Baja Criticidad

                </div>

                <div class="stat-value">

                    1

                </div>

            </div>

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

function abrirNuevoPunto(){

    punto => {

        let color = "#10B981";

        if(
            punto.criticidad ===
            "Alta"
        ){

            color = "#DC2626";

        }

        else if(
            punto.criticidad ===
            "Media"
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

                ${punto.qr}

                <br>

                ${punto.tiempo} min

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
