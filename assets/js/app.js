function loadModule(module){

    const content =
    document.getElementById("content");

    content.innerHTML = `
        <div class="card">
            <h2>${module}</h2>

            <p>
                Módulo cargado correctamente
            </p>
        </div>
    `;
}

window.onload = function(){
    loadModule("Dashboard");
}
