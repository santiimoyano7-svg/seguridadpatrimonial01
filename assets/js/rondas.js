/* ==========================
   MODULO RONDAS
========================== */

function cargarModuloRondas(){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            🚶 Rondas Inteligentes
        </h2>

        <div class="rondas-menu">

            <button
                class="btn btn-success">

                ▶ Iniciar Ronda

            </button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloPuntos()
                ">

                📍 Puntos

            </button>

            <button
                class="btn btn-primary">

                🗺 Circuitos

            </button>

            <button
                class="btn btn-primary">

                📚 Historial

            </button>

        </div>

        <br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    🟢 Completadas

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 En Curso

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Pendientes

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🚨 Hallazgos

                </div>

                <div class="stat-value">

                    0

                </div>

            </div>

        </div>

        <h3>
            🟡 Rondas Activas
        </h3>

        <div class="rondas-grid">

            <div
                class="ronda-card"
                style="
                background:#FBBF24;
                ">

                <h3>
                    🚶 RONDA A
                </h3>

                🟡 En Curso

                <br><br>

                Juan Pérez

                <br>

                08:15 hs

            </div>

            <div
                class="ronda-card"
                style="
                background:#EF4444;
                ">

                <h3>
                    🚶 RONDA B
                </h3>

                🔴 Pendiente

                <br><br>

                Turno Mañana

                <br>

                09:30 hs

            </div>

            <div
                class="ronda-card"
                style="
                background:#DC2626;
                ">

                <h3>
                    🚨 Hallazgo
                </h3>

                SUBSUELO

                <br><br>

                NOV Activa

            </div>

        </div>

    `;

}

/* ==========================
   MODULO PUNTOS
========================== */

function cargarModuloPuntos(){

    const content =
        document.getElementById(
            "content"
        );

    content.innerHTML = `

        <h2>
            📍 Puntos de Control
        </h2>

        <div class="rondas-menu">

            <button
                class="btn btn-success"
                onclick="
                abrirNuevoPunto()
                ">

                ➕ Nuevo Punto

            </button>

            <button
                class="btn btn-primary"
                onclick="
                cargarModuloRondas()
                ">

                🚶 Rondas

            </button>

            <button
                class="btn btn-primary">

                🗺 Circuitos

            </button>

        </div>

        <br>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">

                    📍 Total Puntos

                </div>

                <div class="stat-value">

                    10

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🔴 Alta Criticidad

                </div>

                <div class="stat-value">

                    6

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟡 Media Criticidad

                </div>

                <div class="stat-value">

                    3

                </div>

            </div>

            <div class="stat">

                <div class="stat-title">

                    🟢 Baja Criticidad

                </div>

                <div class="stat-value">

                    1

                </div>

            </div>

        </div>

        <br>

        <div class="card">

            <input

                id="buscar_punto"

                placeholder="
                Buscar punto"

                onkeyup="
                filtrarPuntos()
                ">

        </div>

        <div
            class="puntos-grid">

            <div
                class="punto-card"
                style="
                background:#DC2626;
                ">

                <h3>
                    📍 SUBSUELO
                </h3>

                🔴 Alta

                <br><br>

                QR-001

                <br>

                5 min

            </div>

            <div
                class="punto-card"
                style="
                background:#DC2626;
                ">

                <h3>
                    📍 CALDERAS
                </h3>

                🔴 Alta

                <br><br>

                QR-002

                <br>

                5 min

            </div>

            <div
                class="punto-card"
                style="
                background:#FBBF24;
                ">

                <h3>
                    📍 CHATARRA
                </h3>

                🟡 Media

                <br><br>

                QR-003

                <br>

                4 min

            </div>

            <div
                class="punto-card"
                style="
                background:#FBBF24;
                ">

                <h3>
                    📍 OBRADORES
                </h3>

                🟡 Media

                <br><br>

                QR-004

                <br>

                5 min

            </div>

        </div>

    `;

}
