/* ==========================
   SP360 - SEGURIDAD
========================== */

/* ============
   USUARIOS DEMO
=========== */

const usuariosSistema = [

    {
        id: 1,
        usuario: "smoyano",
        password: "admin123",
        nombre: "Santiago Moyano",
        rol: "Super Administrador",
        sitio: "Corporativo"
    },

    {
        id: 2,
        usuario: "admin_bagley_tot",
        password: "admin123",
        nombre: "Administrador Bagley Totoral",
        rol: "Administrador Sitio",
        sitio: "Bagley Totoral"
    },

    {
        id: 3,
        usuario: "guardia01",
        password: "guardia123",
        nombre: "Guardia T1",
        rol: "Guardia",
        sitio: "Bagley Totoral"
    }

];

/* ============
   SESION ACTIVA
=========== */

let usuarioActivo = JSON.parse(
    localStorage.getItem(
        "sp360_usuario_activo"
    )
) || null;

/* ============
   LOGIN
=========== */

function iniciarSesion(
    usuario,
    password
){

    const encontrado =
        usuariosSistema.find(
            u =>
            u.usuario === usuario &&
            u.password === password
        );

    if(!encontrado){

        return false;

    }

    usuarioActivo = encontrado;

    localStorage.setItem(
        "sp360_usuario_activo",
        JSON.stringify(
            usuarioActivo
        )
    );

    return true;

}

/* ============
   LOGOUT
=========== */

function cerrarSesion(){

    localStorage.removeItem(
        "sp360_usuario_activo"
    );

    usuarioActivo = null;

    location.reload();

}

/* ============
   SESION
=========== */

function haySesionActiva(){

    return usuarioActivo !== null;

}

/* ============
   DATOS USUARIO
=========== */

function obtenerUsuario(){

    return usuarioActivo;

}

/* ============
   ROL
=========== */

function obtenerRol(){

    if(!usuarioActivo){

        return null;

    }

    return usuarioActivo.rol;

}

/* ============
   SITIO
=========== */

function obtenerSitio(){

    if(!usuarioActivo){

        return null;

    }

    return usuarioActivo.sitio;

}

/* ============
   PERMISOS
=========== */

function tienePermiso(
    rolesPermitidos
){

    if(!usuarioActivo){

        return false;

    }

    return rolesPermitidos.includes(
        usuarioActivo.rol
    );

}

/* ============
   TRAZABILIDAD
=========== */

function crearTrazabilidad(){

    return {

        usuario:
            usuarioActivo
            ?
            usuarioActivo.nombre
            :
            "Sistema",

        rol:
            usuarioActivo
            ?
            usuarioActivo.rol
            :
            "Sistema",

        sitio:
            usuarioActivo
            ?
            usuarioActivo.sitio
            :
            "Sin Sitio",

        fecha:
            new Date()
            .toLocaleDateString(),

        hora:
            new Date()
            .toLocaleTimeString()

    };

}

/* ============
   NOVEDADES
=========== */

function generarIdNovedad(){

    let ultimoId =
        parseInt(
            localStorage.getItem(
                "sp360_contador_novedades"
            )
        ) || 0;

    ultimoId++;

    localStorage.setItem(
        "sp360_contador_novedades",
        ultimoId
    );

    const anio =
        new Date().getFullYear();

    return `NOV-${anio}-${String(
        ultimoId
    ).padStart(6,"0")}`;

}
