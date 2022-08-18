// Este .js está linkeado a products.html y contiene las funcionalidades del e-commerce y el trabajo con el DOM.

// Arrays y objetos
const productos = [];
let carrito = [];

// Zonas para calcular el precio del envío (de más cercana a más lejana)
const provincias1 = ["baires", "caba"];
const provincias2 = ["cordoba", "santaFe", "entreRios", "laPampa", "rioNegro"];
const provincias3 = ["sanLuis", "mendoza", "neuquen", "laRioja", "sanJuan", "catamarca", "corrientes", "misiones", "chaco"];
const provincias4 = ["santiagoDelEstero", "tucuman", "salta", "jujuy", "formosa", "chubut", "santaCruz"];
const provincias5 = ["tierraDelFuego"];

// Clase constructora
class Producto {
    constructor (id, nombre, tipo, unidades, info, precio, foto, cantidad, precioTotal) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.unidades = unidades;
        this.info = info;
        this.precio = precio;
        this.foto = foto;
        this.cantidad = cantidad;
        this.precioTotal = precioTotal;
    }
}

// Productos (objects)

productos.push(new Producto (1, "Brasil", "Café", "250g", "Café intenso con notas de cacao amargo y frutos secos como avellana. Acidez media con retrogusto persistente y gran cuerpo.", 1600, "../img/productos/brasil-moka.png", 1, 1600));
productos.push(new Producto (2, "Colombia", "Café", "250g", "Café de intensidad media con notas frutales, acidez media alta cítrica y brillante, y cuerpo medio.", 2050, "../img/productos/colombia-v60.png", 1, 2050));
productos.push(new Producto (3, "Perú", "Café", "250g", "Café de intensidad media con notas a cacao, ciruela y leves notas cítricas. Acidez media alta.", 2200, "../img/productos/peru-filtro.png", 1, 2200));
productos.push(new Producto (4, "Etiopía", "Café", "250g", "Café de baja intensidad, acidez y cuerpo medio. Aromas florales con notas de pasas de uva, frutos secos, mermelada y jazmín.", 2520, "../img/productos/etiopia-chemex.png", 1, 2520));
productos.push(new Producto (5, "Blend Especial", "Café", "250g", "Café de intensidad media con notas de caña de azúcar, caramelo y avellanas. Acidez media y gran cuerpo", 3200, "../img/productos/blend-grano.png", 1, 3200));
productos.push(new Producto (6, "Kenia", "Café", "250g", "Café de acidez media baja y cuerpo sedoso, con aromas florales y notas de vainilla, fresas, té negro y jazmín", 2830, "../img/productos/kenia-v60.png", 1, 2830));

productos.push(new Producto (7, "Cookies", "Patisserie", 5, "Tradicionales cookies de vainilla con irresistibles chips de chocolate.", 610, "../img/productos/cookie.png", 1, 610));
productos.push(new Producto (8, "Mini cookies de limón", "Patisserie", 35, "Galletitas dulces de limón destinadas a generar una experiencia exquisita con el café.", 440, "../img/productos/galletitas-limon.png", 1, 440));
productos.push(new Producto (9, "Waffle belga", "Patisserie", 2, "Waffles estilo belga. Calentalos 2 minutos en tostadora y disfrutalos con queso crema, miel, arándanos o como más te guste.", 440, "../img/productos/waffle.png", 1, 440));
productos.push(new Producto (10, "Stroopwafel", "Patisserie", 5, "Barquillo dulce con relleno de caramelo y manteca. Disfrutalos en modo holandés. Colocalos arriba de la taza y esperá 3 minutos para que el vapor del café saborice el barquillo y derrita su relleno de caramelo. Plaisir!", 770, "../img/productos/stroopwafel.png", 1, 770));
productos.push(new Producto (11, "Cuadraditos de limón", "Patisserie", 6, "Galletitas dulces rellenas de una exquisita crema de limón.", 610, "../img/productos/cuadraditos.png", 1, 610));
productos.push(new Producto (12, "Cantuccini de almendras", "Patisserie", 6, "Maridá con un latte esta exquisita tradición italiana repleta de almendras.", 700, "../img/productos/cantuccini.png", 1, 700));


// Variables 

const cafe = productos.filter(el => el.tipo === "Café");
const patisserie = productos.filter(el => el.tipo === "Patisserie");
const padreCafe = document.querySelector(".products-coffee");
const padrePatisserie = document.querySelector(".products-patisserie");

const padreCarrito = document.querySelector(".cart__products");
const contadorCarrito = document.querySelector(".cart-number");
const subtotal = document.querySelector(".subtotal");
const envio = document.querySelector(".envio");
const total = document.querySelector(".precioTotal");
const cartelEnvio = document.getElementById("cartelEnvio");

const btnComprar = document.querySelector(".cart__main-button");


// DOM, eventos, storage

// Storage (guardar la última información guardada en el carrito)

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        actualizarCarrito();
    }
})


// Inyectar cards de productos dinámicamente (filtrados por categoría, café y patisserie)

cafe.forEach((prod) => {
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                            <h4 class="product__title">${prod.nombre}</h4>
                            <p class="product__body">${prod.info}</p>
                            <div class="product__onhover">
                                <form>
                                    <div class="row">
                                        <label for="molienda">Molienda</label>
                                        <select name="molienda" id="molienda${prod.id}">
                                            <option value="grano">Grano</option>
                                            <option value="moka">Moka</option>
                                            <option value="chemex">Chemex</option>
                                            <option value="prensa">Prensa francesa</option>
                                            <option value="espresso">Espresso</option>
                                            <option value="V60">V60</option>
                                            <option value="cápsulas">Cápsulas recargables</option>
                                            <option value="aeropress">Aeropress</option>
                                            <option value="filtro">Filtro</option>
                                        </select>
                                    </div>
                                    <div class="row">
                                        <label for="unidades">Unidades</label>
                                        <input type="number" name="unidades" id="unidadesCard${prod.id}" value="1" min="1" max="10" onKeyDown="return false"">
                                    </div>
                                    <p class="product__precio">$${prod.precio}</p>
                                    <button type="submit" id="btn${prod.id}" class="product__btn btn">Agregar al carrito</button>
                                </form>
                            </div>`
    padreCafe.append(productoDOM);

    const boton = document.getElementById(`btn${prod.id}`); // Cada producto tiene su propio botón con distinto ID
    const unidadesCard = document.getElementById(`unidadesCard${prod.id}`);
    const molienda = document.getElementById(`molienda${prod.id}`);

// Evento que llama la función para agregar el producto seleccionado al carrito. 
// Envía por parámetro el ID del producto seleccionado y la cantidad seleccionada en el input.
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        agregarAlCarrito(prod.id, (parseInt(unidadesCard.value)), molienda.value);
    })    
})

patisserie.forEach((prod) => {
    const productoDOM = document.createElement("div");
    productoDOM.className = "product";
    productoDOM.innerHTML = `<img src="${prod.foto}" alt="${prod.nombre}" class="product__img">
                            <h4 class="product__title">${prod.nombre}</h4>
                            <p class="product__subtitle">x ${prod.unidades} unidades</p>
                            <p class="product__body">${prod.info}</p>
                            <div class="product__onhover">
                                <form>
                                    <label for="unidades">Unidades</label>
                                    <input type="number" name="unidades" id="unidadesCard${prod.id}" value="1" min="1" max="10" onKeyDown="return false"">
                                    <p class="product__precio">$${prod.precio}</p>
                                    <button type="submit" id="btn${prod.id}" class="product__btn btn">Agregar al carrito</button>
                                </form>
                            </div>`
    padrePatisserie.append(productoDOM);

    const boton = document.getElementById(`btn${prod.id}`);
    const unidadesCard = document.getElementById(`unidadesCard${prod.id}`);

    boton.addEventListener("click", (e) => {
        e.preventDefault();
        agregarAlCarrito(prod.id, (parseInt(unidadesCard.value)));
    })
})


// Funciones

// Se envía como parámetro el ID del producto y se comprueba si ya se encuentra en el carrito. 
// En el caso de que ya esté, la cantidad aumenta y se suma el precio de cada unidad.
// Si es un producto nuevo, simplemente se añade al carrito.

const agregarAlCarrito = (prodId, cantidadCard, molienda) => {
    const existe = carrito.some(prod => prod.id === prodId);
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad += cantidadCard;
                prod.precioTotal = prod.precio * prod.cantidad;
            }
        })
    } else {
        const prod = productos.find((prod) => prod.id == prodId);
        prod.cantidad = cantidadCard;
        prod.precioTotal = prod.precio * prod.cantidad;
        prod.nombre.innerText += molienda;
        carrito.push(prod);
    }
    actualizarCarrito();
}


// Al apretar sobre el icono de eliminar producto, se busca el índice de dicho producto en el array del carrito y se elimina.

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}


// Esta función genera los productos del array carrito y los incluye en el DOM. 
// También crea el evento que llama a la función de eliminar productos.
// Finalmente se actualiza el número de productos, se suma el total y se actualiza el storage.

const actualizarCarrito = () => {

    padreCarrito.innerHTML = "" // Esto es para que dibuje los productos desde cero y no se repitan los que ya estaban cargados

    carrito.forEach((prod) => {
        const productoEnCarrito = document.createElement("div");
        productoEnCarrito.className = ("cart__product");
        productoEnCarrito.innerHTML = `<div class="cart-row">
                                            <h4 class="cart__product-title">${prod.nombre}</h4>
                                            <div class="cart__product-col">
                                                <p class="cart__product-price">$${prod.precioTotal}</p>
                                                <img src="../icons/trash.svg" alt="Eliminar producto" id="eliminar${prod.id}" class="cart__trash">
                                            </div>
                                        </div>
                                        <div class="cantidad-row">
                                            <i id="restarCantidad${prod.id}" class="fa-solid fa-minus"></i>
                                            <p class="cart__cantidad">${prod.cantidad}</p>
                                            <i id="sumarCantidad${prod.id}" class="fa-solid fa-plus"></i>
                                        </div>`
        padreCarrito.append(productoEnCarrito);

        const eliminarProducto = document.getElementById(`eliminar${prod.id}`);
        eliminarProducto.addEventListener("click", function(){
            eliminarDelCarrito(prod.id)
        });        


        // Las funciones restarCantidad y sumarCantidad aumentan o disminuyen el número de unidades en uno.
        const restarCantidad = document.getElementById(`restarCantidad${prod.id}`);
        restarCantidad.addEventListener("click", () => {
            if (prod.cantidad === 1) {
                eliminarDelCarrito(prod.id);
            }
            else {
                prod.cantidad--;
            }
            prod.precioTotal = prod.precio * prod.cantidad;
            actualizarCarrito();
        });

        const sumarCantidad = document.getElementById(`sumarCantidad${prod.id}`);
        sumarCantidad.addEventListener("click", () => {
                prod.cantidad++;
                prod.precioTotal = prod.precio * prod.cantidad;
                actualizarCarrito();
        });

    })

    // Actualizar el número que se encuentra junto al ícono del carrito.
    contadorCarrito.innerText = carrito.length;

    // Sumar el total de los productos
    subtotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precioTotal, 0);

    // Sumarle el envío
    total.innerText = parseFloat(subtotal.innerHTML) + parseFloat(envio.innerHTML);

    // Guardar la información del carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



// Calcular envío

const provinciaSeleccionada = document.getElementById("provinciaInput");

const botonCalcularEnvio = document.getElementById("botonCalcularEnvio");
botonCalcularEnvio.addEventListener("click", (e) => {
    e.preventDefault;
    calcularEnvio(provinciaSeleccionada.value);
})


const calcularEnvio = (provincia) => {

    provincias1.forEach(prov => {
        if (provincia == prov) {
            envio.innerText = 650;
        }
    })

    provincias2.forEach(prov => {
        if (provincia == prov) {
            envio.innerText = 770;
        }
    })

    provincias3.forEach(prov => {
        if (provincia == prov) {
            envio.innerText = 890;
        }
    })

    provincias4.forEach(prov => {
        if (provincia == prov) {
            envio.innerText = 1010;
        }
    })

    provincias5.forEach(prov => {
        if (provincia == prov) {
            envio.innerText = 1130;
        }
    })

    if (subtotal.innerHTML >= 4000) {
        envio.innerText = 0;
        cartelEnvio.innerHTML = "¡Genial! <span>Tenés envío gratis</span>";
    }
    else {
        cartelEnvio.innerText = "Envío gratis superando los $4000."
    }

    total.innerText = parseFloat(subtotal.innerHTML) + parseFloat(envio.innerHTML);
}



// Realizar compra
// Se cierra el carrito y se muestra una alerta. 
// Luego se guarda la información de la compra en el localStorage y se vacía el carrito.

btnComprar.addEventListener("click", () => {
    comprar();
});

const comprar = () => {
    abrirCerrarCarrito();
    alert("Compra realizada exitosamente");
    let ultimaCompra = carrito;
    localStorage.setItem("Última compra realizada", JSON.stringify(ultimaCompra));
    carrito = [];
    actualizarCarrito();
}





// Mostrar información para hacer la compra al hacer hover sobre los productos.
// Se crean event listener para cada producto en el DOM. Se añaden y quitan clases de CSS para mostrar/ocultar la información.

const productoDOM = document.querySelectorAll(".product")
const onhover = document.querySelectorAll(".product__onhover");


for(let i = 0; i < productoDOM.length; i++) {
    productoDOM[i].addEventListener("mouseover", () => {
        onhover[i].classList.add("product__show");
        })
    productoDOM[i].addEventListener("mouseout", () => {
        onhover[i].classList.remove("product__show");
        })
}


// Navbar
heroObserver.observe(productsHero);