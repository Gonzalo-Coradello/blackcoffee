// Simulador de carrito de compras

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Hacer un descuento del 15% si se introduce el cupón correcto.
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total. El envío no tiene costo si la compra supera los $5000.

// =========================================================================== //

// Arrays
const productos = [];
const carrito = [];

// Clase constructora + métodos de objetos
// En el método agregarAlCarrito se utilizan dos funciones de orden superior, reduce y map
class Producto {
    constructor (nombre, tipo, info, precio) {
        this.nombre = nombre
        this.tipo = tipo;
        this.info = info;
        this.precio = precio;
    }

    agregarAlCarrito () {
        carrito.push(this); 
        precioTotal = carrito.reduce((acc, el) => acc + el.precio, 0);
        listaProductos = carrito.map ((el) => `${el.nombre}: $${el.precio}`);
        listaProductos.push(`Precio total: $${precioTotal}`);
    }

    mostrarInfo () {
        return info += this.nombre + "\n" + this.info + "\n $" + this.precio + "\n\n"
    }
}

// Productos (objects) y variables

productos.push(new Producto ("Café Brasil", "café", "Café intenso con notas de cacao amargo y frutos secos como avellana. Acidez media con retrogusto persistente y gran cuerpo.", 1600));
productos.push(new Producto ("Café Colombia", "café", "Café de intensidad media con notas frutales, acidez media alta cítrica y brillante, y cuerpo medio.", 2050));
productos.push(new Producto ("Café Perú", "café", "Café de intensidad media con notas a cacao, ciruela y leves notas cítricas. Acidez media alta.", 2200));
productos.push(new Producto ("Café Etiopía", "café", "Café de baja intensidad, acidez y cuerpo medio. Aromas florales con notas de pasas de uva, frutos secos, mermelada y jazmín.", 2520));

let info = "";
productos[0].mostrarInfo();
productos[1].mostrarInfo();
productos[2].mostrarInfo();
productos[3].mostrarInfo();

let precioTotal = 0;
let entrada;
let listaProductos;

let envioBase = 400;
let precioEnvio = 0;

// Funciones
let mostrarMenu = () => entrada = prompt ("Elija su producto \n 1 - Café de Brasil ($1600) \n 2 - Café de Colombia ($2050) \n 3 - Café de Perú ($2200) \n 4 - Café de Etiopía ($2520) \n 5 - Mostrar información \n 6 - Finalizar la compra");

function cuponDescuento() {
    let ingresarCupon = prompt("Ingrese el cupón de descuento\n(DESC15)")
    if (ingresarCupon == "DESC15"){
        precioTotal -= (precioTotal * 0.15)
        alert("Precio con descuento: $" + precioTotal);
    }
    else {
        alert("Cupón no válido");
    }
}

function calcularPrecioEnvio (){
    let provincia = prompt("Ingrese su provincia").toLowerCase();

    switch (provincia) {
        case "buenos aires":
        case "caba":
        case "bs as":
            precioEnvio = envioBase;
            break;
        case "cordoba":
        case "santa fe":
        case "entre rios":
        case "la pampa":
        case "rio negro":
            precioEnvio = envioBase + 150;
            break;
        case "san luis":
        case "mendoza":
        case "neuquen":
        case "la rioja":
        case "san juan":
        case "catamarca":
        case "corrientes":
        case "misiones":
        case "chaco":
            precioEnvio = envioBase + 250;
            break;
        case "santiago del estero":
        case "tucuman":
        case "salta":
        case "jujuy":
        case "formosa":
        case "chubut":
        case "santa cruz":
            precioEnvio = envioBase + 320;
            break;
        case "tierra del fuego":
            precioEnvio = envioBase + 400;
            break;
        default:
            alert("Ingrese una provincia válida");
            calcularPrecioEnvio();
            break;
    }

    if (precioTotal > 5000) {
        alert("Tu compra superó los $5000. Tenés envío gratis.\n¡Gracias por su compra!\n\nTotal a pagar: $" + precioTotal)
    }
    else {
        alert(`Precio de los productos: $${precioTotal}\nCosto del envío: $${precioEnvio}\nTotal a pagar: $${(precioTotal+=precioEnvio)}\n\n¡Gracias por su compra!`)
    }
}


// Menú principal (agregar productos al carrito o ver información)
do {mostrarMenu();
    switch (entrada) {
        case "1":
            productos[0].agregarAlCarrito();
            break;
        case "2":
            productos[1].agregarAlCarrito();
            break;
        case "3":
            productos[2].agregarAlCarrito();
            break;
        case "4":
            productos[3].agregarAlCarrito();
            break;
        case "5":
            alert(info);
            break;
        case "6":
            if (precioTotal != 0) {
                let confirmarCompra = prompt(listaProductos.join("\n") + "\n\n1 - Confirmar compra \n2 - Tengo un cupón de descuento");
                
                if (confirmarCompra == "1"){
                calcularPrecioEnvio();
                }
                else if (confirmarCompra == "2"){
                    cuponDescuento();
                    calcularPrecioEnvio();
                }
            }
            break;

        default:
            alert("Ingrese un número válido");
            break;
    }
}
while (entrada != 6);