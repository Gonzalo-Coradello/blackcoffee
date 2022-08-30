// Simulador de carrito de compras

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Aumentar o disminuir la cantidad de cada producto, o eliminarlo del carrito. 
// ○ Colocar por separado cuando se selecciona el mismo café pero con distinta molienda. 
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total. El envío no tiene costo si la compra supera los $4000.
// ○ Validar que hayan seleccionado una provincia para poder realizar la compra

// NOTA
// Este archivo .js está linkeado a ambos HTML, es código que se utilizará para ambas páginas.
// Contiene las variables y las funcionalidades que son más generales o principalmente estéticas.s
// La funcionalidad de e-commerce está en products.js

// =========================================================================== //


// Arrays y variables
let productos = [];
let carrito = [];
let cafe = [];
let patisserie = [];

const cart = document.querySelector(".cart-container");
const cartOverlay = document.querySelector(".cart-overlay");
const cartIcon = document.querySelectorAll(".cart-icon");
const navIndex = document.querySelector(".nav-index");
const navProd = document.querySelector(".nav-prod");
const hero = document.querySelector(".hero");
const productsHero = document.querySelector(".products-hero");
const padreCafe = document.querySelector(".products-coffee");
const padrePatisserie = document.querySelector(".products-patisserie");
const padreCarrito = document.querySelector(".cart__products");
const carritoBody = document.querySelector(".cart__body");
const contadorCarrito = document.querySelector(".cart-number");
const subtotal = document.querySelector(".subtotal");
const envio = document.querySelector(".envio");
const total = document.querySelector(".precioTotal");
const cartelEnvio = document.getElementById("cartelEnvio");
const btnComprar = document.querySelector(".cart__main-button");
const sinProductos = document.createElement("div");
const provinciaSeleccionada = document.getElementById("provinciaInput");
const botonCalcularEnvio = document.getElementById("botonCalcularEnvio");

// Zonas para calcular el precio del envío (de más cercana a más lejana)
const provincias1 = ["baires", "caba"];
const provincias2 = ["cordoba", "santaFe", "entreRios", "laPampa", "rioNegro"];
const provincias3 = ["sanLuis","mendoza","neuquen","laRioja","sanJuan","catamarca","corrientes","misiones","chaco"];
const provincias4 = ["santiagoDelEstero","tucuman","salta","jujuy","formosa","chubut","santaCruz"];
const provincias5 = ["tierraDelFuego"];


// Abrir y cerrar el carrito al apretar el icono
for (el of cartIcon) {
  el.addEventListener("click", abrirCerrarCarrito);
}

function abrirCerrarCarrito() {
  if (cart.classList.contains("cart-show")) {
    cart.classList.remove("cart-show");
    cartOverlay.classList.remove("overlay-visible");
  } else {
    cart.classList.add("cart-show");
    cartOverlay.classList.add("overlay-visible");
  }
}

// Navbar
// Esto sirve para que la navbar aparezca y desaparezca según se scrollea.
// El siguiente código utiliza IntersectionObserver, algo que no vimos en el curso. Aprendí como usarlo con un tutorial
// de Youtube y lo adapté a mi proyecto. Creé dos instancias distintas, una para cada HTML. Hice algunas validaciones
// para que no interfieran entre sí, porque de lo contrario dan errores por consola. 

const heroOptions = {
  rootMargin: "-150px 0px 0px 0px",
};

const heroObserver = new IntersectionObserver(function (entries, heroObserver) {
  entries.forEach((entry) => {
    if ((!entry.isIntersecting) && (navIndex != null)) {
        navIndex.classList.add("nav-scrolled");
    } else if (navIndex != null) {
        navIndex.classList.remove("nav-scrolled");
      }
  });
}, heroOptions);

const prodHeroObserver = new IntersectionObserver(function (entries, heroObserver) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
          navProd.classList.add("nav-scrolled");
      } else {
          navProd.classList.remove("nav-scrolled");
        }
    });
  }, heroOptions);

if(navIndex != null) {
    heroObserver.observe(hero)
}

if(navProd != null) {
    prodHeroObserver.observe(productsHero)
}

// Mostrar información para hacer la compra al hacer hover sobre los productos.
// Se crean event listener para cada producto en el DOM. Se añaden y quitan clases de CSS para mostrar/ocultar la información.
function mostrarInfoHover() {
    const productoDOM = document.querySelectorAll(".product");
    const onhover = document.querySelectorAll(".product__onhover");
    for (let i = 0; i < productoDOM.length; i++) {
      productoDOM[i].addEventListener("mouseover", () => {
        onhover[i].classList.add("product__show");
      });
      productoDOM[i].addEventListener("mouseout", () => {
        onhover[i].classList.remove("product__show");
      });
    }
  }