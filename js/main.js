// Simulador de carrito de compras

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Aumentar o disminuir la cantidad de cada producto, o eliminarlo del carrito. 
// ○ Colocar por separado cuando se selecciona el mismo café pero con distinta molienda. 
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total. El envío no tiene costo si la compra supera los $4000.
// ○ Validar que hayan seleccionado una provincia para poder realizar la compra

// NOTA
// Este archivo .js está linkeado a ambos HTML, es código que se utilizará para ambas páginas.
// Contiene las variables y las funcionalidades que son más generales o principalmente estéticas.
// La funcionalidad de e-commerce está en products.js y aplica a products.html

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
const modal = document.querySelector(".modal-body");
const modalOverlay = document.querySelector(".modal-overlay");

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


// Abrir modal
// No se puede hacer hover en dispositivos con pantalla táctil, por lo que añado la opción de abrir un modal al tocar las cards
// La función toma como parámetro el ID de la card y del producto, y renderiza la información dentro del modal.
// Se añade una clase para que se abra el modal, pero esta clase sólo está disponible en dispositivos con pantalla táctil. 
// Declaro las constantes molienda y unidades porque las tengo que añadir de forma condicional, según el tipo de producto. 
function abrirModal (cardId, prodId) {
  const productoCard = document.getElementById(cardId);
  productoCard.addEventListener("click", () => {
    const producto = productos.find(prod => prod.id === prodId);
    
    const molienda = `
    <div class="row molienda">
      <label for="molienda">Molienda</label>
      <select name="molienda" id="molienda${producto.id}">
          <option value="(grano)">Grano</option>
          <option value="(moka)">Moka</option>
          <option value="(chemex)">Chemex</option>
          <option value="(prensa)">Prensa francesa</option>
          <option value="(espresso)">Espresso</option>
          <option value="(V60)">V60</option>
          <option value="(cápsulas)">Cápsulas recargables</option>
          <option value="(aeropress)">Aeropress</option>
          <option value="(filtro)">Filtro</option>
      </select>
    </div>`;

    const unidades = `<p class="product__unidades">x ${producto.unidades} unidades</p>`;

    modal.innerHTML = `
    <div class="product modal-product">
      <div class="modal-close">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <img src="${producto.foto}" alt="${producto.nombre}" class="product__img">
      <h4 class="product__title">${producto.nombre}</h4>
      ${producto.tipo === "patisserie" ? unidades : ""}
      <p class="product__info">${producto.info}</p>
        <form>
            ${producto.tipo === "café" ? molienda : ""}
            <div class="row unidades">
                <label for="unidades">Unidades</label>
                <select name="unidades" id="unidadesCard${producto.id}">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
            </div>
            <p class="product__precio">$${producto.precio}</p>
            <button type="submit" id="btn${producto.id}" class="product__btn btn">Agregar al carrito</button>
        </form>
      </div>
    `
    abrirCerrarModal();
    document.querySelector(".modal-close").addEventListener("click", abrirCerrarModal);

    const modalBtn = document.getElementById(`btn${producto.id}`);
    const modalUnidades = document.getElementById(`unidadesCard${producto.id}`);
    const modalMolienda = document.getElementById(`molienda${producto.id}`);

    modalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Toastify({
        text: "¡Producto añadido al carrito!",
        duration: 2000,
        gravity: "top",
        position: "right",
        offset: {
          y: "5rem",
        },
        stopOnFocus: false,
        className: "toast-agregar",
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          "box-shadow": "none",
        },
        onClick: () => {
          abrirCerrarCarrito();
        },
      }).showToast();

      if(producto.tipo === "café"){
        let productoCard = {
          ...producto, //spread operator
          id: producto.id + modalMolienda.value,
          cantidad: parseInt(modalUnidades.value),
          molienda: modalMolienda.value,
        };

        productos.push(productoCard);
        agregarAlCarrito(productoCard.id, productoCard.cantidad);
      } else {
        agregarAlCarrito(producto.id, parseInt(modalUnidades.value));
      }
      abrirCerrarModal();
    });
  });
}

const abrirCerrarModal = () => {
  if(modal.classList.contains("modal-open")) {
    modal.classList.remove("modal-open");
    modalOverlay.classList.remove("modal-overlay-visible");
  } else {
    modal.classList.add("modal-open");
    modalOverlay.classList.add("modal-overlay-visible");
  }
}