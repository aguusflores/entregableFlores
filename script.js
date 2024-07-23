let moneda = prompt("¿A qué moneda querés convertir? (dolar, euros, reales)");
let pesos = parseInt(prompt("Introduce la cantidad de pesos argentinos"));

function convertir(moneda, pesos) {
    let dolar = 1500;
    let euros = 1000;
    let reales = 170;
    let resultado = moneda * pesos

    return resultado
}
convertir(moneda, pesos)


if (moneda === "dolar" || moneda === "euros" || moneda === "reales") {

    let resultado;

    if (moneda === "dolar") {
        alert("La cantidad de" + pesos + "pesos argentinos es igual a" + resultado + "dólares")
    }

} else if (moneda === "euros") {

    alert("La cantidad de" + pesos + "pesos argentinos es igual a" + resultado + "euros")

} else if (moneda === "reales") {

    alert("La cantidad de" + pesos + "pesos argentinos es igual a" + resultado + "reales")

}

else
 alert ("Moneda no válida. Por favor, elige entre dólares, euros o reales.");

let confirmacion = prompt("Quieres realizar otra operacion si/no")
if (confirmacion == no){
    continuar = false
    alert("Gracias")
}



