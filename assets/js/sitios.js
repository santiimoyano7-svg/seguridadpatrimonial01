/* ==========================
   SP360 - SITIOS
========================== */

/*
Roles:

Super Administrador
Administrador Sitio
Encargado de Turno
Guardia
Jefe de Seguridad
*/

/* ==========================
   SITIOS OFICIALES
========================== */

const sitiosSP360 = [

    {
        id: 1,

        codigo: "ARCOR_CAROYA",

        nombre: "Arcor Caroya",

        activo: true
    },

    {
        id: 2,

        codigo: "BAGLEY_TOTORAL",

        nombre: "Bagley Totoral",

        activo: true
    },

    {
        id: 3,

        codigo: "BAGLEY_CORDOBA",

        nombre: "Bagley Córdoba",

        activo: true
    },

    {
        id: 4,

        codigo: "CARTOCOR_TOTORAL",

        nombre: "Cartocor Totoral",

        activo: true
    },

    {
        id: 5,

        codigo: "EDIFICIO_CHACABUCO",

        nombre: "Edificio Chacabuco",

        activo: true
    }

];

/* ==========================
   ADMINISTRADORES DE SITIO
========================== */

let administradoresSitio =
JSON.parse(
    localStorage.getItem(
        "sp360_administradores_sitio"
    )
) || [];

/* ==========================
   OBTENER SITIOS
========================== */

function obtenerSitios(){

    return sitiosSP360;

}

/* ==========================
   OBTENER SITIO POR ID
========================== */

function obtenerSitioPorId(id){

    return sitiosSP360.find(
        sitio => sitio.id === id
    );

}

/* ==========================
   OBTENER SITIO POR CODIGO
========================== */

function obtenerSitioPorCodigo(codigo){

    return sitiosSP360.find(
        sitio => sitio.codigo === codigo
    );

}

/* ==========================
   OBTENER SITIO POR NOMBRE
========================== */

function obtenerSitioPorNombre(nombre){

    return sitiosSP360.find(
        sitio => sitio.nombre === nombre
    );

}

/* ==========================
   ASIGNAR ADMINISTRADOR
========================== */

function asignarAdministradorSitio(
    sitioId,
    usuarioId
){

    const asignacion = {

        sitioId,
        usuarioId,

        fecha:
        new Date()
        .toLocaleDateString(),

        hora:
        new Date()
        .toLocaleTimeString()

    };

    administradoresSitio.push(
        asignacion
    );

    localStorage.setItem(

        "sp360_administradores_sitio",

        JSON.stringify(
            administradoresSitio
        )

    );

    return true;

}

/* ==========================
   OBTENER ADMINISTRADOR
========================== */

function obtenerAdministradorSitio(
    sitioId
){

    return administradoresSitio.find(

        a => a.sitioId === sitioId

    );

}

/* ==========================
   SITIO USUARIO ACTUAL
========================== */

function obtenerSitioUsuarioActual(){

    const usuario =
        obtenerUsuario();

    if(!usuario){

        return null;

    }

    return usuario.sitio;

}

/* ==========================
   ES SUPER ADMINISTRADOR
========================== */

function esSuperAdministrador(){

    const usuario =
        obtenerUsuario();

    if(!usuario){

        return false;

    }

    return (
        usuario.rol ===
        "Super Administrador"
    );

}

/* ==========================
   ES ADMINISTRADOR SITIO
========================== */

function esAdministradorSitio(){

    const usuario =
        obtenerUsuario();

    if(!usuario){

        return false;

    }

    return (
        usuario.rol ===
        "Administrador Sitio"
    );

}

/* ==========================
   SITIO VISUALIZABLE
========================== */

function puedeVerSitio(
    nombreSitio
){

    const usuario =
        obtenerUsuario();

    if(!usuario){

        return false;

    }

    if(
        usuario.rol ===
        "Super Administrador"
    ){

        return true;

    }

    return (
        usuario.sitio ===
        nombreSitio
    );

}

/* ==========================
   LISTA SITIOS ACTIVOS
========================== */

function obtenerSitiosActivos(){

    return sitiosSP360.filter(

        sitio =>
        sitio.activo === true

    );

}
