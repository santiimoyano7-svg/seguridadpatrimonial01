/* ==========================
   SP360 - APP CORE V2
========================== */

/* ==========================
   CONFIGURACIÓN GENERAL
========================== */

const APP_CONFIG = {

    nombre: "SP360",

    version: "2.0",

    empresa:
        "Security Operations Center"

};

/* ==========================
   INICIO
========================== */

window.onload = function(){

    inicializarSP360();

};

/* ==========================
   INICIALIZAR
========================== */

function inicializarSP360(){

    console.log(
        `${APP_CONFIG.nombre} v${APP_CONFIG.version}`
    );

    cargarDashboardSP360();

}

/* ==========================
   DASHBOARD
========================== */

function cargarDashboard(){

    const content =
        document.getElementById(
            "content"
        );

    const estadisticas =
        obtenerEstadisticasNovedades();

    const usuario =
        obtenerUsuario();

    content.innerHTML = `

        <h2>
            Dashboard Ejecutivo
        </h2>

        <div class="card">

            <strong>Usuario:</strong>
            ${usuario ?
                usuario.nombre :
                "Sin Sesión"}

            <br><br>

            <strong>Rol:</strong>
            ${usuario ?
                usuario.rol :
                "-"}

            <br><br>

            <strong>Sitio:</strong>
            ${usuario ?
                usuario.sitio :
                "-"}

        </div>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    🔖 Total Novedades
                </div>

                <div class="stat-value">
                    ${estadisticas.total}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟡 Abiertas
                </div>

                <div class="stat-value">
                    ${estadisticas.abiertas}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🔵 En Curso
                </div>

                <div class="stat-value">
                    ${estadisticas.enCurso}
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

    `;

}

/* ==========================
   NAVEGACIÓN
========================== */

function loadModule(module){

    switch(module){

        case "dashboard":
            cargarDashboardSP360();
        break;

        case "guardia":
            cargarModuloSimple(
                "📖 Libro Guardia",
                "Integración pendiente"
            );
        break;

        case "alertas":
            cargarModuloSimple(
                "🚨 Alertas",
                "Integración pendiente"
            );
        break;

        case "novedades":
            cargarModuloNovedades();
        break;

        case "rondas":
            cargarModuloSimple(
                "🚶 Rondas Inteligentes",
                "Módulo en desarrollo"
            );
        break;

        case "accesos":
            cargarModuloSimple(
                "🚗 Accesos Vehiculares",
                "Módulo en desarrollo"
            );
        break;

        case "notebooks":
            cargarModuloSimple(
                "💻 Registro Notebooks",
                "Módulo en desarrollo"
            );
        break;

        case "transporte":
            cargarModuloTransporte();
        break;

        case "novedadesTransporte":
            cargarModuloSimple(
                "📋 Novedades Transporte",
                "Módulo en desarrollo"
            );
        break;

        case "llaves":
           cargarModuloLlaves();
        break;

        case "cofres":
            cargarModuloCofres();
        break;

        case "correspondencia":
            cargarModuloCorrespondencia();
        break;

        case "emergencias":
            cargarModuloEmergencias();
        break;

        case "flota":
            cargarModuloSimple(
                "🚙 Flota",
                "Módulo en desarrollo"
            );
        break;

        case "movimientosFlota":
            cargarModuloSimple(
                "🔄 Movimiento de Flota",
                "Módulo en desarrollo"
            );
        break;

        case "cctv":
            cargarModuloSimple(
                "📹 CCTV",
                "Módulo en desarrollo"
            );
        break;

        case "precintos":
            cargarModuloSimple(
                "🚪 Precintos",
                "Módulo en desarrollo"
            );
        break;

        case "usuarios":
            cargarModuloUsuarios();
        break;

        case "sitios":
            cargarModuloSitios();
        break;

        case "administracion":
            cargarModuloAdministracion();
        break;

        default:
            cargarModuloSimple(
                "SP360",
                "Módulo no encontrado"
            );
        break;

    }

}

/* ==========================
   MÓDULO SIMPLE
========================== */

function cargarModuloSimple(
    titulo,
    mensaje
){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>${titulo}</h2>

        <div class="card">
            ${mensaje}
        </div>

    `;

}

/* ==========================
   NOVEDADES
========================== */

function cargarModuloNovedades(){

    const content =
        document.getElementById(
            "content"
        );

    const novedades =
        obtenerNovedades();

    let html = `
        <h2>
            🔖 Gestión de Novedades
        </h2>
    `;

    novedades.forEach(n => {

        html += `

        <div class="card">

            <strong>${n.id}</strong>

            <br><br>

            ${n.titulo}

            <br><br>

            Estado:
            ${n.estado}

            <br>

            Sitio:
            ${n.sitio}

        </div>

        `;

    });

    content.innerHTML = html;

}

/* ==========================
   USUARIOS
========================== */

function cargarModuloUsuarios(){

    const content =
        document.getElementById(
            "content"
        );

    const usuarios =
        obtenerUsuarios();

    let html = `
        <h2>👥 Usuarios</h2>
    `;

    usuarios.forEach(u => {

        html += `

        <div class="card">

            <strong>
                ${u.nombre}
            </strong>

            <br><br>

            Usuario:
            ${u.usuario}

            <br>

            Rol:
            ${u.rol}

            <br>

            Sitio:
            ${u.sitio}

        </div>

        `;

    });

    content.innerHTML = html;

}

/* ==========================
   SITIOS
========================== */

function cargarModuloSitios(){

    const content =
        document.getElementById(
            "content"
        );

    const sitios =
        obtenerSitios();

    let html = `
        <h2>🏢 Sitios</h2>
    `;

    sitios.forEach(s => {

        html += `

        <div class="card">

            <strong>
                ${s.nombre}
            </strong>

            <br><br>

            Código:
            ${s.codigo}

        </div>

        `;

    });

    content.innerHTML = html;

}

/* ==========================
   ADMINISTRACIÓN
========================== */

function cargarModuloAdministracion(){

    const content =
        document.getElementById(
            "content"
        );

    const resumen =
        obtenerResumenUsuarios();

    content.innerHTML = `

        <h2>
            ⚙ Administración
        </h2>

        <div class="card">

            Usuarios Totales:
            ${resumen.total}

            <br>

            Activos:
            ${resumen.activos}

            <br>

            Inactivos:
            ${resumen.inactivos}

        </div>

    `;

}
