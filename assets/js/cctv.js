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
