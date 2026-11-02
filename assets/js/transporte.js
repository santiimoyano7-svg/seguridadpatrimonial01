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

    tipoMovimiento,

    remito,

    cantidadCandados,
    cantidadPrecintos,
    numerosPrecintos,

    controles,

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

   tipoMovimiento,

    remito,

    cantidadCandados,

    cantidadPrecintos,

    numerosPrecintos,

    controles,

    /* NUEVO */

    estado:
    "En Playa",

    fechaIngresoPlanta:
    null,

    horaIngresoPlanta:
    null,

    usuarioIngresoPlanta:
    null,

    fechaEgreso:
    null,

    horaEgreso:
    null,

    usuarioEgreso:
    null,

    observacionFinal:
    "",

    resultadoGeneral:
    calcularResultadoGeneral(
        controles
    ),

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
   EGRESO
========================== */

function registrarEgresoTransporte({

    id,

    observacionFinal

}){

    const transporte =
        transportesSP360.find(
            t => t.id === id
        );

    if(!transporte){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    transporte.estado =
        "Egresado";

    transporte.fechaEgreso =
        trazabilidad.fecha;

    transporte.horaEgreso =
        trazabilidad.hora;

    transporte.usuarioEgreso =
        trazabilidad.usuario;

    transporte.observacionFinal =
        observacionFinal;

    guardarTransportes();

    return true;

}

/* ==========================
   INGRESO A PLANTA
========================== */

function ingresarAPlanta(id){

    const transporte =
        transportesSP360.find(
            t => t.id === id
        );

    if(!transporte){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    transporte.estado =
        "En Planta";

    transporte.fechaIngresoPlanta =
        trazabilidad.fecha;

    transporte.horaIngresoPlanta =
        trazabilidad.hora;

    transporte.usuarioIngresoPlanta =
        trazabilidad.usuario;

    guardarTransportes();

    cargarModuloTransporte();

}

function abrirEgreso(id){

    const observacionFinal =

        prompt(
            "Observación Final del Transporte"
        );

    registrarEgresoTransporte({

        id,

        observacionFinal:
        observacionFinal || ""

    });

    cargarModuloTransporte();

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
   RESULTADO GENERAL
========================== */

function calcularResultadoGeneral(
    controles
){

    let resultado =
    "Conforme";

    controles.forEach(

        control => {

            if(
                control.estado ===
                "No Conforme"
            ){

                resultado =
                "No Conforme";

            }

            else if(

                control.estado ===
                "Observación"

                &&

                resultado !==
                "No Conforme"

            ){

                resultado =
                "Observación";

            }

        }

    );

    return resultado;

}
   
/* ==========================
   UI AUXILIAR
========================== */

function crearSelectChecklist(

    id,
    titulo

){

    return `

        <div class="check-item">

            <label>

                ${titulo}

            </label>

            <select

                id="${id}"

                onchange="
                toggleObservacion('${id}')
                "

            >

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

            <textarea

                id="${id}_obs"

                placeholder="Detalle de la observación"

                style="
                    display:none;
                    width:100%;
                    margin-top:5px;
                "

            ></textarea>

        </div>

    `;

}

function toggleObservacion(id){

    const estado =
        document.getElementById(id);

    const observacion =
        document.getElementById(
            id + "_obs"
        );

    if(

        estado.value ===
        "Observación"

        ||

        estado.value ===
        "No Conforme"

    ){

        observacion.style.display =
        "block";

    }
    else{

        observacion.style.display =
        "none";

        observacion.value = "";

    }

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

   const tipoMovimiento =
    document.getElementById(
        "tra_movimiento"
    ).value;

    const remito =
        document.getElementById(
            "tra_remito"
        ).value;

    const cantidadCandados =
    document.getElementById(
        "tra_candados"
    ).value;

const cantidadPrecintos =
    document.getElementById(
        "tra_cant_precintos"
    ).value;

const numerosPrecintos =
    document.getElementById(
        "tra_numeros_precintos"
    ).value;

    const controles = [

    {
        item: "Satelital",
        estado: document.getElementById("chk_satelital").value,
        observacion: document.getElementById("chk_satelital_obs").value
    },

    {
        item: "Precinto",
        estado: document.getElementById("chk_precinto").value,
        observacion: document.getElementById("chk_precinto_obs").value
    },

    {
        item: "Candado",
        estado: document.getElementById("chk_candado").value,
        observacion: document.getElementById("chk_candado_obs").value
    },

    {
        item: "Matafuego",
        estado: document.getElementById("chk_matafuego").value,
        observacion: document.getElementById("chk_matafuego_obs").value
    },

    {
        item: "Licencia",
        estado: document.getElementById("chk_licencia").value,
        observacion: document.getElementById("chk_licencia_obs").value
    },

    {
        item: "EPP",
        estado: document.getElementById("chk_epp").value,
        observacion: document.getElementById("chk_epp_obs").value
    },

    {
        item: "Documentacion",
        estado: document.getElementById("chk_documentacion").value,
        observacion: document.getElementById("chk_documentacion_obs").value
    }

];

   registrarTransporte({

    patente,
    transportista,
    chofer,
    dni,
    origen,
destino,

tipoMovimiento,

remito,

    cantidadCandados,

    cantidadPrecintos,

    numerosPrecintos,

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

            <td>${t.fecha || ""}</td>

            <td>${t.patente}</td>

            <td>${t.transportista}</td>

            <td>${t.chofer}</td>

            <td>${t.estado || "En Playa"}</td>

            <td>${t.resultadoGeneral || "Conforme"}</td>

            <td>${t.cantidadCandados || 0}</td>

            <td>${t.cantidadPrecintos || 0}</td>

            <td>

                ${
                    t.estado === "En Playa"

                    ?

                    `<button
                        class="btn btn-warning"
                        onclick="ingresarAPlanta('${t.id}')">

                        🟡 En Planta

                    </button>`

                    :

                    ""
                }

                ${
                    t.estado !== "Egresado"

                    ?

                    `<button
                        class="btn btn-success"
                        onclick="abrirEgreso('${t.id}')">

                        ⚪ Egreso

                    </button>`

                    :

                    ""
                }

            </td>

        </tr>

    `;

});

                ${
                    t.estado === "En Playa"
                    ?

                    `<button
                        class="btn btn-warning"
                        onclick="ingresarAPlanta('${t.id}')">

                        🟡 En Planta

                    </button>`

                    :

                    ""
                }

                ${
                    t.estado !== "Egresado"
                    ?

                    `<button
                        class="btn btn-success"
                        onclick="abrirEgreso('${t.id}')">

                        ⚪ Egreso

                    </button>`

                    :

                    ""
                }

            </td>

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

            <div class="form-grid">

                <input
                    id="tra_patente"
                    placeholder="Patente">

                <input
                    id="tra_transportista"
                    placeholder="Empresa de Transporte">

                <input
                    id="tra_chofer"
                    placeholder="Chofer">

                <input
                    id="tra_dni"
                    placeholder="DNI">

               <input
    id="tra_origen"
    placeholder="Origen">

<input
    id="tra_destino"
    placeholder="Destino">

<select id="tra_movimiento">

    <option value="">
        Tipo Movimiento
    </option>

    <option>
        Descargar
    </option>

    <option>
        Cargar
    </option>

    <option>
        Descargar y Cargar
    </option>

</select>

<input
    id="tra_remito"
    placeholder="Remito / N° Viaje">

                <input
                    id="tra_candados"
                    type="number"
                    placeholder="Cantidad Candados">

                <input
                    id="tra_cant_precintos"
                    type="number"
                    placeholder="Cantidad Precintos">

                <textarea

                    id="tra_numeros_precintos"

                    placeholder="
Números de Precintos
(separados por coma)"

                ></textarea>

            </div>

            <h4>
                Checklist de Control
            </h4>

            ${crearSelectChecklist(
                "chk_satelital",
                "Satelital"
            )}

            ${crearSelectChecklist(
                "chk_precinto",
                "Precinto"
            )}

            ${crearSelectChecklist(
                "chk_candado",
                "Candado"
            )}

            ${crearSelectChecklist(
                "chk_matafuego",
                "Matafuego"
            )}

            ${crearSelectChecklist(
                "chk_licencia",
                "Licencia"
            )}

            ${crearSelectChecklist(
                "chk_epp",
                "EPP"
            )}

            ${crearSelectChecklist(
                "chk_documentacion",
                "Documentación"
            )}

            <button
                class="btn btn-primary"
                onclick="guardarFormularioTransporte()">

                Guardar Transporte

            </button>

        </div>

        <div class="card">

            <h3>
                Historial de Transportes
            </h3>

            <table>

                <thead>

    <tr>

        <th>Fecha</th>

<th>Patente</th>

<th>Transportista</th>

<th>Chofer</th>

<th>Estado</th>

<th>Resultado</th>

<th>Candados</th>

<th>Precintos</th>

<th>Acciones</th>

    </tr>

</thead>

                <tbody>

                    ${filas}

                </tbody>

            </table>

        </div>

    `;

}
   
