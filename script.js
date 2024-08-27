
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

const tasas = (event) => {
    event.preventDefault(); 
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
            Swal.fire({
                title: "MONEDA INVALIDA",
                text: "ELIJE OTRA MONEDA",
                icon: "eror"
              });
        }
    }})
}


document.addEventListener('click', addButtonEventListener);
document.getElementById("button").addEventListener('click', tasas);

//LOCAL STORAGE

function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('conversion')) || [];
    const historialList = document.getElementById("historial");

    historial.forEach(conv => {
        const listItem = document.createElement('li');
        listItem.textContent = `${conv.pesos} ARS a ${conv.moneda} = ${conv.resultado}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarConversion(conv);

        listItem.appendChild(deleteButton);
        historialList.appendChild(listItem);
    });
}

function eliminarConversion(conversionEliminada) {
    const historial = JSON.parse(localStorage.getItem('conversion')) || [];
    const nuevoHistorial = historial.filter(conv => 
        conv.pesos !== conversionEliminada.pesos || 
        conv.moneda !== conversionEliminada.moneda || 
        conv.resultado !== conversionEliminada.resultado
    );
    localStorage.setItem('conversion', JSON.stringify(nuevoHistorial));
    cargarHistorial(); // Refresh the list after deletion
}



function vaciarHistorial() {
    localStorage.removeItem('conversion');
    document.getElementById("historial").innerHTML = '';
    
}

document.getElementById('clear-history').addEventListener('click', vaciarHistorial);


document.addEventListener( () => {
    boton();
    cargarHistorial();
    document.getElementById("button").addEventListener('click', tasas);
});