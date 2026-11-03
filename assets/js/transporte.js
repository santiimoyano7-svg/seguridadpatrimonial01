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

tienePrecintos,

tieneSogaPrecinto,

tieneCandados,

cantidadCandados,

cantidadPrecintos,

numerosPrecintos,

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

   tipoMovimiento,

remito,

tienePrecintos,

tieneSogaPrecinto,

tieneCandados,

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

      viajeSalida:
null,

destinoFinal:
null,

llevaPrecintosSalida:
null,

cantidadPrecintosSalida:
null,

numerosPrecintosSalida:
"",

llevaCandadosSalida:
null,

cantidadCandadosSalida:
null,

controlCabina:
null,

observacionCabina:
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

    viajeSalida,

    destinoFinal,

    llevaPrecintosSalida,

    cantidadPrecintosSalida,

    numerosPrecintosSalida,

    llevaCandadosSalida,

    cantidadCandadosSalida,

    controlCabina,

    observacionCabina,

observacionFinal

}){

   transporte.viajeSalida =
    viajeSalida;

transporte.destinoFinal =
    destinoFinal;

transporte.llevaPrecintosSalida =
    llevaPrecintosSalida;

transporte.cantidadPrecintosSalida =
    cantidadPrecintosSalida;

transporte.numerosPrecintosSalida =
    numerosPrecintosSalida;

transporte.llevaCandadosSalida =
    llevaCandadosSalida;

transporte.cantidadCandadosSalida =
    cantidadCandadosSalida;

transporte.controlCabina =
    controlCabina;

transporte.observacionCabina =
    observacionCabina;

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

   if(

    controlCabina ===
    "Observación"

    ||

    controlCabina ===
    "No Conforme"

){

    crearNovedad({

        modulo:
        "Transporte Seguro",

        titulo:
        `Control Cabina - ${transporte.patente}`,

        descripcion:
        observacionCabina,

        criticidad:

        controlCabina ===
        "No Conforme"

        ?

        criticidades.ALTA

        :

        criticidades.MEDIA

    });

}
   
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

    cargarPantallaEgreso(id);

}
function toggleObservacionCabina(){

    const estado =
        document.getElementById(
            "egreso_cabina"
        ).value;

    const obs =
        document.getElementById(
            "egreso_obs_cabina"
        );

    if(

        estado === "Observación"

        ||

        estado === "No Conforme"

    ){

        obs.style.display =
        "block";

    }
    else{

        obs.style.display =
        "none";

        obs.value = "";

    }

}

function confirmarEgreso(id){

   const viaje =
    document.getElementById(
        "egreso_viaje"
    ).value;

const destino =
    document.getElementById(
        "egreso_destino"
    ).value;

if(
    viaje.trim() === ""
){

    alert(
        "Debe completar el N° Viaje / BP"
    );

    return;

}

if(
    destino.trim() === ""
){

    alert(
        "Debe completar el Destino Final"
    );

    return;

}
   
    registrarEgresoTransporte({

    cargarModuloTransporte();

}

        id,

        viajeSalida:
        document.getElementById(
            "egreso_viaje"
        ).value,

        destinoFinal:
        document.getElementById(
            "egreso_destino"
        ).value,

        llevaPrecintosSalida:
        document.getElementById(
            "egreso_precintos"
        ).value,

        cantidadPrecintosSalida:
        document.getElementById(
            "egreso_cantidad_precintos"
        ).value,

        numerosPrecintosSalida:
        document.getElementById(
            "egreso_numeros_precintos"
        ).value,

        llevaCandadosSalida:
        document.getElementById(
            "egreso_candados"
        ).value,

        cantidadCandadosSalida:
        document.getElementById(
            "egreso_cantidad_candados"
        ).value,

        controlCabina:
        document.getElementById(
            "egreso_cabina"
        ).value,

        observacionCabina:
        document.getElementById(
            "egreso_obs_cabina"
        ).value,

        observacionFinal:
        document.getElementById(
            "egreso_obs_final"
        ).value

    });

    cargarModuloTransporte();

}

function cargarPantallaEgreso(id){

    const transporte =
        transportesSP360.find(
            t => t.id === id
        );

    if(!transporte){
        return;
    }

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

<h2>
    🚪 Egreso Transporte
</h2>

<div class="card">

    <h3>
        📄 Información del Transporte
    </h3>

    <p><strong>Patente:</strong> ${transporte.patente}</p>

    <p><strong>Empresa Transporte:</strong> ${transporte.transportista}</p>

    <p><strong>Chofer:</strong> ${transporte.chofer}</p>

    <p><strong>DNI:</strong> ${transporte.dni}</p>

    <p><strong>Movimiento:</strong> ${transporte.tipoMovimiento}</p>

    <p><strong>Remito:</strong> ${transporte.remito}</p>

    <p><strong>Candados Ingreso:</strong>
    ${transporte.cantidadCandados || 0}</p>

    <p><strong>Precintos Ingreso:</strong>
    ${transporte.cantidadPrecintos || 0}</p>

    <p><strong>N° Precintos Ingreso:</strong>
    ${transporte.numerosPrecintos || "-"}</p>

</div>

<div class="card">

    <h3>
        🚚 Datos de Salida
    </h3>

    <label>
        N° Viaje / BP
    </label>

    <input
        id="egreso_viaje"
        placeholder="N° Viaje / BP">

    <label>
        Destino Final
    </label>

    <input
        id="egreso_destino"
        placeholder="Destino Final">

</div>

<div class="card">

    <h3>
        🔒 Control de Precintos
    </h3>

    <label>
        ¿Lleva Precintos?
    </label>

    <select id="egreso_precintos">

        <option>Si</option>

        <option>No</option>

    </select>

    <label>
        Cantidad de Precintos
    </label>

    <input
        id="egreso_cantidad_precintos"
        placeholder="Cantidad Precintos">

    <label>
        Números de Precintos
    </label>

    <textarea
        id="egreso_numeros_precintos"
        placeholder="N° Precintos de Salida">
    </textarea>

</div>

<div class="card">

    <h3>
        🔐 Control de Candados
    </h3>

    <label>
        ¿Lleva Candados?
    </label>

    <select id="egreso_candados">

        <option>Si</option>

        <option>No</option>

    </select>

    <label>
        Cantidad de Candados
    </label>

    <input
        id="egreso_cantidad_candados"
        placeholder="Cantidad Candados">

</div>

<div class="card">

    <h3>
        🚚 Control de Cabina
    </h3>

    <label>
        Estado Cabina
    </label>

    <select
        id="egreso_cabina"
        onchange="toggleObservacionCabina()">

        <option>Conforme</option>

        <option>Observación</option>

        <option>No Conforme</option>

    </select>

    <textarea

        id="egreso_obs_cabina"

        placeholder="Detalle Observación de Cabina"

        style="display:none;"

    ></textarea>

</div>

<div class="card">

    <h3>
        📝 Observación General
    </h3>

    <textarea
        id="egreso_obs_final"
        placeholder="Observación Final">
    </textarea>

    <br><br>

    <button
        class="btn btn-success"
        onclick="
        confirmarEgreso('${transporte.id}')
        ">

        ✅ Confirmar Egreso

    </button>

</div>

`;

}

const estadoCabina =
    document.getElementById(
        "egreso_cabina"
    ).value;

const observacionCabina =
    document.getElementById(
        "egreso_obs_cabina"
    ).value;

if(

    (
        estadoCabina ===
        "Observación"

        ||

        estadoCabina ===
        "No Conforme"

    )

    &&

    observacionCabina.trim() === ""

){

    alert(
        "Debe completar la observación de cabina."
    );

    return;

}


}

/* ==========================
   VALIDAR CONTROLES
========================== */

function validarControles(
    transporte
){

    (transporte.controles || []).forEach(

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

        (transporte.controles || []).forEach(

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

   const tienePrecintos =
    document.getElementById(
        "tra_tiene_precintos"
    ).value;

const tieneSogaPrecinto =
    document.getElementById(
        "tra_tiene_soga"
    ).value;

const tieneCandados =
    document.getElementById(
        "tra_tiene_candados"
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

tienePrecintos,

tieneSogaPrecinto,

tieneCandados,

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

    <select id="tra_tiene_precintos">

    <option value="">
        ¿Tiene Precintos?
    </option>

    <option>
        Sí
    </option>

    <option>
        No
    </option>

</select>

<select id="tra_tiene_soga">

    <option value="">
        ¿Tiene Soga Precinto?
    </option>

    <option>
        Sí
    </option>

    <option>
        No
    </option>

</select>

<select id="tra_tiene_candados">

    <option value="">
        ¿Tiene Candados?
    </option>

    <option>
        Sí
    </option>

    <option>
        No
    </option>

</select>

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
   
