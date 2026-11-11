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

function guardarCCTV(){

    localStorage.setItem(

        "sp360_cctv",

        JSON.stringify(
            cctvSP360
        )

    );

}

function guardarControlesCCTV(){

    localStorage.setItem(

        "sp360_controles_cctv",

        JSON.stringify(
            controlesCCTVSP360
        )

    );

}

function guardarGrabacionCCTV(){

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

}){

    cctvSP360.push({

        id:
        Date.now(),

        codigo,

        nombre,

        sector,

        criticidad,

        sitio,

        estado:
        estadosCCTV.FUNCIONANDO,

        activa:
        true,

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

}){

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

}){

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

function abrirNuevaCamara(){

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

                placeholder="
Código Cámara">

            <input

                id="cam_nombre"

                placeholder="
Nombre de Cámara">

            <input

                id="cam_sector"

                placeholder="
Sector">

            <select
                id="cam_sitio">

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

            <select
                id="cam_criticidad">

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

                onclick="
                guardarNuevaCamara()
                ">

                ✅ Guardar Cámara

            </button>

            <button

                class="btn btn-danger"

                onclick="
                cargarModuloCCTV()
                ">

                ❌ Cancelar

            </button>

        </div>

    `;

}

/* ==========================
   GUARDAR CAMARA
========================== */

function guardarNuevaCamara(){

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
        document.getElementById(
            "cam_criticidad"
        ).value;

    if(
        codigo.trim() === ""
    ){

        alert(
            "Debe ingresar el código de cámara"
        );

        return;

    }

    if(
        nombre.trim() === ""
    ){

        alert(
            "Debe ingresar el nombre de cámara"
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

    crearCamara({

        codigo,

        nombre,

        sector,

        criticidad,

        sitio

    });

    alert(
        "Cámara registrada correctamente"
    );

    cargarModuloCCTV();

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

    const content =
        document.getElementById(
            "content"
        );

    const estadisticas =
        obtenerEstadisticasCCTV();

    const rangos = [

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

    let columnasCamaras = "";

    cctvSP360.forEach(

        camara => {

            columnasCamaras += `

                <th>

                    ${camara.codigo}

                </th>

            `;

        }

    );

    let filasControl = "";

    rangos.forEach(

        rango => {

            let controles = `

                <td>

                    ${rango}

                </td>

            `;

            cctvSP360.forEach(

                camara => {

                    controles += `

                        <td>

                            <select>

                                <option>

                                    Funcionando

                                </option>

                                <option>

                                    Con Falla

                                </option>

                                <option>

                                    No Funciona

                                </option>

                            </select>

                        </td>

                    `;

                }

            );

            filasControl += `

                <tr>

                    ${controles}

                </tr>

            `;

        }

    );

    content.innerHTML = `

        <h2>

            📹 CCTV

        </h2>

<button
    class="btn btn-success"
    onclick="
    abrirNuevaCamara()
    ">

    ➕ Nueva Cámara

</button>

<br><br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    📹 Cámaras

                </div>

                <div class="stat-value">

                    ${estadisticas.total}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟢 Funcionando

                </div>

                <div class="stat-value">

                    ${estadisticas.funcionando}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 Con Falla

                </div>

                <div class="stat-value">

                    ${estadisticas.conFalla}

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 No Funciona

                </div>

                <div class="stat-value">

                    ${estadisticas.noFunciona}

                </div>

            </div>

        </div>

        <br>

        <div class="card">

            <h3>

                📋 Control Diario CCTV

            </h3>

            <table>

                <thead>

                    <tr>

                        <th>

                            Horario

                        </th>

                        ${columnasCamaras}

                    </tr>

                </thead>

                <tbody>

                    ${filasControl}

                </tbody>

            </table>

        </div>

        <br>

        <div class="card">

            <h3>

                🎥 Tiempo de Grabación

            </h3>

            <input

                type="number"

                placeholder="Días">

            <input

                type="number"

                placeholder="Horas">

            <textarea

                placeholder="
Observación">

            </textarea>

        </div>

    `;

}
