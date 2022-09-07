// Este .js está linkeado a products.html y contiene las funcionalidades principales del e-commerce.

// Fetch para solicitar los datos de products.json.
async function obtenerProductos() {
  const URLJSON = "../js/products.json";
  const resp = await fetch(URLJSON);
  const data = await resp.json();
  productos = data;
  cafe = productos.filter((prod) => prod.tipo === "café"); // Se filtra por tipo de producto.
  patisserie = productos.filter((prod) => prod.tipo === "patisserie");
  renderizarProductos();
  mostrarInfoHover();
}

obtenerProductos();

// Storage (retoma la última información guardada en el carrito)
// Cuando realizamos una compra, se genera un item "compraRealizada" en el localStorage. Esto es para reiniciar el carrito luego de cada compra.

document.addEventListener("DOMContentLoaded", () => {

  if(localStorage.getItem("compraRealizada")) {
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem("compraRealizada") // Se remueve el item para que el localStorage siga funcionando de manera normal.
  }

  else if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
  localStorage.getItem("envioActual");
});


// Funciones
// Inyectar cards de productos dinámicamente (filtrados por categoría, café y patisserie)
function renderizarProductos() {
  cafe.forEach((prod) => {
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.id = `product${prod.id}`;
    productoDOM.dataset.aos = "zoom-in";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                                <h4 class="product__title">${prod.nombre}</h4>
                                <p class="product__body">${prod.info}</p>
                                <div class="product__onhover">
                                    <form>
                                        <div class="row molienda">
                                            <label for="molienda">Molienda</label>
                                            <select name="molienda" id="molienda${prod.id}">
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
                                        </div>
                                        <div class="row unidades">
                                            <label for="unidades">Unidades</label>
                                            <select name="unidades" id="unidadesCard${prod.id}">
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
                                        <p class="product__precio">$${prod.precio}</p>
                                        <button type="submit" id="btn${prod.id}" class="product__btn btn">Agregar al carrito</button>
                                    </form>
                                </div>`;
    padreCafe.append(productoDOM);

    const boton = document.getElementById(`btn${prod.id}`); // Cada producto tiene su propio botón con distinto ID
    const unidadesCard = document.getElementById(`unidadesCard${prod.id}`);
    const moliendaCard = document.getElementById(`molienda${prod.id}`);

    // Evento que llama la función para agregar el producto seleccionado al carrito.
    // Envía por parámetro el ID del producto seleccionado y la cantidad seleccionada en el input.
    boton.addEventListener("click", (e) => {
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

      // Se crea un producto nuevo tomando la información seleccionada en los input —cantidad y molienda— y se concatena la molienda al ID
      // para que se diferencien entre sí como productos diferentes (id: 1(grano), id: 1(filtro), etc.).
      // Se agrega el producto con la molienda seleccionada al array de productos y se envía como parámetro a la función agregarAlCarrito.

      let productoCard = {
        ...prod, //spread operator
        id: prod.id + moliendaCard.value,
        cantidad: parseInt(unidadesCard.value),
        molienda: moliendaCard.value,
      };

      productos.push(productoCard);
      agregarAlCarrito(productoCard.id, productoCard.cantidad);
    });

    abrirModal(productoDOM.id, prod.id); // Esta función es para dispositivos con pantalla táctil (ver main.js)
  });

  patisserie.forEach((prod) => {
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.id = `product${prod.id}`;
    productoDOM.dataset.aos = "zoom-in";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                                <h4 class="product__title">${prod.nombre}</h4>
                                <p class="product__subtitle">x ${prod.unidades} unidades</p>
                                <p class="product__body">${prod.info}</p>
                                <div class="product__onhover">
                                    <form>
                                        <div class="row unidades">
                                          <label for="unidades">Unidades</label>
                                          <select name="unidades" id="unidadesCard${prod.id}">
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
                                        <p class="product__precio">$${prod.precio}</p>
                                        <button type="submit" id="btn${prod.id}" class="product__btn btn">Agregar al carrito</button>
                                    </form>
                                </div>`;
    padrePatisserie.append(productoDOM);

    const boton = document.getElementById(`btn${prod.id}`);
    const unidadesCard = document.getElementById(`unidadesCard${prod.id}`);

    boton.addEventListener("click", (e) => {
      e.preventDefault();
      Toastify({
        text: "¡Producto añadido al carrito!",
        duration: 2000,
        gravity: "top",
        position: "right",
        offset: {y: "5rem"},
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
      agregarAlCarrito(prod.id, parseInt(unidadesCard.value));
    });

    abrirModal(productoDOM.id, prod.id);
  });
}


// Función agregar al carrito.
// Se envía como parámetro el ID del producto y se comprueba si ya se encuentra en el carrito.
// En el caso de que ya esté, la cantidad aumenta y se suma el precio de cada unidad.
// Si es un producto nuevo, simplemente se añade al carrito.
const agregarAlCarrito = (prodId, prodCantidad) => {
  const existe = carrito.some((prod) => prod.id === prodId);
  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad += prodCantidad;
        prod.precioTotal = prod.precio * prod.cantidad;
      }
    });
  } else {
    const prod = productos.find((prod) => prod.id == prodId);
    prod.cantidad = prodCantidad;
    prod.precioTotal = prod.precio * prod.cantidad;
    carrito.push(prod);
  }
  actualizarCarrito();
};


// Eliminar del carrito
// Al apretar sobre el icono de eliminar producto, se busca el índice de dicho producto en el array del carrito y se elimina.
const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
};


// Actualizar carrito
// Esta función renderiza los productos del array carrito.
// También crea el evento que llama a la función de eliminar productos, e incluye las funciones de aumentar o disminuir la cantidad. 
// Finalmente se actualiza el número de productos, se suma el total y se actualiza el storage.

const actualizarCarrito = () => {
  padreCarrito.innerHTML = ""; // Esto es para que dibuje los productos desde cero y no se repitan los que ya estaban cargados

  if (carrito.length === 0) {
    carritoBody.classList.add("hide");
    sinProductos.innerHTML = `
            <h4 class="cart__main-text carrito-vacio">Tu carrito está vacío</h4>
            <button onClick="abrirCerrarCarrito()" class="cart__main-text btn btn--outline carrito-vacio__btn">¡Comenzá a agregar productos!</button>
        `;
    cart.insertBefore(sinProductos, carritoBody);
  } else {
    carritoBody.classList.remove("hide");
    sinProductos.remove();
    carrito.forEach((prod) => {
      const productoEnCarrito = document.createElement("div");
      productoEnCarrito.className = "cart__product";
      productoEnCarrito.innerHTML = `<div class="cart-row">
                                                <h4 class="cart__product-title">${prod.nombre} <span>${prod.molienda || ""}</span></h4>
                                                <div class="cart__product-col">
                                                    <p class="cart__product-price">$${prod.precioTotal}</p>
                                                    <img src="../icons/trash.svg" alt="Eliminar producto" id="eliminar${prod.id}" class="cart__trash">
                                                </div>
                                            </div>
                                            <div class="cantidad-row">
                                                <i id="restarCantidad${prod.id}" class="fa-solid fa-minus icon-cantidad"></i>
                                                <p class="cart__cantidad">${prod.cantidad}</p>
                                                <i id="sumarCantidad${prod.id}" class="fa-solid fa-plus icon-cantidad"></i>
                                            </div>`;
      padreCarrito.append(productoEnCarrito);

      const eliminarProducto = document.getElementById(`eliminar${prod.id}`);
      eliminarProducto.addEventListener("click", function () {
        eliminarDelCarrito(prod.id);
      });

      // Las funciones restarCantidad y sumarCantidad aumentan o disminuyen el número de unidades en uno.
      const restarCantidad = document.getElementById(
        `restarCantidad${prod.id}`
      );
      restarCantidad.addEventListener("click", () => {
        prod.cantidad === 1 ? eliminarDelCarrito(prod.id) : prod.cantidad--; // Operador ternario
        prod.precioTotal = prod.precio * prod.cantidad;
        actualizarCarrito();
      });

      const sumarCantidad = document.getElementById(`sumarCantidad${prod.id}`);
      sumarCantidad.addEventListener("click", () => {
        prod.cantidad++;
        prod.precioTotal = prod.precio * prod.cantidad;
        actualizarCarrito();
      });
    });
  }

  // Actualizar el número que se encuentra junto al ícono del carrito.
  contadorCarrito.innerText = carrito.length;

  // Sumar el total de los productos
  subtotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precioTotal, 0);

  // Sumarle el envío
  total.innerText =
    parseFloat(subtotal.innerHTML) + parseFloat(envio.innerHTML);

  // Guardar la información del carrito en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("subtotalStorage", subtotal.innerHTML);
};


// Calcular envío
// Suma el valor de envío correspondiente según la provincia seleccionada, y valida que se haya seleccionado una.
// Si el precio supera los $4000, el envío no tiene costo. 
botonCalcularEnvio.addEventListener("click", (e) => {
  e.preventDefault;
  calcularEnvio(provinciaSeleccionada.value);
});

let envioCalculado = false;

const calcularEnvio = (provincia) => {
  if (provincia != "") {
    envioCalculado = true;
    provinciaSeleccionada.classList.remove("error");

    provincias1.forEach((prov) => {provincia == prov && (envioActual = 650)}); // Operador lógico AND
    provincias2.forEach((prov) => {provincia == prov && (envioActual = 770)});
    provincias3.forEach((prov) => {provincia == prov && (envioActual = 890)});
    provincias4.forEach((prov) => {provincia == prov && (envioActual = 1010)});
    provincias5.forEach((prov) => {provincia == prov && (envioActual = 1130)});

    if (subtotal.innerHTML >= 4000) {
      envioActual = 0;
      cartelEnvio.innerHTML = "¡Genial! <span>Tenés envío gratis</span>";
    } else {
      cartelEnvio.innerText = "Envío gratis superando los $4000.";
    }

    envio.innerText = envioActual;
    localStorage.setItem("envio", envioActual);

    total.innerText = parseFloat(subtotal.innerHTML) + parseFloat(envio.innerHTML);
  } else {
    envioCalculado = false;
    provinciaSeleccionada.classList.add("error");
  }
};


// Iniciar compra
// Permite hacer la compra sólo si se ha seleccionado una provincia en el input.
// Redirige a la página form.html para rellenar los datos y finalizar la compra. (main.js, líneas 83-312).
btnComprar.addEventListener("click", () => {
  comprar();
});

const comprar = () => {
  if (envioCalculado) {
    abrirCerrarCarrito();
    window.location.href = "./form.html";
   
  } else {
    Swal.fire({
      icon: "error",
      text: "Debes seleccionar una provincia y calcular el envío",
      confirmButtonColor: "#171717",
      allowEscapeKey: "true"
    });
    provinciaSeleccionada.classList.add("error");
  }
};