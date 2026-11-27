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

function cargarModuloLibroGuard*a(){

    const content =
        *ocument.getElementById(
          * "content"
        );

    const e*tadisticas =
        obtenerEstadi*ticasLibroGuardia();

    let regi*tros =

        libroGuardiaSP360
*       .slice()
        .reverse()*

    let timeline = "";

    regi*tros.forEach(

        registro =>*{

            timeline += `

    *           <div class="card">

   *                <strong>

        *               📅
                *       ${registro.fecha}

        *           </strong>

            *       <br>

                    �*
                    ${registro.ho*a}

                    <br><br>

*                   <strong>

     *                  [${registro.modu*o}]

                    </strong>*
                    <br><br>

   *                ${registro.titulo}*
                    <hr>

       *            ${registro.descripcion*

                    <br><br>

  *                 👤
              *     ${registro.usuario}

        *       </div>

                <br*

            `;

        }

    )*

    content.innerHTML = `

     *  <h2>
            📓 Libro de Gua*dia
        </h2>

        <div cl*ss="stats">

            <div clas*="stat">

                <div cla*s="stat-title">
                  * 📋 Total
                </div>

*               <div class="stat-va*ue">
                    ${estadis*icas.total}
                </div>*
            </div>

            <*iv class="stat">

                *div class="stat-title">
          *         📅 Hoy
                </*iv>

                <div class="s*at-value">
                    ${e*tadisticas.hoy}
                </*iv>

            </div>

         *  <div class="stat">

            *   <div class="stat-title">
      *             🤖 Automáticos
      *         </div>

                <*iv class="stat-value">
           *        ${estadisticas.automaticos*
                </div>

         *  </div>

            <div class="*tat">

                <div class=*stat-title">
                    ✍* Manuales
                </div>

*               <div class="stat-va*ue">
                    ${estadis*icas.manuales}
                </d*v>

            </div>

        </*iv>

        <br>

        <div cl*ss="card">

            <button
  *             class="btn btn-succes*"
                onclick="
      *         abrirNuevoRegistroGuardia*)
                ">

            *   ➕ Nuevo Registro

            <*button>

            <br><br>

   *        <input
                id=*buscar_guardia"
                pl*ceholder="
Buscar registros"
     *          onkeyup="
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
     *  document.getElementById(
       *    "content"
        );

    cont*nt.innerHTML = `

        <h2>
   *        ➕ Nuevo Registro
        <*h2>

        <div class="card">

 *          <input
                i*="titulo_guardia"
                *laceholder="
Título">

           *<textarea
                id="desc*ipcion_guardia"
                pl*ceholder="
Descripción">
         *  </textarea>

        </div>

   *    <br>

        <button
        *   class="btn btn-success"
       *    onclick="
            guardarR*gistroManual()
            ">

   *        ✅ Guardar

        </butto*>

        <button
            cla*s="btn btn-primary"
            on*lick="
            cargarModuloLib*oGuardia()
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
