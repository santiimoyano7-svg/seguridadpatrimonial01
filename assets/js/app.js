let alertas = [];
let novedadesTransporte = [];
let novedadesGuardia = [];

function generarAlerta(titulo, detalle) {
    alertas.push({
        fecha: new Date().toLocaleString(),
        titulo,
        detalle
    });
}

function generarNovedadTransporte(control, estado, observacion) {

    const novedad = {
        fecha: new Date().toLocaleString(),
        control,
        estado,
        observacion
    };

    novedadesTransporte.push(novedad);

    generarAlerta(
        control,
        observacion
    );

    novedadesGuardia.push({
        fecha: novedad.fecha,
        descripcion: `${control} - ${estado} - ${observacion}`
    });
}

function validarTransporte(control, estado) {

    if (
        estado === "Observación" ||
        estado === "No Conforme"
    ) {

        const observacion =
            prompt("Ingrese observación");

        generarNovedadTransporte(
            control,
            estado,
            observacion || "Sin detalle"
        );

        alert(
            "Novedad generada automáticamente"
        );
    }
}

function loadModule(module) {

    const content =
        document.getElementById("content");

    switch (module) {

        case "dashboard":

            content.innerHTML = `

                <h2>Dashboard Ejecutivo</h2>

                <div class="stats">

                    <div class="stat">
                        <div class="stat-title">
                            🚨 Alertas
                        </div>

                        <div class="stat-value">
                            ${alertas.length}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">
                            📋 Novedades Transporte
                        </div>

                        <div class="stat-value">
                            ${novedadesTransporte.length}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">
                            📖 Libro Guardia
                        </div>

                        <div class="stat-value">
                            ${novedadesGuardia.length}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">
                            🚛 Transportes
                        </div>

                        <div class="stat-value">
                            14
                        </div>
                    </div>

                </div>
            `;
        break;

        case "alertas":

            let htmlAlertas =
                `<h2>🚨 Alertas</h2>`;

            if (alertas.length === 0) {

                htmlAlertas += `
                    <div class="card">
                        No existen alertas.
                    </div>
                `;
            }

            alertas.forEach(a => {

                htmlAlertas += `

                    <div class="card">

                        <strong>${a.titulo}</strong>

                        <br><br>

                        ${a.detalle}

                        <br><br>

                        ${a.fecha}

                    </div>

                `;
            });

            content.innerHTML =
                htmlAlertas;

        break;

        case "guardia":

            let htmlGuardia =
                `<h2>📖 Libro Guardia</h2>`;

            if (novedadesGuardia.length === 0) {

                htmlGuardia += `
                <div class="card">
                    Sin novedades registradas.
                </div>
                `;
            }

            novedadesGuardia.forEach(n => {

                htmlGuardia += `

                    <div class="card">

                        ${n.fecha}

                        <br><br>

                        ${n.descripcion}

                    </div>

                `;
            });

            content.innerHTML =
                htmlGuardia;

        break;

        case "novedades":

            content.innerHTML = `

                <h2>📝 Novedades</h2>

                <div class="card">
                    Registro general de novedades operativas.
                </div>

            `;

        break;

        case "rondas":

            content.innerHTML = `

                <h2>🚶 Rondas Inteligentes</h2>

                <div class="card">

                    Circuito:
                    Perimetral Norte

                    <br><br>

                    Punto Actual:
                    Portón Norte

