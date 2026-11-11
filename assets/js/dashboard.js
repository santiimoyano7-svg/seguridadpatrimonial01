/* ==========================
   SP360 - DASHBOARD
========================== */

/* ==========================
   KPI NOVEDADES
========================== */

function obtenerKPINovedades(){

    if(
        typeof obtenerEstadisticasNovedades !==
        "function"
    ){

        return {

            total: 0,
            abiertas: 0,
            enCurso: 0,
            cerradas: 0

        };

    }

    return obtenerEstadisticasNovedades();

}

/* ==========================
   KPI LLAVES
========================== */

function obtenerKPILlaves(){

    if(
        typeof obtenerEstadisticasLlaves !==
        "function"
    ){

        return {

            total: 0,
            disponibles: 0,
            prestadas: 0,
            demoradas: 0

        };

    }

    return obtenerEstadisticasLlaves();

}

/* ==========================
   KPI TRANSPORTE
========================== */

function obtenerKPITransporte(){

    if(
        typeof obtenerEstadisticasTransporte !==
        "function"
    ){

        return {

            total: 0,
            observaciones: 0,
            noConformes: 0

        };

    }

    return obtenerEstadisticasTransporte();

}

/* ==========================
   KPI USUARIOS
========================== */

function obtenerKPIUsuarios(){

    if(
        typeof obtenerResumenUsuarios !==
        "function"
    ){

        return {

            total: 0,

            activos: 0,

            inactivos: 0

        };

    }

    return obtenerResumenUsuarios();

}

/* ==========================
   DASHBOARD PRINCIPAL
========================== */

function cargarDashboardSP360(){

    const content =
        document.getElementById(
            "content"
        );

    const usuario =
        obtenerUsuario();

    const novedades =
        obtenerKPINovedades();

    const llaves =
        obtenerKPILlaves();

    const transporte =
        obtenerKPITransporte();

    const usuarios =
        obtenerKPIUsuarios();

    content.innerHTML = `

        <h2>
            🏠 Dashboard Ejecutivo
        </h2>

        <div class="card">

            <strong>Usuario:</strong>
            ${usuario ?
                usuario.nombre :
                "-"}

            <br>

            <strong>Rol:</strong>
            ${usuario ?
                usuario.rol :
                "-"}

            <br>

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
                    ${novedades.total}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟡 Abiertas
                </div>

                <div class="stat-value">
                    ${novedades.abiertas}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🔵 En Curso
                </div>

                <div class="stat-value">
                    ${novedades.enCurso}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟢 Cerradas
                </div>

                <div class="stat-value">
                    ${novedades.cerradas}
                </div>

            </div>

        </div>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    🚛 Transportes
                </div>

                <div class="stat-value">
                    ${transporte.total}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    ⚠ Observaciones Transporte
                </div>

                <div class="stat-value">
                    ${transporte.observaciones}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    ❌ No Conformes
                </div>

                <div class="stat-value">
                    ${transporte.noConformes}
                </div>

            </div>

        </div>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    🔑 Disponibles
                </div>

                <div class="stat-value">
                    ${llaves.disponibles}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🟠 Prestadas
                </div>

                <div class="stat-value">
                    ${llaves.prestadas}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🔴 Demoradas
                </div>

                <div class="stat-value">
                    ${llaves.demoradas}
                </div>

            </div>

        </div>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                    👥 Usuarios
                </div>

                <div class="stat-value">
                    ${usuarios.total}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    ✅ Activos
                </div>

                <div class="stat-value">
                    ${usuarios.activos}
                </div>

            </div>

            <div class="stat">

                <div class="stat-title">
                    🚫 Inactivos
                </div>

                <div class="stat-value">
                    ${usuarios.inactivos}
                </div>

            </div>

        </div>

    `;

}

/* ==========================
   DASHBOARD SOC
========================== */

function cargarDashboardSOC(){

    const content =
        document.getElementById(
            "content"
        );

    const transportes =
        transportesSP360
            ? transportesSP360.length
            : 0;

    const llavesPrestadas =
        llavesSP360.filter(
            l =>
            l.estado ===
            "Prestada"
        ).length;

    const llavesDemoradas =
        llavesSP360.filter(
            l =>
            l.estado ===
            "Demorada"
        ).length;

    const rondasCurso =
        rondasSP360.filter(
            r =>
            r.estado ===
            "En Curso"
        ).length;

    const rondasFinalizadas =
        rondasSP360.filter(
            r =>
            r.estado ===
            "Finalizada"
        ).length;

    const novedades =
        novedadesSP360
        ? novedadesSP360.length
        : 0;

    content.innerHTML = `

        <h2>
            🛡 SP360 Security Operations Center
        </h2>

        <div class="soc-grid">

            <div class="soc-card">

                <h3>
                    🚛 Transportes
                </h3>

                <div class="soc-number">

                    ${transportes}

                </div>

            </div>

            <div class="soc-card">

                <h3>
                    🔑 Prestadas
                </h3>

                <div class="soc-number">

                    ${llavesPrestadas}

                </div>

            </div>

            <div class="soc-card">

                <h3>
                    🔴 Demoradas
                </h3>

                <div class="soc-number">

                    ${llavesDemoradas}

                </div>

            </div>

            <div class="soc-card">

                <h3>
                    🚶 En Curso
                </h3>

                <div class="soc-number">

                    ${rondasCurso}

                </div>

            </div>

            <div class="soc-card">

                <h3>
                    ✅ Finalizadas
                </h3>

                <div class="soc-number">

                    ${rondasFinalizadas}

                </div>

            </div>

            <div class="soc-card">

                <h3>
                    📝 NOV
                </h3>

                <div class="soc-number">

                    ${novedades}

                </div>

            </div>

        </div>

    `;

}
