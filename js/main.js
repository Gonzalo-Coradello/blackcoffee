// Simulador de carrito de compras

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Hacer un descuento del 15% si se introduce el cupón correcto.
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total.

// =========================================================================== //

// Clase constructora
class Producto {
    constructor (nombre, tipo, origen, info, precio) {
        this.nombre = nombre
        this.tipo = tipo;
        this.origen = origen;
        this.info = info;
        this.precio = precio;
    }

    sumar () {
        return precioTotal += this.precio;
    }

    agregarAlCarrito () {
        carrito.push([this.nombre, this.precio]); 
        this.sumar()
    }

    mostrarInfo () {
        return info += this.nombre + "\n" + this.info + "\n $" + this.precio + "\n\n"
    }
}

// Funciones
function mostrarMenu() {
    entrada = prompt ("Elija su producto \n 1 - Café de Brasil ($1600) \n 2 - Café de Colombia ($2050) \n 3 - Café de Perú ($2200) \n 4 - Café de Etiopía ($2520) \n 5 - Mostrar información \n 6 - Finalizar la compra");
}

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
    let provincia = prompt("Ingrese su provincia");
    provincia = provincia.toLowerCase();

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

// Productos (objects) y variables

const cafeBrasil = new Producto ("Café Brasil", "café", "Brasil", "Café intenso con notas de cacao amargo y frutos secos como avellana. Acidez media con retrogusto persistente y gran cuerpo.", 1600);
const cafeColombia = new Producto ("Café Colombia", "café", "Colombia", "Café de intensidad media con notas frutales, acidez media alta cítrica y brillante, y cuerpo medio.", 2050)
const cafePeru = new Producto ("Café Perú", "café", "Perú", "Café de intensidad media con notas a cacao, ciruela y leves notas cítricas. Acidez media alta.", 2200)
const cafeEtiopia = new Producto ("Café Etiopía", "café", "Etiopía", "Café de baja intensidad, acidez y cuerpo medio. Aromas florales con notas de pasas de uva, frutos secos, mermelada y jazmín.", 2520)

let info = "";
cafeBrasil.mostrarInfo();
cafeColombia.mostrarInfo();
cafePeru.mostrarInfo();
cafeEtiopia.mostrarInfo();

let precioTotal = 0;
let entrada;

let envioBase = 400;
let precioEnvio = 0;

// Arrays

const productos = [];
productos.push(cafeBrasil);
productos.push(cafeColombia);
productos.push(cafePeru);
productos.push(cafeEtiopia);

const carrito = [];



// Menú principal (agregar productos al carrito o ver información)
do {mostrarMenu();
    switch (entrada) {
        case "1":
            cafeBrasil.agregarAlCarrito();
            break;
        case "2":
            cafeColombia.agregarAlCarrito();
            break;
        case "3":
            cafePeru.agregarAlCarrito();
            break;
        case "4":
            cafeEtiopia.agregarAlCarrito();
            break;
        case "5":
            alert(info);
            break;
        case "6":
            if (precioTotal != 0) {
                let confirmarCompra = prompt(`${carrito.join("\n")}\n\nPrecio total: $${precioTotal}\n\n1 - Confirmar compra \n2 - Tengo un cupón de descuento`);   
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