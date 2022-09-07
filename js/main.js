// Simulador de e-commerce

// Funcionalidades:
// ○ Añadir productos al carrito, sumar sus valores y devolver el total.
// ○ Aumentar o disminuir la cantidad de cada producto en el carrito, o eliminarlo. 
// ○ Colocar por separado cuando se selecciona la misma variedad de café pero con distinta molienda. 
// ○ Calcular el precio del envío según la distancia y sumarlo al valor total. El envío no tiene costo si la compra supera los $4000.
// ○ Validar que hayan seleccionado una provincia para poder realizar la compra.
// ○ Guardar la información del carrito en local storage para que no se pierda al cerrar la página. 
// ○ Validar que todos los datos del formulario sean correctos para finalizar la compra. 
// ○ Vaciar el carrito una vez finalizada la compra.

// NOTA
// Este archivo .js está linkeado a todos los HTML.
// Contiene todas las variables.
// Contiene la validación y la lógica del formulario (form.html).
// También contiene funcionalidades que son más generales o principalmente estéticas, que aplican al index y a products.html. 
// La funcionalidad principal del e-commerce está en products.js y aplica a products.html.

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
const formProducts = document.querySelector(".form__products");
const formPrecio = document.getElementById("formPrecio");
const formEnvio = document.getElementById("formEnvio");
const formTotal = document.getElementById("formTotal");
const inputNombre = document.getElementById("inputNombre");
const inputDni = document.getElementById("inputDni");
const inputEmail = document.getElementById("inputEmail");
const inputTel = document.getElementById("inputTel");
const inputCalle = document.getElementById("inputCalle");
const inputNumero = document.getElementById("inputNumero");
const inputCPostal = document.getElementById("inputCPostal");
const inputTarjeta = document.getElementById("inputTarjeta");
const formSubmit = document.querySelector(".form__submit");
const contenedorNombre = document.querySelector(".form__field-nombre");
const contenedorDni = document.querySelector(".form__field-dni");
const contenedorEmail = document.querySelector(".form__field-email");
const contenedorTel = document.querySelector(".form__field-tel");
const contenedorCalle = document.querySelector(".form__field-calle");
const contenedorNumero = document.querySelector(".form__field-numero");
const contenedorCPostal = document.querySelector(".form__field-cpostal");
const contenedorTarjeta = document.querySelector(".form__field-tarjeta");
let envioActual;
let compraRealizada = false;

// Zonas para calcular el precio del envío (de más cercana a más lejana)
const provincias1 = ["baires", "caba"];
const provincias2 = ["cordoba", "santaFe", "entreRios", "laPampa", "rioNegro"];
const provincias3 = ["sanLuis","mendoza","neuquen","laRioja","sanJuan","catamarca","corrientes","misiones","chaco"];
const provincias4 = ["santiagoDelEstero","tucuman","salta","jujuy","formosa","chubut","santaCruz"];
const provincias5 = ["tierraDelFuego"];


// Formulario / Detalles de tu compra (form.html)
// Función que trae los productos guardados en el carrito desde el local storage y los renderiza.
const mostrarDetallesCompra = () => {
  carritoActual = JSON.parse(localStorage.getItem("carrito"));
  subtotalActual = localStorage.getItem("subtotalStorage");
  envioActual = localStorage.getItem("envio");
  carritoActual.forEach(prod => {
    formProducts.innerHTML += `
                    <div class="form__product form-row">
                        <h4 class="form__product-title">${prod.nombre} ${prod.tipo === "café" ? prod.molienda : ""} x${prod.cantidad}</h4>
                        <h4 class="form__product-price">$${prod.precioTotal}</h4>
                    </div>`
  })

  formPrecio.innerText = subtotalActual;
  formEnvio.innerText = envioActual;
  formTotal.innerText = parseInt(subtotalActual) + parseInt(envioActual);
}

// Llamo a la función únicamente si existe formProducts para evitar errores. Esto hace que sólo se ejecute en form.html.
if (formProducts != null) {
  mostrarDetallesCompra()
}


// Validar formulario y finalizar compra

// Utilizo regex para comprobar que el formato sea correcto. Los patrones no son propios porque aún no aprendí expresiones regulares.
// Comprueban que sólo se utilicen letras o números respectivamente.
const lettersPattern = /^[A-Z À-Ú]+$/i;
const numbersPattern = /^[0-9]+$/;

// Función que compara lo que enviemos como argumento con la expresión regular para validar si tiene formato de email. 
const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  

// Estas variables me sirven para validar que todos los campos estén correctos antes de realizar la compra.  
let nombreValido = false;
let dniValido = false;
let emailValido = false;
let telValido = false;
let calleValida = false;
let numeroValido = false;
let cPostalValido = false;
let tarjetaValida = false;


// Validación de formulario
// Por cada campo compruebo en primer lugar que no esté vacío y luego que el formato sea el esperado.
// En base a esto actualizo la variable de validez y agrego o quito clases.
// Estas clases tienen pseudoelementos ::after de CSS que añaden un mensaje de error debajo de los inputs.
const validarFormulario = () => {

  // Nombre
  if(inputNombre.value == "") {
    nombreValido = false;
    contenedorNombre.classList.remove("errorNombre");
    contenedorNombre.classList.add("errorVacio");
  }
  else if(inputNombre.value.length < 3 || !lettersPattern.test(inputNombre.value)) {
    nombreValido = false;
    contenedorNombre.classList.remove("errorVacio");
    contenedorNombre.classList.add("errorNombre");
  }
  else {
    nombreValido = true;
    contenedorNombre.classList.remove("errorVacio");
    contenedorNombre.classList.remove("errorNombre");
  }

  // DNI
  if(inputDni.value == "") {
    dniValido = false;
    contenedorDni.classList.remove("errorDni");
    contenedorDni.classList.add("errorVacio");
  }
  else if(inputDni.value.length != 8 || !numbersPattern.test(inputDni.value)) {
    dniValido = false;
    contenedorDni.classList.remove("errorVacio");
    contenedorDni.classList.add("errorDni");
  }
  else {
    dniValido = true;
    contenedorDni.classList.remove("errorVacio");
    contenedorDni.classList.remove("errorDni");
  }

  // Email
  if(inputEmail.value == "") {
    emailValido = false;
    contenedorEmail.classList.remove("errorEmail");
    contenedorEmail.classList.add("errorVacio");
  }
  else if(!isEmail(inputEmail.value)) {
    emailValido = false;
    contenedorEmail.classList.remove("errorVacio");
    contenedorEmail.classList.add("errorEmail");
  }
  else {
    emailValido = true;
    contenedorEmail.classList.remove("errorVacio");
    contenedorEmail.classList.remove("errorEmail");
  }

  // Número de teléfono 
  if(inputTel.value == "") {
    telValido = false;
    contenedorTel.classList.remove("errorTel");
    contenedorTel.classList.add("errorVacio");
  }
  else if(inputTel.value.length < 6 || !numbersPattern.test(inputTel.value)) {
    telValido = false;
    contenedorTel.classList.remove("errorVacio");
    contenedorTel.classList.add("errorTel");
  }
  else {
    telValido = true;
    contenedorTel.classList.remove("errorVacio");
    contenedorTel.classList.remove("errorTel");
  }

  // Calle
  if(inputCalle.value == "") {
    calleValida = false;
    contenedorCalle.classList.remove("errorCalle");
    contenedorCalle.classList.add("errorVacio");
  }
  else {
    calleValida = true;
    contenedorCalle.classList.remove("errorVacio");
    contenedorCalle.classList.remove("errorCalle");
  }

  // Número de casa
  if(inputNumero.value == "") {
    numeroValido = false;
    contenedorNumero.classList.remove("errorNumero");
    contenedorNumero.classList.add("errorVacio");
  }
  else if(!numbersPattern.test(inputNumero.value)) {
    numeroValido = false;
    contenedorNumero.classList.remove("errorVacio");
    contenedorNumero.classList.add("errorNumero");
  }
  else {
    numeroValido = true;
    contenedorNumero.classList.remove("errorVacio");
    contenedorNumero.classList.remove("errorNumero");
  }

  // Código postal
  if(inputCPostal.value == "") {
    cPostalValido = false;
    contenedorCPostal.classList.remove("errorCPostal");
    contenedorCPostal.classList.add("errorVacio");
  }
  else if(inputCPostal.value.length != 4 || !numbersPattern.test(inputCPostal.value)) {
    cPostalValido = false;
    contenedorCPostal.classList.remove("errorVacio");
    contenedorCPostal.classList.add("errorCPostal");
  }
  else {
    cPostalValido = true;
    contenedorCPostal.classList.remove("errorVacio");
    contenedorCPostal.classList.remove("errorCPostal");
  }

  // Número de tarjeta
  if(inputTarjeta.value == "") {
    tarjetaValida = false;
    contenedorTarjeta.classList.remove("errorTarjeta");
    contenedorTarjeta.classList.add("errorVacio");
  }
  else if(inputTarjeta.value.length != 16 || !numbersPattern.test(inputTarjeta.value)) {
    tarjetaValida = false;
    contenedorTarjeta.classList.remove("errorVacio");
    contenedorTarjeta.classList.add("errorTarjeta");
  }
  else {
    tarjetaValida = true;
    contenedorTarjeta.classList.remove("errorVacio");
    contenedorTarjeta.classList.remove("errorTarjeta");
  }
}


// Finalizar compra
// Compruebo si existe formSubmit para que sólo se ejecute en form.html
// Se llama a la función validarFormulario y se comprueba que todos los campos estén correctos.
// Si es así, finaliza la compra, se vuelve a la página principal y se vacía el carrito. 

if(formSubmit != null) {
  formSubmit.addEventListener("click", (e) => {
    e.preventDefault;
    validarFormulario();


    if(!nombreValido || !dniValido || !emailValido || !telValido || !calleValida || !numeroValido || !cPostalValido || !tarjetaValida) {
      Swal.fire({
        icon: "error",
        text: "Revisa todos los campos",
        confirmButtonColor: "#171717",
        allowEscapeKey: "true"
      });
    }

    else {
      compraRealizada = true;
      Swal.fire({
        icon: "success",
        title: "¡Que lo disfrutes!",
        text: "Compra realizada exitosamente",
        showConfirmButton: false,
        timer: 2500,
      })

      // Creo un item en el localStorage que se utiliza para vaciar el carrito desde el otro archivo de JavaScript (ver products.js, línea 20)
      setTimeout(() => {
        localStorage.setItem("compraRealizada", compraRealizada);
        window.location.href = "./products.html";
      }, 2500);

      let ultimaCompra = carrito;
      localStorage.setItem(
      "Última compra realizada",
      JSON.stringify(ultimaCompra)
      );
    }     
  })
}


// ↓↓↓ Código principalmente visual (no es importante para la funcionalidad del e-commerce) ↓↓↓

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
// Se añade una clase para que se abra el modal, pero esta clase sólo está disponible en dispositivos con pantalla táctil o menores a 600px (CSS). 
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

    // Agregar al carrito desde el modal
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
        }
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