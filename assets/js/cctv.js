/* ==========================
   SP360 - CCTV
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let cctvSP360 =
    JSON.parse(
        localStorage.getItem(
            "sp360_cctv"
        )
    ) || [];

let controlesCCTVSP360 =
    JSON.parse(
        localStorage.getItem(
            "sp360_controles_cctv"
        )
    ) || [];

let grabacionCCTVSP360 =
    JSON.parse(
        localStorage.getItem(
            "sp360_grabacion_cctv"
        )
    ) || [];

/* ==========================
   ESTADOS
========================== */

const estadosCCTV = {
    FUNCIONANDO:
        "Funcionando",

    CON_FALLA:
        "Con Falla",

    NO_FUNCIONA:
        "No Funciona"
};

/* ==========================
   GUARDAR
========================== */

function guardarCCTV() {

    localStorage.setItem(
        "sp360_cctv",
        JSON.stringify(
            cctvSP360
        )
    );

}

function guardarControlesCCTV() {

    localStorage.setItem(
        "sp360_controles_cctv",
        JSON.stringify(
            controlesCCTVSP360
        )
    );

}

function guardarGrabacionCCTV() {

    localStorage.setItem(
        "sp360_grabacion_cctv",
        JSON.stringify(
            grabacionCCTVSP360
        )
    );

}

/* ==========================
   ALTA DE CAMARA
========================== */

function crearCamara({
    codigo,
    nombre,
    sector,
    criticidad,
    sitio
}) {

    cctvSP360.push({

        id: Date.now(),

        codigo,
        nombre,
        sector,
        criticidad,
        sitio,

        estado:
            estadosCCTV.FUNCIONANDO,

        activa: true,

        trazabilidad:
            crearTrazabilidad()

    });

    guardarCCTV();

}

/* ==========================
   CONTROL HORARIO
========================== */

function registrarControlCamara({
    camaraId,
    rangoHorario,
    horaControl,
    estado,
    observacion,
    usuario
}) {

    controlesCCTVSP360.push({

        id:
            Date.now(),

        camaraId,
        rangoHorario,
        horaControl,
        estado,
        observacion,
        usuario,

        fecha:
            new Date().toISOString()

    });

    guardarControlesCCTV();

}

/* ==========================
   TIEMPO DE GRABACION
========================== */

function registrarTiempoGrabacion({
    dias,
    horas,
    observacion,
    usuario
}) {

    grabacionCCTVSP360.push({

        fecha:
            new Date().toISOString(),

        dias,
        horas,
        observacion,
        usuario

    });

    guardarGrabacionCCTV();

}
/* ==========================
   NUEVA CAMARA
========================== */

function abrirNuevaCamara() {

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            ➕ Nueva Cámara
        </h2>

        <div class="card">

            <input
                id="cam_codigo"
                placeholder="Código Cámara">

            <input
                id="cam_nombre"
                placeholder="Nombre de Cámara">

            <input
                id="cam_sector"
                placeholder="Sector">

            <select id="cam_sitio">

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

            <select id="cam_criticidad">

                <option>
                    Alta
                </option>

                <option>
                    Media
                </option>

                <option>
                    Baja
                </option>

            </select>

        </div>

        <div class="card">

            <button
                class="btn btn-success"
                onclick="guardarNuevaCamara()">

                ✅ Guardar Cámara

            </button>

            <button
                class="btn btn-danger"
                onclick="cargarModuloCCTV()">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   GUARDAR CAMARA
========================== */

function guardarNuevaCamara() {

    const codigo =
        document.getElementById(
            "cam_codigo"
        ).value;

    const nombre =
        document.getElementById(
            "cam_nombre"
        ).value;

    const sector =
        document.getElementById(
            "cam_sector"
        ).value;

    const sitio =
        document.getElementById(
            "cam_sitio"
        ).value;

    const criticidad =

   /* ==========================
   INVENTARIO CCTV
========================== */

function cargarInventarioCCTV() {

    const content =
        document.getElementById(
            "content"
        );

    let filas = "";

    cctvSP360.forEach(
        camara => {

            let estado =
                "🟢 Funcionando";

            if (
                camara.estado ===
                estadosCCTV.CON_FALLA
            ) {

                estado =
                    "🟡 Con Falla";

            }

            if (
                camara.estado ===
                estadosCCTV.NO_FUNCIONA
            ) {

                estado =
                    "🔴 No Funciona";

            }

            filas += `

                <tr>

                    <td>
                        ${camara.codigo}
                    </td>

                    <td>
                        ${camara.nombre}
                    </td>

                    <td>
                        ${camara.sector}
                    </td>

                    <td>
                        ${camara.sitio}
                    </td>

                    <td>
                        ${camara.criticidad}
                    </td>

                    <td>
                        ${estado}
                    </td>

                </tr>

            `;

        }
    );

    content.innerHTML = `

        <h2>
            📚 Inventario CCTV
        </h2>

        <div class="card">

            <input
                id="buscar_camara"
                placeholder="Buscar cámara"
                onkeyup="
                    filtrarInventarioCCTV()
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
                            Nombre
                        </th>

                        <th>
                            Sector
                        </th>

                        <th>
                            Sitio
                        </th>

                        <th>
                            Criticidad
                        </th>

                        <th>
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody
                    id="inventario_cctv">

                    ${filas}

                </tbody>

            </table>

        </div>

        <br>

        <button
            class="btn btn-primary"
            onclick="
                cargarModuloCCTV()
            ">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   FILTRAR INVENTARIO CCTV
========================== */

function filtrarInventarioCCTV() {

    const texto =
        document
        .getElementById(
            "buscar_camara"
        )
        .value
        .toUpperCase();

    const filas =
        document.querySelectorAll(
            "#inventario_cctv tr"
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

                ? ""

                : "none";

        }
    );

}

/* ==========================
   CONTROL DIARIO CCTV
========================== */

function cargarControlDiarioCCTV() {

    const content =
        document.getElementById(
            "content"
        );

    const horarios = [

        "01:00 - 03:00",
        "03:00 - 05:00",
        "05:00 - 07:00",
        "07:00 - 09:00",
        "09:00 - 11:00",
        "11:00 - 13:00",
        "13:00 - 15:00",
        "15:00 - 17:00",
        "17:00 - 19:00",
        "19:00 - 21:00",
        "21:00 - 23:00",
        "23:00 - 01:00"

    ];

    let columnas = "";

    cctvSP360.forEach(
        camara => {

            columnas += `

                <th>
                    ${camara.codigo}
                </th>

            `;

        }
    );

    let filas = "";

    horarios.forEach(
        horario => {

            let fila = `

                <td>
                    ${horario}
                </td>

            `;

            cctvSP360.forEach(
                camara => {

                    fila += `

                        <td>

                            <div class="cctv-estados">

                                <button
                                    class="btn btn-success"
                                    onclick="
                                        guardarControlCamara(
                                            '${camara.id}',
                                            '${horario}',
                                            'Funcionando'
                                        )
                                    ">

                                    🟢

                                </button>

                                <button
                                    class="btn btn-warning"
                                    onclick="
                                        abrirControlCamara(
                                            '${camara.id}',
                                            '${horario}',
                                            'Con Falla'
                                        )
                                    ">

                                    🟡

                                </button>

                                <button
                                    class="btn btn-danger"
                                    onclick="
                                        abrirControlCamara(
                                            '${camara.id}',
                                            '${horario}',
                                            'No Funciona'
                                        )
                                    ">

                                    🔴

                                </button>

                            </div>

                        </td>

                    `;

                }
            );

            filas += `

                <tr>

                    ${fila}

                </tr>

            `;

        }
    );

    content.innerHTML = `

        <h2>
            📋 Control Diario CCTV
        </h2>

        <div class="card">

            <table>

                <thead>

                    <tr>

                        <th>
                            Horario
                        </th>

                        ${columnas}

                    </tr>

                </thead>

                <tbody>

                    ${filas}

                </tbody>

            </table>

        </div>

        <br>

        <button
            class="btn btn-primary"
            onclick="cargarModuloCCTV()">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   CONTROL CAMARA
========================== */

function abrirControlCamara(
    camaraId,
    rangoHorario,
    estado
){

    const camara =
        cctvSP360.find(
            c => c.id == camaraId
        );

    if(!camara){
        return;
    }

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            📹 Control de Cámara
        </h2>

        <div class="card">

            <h3>
                Estado: ${estado}
            </h3>

            <textarea
                id="obs_camara"
                placeholder="Observación">
            </textarea>

            <br><br>

            <button
                class="btn btn-success"
                onclick="
                registrarControlCompleto(
                    '${camara.id}',
                    '${rangoHorario}',
                    '${estado}'
                )
                ">

                ✅ Guardar

            </button>

        </div>

        <br>

        <button
            class="btn btn-primary"
            onclick="
            cargarControlDiarioCCTV()
            ">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   GUARDAR CONTROL RAPIDO
========================== */

function guardarControlCamara(
    camaraId,
    rangoHorario,
    estado
){

    registrarControlCamara({

        camaraId,
        rangoHorario,

        horaControl:
            new Date()
            .toLocaleTimeString(),

        estado,

        observacion: "",

        usuario:
            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Guardia"

    });

    alert(
        "Control registrado correctamente"
    );

}

/* ==========================
   REGISTRAR CONTROL COMPLETO
========================== */

function registrarControlCompleto(
    camaraId,
    rangoHorario,
    estado
){

    const observacion =
        document.getElementById(
            "obs_camara"
        ).value;

    if(

        (
            estado === "Con Falla"
            ||
            estado === "No Funciona"
        )

        &&

        observacion.trim() === ""

    ){

        alert(
            "Debe completar la observación."
        );

        return;

    }

    registrarControlCamara({

        camaraId,
        rangoHorario,

        horaControl:
            new Date()
            .toLocaleTimeString(),

        estado,

        observacion,

        usuario:
            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Guardia"

    });

    if(
        estado ===
        "No Funciona"
    ){

        if(
            typeof crearNovedad ===
            "function"
        ){

            crearNovedad({

                modulo: "CCTV",

                titulo:
                    "Camara Fuera de Servicio",

                descripcion:
                    observacion,

                criticidad:
                    criticidades.MEDIA

            });

        }

    }

    alert(
        "Control registrado correctamente"
    );

    cargarControlDiarioCCTV();

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasCCTV(){

    return {

        total:
            cctvSP360.length,

        funcionando:

            cctvSP360.filter(
                c =>
                c.estado ===
                estadosCCTV.FUNCIONANDO
            ).length,

        conFalla:

            cctvSP360.filter(
                c =>
                c.estado ===
                estadosCCTV.CON_FALLA
            ).length,

        noFunciona:

            cctvSP360.filter(
                c =>
                c.estado ===
                estadosCCTV.NO_FUNCIONA
            ).length

    };

}

/* ==========================
   MODULO CCTV
========================== */

function cargarModuloCCTV(){

    cargarControlDiarioCCTV();

}
