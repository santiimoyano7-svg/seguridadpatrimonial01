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
