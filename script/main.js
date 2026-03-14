/* // VARIABLE

let producto;

producto = "telefono";

console.log(producto);

let valorDelProducto;

valorDelProducto = 98000;

console.log(valorDelProducto);

let stock = true;

console.log(stock);


//CICLO

let conseñaCorrecta = "hola123";
let contraseña;
let acceso = false;

for (let i = 0; i < 5; i++) {
  contraseña = prompt("Ingresa tu contraseña");

  if (contraseña === conseñaCorrecta) {
    alert("Bienvenido!!");
    acceso = true;
    break;
  } else if (i === 3) {
    alert("Contraseña incorrecta, último intento.");
  } else {
    alert("Contraseña incorrecta.");
  }
}

if (acceso === false) {
  alert("Superaste el límite de intentos.");
}

//FUNCION


function pedirPrecio() {
    let precio = Number(prompt("Ingrese el precio"))
    return precio;
}

function pedirDescuento() {
    let descuento = Number(prompt("Ingrese el descuento"))
    return descuento;
}

function calcularPrecioFinal(precio, descuento) {
    return precio - descuento;
}

function mostrarPrecioFinal(total) {
    alert("El precio final es: " + total);
}

let precio = pedirPrecio();
let descuento = pedirDescuento()
let total = calcularPrecioFinal(precio, descuento);
mostrarPrecioFinal(total);


//Funcion Flecha


let suma = (a,b)=>a+b;

console.log(suma(5,6));


//Array


let productos = ["Iphone","Apple Watch","MacBook"]
productos.push("Air Pods");
console.log (productos);

console.log (productos[1]);


const productos = ["Iphone","Apple Watch","MacBook"]

for (let i=0;i<productos.length;i++) {
  console.log(productos[i])

} */

//Entrega 1


let saludo = document.getElementById("saludo");
let titulo = document.getElementById("titulo");
let padre = document.getElementById("padre");
let carritoTitulo = document.getElementById("carrito");


let cardInicio = document.createElement("div");
cardInicio.classList.add("card-inicio");

let tituloCard = document.createElement("h2");
tituloCard.innerText = "Iniciar sesión";
cardInicio.appendChild(tituloCard);

let inputNombre = document.createElement("input");
inputNombre.setAttribute("placeholder", "Nombre de usuario");
cardInicio.appendChild(inputNombre);

let mensajeError = document.createElement("p");
mensajeError.classList.add("mensaje-error");
mensajeError.innerText = "Ingresa tu nombre de usuario";
mensajeError.style.display = "none";
cardInicio.appendChild(mensajeError);

let btnIniciar = document.createElement("button");
btnIniciar.innerText = "Iniciar";
cardInicio.appendChild(btnIniciar);

saludo.appendChild(cardInicio);

inputNombre.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btnIniciar.click();
  }
});

inputNombre.addEventListener("input", () => {
  if (inputNombre.value.trim() !== "") {
    mensajeError.style.display = "none";
  }
});

btnIniciar.addEventListener("click", () => {
  let nombre = inputNombre.value.trim();
  if (!nombre) {
    mensajeError.style.display = "block";
    return;
  }

  saludo.innerText = `Hola ${nombre}, bienvenid@ a nuestra tienda.`;
  cardInicio.style.display = "none";
  titulo.innerText = "Productos Apple";

  let modal = document.createElement("div");
  modal.setAttribute("id", "modalCompra");
  modal.style.display = "none";
  modal.innerHTML = `
    <div class="contenido">
      <h2>Compra finalizada</h2>
      <div id="detallesCompra"></div>
      <button id="cerrarModal">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);

  let productos = [
    { id: 1, nombre: "Iphone 14 Pro", precio: 800, img: "img/iphone-14.png" },
    { id: 2, nombre: "Airpods 4ta Generacion", precio: 130, img: "img/airpods.jpeg" },
    { id: 3, nombre: "Apple Watch SE", precio: 400, img: "img/applewatch.png" },
    { id: 4, nombre: "MacBook Air M3", precio: 1400, img: "img/macprom3.png" }
  ];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function mostrarCarrito() {
    carritoTitulo.innerHTML = "<b>Detalle de tu compra:</b><br><br>";

    if (carrito.length === 0) {
      carritoTitulo.innerHTML += "Tu carrito está vacío.";
      return;
    }

    let subTotal = 0;
    for (let item of carrito) {
      let precioItem = item.precio * item.cantidad;
      subTotal += precioItem;
      carritoTitulo.innerHTML += `${item.nombre} x${item.cantidad} - $${precioItem}<br>`;
    }

    let iva = subTotal * 0.21;
    let total = subTotal + iva;
    carritoTitulo.innerHTML += `<br>-----------------<br>`;
    carritoTitulo.innerHTML += `Subtotal: $${subTotal.toFixed(2)}<br>`;
    carritoTitulo.innerHTML += `IVA (21%): $${iva.toFixed(2)}<br>`;
    carritoTitulo.innerHTML += `<b>Total: $${total.toFixed(2)}</b><br><br>`;
    carritoTitulo.innerHTML += `<button id="vaciar">Cancelar</button>`;
    carritoTitulo.innerHTML += `<button id="confirmar">Confirmar</button>`;

    document.getElementById("vaciar").addEventListener("click", () => {
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });

    document.getElementById("confirmar").addEventListener("click", () => {
      if (carrito.length === 0) return;

      const pedidoConfirmado = { nombre: nombre, carrito: carrito };
      localStorage.setItem("pedidoConfirmado", JSON.stringify(pedidoConfirmado));

      let detallesHTML = "";
      let subTotalModal = 0;
      for (let item of carrito) {
        let precioItem = item.precio * item.cantidad;
        subTotalModal += precioItem;
        detallesHTML += `${item.nombre} x${item.cantidad} - $${precioItem}<br>`;
      }
      let ivaModal = subTotalModal * 0.21;
      let totalModal = subTotalModal + ivaModal;
      detallesHTML += `<br>-----------------<br>`;
      detallesHTML += `Subtotal: $${subTotalModal.toFixed(2)}<br>`;
      detallesHTML += `IVA (21%): $${ivaModal.toFixed(2)}<br>`;
      detallesHTML += `<b>Total: $${totalModal.toFixed(2)}</b>`;

      document.getElementById("detallesCompra").innerHTML = detallesHTML;
      modal.style.display = "flex";

      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });
  }

  for (const producto of productos) {
    let stock = document.createElement("div");
    stock.innerHTML = `<div class="tarjeta">
      <h3>${producto.nombre}</h3>
      <img src="${producto.img}" width="150">
      <b>Precio: $${producto.precio}</b>
      <button id="btn-${producto.id}">Añadir al carrito</button>
    </div>`;
    padre.appendChild(stock);

    document.getElementById(`btn-${producto.id}`).addEventListener("click", () => {
      let itemEnCarrito = carrito.find(p => p.id === producto.id);
      if (itemEnCarrito) itemEnCarrito.cantidad += 1;
      else carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    });
  }

  mostrarCarrito();

  document.getElementById("cerrarModal").addEventListener("click", () => {
    modal.style.display = "none";
  });
});