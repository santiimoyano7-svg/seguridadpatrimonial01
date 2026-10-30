function loadModule(module) {

    const content = document.getElementById("content");

    switch(module){

        case "dashboard":

            content.innerHTML = `
                <h2>Dashboard Ejecutivo</h2>

                <div class="stats">

                    <div class="stat">
                        <div class="stat-title">Alertas Activas</div>
                        <div class="stat-value">8</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Rondas Pendientes</div>
                        <div class="stat-value">2</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Transportes</div>
                        <div class="stat-value">14</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Llaves Entregadas</div>
                        <div class="stat-value">6</div>
                    </div>

                </div>

                <br>

                <div class="card">
                    <h3>Últimas novedades</h3>

                    <br>

                    🚨 Precinto faltante Puerta 2

                    <br><br>

                    📹 Cámara 04 fuera de servicio

                    <br><br>

                    🚛 Transporte sin reporte satelital
                </div>
            `;
            break;

        case "alertas":

            content.innerHTML = `
                <h2>Centro de Alertas</h2>

                <div class="card">
                    🚨 Precinto faltante
                </div>

                <div class="card">
                    ⚠ Llave vencida
                </div>

                <div class="card">
                    ℹ Correspondencia recibida
                </div>
            `;
            break;

        case "guardia":

            content.innerHTML = `
                <h2>Libro Digital de Guardia</h2>

                <div class="card">
                    14:20 - Precinto faltante detectado
                </div>

                <div class="card">
                    15:10 - Chofer sin EPP
                </div>
            `;
            break;

        case "rondas":

            content.innerHTML = `
                <h2>Rondas Inteligentes</h2>

                <div class="card">
                    <strong>Circuito:</strong> Perimetral Norte

                    <br><br>

           default:
            content.innerHTML =
            "<h2>Módulo no encontrado</h2>";
    }
}

window.onload = function () {
    loadModule("dashboard");
};
