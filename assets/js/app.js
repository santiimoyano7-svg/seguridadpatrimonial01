function loadModule(module) {

    const content = document.getElementById("content");

    switch (module) {

        case "dashboard":

            content.innerHTML = `
                <h2>Dashboard Ejecutivo</h2>

                <div class="stats">

                    <div class="stat">
                        <div class="stat-title">🚨 Alertas Activas</div>
                        <div class="stat-value">8</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">🚶 Rondas Pendientes</div>
                        <div class="stat-value">2</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">🚛 Transportes</div>
                        <div class="stat-value">14</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">🔑 Llaves Entregadas</div>
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

                    <strong>Circuito:</strong>
                    Perimetral Norte

                    <br><br>

                    <strong>Punto Actual:</strong>

                    <br><br>

                    Portón Norte

                    <br><br>

                    ✅ Escanear QR

                    <br><br>

                    <strong>Checklist:</strong>

                    <ul>
                        <li>Candado colocado</li>
                        <li>Sin daños visibles</li>
                        <li>Iluminación operativa</li>
                        <li>Sin personas ajenas</li>
                    </ul>

                </div>
            `;
            break;

        case "transporte":

            content.innerHTML = `
                <h2>Transporte Seguro</h2>

                <div class="card">

                    Empresa: Transporte Aimar

                    <br><br>

                    ✅ Satelital Operativo

                    <br>

                    ✅ Precinto 554872

                    <br>

                    ✅ Candado Blindado

                    <br>

                    ⚠ Matafuego próximo vencimiento

                </div>
            `;
            break;

        case "llaves":

            content.innerHTML = `
                <h2>Gestión de Llaves</h2>

                <div class="card">

                    🔑 Sala Tintas

                    <br>

                    Juan Pérez

                    <br>

                    190 minutos

                    <br><br>

                    🚨 Alerta Crítica

                </div>
            `;
            break;

        case "cofres":

            content.innerHTML = `
                <h2>Gestión de Cofres</h2>

                <div class="card">

                    🟢 Ocupados: 214

                    <br>

                    🔵 Libres: 150

                    <br>

                    🔴 Rotos: 12

                    <br>

                    🟠 Sin Declarar: 24

                </div>
            `;
            break;

        case "cctv":

            content.innerHTML = `
                <h2>CCTV</h2>

                <div class="card">

                    CAM 01 ✅

                    <br><br>

                    CAM 02 ✅

                    <br><br>

                    CAM 03 ⚠

                    <br><br>

                    CAM 04 ❌

                </div>
            `;
            break;

        case "precintos":

            content.innerHTML = `
                <h2>Control de Precintos</h2>

                <div class="card">
                    Puerta 01
                    <br>
                    Precinto 554878
                    <br>
                    🟢 Conforme
                </div>

                <div class="card">
                    Puerta 02
                    <br>
                    Precinto 554879
                    <br>
                    🔴 Faltante
                </div>
            `;
            break;

        default:

            content.innerHTML = `
                <h2>Módulo no encontrado</h2>
            `;
    }
}

window.onload = function () {
    loadModule("dashboard");
};
