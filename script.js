
class Divisas {
    constructor(moneda, tasa) {
        this.moneda = moneda;
        this.tasa = tasa;
        this.pesos = 0;
    }

    enPesos(pesos) {
        let precioEnPesos = this.tasa * pesos;
        console.log(`El precio en pesos es: $${precioEnPesos}`);
        return precioEnPesos;
    }
}

const divisa1 = new Divisas('dolar', 1500);
const divisa2 = new Divisas('euros', 1000);
const divisa3 = new Divisas('reales', 170);

const monedas = [divisa1, divisa2, divisa3];
const conversion = [];

const tasas = () => {
    preventDefault();
    let cargaMoneda = document.getElementById("moneda");
    let cargaPesos = parseInt(document.getElementById("pesos"));
    let convertir = document.getElementById("button");
}


function boton() {
   const addButton = document.querySelectorAll("button");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const cargaMoneda = e.currentTarget.id;
            const cargaPesos = parseInt(document.getElementById("pesos").value);

        if (cargaPesos <= 0 || isNaN(cargaPesos)) {
            document.getElementById("resultado").innerText = "Por favor, ingrese un valor positivo válido.";
            return;
        }

        let validar = monedas.some(divisa => divisa.moneda === cargaMoneda);

        if (validar) {
            let divisaSeleccionada = monedas.find(divisa => divisa.moneda === cargaMoneda);
            let resultado = divisaSeleccionada.enPesos(cargaPesos);

            conversion.push({ moneda: cargaMoneda, pesos: cargaPesos, resultado });

            let print = document.getElementById("resultado");
            print.innerText = `El total es: $${resultado}`;

            
            localStorage.setItem("conversion", JSON.stringify(conversion));
        } else {
            document.getElementById("resultado").innerText = "La moneda ingresada no es válida";
        }
    }})
}


document.addEventListener('DOMContentLoaded', addButtonEventListener);

document.getElementById("button").addEventListener('click', manejarConversion);

//cargar historial
function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('conversion')) || [];
    const historialList = document.getElementById("historial");

    historial.forEach(conv => {
        const listItem = document.createElement('li');
        listItem.textContent = `${conv.pesos} ARS a ${conv.moneda.toUpperCase()} = ${conv.resultado}`;

        // eliminar una conversión individual
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarConversion(conv);

        listItem.appendChild(deleteButton);
        historialList.appendChild(listItem);
    });
}

// Función para eliminar una conversión del historial
function eliminarConversion(conversionEliminada) {
    const historial = JSON.parse(localStorage.getItem('conversion')) || [];
    const nuevoHistorial = historial.filter(conv => conv !== conversionEliminada);

    localStorage.setItem('conversion', JSON.stringify(nuevoHistorial));
}

// Funcin para vaciar todo el historial
function vaciarHistorial() {
    localStorage.removeItem('conversion');
    
}

// Añadir el evento de clic al botón para vaciar el historial
document.getElementById('clear-history').addEventListener('click', vaciarHistorial);

document.addEventListener('DOMContentLoaded', () => {
    boton();
    document.getElementById("button").addEventListener('click', manejarConversion);
});