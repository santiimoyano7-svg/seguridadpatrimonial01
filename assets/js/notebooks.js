/* ==========================
   SP360 - NOTEBOOKS
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let notebooksSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_notebooks"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarNotebooks(){

    localStorage.setItem(

        "sp360_notebooks",

        JSON.stringify(
            notebooksSP360
        )

    );

}

/* ==========================
   ESTADOS
========================== */

const estadosNotebook = {

    EN_PLANTA:
    "En Planta",

    EGRESADO:
    "Egresado"

};

/* ==========================
   REGISTRAR INGRESO
========================== */

function registrarIngresoNotebook({

    empresa,

    usuario,

    dni,

    marca,

    modelo,

    numeroSerie,

    sectorVisitado,

    personaVisitada,

    motivo,

    stickerPatrimonial,

    observaciones

}){

    const trazabilidad =
        crearTrazabilidad();

    const notebook = {

        id:
        `NB-${Date.now()}`,

        empresa,

        usuario,

        dni,

        marca,

        modelo,

        numeroSerie,

        sectorVisitado,

        personaVisitada,

        motivo,

        stickerPatrimonial,

        observaciones,

        estado:
        estadosNotebook.EN_PLANTA,

        fechaIngreso:
        trazabilidad.fecha,

        horaIngreso:
        trazabilidad.hora,

        fechaEgreso:
        null,

        horaEgreso:
        null,

        observacionEgreso:
        "",

        sitio:
        trazabilidad.sitio,

        registradoPor:
        trazabilidad.usuario,

        rol:
        trazabilidad.rol

    };

    notebooksSP360.push(
        notebook
    );

    guardarNotebooks();

    return notebook;

}

/* ==========================
   REGISTRAR EGRESO
========================== */

function registrarEgresoNotebook(

    id,

    observacionEgreso = ""

){

    const notebook =
        obtenerNotebookPorId(id);

    if(!notebook){

        return false;

    }

    const trazabilidad =
        crearTrazabilidad();

    notebook.estado =
        estadosNotebook.EGRESADO;

    notebook.fechaEgreso =
        trazabilidad.fecha;

    notebook.horaEgreso =
        trazabilidad.hora;

    notebook.observacionEgreso =
        observacionEgreso;

    notebook.egresadoPor =
        trazabilidad.usuario;

    guardarNotebooks();

    return true;

}

/* ==========================
   CONSULTAS
========================== */

function obtenerNotebooks(){

    return notebooksSP360;

}

function obtenerNotebookPorId(id){

    return notebooksSP360.find(

        notebook =>
        notebook.id === id

    );

}

/* ==========================
   FILTROS
========================== */

function obtenerNotebooksEnPlanta(){

    return notebooksSP360.filter(

        notebook =>

        notebook.estado ===
        estadosNotebook.EN_PLANTA

    );

}

function obtenerNotebooksEgresadas(){

    return notebooksSP360.filter(

        notebook =>

        notebook.estado ===
        estadosNotebook.EGRESADO

    );

}

function obtenerNotebookPorSerie(
    serie
){

    return notebooksSP360.filter(

        notebook =>

        notebook.numeroSerie
        .toUpperCase()
        .includes(
            serie.toUpperCase()
        )

    );

}

function obtenerNotebookPorUsuario(
    usuario
){

    return notebooksSP360.filter(

        notebook =>

        notebook.usuario
        .toUpperCase()
        .includes(
            usuario.toUpperCase()
        )

    );

}

function obtenerNotebookPorEmpresa(
    empresa
){

    return notebooksSP360.filter(

        notebook =>

        notebook.empresa
        .toUpperCase()
        .includes(
            empresa.toUpperCase()
        )

    );

}

function obtenerNotebookPorSitio(
    sitio
){

    return notebooksSP360.filter(

        notebook =>

        notebook.sitio === sitio

    );

}

/* ==========================
   ESTADÍSTICAS
========================== */

function obtenerEstadisticasNotebooks(){

    return {

        total:
        notebooksSP360.length,

        enPlanta:

        obtenerNotebooksEnPlanta()
        .length,

        egresadas:

        obtenerNotebooksEgresadas()
        .length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPINotebooks(){

    return obtenerEstadisticasNotebooks();

}

/* ==========================
   MODULO
========================== */

function cargarModuloNotebooks(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasNotebooks();

    content.innerHTML = `

        <h2>
            💻 Registro de Notebooks
        </h2>

        <div class="card">

            <strong>
                Total Registros
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                💻 En Planta
            </strong>

            <br>

            ${stats.enPlanta}

            <br><br>

            <strong>
                ✅ Egresadas
            </strong>

            <br>

            ${stats.egresadas}

        </div>

        <div class="card">

            Este módulo permite:

            <br><br>

            ✅ Registro de ingreso

            <br>

            ✅ Registro de egreso

            <br>

            ✅ Control por N° de Serie

            <br>

            ✅ Sticker Patrimonial

            <br>

            ✅ Empresa y Usuario

            <br>

            ✅ Trazabilidad completa

        </div>

    `;

}
