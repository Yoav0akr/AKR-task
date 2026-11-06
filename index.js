
// Elementos principales
const TablaDeTareas = document.querySelector(".tabla-tareas");
const form = document.getElementById("formTarea");
const formulario = document.querySelector(".formulario");
const cancelButton = document.getElementById("cancelButton");

// Peticiones a la API
async function query(method, body = null) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch("/api/api", options);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al consultar la API");
    }

    return data;
}

// Mostrar tareas
function MostrarTareas(listaTareas) {

    if (!Array.isArray(listaTareas)) return;

    TablaDeTareas.innerHTML = `
        <div class="tarea" id="GenerarTarea">
            <p>+<br>Agregar Tarea</p>
        </div>
    `;

    listaTareas.forEach(tarea => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarea";

        const titulo = document.createElement("h1");
        titulo.className = "titulo";
        titulo.textContent = tarea.titulo;

        const descripcion = document.createElement("p");
        descripcion.className = "descripcion";
        descripcion.textContent = tarea.descripcion;

        const fechas = document.createElement("div");
        fechas.className = "fechas";

        const fechaEntrega = document.createElement("p");
        fechaEntrega.className = "fecha";
        fechaEntrega.textContent =
            `Entrega: ${tarea.fechaEntrega}`;

        const fechaCreacion = document.createElement("p");
        fechaCreacion.className = "fecha";
        fechaCreacion.textContent =
            `Creación: ${
                tarea.fechaCreacion
                    ? new Date(tarea.fechaCreacion).toLocaleDateString()
                    : "Sin fecha"
            }`;

        const estado = document.createElement("p");
        estado.textContent = tarea.estado;

        fechas.appendChild(fechaEntrega);
        fechas.appendChild(fechaCreacion);

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(fechas);
        tarjeta.appendChild(estado);

        TablaDeTareas.appendChild(tarjeta);

    });

}

// Inicializar aplicación
async function init() {

    try {
        const listaTareas = await query("GET");

        MostrarTareas(listaTareas);

        formulario.classList.add("noVer");

    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }

}

// Crear tarea
form.addEventListener("submit", async event => {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fechaEntrega = document.getElementById("fechaEntrega").value;

    const nuevaTarea = {
        titulo,
        descripcion,
        fechaEntrega
    };

    try {

        await query("POST", nuevaTarea);

        form.reset();

        formulario.classList.add("noVer");

        const listaTareas = await query("GET");

        MostrarTareas(listaTareas);

    } catch (error) {
        console.error("Error al crear tarea:", error);
        alert(error.message);
    }

});

// Delegación de eventos para agregar tareas
TablaDeTareas.addEventListener("click", event => {

    const boton = event.target.closest("#GenerarTarea");

    if (boton) {
        formulario.classList.remove("noVer");
    }

});

// Cancelar formulario
cancelButton.addEventListener("click", () => {
    formulario.classList.add("noVer");
});

// Cerrar al pulsar fuera del formulario
formulario.addEventListener("click", event => {

    if (event.target === formulario) {
        formulario.classList.add("noVer");
    }

});

// Iniciar
window.addEventListener("DOMContentLoaded", init);
