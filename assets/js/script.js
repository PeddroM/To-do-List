const btnAgregar = document.querySelector("#btn-agregar");
const inputNuevaTarea = document.querySelector("#nueva-tarea");
const listaTareas = document.querySelector("#tareas-container");
const totalTareas = document.querySelector("#total-tareas");
const totalRealizadas = document.querySelector("#total-realizadas")
const totalRealizar = document.querySelector("#total-pendiente")


const tareas = [
    {id: crypto.randomUUID().slice(0,8), descripcion: "Ir al super", completado: false},
    {id: crypto.randomUUID().slice(0,8), descripcion: "Hacer las tareas", completado: false},
    {id: crypto.randomUUID().slice(0,8), descripcion: "Pasear a Rubi", completado: false},
];

btnAgregar.addEventListener("click", () => {
    const textoTarea = document.querySelector("#nueva-tarea").value;

    if (textoTarea.trim() === "")
        return;

    const nuevaTarea = {
        id: crypto.randomUUID().slice(0,8),
        descripcion: textoTarea, completado:false
    };
    tareas.push(nuevaTarea);
    inputNuevaTarea.value = "";
    inputNuevaTarea.focus();
    render();
})

function render(){
    let html = "";

    for (let tarea of tareas){
        
        let checked = "";
        let claseCompletada = "";

        if (tarea.completado === true){
            checked = "checked";
            claseCompletada = "completada"
        }

        html += `
            <div class="tareas">
                <span>${tarea.id}</span>
                <p class="${claseCompletada}">${tarea.descripcion}</p>
                <div>
                    <input type="checkbox" ${checked} onclick="cambiarEstado('${tarea.id}')">
                    <button class="borrar-tarea" onclick="borrar('${tarea.id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }

    listaTareas.innerHTML = html;
    actualizarContadores();
}

function actualizarContadores(){

    const total = tareas.length;
    totalTareas.innerHTML = total;

    let cuentaRealizadas = 0;
    for (let tarea of tareas){
        if (tarea.completado === true){
            cuentaRealizadas = cuentaRealizadas + 1;
        }
    }

    totalRealizadas.innerHTML = cuentaRealizadas;

    const pendientes = total - cuentaRealizadas;
    totalRealizar.innerHTML = pendientes
}

function borrar(id){

    const index = tareas.findIndex((t) => t.id === id);
    tareas.splice(index, 1);
    render();
}

function cambiarEstado(id){
    const index = tareas.findIndex((t) => t.id === id);
    tareas [index].completado = !tareas[index].completado;
    render();
}

render();