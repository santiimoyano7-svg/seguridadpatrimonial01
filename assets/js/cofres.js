/* ==========================
   SP360 - COFRES
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let cofresSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_cofres"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarCofres(){

    localStorage.setItem(

        "sp360_cofres",

        JSON.stringify(
            cofresSP360
        )

    );

}

/* ==========================
   ESTADOS
========================== */

const estadosCofres = [

    "Libre",

    "Ocupado",

    "Roto",

    "Sin Declarar"

];

/* ==========================
   VESTUARIOS
========================== */

const vestuariosSP360 = [

    "A",
    "B",
    "C",
    "D",
    "E",
    "F"

];

/* ==========================
   CREAR COFRE
========================== */

function crearCofre({

    numero,

    vestuario

}){

    const cofre = {

        id:
        Date.now(),

        numero,

        vestuario,

        titular: "",

        legajo: "",

        empresa: "",

        estado:
        "Libre",

        trazabilidad:
        crearTrazabilidad()

    };

    cofresSP360.push(
        cofre
    );

    guardarCofres();

    return cofre;

}

/* ==========================
   BUSCAR COFRE
========================== */

function obtenerCofrePorId(id){

    return cofresSP360.find(

        cofre =>
        cofre.id === id

    );

}

/* ==========================
   OBTENER TODOS
========================== */

function obtenerCofres(){

    return cofresSP360;

}

/* ==========================
   ASIGNAR TITULAR
========================== */

function asignarCofre({

    id,

    titular,

    legajo,

    empresa

}){

    const cofre =
        obtenerCofrePorId(id);

    if(!cofre){

        return false;

    }

    cofre.titular =
        titular;

    cofre.legajo =
        legajo;

    cofre.empresa =
        empresa;

    cofre.estado =
        "Ocupado";

    cofre.ultimaActualizacion =
        crearTrazabilidad();

    guardarCofres();

    return true;

}

/* ==========================
   LIBERAR COFRE
========================== */

function liberarCofre(id){

    const cofre =
        obtenerCofrePorId(id);

    if(!cofre){

        return false;

    }

    cofre.titular = "";
    cofre.legajo = "";
    cofre.empresa = "";

    cofre.estado =
        "Libre";

    cofre.ultimaActualizacion =
        crearTrazabilidad();

    guardarCofres();

    return true;

}

/* ==========================
   CAMBIAR ESTADO
========================== */

function cambiarEstadoCofre(

    id,

    estado

){

    const cofre =
        obtenerCofrePorId(id);

    if(!cofre){

        return false;

    }

    cofre.estado =
        estado;

    cofre.ultimaActualizacion =
        crearTrazabilidad();

    guardarCofres();

    return true;

}

/* ==========================
   FILTROS
========================== */

function obtenerCofresPorEstado(
    estado
){

    return cofresSP360.filter(

        cofre =>

        cofre.estado ===
        estado

    );

}

function obtenerCofresPorVestuario(
    vestuario
){

    return cofresSP360.filter(

        cofre =>

        cofre.vestuario ===
        vestuario

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasCofres(){

    return {

        total:
        cofresSP360.length,

        libres:

        obtenerCofresPorEstado(
            "Libre"
        ).length,

        ocupados:

        obtenerCofresPorEstado(
            "Ocupado"
        ).length,

        rotos:

        obtenerCofresPorEstado(
            "Roto"
        ).length,

        sinDeclarar:

        obtenerCofresPorEstado(
            "Sin Declarar"
        ).length

    };

}

/* ==========================
   KPI DASHBOARD
========================== */

function obtenerKPICofres(){

    return obtenerEstadisticasCofres();

}

/* ==========================
   MODULO
========================== */

function cargarModuloCofres(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasCofres();

    content.innerHTML = `

        <h2>
            🗄 Gestión de Cofres
        </h2>

        <div class="card">

            <strong>
                Total
            </strong>

            <br>

            ${stats.total}

            <br><br>

            <strong>
                🟢 Ocupados
            </strong>

            <br>

            ${stats.ocupados}

            <br><br>

            <strong>
                🔵 Libres
            </strong>

            <br>

            ${stats.libres}

            <br><br>

            <strong>
                🟠 Sin Declarar
            </strong>

            <br>

            ${stats.sinDeclarar}

            <br><br>

            <strong>
                🔴 Rotos
            </strong>

            <br>

            ${stats.rotos}

        </div>

    `;

}
