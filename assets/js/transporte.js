/* ==========================
   SP360 - TRANSPORTE SEGURO
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let transportesSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_transportes"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarTransportes(){

    localStorage.setItem(

        "sp360_transportes",

        JSON.stringify(
            transportesSP360
        )

    );

}

/* ==========================
   CHECKLIST
========================== */

const checklistTransporte = [

    "Satelital",
    "Precinto",
    "Candado",
    "Matafuego",
    "Licencia",
    "EPP",
    "Documentacion"

];

/* ==========================
   REGISTRAR TRANSPORTE
========================== */

function registrarTransporte({

    patente,
    transportista,
    chofer,
    dni,
    origen,
    destino,
    remito,
    numeroPrecinto,
    controles

}){

    const trazabilidad =
        crearTrazabilidad();

    const registro = {

        id:
        `TRA-${Date.now()}`,

        patente,

        transportista,

        chofer,

        dni,

        origen,

        destino,

        remito,

        numeroPrecinto,

        controles,

        sitio:
        trazabilidad.sitio,

        usuario:
        trazabilidad.usuario,

        rol:
        trazabilidad.rol,

        fecha:
        trazabilidad.fecha,

        hora:
        trazabilidad.hora

    };

    transportesSP360.push(
        registro
    );

    guardarTransportes();

    validarControles(
        registro
    );

    return registro;

}

/* ==========================
   VALIDAR CONTROLES
========================== */

function validarControles(
    transporte
){

    transporte.controles.forEach(

        control => {

            if(

                control.estado ===
                "Observación"

                ||

                control.estado ===
                "No Conforme"

            ){

                crearNovedad({

                    modulo:
                    "Transporte Seguro",

                    titulo:
                    `${control.item} - ${transporte.patente}`,

                    descripcion:

                    `
Patente: ${transporte.patente}

Transportista:
${transporte.transportista}

Control:
${control.item}

Resultado:
${control.estado}

Observación:
${control.observacion}
                    `,

                    criticidad:

                    control.estado ===
                    "No Conforme"

                    ?

                    criticidades.ALTA

                    :

                    criticidades.MEDIA

                });

            }

        }

    );

}

/* ==========================
   CONSULTAS
========================== */

function obtenerTransportes(){

    return transportesSP360;

}

function obtenerTransportePatente(
    patente
){

    return transportesSP360.filter(

        transporte =>

        transporte.patente ===
        patente

    );

}

function obtenerTransportesFecha(
    fecha
){

    return transportesSP360.filter(

        transporte =>

        transporte.fecha ===
        fecha

    );

}

function obtenerTransportesSitio(
    sitio
){

    return transportesSP360.filter(

        transporte =>

        transporte.sitio ===
        sitio

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasTransporte(){

    const total =
        transportesSP360.length;

    let observaciones = 0;
    let noConformes = 0;

    transportesSP360.forEach(

        transporte => {

            transporte.controles.forEach(

                control => {

                    if(
                        control.estado ===
                        "Observación"
                    ){

                        observaciones++;

                    }

                    if(
                        control.estado ===
                        "No Conforme"
                    ){

                        noConformes++;

                    }

                }

            );

        }

    );

    return {

        total,

        observaciones,

        noConformes

    };

}

/* ==========================
   UI AUXILIAR
========================== */

function crearSelectChecklist(

    id,
    titulo

){

    return `

        <label>

            ${titulo}

        </label>

        <select id="${id}">

            <option>
                Conforme
            </option>

            <option>
                Observación
            </option>

            <option>
                No Conforme
            </option>

        </select>

        <br><br>

    `;

}

/* ==========================
   GUARDAR FORMULARIO
========================== */

function guardarFormularioTransporte(){

    const patente =
        document.getElementById(
            "tra_patente"
        ).value;

    const transportista =
        document.getElementById(
            "tra_transportista"
        ).value;

    const chofer =
        document.getElementById(
            "tra_chofer"
        ).value;

    const dni =
        document.getElementById(
            "tra_dni"
        ).value;

    const origen =
        document.getElementById(
            "tra_origen"
        ).value;

    const destino =
        document.getElementById(
            "tra_destino"
        ).value;

    const remito =
        document.getElementById(
            "tra_remito"
        ).value;

    const numeroPrecinto =
        document.getElementById(
            "tra_precinto"
        ).value;

    const controles = [

        {
            item: "Satelital",
            estado: document.getElementById("chk_satelital").value,
            observacion: ""
        },

        {
            item: "Precinto",
            estado: document.getElementById("chk_precinto").value,
            observacion: ""
        },

        {
            item: "Candado",
            estado: document.getElementById("chk_candado").value,
            observacion: ""
        },

        {
            item: "Matafuego",
            estado: document.getElementById("chk_matafuego").value,
            observacion: ""
        },

        {
            item: "Licencia",
            estado: document.getElementById("chk_licencia").value,
            observacion: ""
        },

        {
            item: "EPP",
            estado: document.getElementById("chk_epp").value,
            observacion: ""
        },

        {
            item: "Documentacion",
            estado: document.getElementById("chk_documentacion").value,
            observacion: ""
        }

    ];

    registrarTransporte({

        patente,
        transportista,
        chofer,
        dni,
        origen,
        destino,
        remito,
        numeroPrecinto,
        controles

    });

    alert(
        "Transporte registrado correctamente"
    );

    cargarModuloTransporte();

}

/* ==========================
   MODULO
========================== */

function cargarModuloTransporte(){

    const content =
        document.getElementById(
            "content"
        );

    const registros =
        obtenerTransportes();

    let filas = "";

    registros.forEach(t => {

        filas += `

            <tr>

                <td>${t.patente}</td>

                <td>${t.transportista}</td>

                <td>${t.chofer}</td>

                <td>${t.fecha}</td>

            </tr>

        `;

    });

    content.innerHTML = `

        <h2>
            🚛 Transporte Seguro
        </h2>

        <div class="card">

            <h3>
                Nuevo Transporte
            </h3>

            <input id="tra_patente" placeholder="Patente">

            <input id="tra_transportista" placeholder="Transportista">

            <input id="tra_chofer" placeholder="Chofer">

            <input id="tra_dni" placeholder="DNI">

            <input id="tra_origen" placeholder="Origen">

            <input id="tra_destino" placeholder="Destino">

            <input id="tra_remito" placeholder="Remito">

            <input id="tra_precinto" placeholder="Precinto">

            <h4>Checklist</h4>

            ${crearSelectChecklist("chk_satelital","Satelital")}
            ${crearSelectChecklist("chk_precinto","Precinto")}
            ${crearSelectChecklist("chk_candado","Candado")}
            ${crearSelectChecklist("chk_matafuego","Matafuego")}
            ${crearSelectChecklist("chk_licencia","Licencia")}
            ${crearSelectChecklist("chk_epp","EPP")}
            ${crearSelectChecklist("chk_documentacion","Documentación")}

            <button
                onclick="guardarFormularioTransporte()">

                Guardar Transporte

            </button>

        </div>

        <div class="card">

            <h3>
                Historial de Transportes
            </h3>

            <table
                style="width:100%">

                <thead>

                    <tr>

                        <th>Patente</th>
                        <th>Transportista</th>
                        <th>Chofer</th>
                        <th>Fecha</th>

                    </tr>

                </thead>

                <tbody>

                    ${filas}

                </tbody>

            </table>

        </div>

    `;

}
