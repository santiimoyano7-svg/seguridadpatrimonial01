/* ==========================
   SP360 - USUARIOS
========================== */

/* ==========================
   ROLES OFICIALES
========================== */

const rolesSP360 = [

    "Super Administrador",

    "Administrador Sitio",

    "Encargado de Turno",

    "Guardia",

    "Jefe de Seguridad"

];

/* ==========================
   USUARIOS
========================== */

let usuariosSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_usuarios"
    )
) || [

    {
        id: 1,

        usuario: "smoyano",

        password: "admin123",

        nombre: "Santiago Moyano",

        email: "",

        rol: "Super Administrador",

        sitio: "Corporativo",

        activo: true,

        creadoPor: "Sistema",

        fechaCreacion:
        new Date()
        .toLocaleDateString()
    }

];

/* ==========================
   GUARDAR USUARIOS
========================== */

function guardarUsuarios(){

    localStorage.setItem(

        "sp360_usuarios",

        JSON.stringify(
            usuariosSP360
        )

    );

}

/* ==========================
   LISTAR USUARIOS
========================== */

function obtenerUsuarios(){

    return usuariosSP360;

}

/* ==========================
   USUARIOS ACTIVOS
========================== */

function obtenerUsuariosActivos(){

    return usuariosSP360.filter(

        usuario =>
        usuario.activo === true

    );

}

/* ==========================
   BUSCAR POR ID
========================== */

function obtenerUsuarioPorId(id){

    return usuariosSP360.find(

        usuario =>
        usuario.id === id

    );

}

/* ==========================
   BUSCAR POR USUARIO
========================== */

function obtenerUsuarioPorNombreUsuario(
    nombreUsuario
){

    return usuariosSP360.find(

        usuario =>

        usuario.usuario ===
        nombreUsuario

    );

}

/* ==========================
   CREAR USUARIO
========================== */

function crearUsuario({

    usuario,

    password,

    nombre,

    email,

    rol,

    sitio

}){

    const existe =

        obtenerUsuarioPorNombreUsuario(
            usuario
        );

    if(existe){

        return false;

    }

    const nuevoUsuario = {

        id:
        Date.now(),

        usuario,

        password,

        nombre,

        email,

        rol,

        sitio,

        activo: true,

        creadoPor:

            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Sistema",

        fechaCreacion:

            new Date()
            .toLocaleDateString()

    };

    usuariosSP360.push(
        nuevoUsuario
    );

    guardarUsuarios();

    return true;

}

/* ==========================
   MODIFICAR USUARIO
========================== */

function modificarUsuario(

    id,

    datosActualizados

){

    const indice =

        usuariosSP360.findIndex(

            usuario =>
            usuario.id === id

        );

    if(indice === -1){

        return false;

    }

    usuariosSP360[indice] = {

        ...usuariosSP360[indice],

        ...datosActualizados

    };

    guardarUsuarios();

    return true;

}

/* ==========================
   DESACTIVAR USUARIO
========================== */

function desactivarUsuario(id){

    const usuario =

        obtenerUsuarioPorId(id);

    if(!usuario){

        return false;

    }

    usuario.activo = false;

    guardarUsuarios();

    return true;

}

/* ==========================
   REACTIVAR USUARIO
========================== */

function activarUsuario(id){

    const usuario =

        obtenerUsuarioPorId(id);

    if(!usuario){

        return false;

    }

    usuario.activo = true;

    guardarUsuarios();

    return true;

}

/* ==========================
   CAMBIAR CONTRASEÑA
========================== */

function cambiarPassword(

    id,

    nuevaPassword

){

    const usuario =

        obtenerUsuarioPorId(id);

    if(!usuario){

        return false;

    }

    usuario.password =
        nuevaPassword;

    guardarUsuarios();

    return true;

}

/* ==========================
   FILTRO POR SITIO
========================== */

function obtenerUsuariosPorSitio(
    sitio
){

    return usuariosSP360.filter(

        usuario =>

        usuario.sitio === sitio

    );

}

/* ==========================
   FILTRO POR ROL
========================== */

function obtenerUsuariosPorRol(
    rol
){

    return usuariosSP360.filter(

        usuario =>

        usuario.rol === rol

    );

}

/* ==========================
   VALIDAR CREACION
========================== */

function puedeCrearUsuarios(){

    if(!usuarioActivo){

        return false;

    }

    return [

        "Super Administrador",

        "Administrador Sitio"

    ].includes(

        usuarioActivo.rol

    );

}

/* ==========================
   VALIDAR ADMINISTRACION
========================== */

function puedeAdministrarUsuarios(){

    if(!usuarioActivo){

        return false;

    }

    return (

        usuarioActivo.rol ===
        "Super Administrador"

    );

}

/* ==========================
   REPORTE USUARIOS
========================== */

function obtenerResumenUsuarios(){

    return {

        total:
        usuariosSP360.length,

        activos:

        usuariosSP360.filter(
            u => u.activo
        ).length,

        inactivos:

        usuariosSP360.filter(
            u => !u.activo
        ).length

    };

}
