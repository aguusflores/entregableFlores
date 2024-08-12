
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
    let cargaMoneda = document.getElementById("moneda");
    let cargaPesos = parseInt(document.getElementById("pesos"));
    let convertir = document.getElementById("button"); 
}
   

function boton   () {
    addButton = querySelector("button");
    addButton.forEach(button => {

    button.onclick = (e) => {
        const cargaMoneda = e.currentTarget.id

        let validar = monedas.some(divisa => divisa.moneda === cargaMoneda);
            if (validar) {
                console.log("La moneda ingresada es válida");
                let divisaSeleccionada = monedas.find(divisa => divisa.moneda === cargaMoneda);

                let resultado = divisaSeleccionada.enPesos(cargaPesos);
                conversion.push({ moneda: cargaMoneda, pesos: cargaPesos, resultado });
                
                let print = document.getElementById("resultado");
                print.innerText = `El total es: $${resultado}`;
            } else { 
                document.getElementById("resultado").innerText  = "La moneda ingresada no es válida";
            }
            localStorage.setItem("conversion", JSON.stringify(conversion)); }
        })

        

    }


    document.addEventListener('DOMContentLoaded', addButtonEventListener);
