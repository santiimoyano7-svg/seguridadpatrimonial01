/* ==========================
   SP360 - TRANSPORTE SEGURO
========================== */

/* ==========================
   BASE DE DATOS
========================== */

let transportesSP360 =
JSON.parse(
    localStorage.getItem(
        "sp360_transportes"
    )
) || [];

/* ==========================
   GUARDAR
========================== */

function guardarTransportes(){

    localStorage.setItem(

        "sp360_transportes",

        JSON.stringify(
            transportesSP360
        )

    );

}

/* ==========================
   CHECKLIST
========================== */

const checklistTransporte = [

    "Satelital",
    "Precinto",
    "Candado",
    "Matafuego",
    "Licencia",
    "EPP",
    "Documentacion"

];

/* ==========================
   REGISTRAR TRANSPORTE
========================== */

function registrarTransporte({

    patente,
    transportista,
    chofer,
    dni,
    origen,
    destino,
    remito,
    numeroPrecinto,
    controles

}){

    const trazabilidad =
        crearTrazabilidad();

    const registro = {

        id:
            `TRA-${Date.now()}`,

        patente,

        transportista,

        chofer,

        dni,

        origen,

        destino,

        remito,

        numeroPrecinto,

        controles,

        sitio:
            trazabilidad.sitio,

        usuario:
            trazabilidad.usuario,

        rol:
            trazabilidad.rol,

        fecha:
            trazabilidad.fecha,

        hora:
            trazabilidad.hora

    };

    transportesSP360.push(
        registro
    );

    guardarTransportes();

    validarControles(
        registro
    );

    return registro;

}

/* ==========================
   VALIDAR CONTROLES
========================== */

function validarControles(
    transporte
){

    transporte.controles.forEach(

        control => {

            if(
                control.estado ===
                "Observación"

                ||

                control.estado ===
                "No Conforme"
            ){

                crearNovedad({

                    modulo:
                    "Transporte Seguro",

                    titulo:
                    `${control.item} - ${transporte.patente}`,

                    descripcion:

                    `
Patente: ${transporte.patente}

Transportista:
${transporte.transportista}

Control:
${control.item}

Resultado:
${control.estado}

Observación:
${control.observacion}
                    `,

                    criticidad:

                    control.estado ===
                    "No Conforme"

                    ?

                    criticidades.ALTA

                    :

                    criticidades.MEDIA

                });

            }

        }

    );

}

/* ==========================
   OBTENER TODOS
========================== */

function obtenerTransportes(){

    return transportesSP360;

}

/* ==========================
   BUSCAR POR PATENTE
========================== */

function obtenerTransportePatente(
    patente
){

    return transportesSP360.filter(

        transporte =>

        transporte.patente
        === patente

    );

}

/* ==========================
   BUSCAR POR FECHA
========================== */

function obtenerTransportesFecha(
    fecha
){

    return transportesSP360.filter(

        transporte =>

        transporte.fecha
        === fecha

    );

}

/* ==========================
   BUSCAR POR SITIO
========================== */

function obtenerTransportesSitio(
    sitio
){

    return transportesSP360.filter(

        transporte =>

        transporte.sitio
        === sitio

    );

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasTransporte(){

    const total =
        transportesSP360.length;

    let observaciones = 0;
    let noConformes = 0;

    transportesSP360.forEach(

        transporte => {

            transporte.controles.forEach(

                control => {

                    if(
                        control.estado ===
                        "Observación"
                    ){

                        observaciones++;

                    }

                    if(
                        control.estado ===
                        "No Conforme"
                    ){

                        noConformes++;

                    }

                }

            );

        }

    );

    return {

        total,

        observaciones,

        noConformes

    };

}

/* ==========================
   RENDER MODULO
========================== */

function cargarModuloTransporte(){

    const content =
        document.getElementById(
            "content"
        );

    const stats =
        obtenerEstadisticasTransporte();

    content.innerHTML = `

        <h2>
            🚛 Transporte Seguro
        </h2>

        <div class="card">

            <strong>
                Transportes Registrados
            </strong>

            <br><br>

            ${stats.total}

            <br><br>

            <strong>
                Observaciones
            </strong>

            <br>

            ${stats.observaciones}

            <br><br>

            <strong>
                No Conformes
            </strong>

            <br>

            ${stats.noConformes}

        </div>

        <div class="card">

            Próxima versión:

            <br><br>

            ✅ Alta Transporte

            <br>

            ✅ Checklist interactivo

            <br>

            ✅ Generación automática
            de NOV

            <br>

            ✅ Integración Libro Guardia

            <br>

            ✅ Reportes mensuales

        </div>

    `;

}
