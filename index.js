//js puro

const TablaDeTareas = document.querySelector(".tabla-tareas");
console.log(TablaDeTareas);
function MostrarTareas(listaTareas) {

    if (!listaTareas) return;

    TablaDeTareas.innerHTML = ` <div class="tarea" id="GenerarTarea">
                <p>+<br> Agregar Tarea</p>
            </div>`;


    listaTareas.forEach(tarea => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarea";

        const titulo = document.createElement("h1");
        titulo.textContent = tarea.titulo;

        const descripcion = document.createElement("p");
        descripcion.textContent = tarea.descripcion;

        const fecha = document.createElement("p");
        fecha.textContent = tarea.fechaEntrega;

        const estado = document.createElement("p");
        estado.textContent = tarea.estado;

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(fecha);
        tarjeta.appendChild(estado);

        TablaDeTareas.appendChild(tarjeta);

    });

}


// peticiones
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

    return data;
}

// agregar tarea
const form = document.getElementById("formTarea");
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fechaEntrega = document.getElementById("fechaEntrega").value;

    const nuevaTarea = {
        titulo,
        descripcion,
        fechaEntrega
    };

    const resultado = await query("POST", nuevaTarea);
    console.log(resultado);
});

// init
async function init() {

    const listaTareas = await query("GET");
    MostrarTareas(listaTareas);
}

//window.addEventListener("DOMContentLoaded", init);

const tareasPrueba = [
    {
        titulo: "Matemáticas",
        descripcion: "Resolver ejercicios 1 a 10",
        fechaEntrega: "2026-11-06",
        estado: "Pendiente"
    },
    {
        titulo: "Blender",
        descripcion: "Hacer bake de texturas",
        fechaEntrega: "2026-11-08",
        estado: "En progreso"
    },
    {
        titulo: "AKR",
        descripcion: "Conectar Mongo Atlas",
        fechaEntrega: "2026-11-10",
        estado: "Pendiente"
    }
];

MostrarTareas(tareasPrueba);


//apartado para funcionews visuales

// Mostrar y ocultar formulario
const botonAgregar = document.getElementById("GenerarTarea");
const formulario = document.querySelector(".formulario");
const cancelButton = document.getElementById("cancelButton");

botonAgregar.addEventListener("click", () => {
    formulario.classList.remove("noVer");
});

cancelButton.addEventListener("click", () => {
    formulario.classList.add("noVer");
});

formulario.addEventListener("click", (e) => {

    if (e.target === formulario) {

        formulario.classList.add("noVer");

    }

});