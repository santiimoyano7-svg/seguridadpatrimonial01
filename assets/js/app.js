/* ==========================
   SP360 - APP CORE V2
========================== */

/* ==========================
   CONFIGURACIÓN GENERAL
========================== */

const APP_CONFIG = {

    nombre: "SP360",

    version: "2.0",

    empresa: "Security Operations Center"

};

/* ==========================
   INICIO
========================== */

window.onload = function () {

    inicializarSP360();

};

/* ==========================
   INICIALIZAR
========================== */

function inicializarSP360() {

    console.log(
        `${APP_CONFIG.nombre} v${APP_CONFIG.version}`
    );

    cargarDashboard();

}

/* ==========================
   DASHBOARD
========================== */

function cargarDashboard() {

    if (
        typeof cargarDashboardSP360 ===
        "function"
    ) {

        cargarDashboardSP360();
        return;

    }

    const content =
        document.getElementById(
            "content"
        );

    if (!content) return;

    content.innerHTML = `

        <h2>
            🏠 Dashboard
        </h2>

        <div class="card">

            Bienvenido a SP360

            <br><br>

            Dashboard aún no inicializado.

        </div>

    `;

}

/* ==========================
   NAVEGACIÓN
========================== */

function loadModule(module) {

    switch (module) {

        case "dashboard":
            cargarDashboard();
            break;

        case "guardia":
            cargarModuloSimple(
                "📖 Libro Guardia",
                "Módulo en desarrollo"
            );
            break;

        case "alertas":
            cargarModuloSimple(
                "🚨 Alertas",
                "Módulo en desarrollo"
            );
            break;

        case "novedades":

            if (
                typeof cargarModuloNovedades ===
                "function"
            ) {

                cargarModuloNovedades();

            } else {

                cargarModuloSimple(
                    "🔖 Gestión de Novedades",
                    "Módulo no disponible"
                );

            }

            break;

        case "rondas":

    if(
        typeof cargarModuloRondas ===
        "function"
    ){

        cargarModuloRondas();

    }

break;

        case "accesos":

            if (
                typeof cargarModuloAccesos ===
                "function"
            ) {

                cargarModuloAccesos();

            } else {

                cargarModuloSimple(
                    "🚗 Accesos",
                    "Módulo no disponible"
                );

            }

            break;

        case "notebooks":

            if (
                typeof cargarModuloNotebooks ===
                "function"
            ) {

                cargarModuloNotebooks();

            } else {

                cargarModuloSimple(
                    "💻 Notebooks",
                    "Módulo no disponible"
                );

            }

            break;

        case "transporte":

            if (
                typeof cargarModuloTransporte ===
                "function"
            ) {

                cargarModuloTransporte();

            } else {

                cargarModuloSimple(
                    "🚛 Transporte",
                    "Módulo no disponible"
                );

            }

            break;

        case "novedadesTransporte":

            cargarModuloSimple(
                "📋 Novedades Transporte",
                "Módulo en desarrollo"
            );

            break;

        case "llaves":

            if (
                typeof cargarModuloLlaves ===
                "function"
            ) {

                cargarModuloLlaves();

            } else {

                cargarModuloSimple(
                    "🔑 Llaves",
                    "Módulo no disponible"
                );

            }

            break;

        case "cofres":

            if (
                typeof cargarModuloCofres ===
                "function"
            ) {

                cargarModuloCofres();

            } else {

                cargarModuloSimple(
                    "🗄 Cofres",
                    "Módulo no disponible"
                );

            }

            break;

        case "correspondencia":

            if (
                typeof cargarModuloCorrespondencia ===
                "function"
            ) {

                cargarModuloCorrespondencia();

            } else {

                cargarModuloSimple(
                    "📦 Correspondencia",
                    "Módulo no disponible"
                );

            }

            break;

        case "emergencias":

            if (
                typeof cargarModuloEmergencias ===
                "function"
            ) {

                cargarModuloEmergencias();

            } else {

                cargarModuloSimple(
                    "🚑 Emergencias",
                    "Módulo no disponible"
                );

            }

            break;

        case "flota":

            if (
                typeof cargarModuloFlota ===
                "function"
            ) {

                cargarModuloFlota();

            } else {

                cargarModuloSimple(
                    "🚙 Flota",
                    "Módulo no disponible"
                );

            }

            break;

        case "movimientosFlota":

            if (
                typeof cargarModuloMovimientosFlota ===
                "function"
            ) {

                cargarModuloMovimientosFlota();

            } else {

                cargarModuloSimple(
                    "🔄 Movimiento Flota",
                    "Módulo no disponible"
                );

            }

            break;

        case "cctv":

            if (
                typeof cargarModuloCCTV ===
                "function"
            ) {

                cargarModuloCCTV();

            } else {

                cargarModuloSimple(
                    "📹 CCTV",
                    "Módulo no disponible"
                );

            }

            break;

        case "precintos":

            if (
                typeof cargarModuloPrecintos ===
                "function"
            ) {

                cargarModuloPrecintos();

            } else {

                cargarModuloSimple(
                    "🚪 Precintos",
                    "Módulo no disponible"
                );

            }

            break;

        case "usuarios":

            if (
                typeof cargarModuloUsuarios ===
                "function"
            ) {

                cargarModuloUsuarios();

            } else {

                cargarModuloSimple(
                    "👥 Usuarios",
                    "Módulo no disponible"
                );

            }

            break;

        case "sitios":

            if (
                typeof cargarModuloSitios ===
                "function"
            ) {

                cargarModuloSitios();

            } else {

                cargarModuloSimple(
                    "🏢 Sitios",
                    "Módulo no disponible"
                );

            }

            break;

        case "administracion":

            if (
                typeof cargarModuloAdministracion ===
                "function"
            ) {

                cargarModuloAdministracion();

            } else {

                cargarModuloSimple(
                    "⚙ Administración",
                    "Módulo no disponible"
                );

            }

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
   MODULO SIMPLE
========================== */

function cargarModuloSimple(
    titulo,
    mensaje
) {

    const content =
        document.getElementById(
            "content"
        );

    if (!content) return;

    content.innerHTML = `

        <h2>${titulo}</h2>

        <div class="card">

            ${mensaje}

        </div>

    `;

}
