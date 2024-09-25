import { boton } from '..js/script.js';
// Cargar el historial desde localStorage
export function cargarHistorial() {
    historial = JSON.parse(localStorage.getItem('historial')) || [];
    const historialList = document.getElementById("historial");

    // Limpiar el contenido actual del historial
    historialList.innerHTML = '';   

    historial.forEach(conv => {
        const listItem = document.createElement('li');
        listItem.textContent = `${conv.pesos} ARS a ${conv.moneda.toUpperCase()} = ${conv.resultado}`;

        // Crear y añadir el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarConversion(conv.id);

        listItem.appendChild(deleteButton);
        historialList.appendChild(listItem);
    });
}

// Eliminar una conversión del historial
export function eliminarConversion(id) {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const nuevoHistorial = historial.filter(conv => conv.id !== id);

    localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
    
    cargarHistorial();
}

export function vaciarHistorial() {
    historial = []
    localStorage.removeItem('historial');
    document.getElementById("historial").innerHTML = '';
}

// Añadir los event listeners
document.getElementById("button").addEventListener('click', boton);
document.getElementById('clear-history').addEventListener('click', vaciarHistorial);

// Cargar el historial al cargar la página
document.getElementById('clear-history').addEventListener('click', vaciarHistorial);
document.addEventListener('DOMContentLoaded', cargarHistorial); 


