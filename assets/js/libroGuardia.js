/* ==========================
   LIBRO DE GUARDIA
========================== */

let libroGuardiaSP360 =

    JSON.parse(
        localStorage.getItem(
            "sp360_libro_guardia"
        )
    ) || [];

function guardarLibroGuardia(){

    localStorage.setItem(
        "sp360_libro_guardia",
        JSON.stringify(
            libroGuardiaSP360
        )
    );

}

/* ==========================
   NUEVO REGISTRO
========================== */

function crearRegistroLibroGuardia({

    modulo,
    titulo,
    descripcion,
    usuario

}){

    libroGuardiaSP360.push({

        id:
            Date.now(),

        fecha:
            new Date()
            .toLocaleDateString(
                "es-AR"
            ),

        hora:
            new Date()
            .toLocaleTimeString(),

        modulo,

        titulo,

        descripcion,

        usuario:

            usuario

            ||

            (
                usuarioActivo
                ?
                usuarioActivo.nombre
                :
                "Sistema"
            )

    });

    guardarLibroGuardia();

}

/* ==========================
   ESTADISTICAS
========================== */

function obtenerEstadisticasLibroGuardia(){

    const hoy =
        new Date()
        .toLocaleDateString(
            "es-AR"
        );

    return {

        total:
            libroGuardiaSP360.length,

        hoy:

            libroGuardiaSP360.filter(
                r =>
                r.fecha === hoy
            ).length,

        automaticos:

            libroGuardiaSP360.filter(
                r =>
                r.modulo !==
                "Manual"
            ).length,

        manuales:

            libroGuardiaSP360.filter(
                r =>
                r.modulo ===
                "Manual"
            ).length

    };

}

/* ==========================
   MODULO LIBRO DE GUARDIA
========================== */

function cargarModuloLibroGuardia(){

    const content =
        document.getElementById(
           "content"
        );

    const estadisticas =
        obtenerEstadisticasLibroGuardia();

    let registros =

        libroGuardiaSP360
       .slice()
        .reverse()

    let timeline = "";

    registros.forEach(

        registro =>*{

            timeline += `

               <div class="card">

                   <strong>

                       📅
                       ${registro.fecha}

                   </strong>

                   <br>

                    �*
                    ${registro.hora}

                    <br><br>

                   <strong>

                      [${registro.modulo}]

                    </strong>
                    <br><br>

                   ${registro.titulo}]
                    <hr>

                   ${registro.descripcion}]

                    <br><br>

                   👤
                   ${registro.usuario}

               </div>

                <br>

            `;

        }

    )

    content.innerHTML = `

       <h2>
            📓 Libro de Guardia
        </h2>

        <div class="stats">

            <div class="stat">

                <div class="stat-title">
                   📋 Total
                </div>

               <div class="stat-value">
                    ${estadisticas.total}
                </div>
            </div>

            <div class="stat">

                <div class="stat-title">
                   📅 Hoy
                </div>

                <div class="stat-value">
                    ${estadisticas.hoy}
                </div>

            </div>

           <div class="stat">

               <div class="stat-title">
                  🤖 Automáticos
               </div>

                <div class="stat-value">
                   ${estadisticas.automaticos}
                </div>

           </div>

            <div class="stat">

                <div class="stat-title">
                    ✍ Manuales
                </div>

               <div class="stat-value">
                    ${estadisticas.manuales}
                </div>

            </div>

        </div>

        <br>

        <div class="card">

            <button
               class="btn btn-success"
                onclick="
              abrirNuevoRegistroGuardias)
                ">

               ➕ Nuevo Registro

            <button>

            <br><br>

           <input
                id="buscar_guardia"
                placeholder="
Buscar registros"
               onkeyup="
                filtrarLibroGuardia()
                ">

        </div>

        <br>

        <div
            id="timeline_guardia">

            ${timeline}

        </div>

    `;

}

/* ==========================
   NUEVO REGISTRO
========================== */

function abrirNuevoRegistroGu*rdia(){

    const content =
       document.getElementById(
           "content"
        );

    content.innerHTML = `

        <h2>
           ➕ Nuevo Registro
        <h2>

        <div class="card">

           <input
                id="titulo_guardia"
                placeholder="
Título">

           *<textarea
                id="descripcion_guardia"
                placeholder="
Descripción">
           </textarea>

        </div>

       <br>

        <button
           class="btn btn-success"
           onclick="
            guardarRegistroManual()
            ">

           ✅ Guardar

        </button>

        <button
            class="btn btn-primary"
            onclick="
            cargarModuloLibroGuardia()
            ">

            ⬅ Volver

        </button>

    `;

}

/* ==========================
   GUARDAR REGISTRO MANUAL
========================== */

function guardarRegistroManual(){

    const titulo =

        document
        .getElementById(
            "titulo_guardia"
        )
        .value;

    const descripcion =

        document
        .getElementById(
            "descripcion_guardia"
        )
        .value;

    if(
        titulo.trim() === ""
    ){

        alert(
            "Debe ingresar un título."
        );

        return;

    }

    crearRegistroLibroGuardia({

        modulo:
            "Manual",

        titulo,

        descripcion

    });

    cargarModuloLibroGuardia();

}

/* ==========================
   FILTRAR
========================== */

function filtrarLibroGuardia(){

    const texto =

        document
        .getElementById(
            "buscar_guardia"
        )
        .value
        .toUpperCase();

    const cards =

        document.querySelectorAll(
            "#timeline_guardia .card"
        );

    cards.forEach(

        card => {

            const contenido =

                card.innerText
                .toUpperCase();

            card.style.display =

                contenido.includes(
                    texto
                )

                ? ""

                : "none";

        }

    );

}
