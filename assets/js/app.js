let alertas = [];
let novedadesTransporte = [];
let novedadesGuardia = [];

function generarAlerta(titulo, detalle){

    alertas.push({
        fecha: new Date().toLocaleString(),
        titulo,
        detalle
    });

}

function generarNovedadTransporte(control, estado, observacion){

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
        fecha:novedad.fecha,
        descripcion:
            `${control} - ${estado} - ${observacion}`
    });

}

function validarTransporte(control, estado){

    if(
        estado === "Observación" ||
        estado === "No Conforme"
    ){

        const observacion =
            prompt(
             "Ingrese observación"
            );

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

function loadModule(module){

    const content =
        document.getElementById("content");

    switch(module){

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
                        🚶 Rondas
                    </div>

                    <div class="stat-value">
                        2
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

                <div class="stat">
                    <div class="stat-title">
                        🔑 Llaves
                    </div>

                    <div class="stat-value">
                        6
                    </div>
                </div>

            </div>

            `;
        break;

        case "alertas":

            let htmlAlertas =
            `<h2>🚨 Alertas</h2>`;

            if(alertas.length === 0){

                htmlAlertas += `
                <div class="card">
                    No existen alertas.
                </div>
                `;
            }

            alertas.forEach(a=>{

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

            content.innerHTML = htmlAlertas;

        break;

        case "guardia":

            let htmlGuardia =
            `<h2>📖 Libro Guardia</h2>`;

            novedadesGuardia.forEach(n=>{

                htmlGuardia += `
                <div class="card">

                    ${n.fecha}

                    <br><br>

                    ${n.descripcion}

                </div>
                `;
            });

            content.innerHTML = htmlGuardia;

        break;

        case "novedades":

            content.innerHTML = `

            <h2>📝 Novedades</h2>

            <div class="card">
                Registro general de novedades
                operativas.
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

                Punto actual:

                Portón Norte

                <br><br>

                ✅ Escanear QR

            </div>

            `;

        break;

        case "transporte":

    content.innerHTML = `

    <h2>🚛 Transporte Seguro</h2>

    <div class="card">

        <h3>Satelital</h3>

        <select onchange="validarTransporte('Satelital',this.value)">
            <option>Conforme</option>
            <option>Observación</option>
            <option>No Conforme</option>
        </select>

        <br><br>

        <h3>Precinto</h3>

        <select onchange="validarTransporte('Precinto',this.value)">
            <option>Conforme</option>
            <option>Observación</option>
            <option>No Conforme</option>
        </select>

        <br><br>

        <h3>Candado</h3>

        <select onchange="validarTransporte('Candado',this.value)">
            <option>Conforme</option>
            <option>Observación</option>
            <option>No Conforme</option>
        </select>

        <br><br>

        <h3>Matafuego</h3>

        <select onchange="validarTransporte('Matafuego',this.value)">
            <option>Conforme</option>
            <option>Observación</option>
            <option>No Conforme</option>
        </select>

    </div>

    `;

break;


case "novedadesTransporte":

    let htmlNovedades = `
        <h2>📋 Novedades Transporte</h2>
    `;

    if(novedadesTransporte.length === 0){

        htmlNovedades += `
            <div class="card">
                No existen novedades registradas
            </div>
        `;
    }

    novedadesTransporte.forEach(n=>{

        htmlNovedades += `

        <div class="card">

            <strong>${n.control}</strong>

            <br><br>

            Estado:
            ${n.estado}

            <br><br>

            Observación:
            ${n.observacion}

            <br><br>

            Fecha:
            ${n.fecha}

        </div>

        `;
    });

    content.innerHTML =
    htmlNovedades;

break;


case "accesos":

    content.innerHTML = `

    <h2>🚗 Accesos Vehiculares</h2>

    <div class="card">

        Patente

        <input type="text">

        <br>

        Empresa

        <input type="text">

        <br>

        Conductor

        <input type="text">

        <br>

        Sector Destino

        <input type="text">

    </div>

    `;

break;


case "notebooks":

    content.innerHTML = `

    <h2>💻 Registro Notebooks</h2>

    <div class="card">

        Usuario

        <input type="text">

        <br>

        Empresa

        <input type="text">

        <br>

        Marca / Modelo

        <input type="text">

        <br>

        N° Serie

        <input type="text">

    </div>

    `;

break;


case "emergencias":

    content.innerHTML = `

    <h2>🚑 Servicios de Emergencia</h2>

    <div class="card">

        Organismo

        <select>

            <option>SUM</option>
            <option>Bomberos</option>
            <option>Policía</option>
            <option>Ambulancia</option>

        </select>

        <br>

        Motivo

        <input type="text">

        <br>

        Sector

        <input type="text">

    </div>

    `;

break;


case "correspondencia":

    content.innerHTML = `

    <h2>📦 Correspondencia</h2>

    <div class="card">

        Destinatario

        <input type="text">

        <br>

        Área

        <input type="text">

        <br>

        Tipo

        <select>

            <option>Sobre</option>
            <option>Paquete</option>
            <option>Documentación</option>

        </select>

    </div>

    `;

break;


case "flota":

    content.innerHTML = `

    <h2>🚙 Flota</h2>

    <div class="card">

        BAG-001

        <br><br>

        Toyota Hilux

        <br><br>

        🟢 En Planta

    </div>

    <div class="card">

        BAG-002

        <br><br>

        Renault Oroch

        <br><br>

        🟡 En Comisión

    </div>

    `;

break;


case "movimientosFlota":

    content.innerHTML = `

    <h2>🔄 Movimiento Vehículos de Flota</h2>

    <div class="card">

        Vehículo

        <input type="text">

        <br>

        Patente

        <input type="text">

        <br>

        Chofer

        <input type="text">

        <br>

        Legajo

        <input type="text">

        <br>

        Hora Salida

        <input type="time">

        <br>

        Hora Regreso

        <input type="time">

        <br>

        Destino

        <input type="text">

        <br>

        Kilómetros Salida

        <input type="number">

        <br>

        Kilómetros Regreso

        <input type="number">

        <br>

        Observaciones

        <textarea rows="4"></textarea>

    </div>

    `;

break;


case "llaves":

    content.innerHTML = `

    <h2>🔑 Llaves</h2>

    <div class="card">

        Gestión de Llaves

    </div>

    `;

break;


case "cofres":

    content.innerHTML = `

    <h2>🗄 Cofres</h2>

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

    <h2>📹 CCTV</h2>

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

    <h2>🚪 Precintos</h2>

    <div class="card">

        Control de Precintos

    </div>

    `;

break;
