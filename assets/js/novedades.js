/* ==========================
   SP360 - NOVEDADES
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let novedadesSP360 =

    JSON.parse(
        localStorage.getItem(
            "sp360_novedades"
        )
    ) || [];

/* ==========================
   ESTADOS
========================== */

const estadosNovedad = {

    ABIERTA:
        "Abierta",

    EN_SEGUIMIENTO:
        "En Seguimiento",

    CERRADA:
        "Cerrada"

};

/* ==========================
   CRITICIDADES
========================== */

const criticidades = {

    BAJA:
        "Baja",

    MEDIA:
        "Media",

    ALTA:
        "Alta",

    CRITICA:
        "Crítica"

};

/* ==========================
   GUARDAR NOVEDADES
========================== */

function guardarNovedades(){

    localStorage.setItem(
        "sp360_novedades",
        JSON.stringify(
            novedadesSP360
        )
    );

}

/* ==========================
   CREAR NOVEDAD
========================== */

function crearNovedad({

    modulo,
    titulo,
    descripcion,
    criticidad,
    sitio

}){

    novedadesSP360.push({

        id:
            Date.now(),

        fecha:
            new Date()
            .toLocaleDateString(
                "es-AR"
            ),

        hora:
            new Date()
            .toLocaleTimeString(),

        modulo:
            modulo || "General",

        titulo:
            titulo || "",

        descripcion:
            descripcion || "",

        criticidad:
            criticidad
            ||
            criticidades.MEDIA,

        estado:
            estadosNovedad.ABIERTA,

        usuario:

            typeof usuarioActivo !==
            "undefined"

            &&

            usuarioActivo

            ?

            usuarioActivo.nombre

            :

            "Sistema",

        sitio:

            sitio

            ||

            (
                typeof sitioActivo !==
                "undefined"

                ?

                sitioActivo

                :

                "Sin Sitio"
            ),

        seguimiento: [],

        fechaCierre: "",

        horaCierre: "",

        usuarioCierre: ""

    });

   if(
    typeof crearRegistroLibroGuardia
    ===
    "function"
){

    crearRegistroLibroGuardia({

        modulo,

        titulo,

        descripcion,

        usuario:

            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Sistema"

    });

}
   
    guardarNovedades();

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasNovedades(){

    return {

        total:
            novedadesSP360.length,

        abiertas:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.ABIERTA
            ).length,

        seguimiento:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.EN_SEGUIMIENTO
            ).length,

        cerradas:

            novedadesSP360.filter(
                n =>
                n.estado ===
                estadosNovedad.CERRADA
            ).length

    };

}

/* ==========================
   MODULO NOVEDADES
========================== */

function cargarModuloNovedades(){

    const content =
        document.getElementById(
            "content"
        );

    const estadisticas =
        obtenerEstadisticasNovedades();

    let filas = "";

    novedadesSP360
        .slice()
        .reverse()
        .forEach(

        novedad => {

            let estadoIcono = "🔴";

            if(
                novedad.estado ===
                estadosNovedad.EN_SEGUIMIENTO
            ){
                estadoIcono = "🟡";
            }

            if(
                novedad.estado ===
                estadosNovedad.CERRADA
            ){
                estadoIcono = "🟢";
            }

            filas += `

                <tr>

                    <td>
                        ${novedad.fecha || "-"}
                    </td>

                    <td>
                        ${novedad.modulo}
                    </td>

                    <td>
                        ${novedad.titulo}
                    </td>

                    <td>
                        ${novedad.criticidad || "Media"}
                    </td>

                    <td>
                        ${estadoIcono}
                        ${novedad.estado || "Abierta"}
                    </td>

                    <td>
    ${novedad.usuario || "Sistema"}
</td>

<td>

    <button
        class="btn btn-primary"
        onclick="
        verNovedad(
            '${novedad.id}'
        )
        ">

        👁

    </button>

    <button
        class="btn btn-warning"
        onclick="
        agregarSeguimiento(
            '${novedad.id}'
        )
        ">

        📝

    </button>

    <button
        class="btn btn-success"
        onclick="
        cerrarNovedad(
            '${novedad.id}'
        )
        ">

        ✅

    </button>

</td>

                </tr>

            `;

        }

    );

    content.innerHTML = `

        <h2>
            📌 Gestión de Novedades
        </h2>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    📋 Total
                </div>

                <div class="stat-value">
                    ${estadisticas.total}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🔴 Abiertas
                </div>

                <div class="stat-value">
                    ${estadisticas.abiertas}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟡 Seguimiento
                </div>

                <div class="stat-value">
                    ${estadisticas.seguimiento}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟢 Cerradas
                </div>

                <div class="stat-value">
                    ${estadisticas.cerradas}
                </div>

            </div>

        </div>

        <br>

        <div class="card">

            <input
                id="buscar_novedad"
                placeholder="
Buscar módulo, título o usuario"
                onkeyup="
                filtrarNovedades()
                ">

        </div>

        <br>

        <div class="card">

            <table>

                <thead>

                    <tr>

                        <th>
                            Fecha
                        </th>

                        <th>
                            Módulo
                        </th>

                        <th>
                            Título
                        </th>

                        <th>
                            Criticidad
                        </th>

                        <th>
                            Estado
                        </th>

                        <th>
                            Usuario
                        </th>

<th>
    Acciones
</th>

                    </tr>

                </thead>

                <tbody
                    id="tabla_novedades">

                    ${filas}

                </tbody>

            </table>

        </div>

    `;

}

/* ==========================
   FILTRAR NOVEDADES
========================== */

function filtrarNovedades(){

    const texto =

        document
        .getElementById(
            "buscar_novedad"
        )
        .value
        .toUpperCase();

    const filas =

        document.querySelectorAll(
            "#tabla_novedades tr"
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
   VER NOVEDAD
========================== */

function verNovedad(id){

    const novedad =

        novedadesSP360.find(
            n =>
            String(n.id)
            ===
            String(id)
        );

    if(!novedad){
        return;
    }

    const content =
        document.getElementById(
            "content"
        );

    let seguimientosHTML = "";

    if(
        novedad.seguimiento
        &&
        novedad.seguimiento.length > 0
    ){

        novedad.seguimiento.forEach(

            item => {

                seguimientosHTML += `

                    <div class="card">

                        <strong>
                            📅 ${item.fecha}
                        </strong>

                        <br>

                        🕒 ${item.hora}

                        <br>

                        👤 ${item.usuario}

                        <hr>

                        ${item.observacion}

                    </div>

                    <br>

                `;

            }

        );

    }else{

        seguimientosHTML = `

            <div class="card">

                No existen seguimientos registrados.

            </div>

        `;

    }

    let estadoIcono = "🔴";

    if(
        novedad.estado ===
        estadosNovedad.EN_SEGUIMIENTO
    ){
        estadoIcono = "🟡";
    }

    if(
        novedad.estado ===
        estadosNovedad.CERRADA
    ){
        estadoIcono = "🟢";
    }

    content.innerHTML = `

        <h2>
            📌 Detalle de Novedad
        </h2>

        <div class="card">

            <h3>

                ${novedad.titulo}

            </h3>

            <br>

            <strong>
                Módulo:
            </strong>

            ${novedad.modulo}

            <br><br>

            <strong>
                Fecha:
            </strong>

            ${novedad.fecha || "-"}

            <br><br>

            <strong>
                Hora:
            </strong>

            ${novedad.hora || "-"}

            <br><br>

            <strong>
                Usuario:
            </strong>

            ${novedad.usuario || "Sistema"}

            <br><br>

            <strong>
                Criticidad:
            </strong>

            ${novedad.criticidad || "-"}

            <br><br>

            <strong>
                Estado:
            </strong>

            ${estadoIcono}
            ${novedad.estado}

            <br><br>

            <strong>
                Sitio:
            </strong>

            ${novedad.sitio || "-"}

            <hr>

            <strong>
                Descripción
            </strong>

            <br><br>

            ${novedad.descripcion}

        </div>

        <br>

        <h3>
            📝 Historial de Seguimientos
        </h3>

        ${seguimientosHTML}

        <br>

        <button
            class="btn btn-warning"
            onclick="
                agregarSeguimiento(
                    '${novedad.id}'
                )
            ">

            📝 Agregar Seguimiento

        </button>

        <button
            class="btn btn-success"
            onclick="
                cerrarNovedad(
                    '${novedad.id}'
                )
            ">

            ✅ Cerrar

        </button>

        <button
            class="btn btn-primary"
            onclick="
                cargarModuloNovedades()
            ">

            ⬅ Volver

        </button>

    `;

}
/* ==========================
   PANTALLA SEGUIMIENTO
========================== */

function agregarSeguimiento(id){

    const novedad =

        novedadesSP360.find(
            n =>
            String(n.id)
            ===
            String(id)
        );

    if(!novedad){
        return;
    }

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            📝 Seguimiento de Novedad
        </h2>

        <div class="card">

            <strong>
                Título:
            </strong>

            ${novedad.titulo}

            <br><br>

            <strong>
                Módulo:
            </strong>

            ${novedad.modulo}

            <br><br>

            <strong>
                Estado:
            </strong>

            ${novedad.estado}

        </div>

        <br>

        <div class="card">

            <h3>
                Nuevo Seguimiento
            </h3>

            <textarea
                id="nuevo_seguimiento"
                placeholder="
Ingrese seguimiento">
            </textarea>

        </div>

        <br>

        <button
            class="btn btn-success"
            onclick="
                guardarSeguimientoNovedad(
                    '${novedad.id}'
                )
            ">

            ✅ Guardar Seguimiento

        </button>

        <button
            class="btn btn-primary"
            onclick="
                verNovedad(
                    '${novedad.id}'
                )
            ">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   CERRAR NOVEDAD
========================== */

function cerrarNovedad(id){

    const novedad =

        novedadesSP360.find(
            n =>
            String(n.id)
            ===
            String(id)
        );

    if(!novedad){
        return;
    }

    novedad.estado =

        estadosNovedad
        .CERRADA;

    novedad.fechaCierre =

        new Date()
        .toLocaleDateString(
            "es-AR"
        );

    novedad.horaCierre =

        new Date()
        .toLocaleTimeString();

    novedad.usuarioCierre =

        usuarioActivo
        ?
        usuarioActivo.nombre
        :
        "Sistema";

    guardarNovedades();

    cargarModuloNovedades();

}

/* ==========================
   GUARDAR SEGUIMIENTO
========================== */

function guardarSeguimientoNovedad(id){

    const novedad =

        novedadesSP360.find(
            n =>
            String(n.id)
            ===
            String(id)
        );

    if(!novedad){
        return;
    }

    const texto =

        document
        .getElementById(
            "nuevo_seguimiento"
        )
        .value;

    if(
        texto.trim() === ""
    ){

        alert(
            "Debe ingresar un seguimiento."
        );

        return;

    }

    novedad.estado =

        estadosNovedad
        .EN_SEGUIMIENTO;

    novedad.seguimiento.push({

        fecha:
            new Date()
            .toLocaleDateString(
                "es-AR"
            ),

        hora:
            new Date()
            .toLocaleTimeString(),

        usuario:

            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Sistema",

        observacion:
            texto

    });

    guardarNovedades();

    verNovedad(id);

}
