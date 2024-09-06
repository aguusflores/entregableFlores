import { cargarHistorial, eliminarConversion, vaciarHistorial } from './storage.js';

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
let historial = [];


fetch("./db/data.json")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        const nuevaDivisa = new Divisas(element.moneda, element.tasa, element.pesos);
        monedas.push(nuevaDivisa);
    });
})
.catch(error => console.error('Error fetching data:', error));

export async function boton(event) {
    event.preventDefault();
            try {
                const cantidadPesosIngresados = parseInt(document.getElementById("pesos").value);
                const monedaSeleccionada = document.getElementById("moneda").value;
            
            
            if (cantidadPesosIngresados <= 0 || isNaN(cantidadPesosIngresados)) {
                    throw new Error("Por favor, ingrese un valor positivo válido."); 
            }
        
        const divisaSeleccionada = monedas.find(divisa => divisa.moneda === monedaSeleccionada);
    
        if (divisaSeleccionada) {
            let resultado = divisaSeleccionada.enPesos(cantidadPesosIngresados);
            const id = crypto.randomUUID();
            historial.push({ moneda: monedaSeleccionada, pesos: cantidadPesosIngresados, resultado, id });
            
            // Guardar la conversión en el localStorage
            localStorage.setItem("historial", JSON.stringify(historial));
            document.getElementById("resultado").innerText = `El total es: $${resultado}`;
            
            // Recargar el historial
            cargarHistorial();
        } else {
            throw new Error("La moneda ingresada no es válida");
        }
    } catch (error) {
        document.getElementById("resultado").innerText = error.message;
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    } finally {
        console.log('Validación de entrada completada.');
    }
}    
document.addEventListener('DOMContentLoaded', () => {
    boton();
    cargarHistorial();
    document.getElementById('clear-history').addEventListener('click', vaciarHistorial);
});