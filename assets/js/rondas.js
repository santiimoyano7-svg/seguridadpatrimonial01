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
                class="btn btn-primary">

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

                Turno Tarde

                <br>

                15:00 hs

            </div>

        </div>

    `;

}
