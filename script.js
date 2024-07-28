const tasas = {
    dolar: 1500,
    euros: 1000,
    reales: 170
};

function convertir(moneda, pesos) {
    let tasaCambio = tasas[moneda];
    if (tasaCambio) {
        return pesos * tasaCambio;
    } else {
        return "Moneda invalida, seleccione otra";
    }
}

for (let i = 0; i < 3; i++) { 
    let moneda = prompt("¿A qué moneda querés convertir? (dolar, euros, reales)");
    let pesos = parseInt(prompt("Introduce la cantidad de pesos argentinos"));
    let resultado = convertir(moneda, pesos);

    if (moneda === "dolar" || moneda === "euros" || moneda === "reales") {
        alert("La cantidad de " + pesos + " pesos argentinos es igual a " + resultado + " " + moneda + " en el mercado");
    } else {
        alert("Moneda invalida, seleccione otra");
    }
}