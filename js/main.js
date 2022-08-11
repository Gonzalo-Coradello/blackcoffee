// Simulador de carrito de compras

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Hacer un descuento del 15% si se introduce el cupón correcto.
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total. El envío no tiene costo si la compra supera los $5000.


// NOTA
// Este archivo .js está linkeado a ambos HTML, es código que se utilizará para ambas páginas. 
// La funcionalidad de e-commerce está en products.js

// =========================================================================== //


// Eventos

// Abrir y cerrar el carrito al apretar el icono

const cart = document.querySelectorAll(".cart-container");
const cartOverlay = document.querySelectorAll(".cart-overlay");
const cartIcon = document.querySelectorAll(".cart-icon");

for(icon of cartIcon){
    icon.addEventListener("click", abrirCerrarCarrito);
}

function abrirCerrarCarrito(){
    for(el of cart) {
        if(el.classList.contains("cart-show")) {
        el.classList.remove("cart-show");
            for(it of cartOverlay) {
                it.classList.remove("overlay-visible");
            }
        }
        else {
            el.classList.add("cart-show");
            for(it of cartOverlay) {
                it.classList.add("overlay-visible");
            }
        }
    }
}


// Navbar

const nav = document.querySelectorAll(".nav");
const hero = document.querySelector(".hero");
const productsHero = document.querySelector(".products-hero");

const heroOptions = {
    rootMargin: "-150px 0px 0px 0px"
}

const heroObserver = new IntersectionObserver(function(entries, heroObserver) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            for(el of nav) {
                el.classList.add("nav-scrolled");
            }
        }
        else {
            for(el of nav) {
                el.classList.remove("nav-scrolled");
            }
        }
    })}, heroOptions);

heroObserver.observe(hero);


// function calcularPrecioEnvio (){
//     let provincia = prompt("Ingrese su provincia").toLowerCase();

//     switch (provincia) {
//         case "buenos aires":
//         case "caba":
//         case "bs as":
//             precioEnvio = envioBase;
//             break;
//         case "cordoba":
//         case "santa fe":
//         case "entre rios":
//         case "la pampa":
//         case "rio negro":
//             precioEnvio = envioBase + 150;
//             break;
//         case "san luis":
//         case "mendoza":
//         case "neuquen":
//         case "la rioja":
//         case "san juan":
//         case "catamarca":
//         case "corrientes":
//         case "misiones":
//         case "chaco":
//             precioEnvio = envioBase + 250;
//             break;
//         case "santiago del estero":
//         case "tucuman":
//         case "salta":
//         case "jujuy":
//         case "formosa":
//         case "chubut":
//         case "santa cruz":
//             precioEnvio = envioBase + 320;
//             break;
//         case "tierra del fuego":
//             precioEnvio = envioBase + 400;
//             break;
//         default:
//             alert("Ingrese una provincia válida");
//             calcularPrecioEnvio();
//             break;
//     }