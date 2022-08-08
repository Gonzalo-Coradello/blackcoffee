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
    constructor (nombre, tipo, cantidad, info, precio, foto) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.info = info;
        this.precio = precio;
        this.foto = foto;
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

productos.push(new Producto ("Brasil", "Café", 250, "Café intenso con notas de cacao amargo y frutos secos como avellana. Acidez media con retrogusto persistente y gran cuerpo.", 1600, "../img/productos/brasil-moka.png"));
productos.push(new Producto ("Café Colombia", "Café", 250, "Café de intensidad media con notas frutales, acidez media alta cítrica y brillante, y cuerpo medio.", 2050, "../img/productos/colombia-v60.png"));
productos.push(new Producto ("Perú", "Café", 250, "Café de intensidad media con notas a cacao, ciruela y leves notas cítricas. Acidez media alta.", 2200, "../img/productos/peru-filtro.png"));
productos.push(new Producto ("Etiopía", "Café", 250, "Café de baja intensidad, acidez y cuerpo medio. Aromas florales con notas de pasas de uva, frutos secos, mermelada y jazmín.", 2520, "../img/productos/etiopia-chemex.png"));
productos.push(new Producto ("Blend Especial", "Café", 250, "Café de intensidad media con notas de caña de azúcar, caramelo y avellanas. Acidez media y gran cuerpo", 3200, "../img/productos/blend-grano.png"));
productos.push(new Producto ("Kenia", "Café", 250, "Café de acidez media baja y cuerpo sedoso, con aromas florales y notas de vainilla, fresas, té negro y jazmín", 2830, "../img/productos/kenia-v60.png"));

productos.push(new Producto ("Cookies", "Patisserie", 5, "Tradicionales cookies de vainilla con irresistibles chips de chocolate.", 610, "../img/productos/cookie.png"));
productos.push(new Producto ("Mini cookies de limón", "Patisserie", 35, "Galletitas dulces de limón destinadas a generar una experiencia exquisita con el café.", 440, "../img/productos/galletitas-limon.png"));
productos.push(new Producto ("Waffle belga", "Patisserie", 2, "Waffles estilo belga. Calentalos 2 minutos en tostadora y disfrutalos con queso crema, miel, arándanos o como más te guste.", 440, "../img/productos/waffle.png"));
productos.push(new Producto ("Stroopwafel", "Patisserie", 5, "Barquillo dulce con relleno de caramelo y manteca. Disfrutalos en modo holandés. Colocalos arriba de la taza y esperá 3 minutos para que el vapor del café saborice el barquillo y derrita su relleno de caramelo. Plaisir!", 770, "../img/productos/stroopwafel.png"));
productos.push(new Producto ("Cuadraditos de limón", "Patisserie", 6, "Galletitas dulces rellenas de una exquisita crema de limón.", 610, "../img/productos/cuadraditos.png"));
productos.push(new Producto ("Cantuccini de almendras", "Patisserie", 6, "Maridá con un latte esta exquisita tradición italiana repleta de almendras.", 700, "../img/productos/cantuccini.png"));



let info = "";
for(prod in productos) {
    productos[prod].mostrarInfo()
}

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


// =========================================================================== //

// DOM //

const cafe = productos.filter(el => el.tipo === "Café");
const patisserie = productos.filter(el => el.tipo === "Patisserie");
const padreCafe = document.querySelector(".products-coffee");
const padrePatisserie = document.querySelector(".products-patisserie")

for(prod of cafe){
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                            <h4 class="product__title">${prod.nombre}</h4>
                            <p class="product__body">${prod.info}</p>
                            <div class="product__molienda row">
                                <h5 class="molienda">Molienda</h5>
                                <input class="product__placeholder" type="text" placeholder="Elige una opción">
                            </div>
                            <div class="product__unidades row">
                                <h5 class="unidades">Unidades</h5>
                                <input class="product__placeholder" type="text" placeholder="Elige una opción">
                            </div>
                            <p class="product__precio">$${prod.precio}</p>
                            <a href="#" class="product__cart btn">Agregar al carrito</a>`
    padreCafe.append(productoDOM);
}

for(prod of patisserie){
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                            <h4 class="product__title">${prod.nombre}</h4>
                            <p class="product__subtitle">x ${prod.cantidad} unidades</p>
                            <p class="product__body">${prod.info}</p>
                            <div class="product__unidades">
                                <h5 class="unidades">Unidades</h5>
                                <input class="product__placeholder" type="text" placeholder="Elige una opción">
                            </div>
                            <p class="product__precio">$${prod.precio}</p>
                            <a href="#" class="product__cart">Agregar al carrito</a>`
    padrePatisserie.append(productoDOM);
}


// Eventos

const cart = document.querySelector(".cart-container");
const cartOverlay = document.querySelector(".cart-overlay");
const cartIcon = document.querySelector("#cart-icon");

cartIcon.onclick = () => {
    if(cart.classList.contains("cart-show")) {
        cart.classList.remove("cart-show");
        cartOverlay.classList.remove("overlay-visible");
    }
    else {
        cart.classList.add("cart-show");
        cartOverlay.classList.add("overlay-visible");
    }
}