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

/* function saludarUsuario() {
  let nombre = prompt("Ingresa tu nombre")

  while (!nombre) {
    nombre = prompt("Por favor ingresa tu nombre")
  }

  alert("Bienvenido " + nombre + "!!")
}

const productos = [
  { nombre: "Iphone", precio: 800 },
  { nombre: "Airpods", precio: 130 },
  { nombre: "Apple Watch", precio: 400 },
  { nombre: "MacBook", precio: 1400 }
]
const carrito = []
const carritoPrecios = []
const productosMinuscula = []


for (let i = 0; i < productos.length; i++) {
  productosMinuscula.push(productos[i].nombre.toLowerCase())
}

function mostrarProductos(productos) {

  let mensaje = "Productos disponibles:\n\n"

  for (let i = 0; i < productos.length; i++) {
    mensaje += productos[i].nombre + " - $" + productos[i].precio + "\n"
  }

  alert(mensaje)
}

function comprar(productos, carrito, precios) {
  let subTotal = 0
  let continuar = true
  while (continuar) {
    let productoAgregado = prompt("Agrega un producto")
    if (productoAgregado === null) {
      break
    }

    productoAgregado = productoAgregado.toLowerCase()

    if (productosMinuscula.includes(productoAgregado)) {
      let posicion = productosMinuscula.indexOf(productoAgregado)
      let precio = precios[posicion]
      carrito.push(productos[posicion])
      carritoPrecios.push(precio)
      subTotal += precio
      alert("Producto agregado: \n" + productos[posicion] + "\nPrecio: $" + precio)
    } else {
      alert("Producto no encontrado")
    }
    continuar = confirm("Seguir agregando productos?")
  }
  let iva = subTotal * 0.21
  let totalConIva = subTotal + iva
  return [subTotal, iva, totalConIva]
}

function mostrarCarrito(carrito, carritoPrecios, total, iva, subTotal) {
  if (carrito.length) {

    let mensaje = "Detalle de tu compra:\n\n"

    for (let i = 0; i < carrito.length; i++) {
      mensaje += carrito[i] + " - $" + carritoPrecios[i] + "\n"
    }

    mensaje += "\n-----------------\n"
    mensaje += "Subtotal: $" + subTotal + "\n"
    mensaje += "IVA: $" + iva + "\n"
    mensaje += "Total: $" + total

    alert(mensaje)

  } else {
    alert("Te esperamos cuando gustes!!")
  }
}


saludarUsuario();
mostrarProductos(productos);
let datos = comprar(productos, carrito)
let subTotal = datos[0]
let iva = datos[1]
let totalFinal = datos[2]
mostrarCarrito(carrito, carritoPrecios, totalFinal, iva, subTotal);
console.log("Carrito", carrito);
console.log("Precios", carritoPrecios);
console.log("Total", totalFinal); */

let saludo = document.getElementById("saludo")
let titulo = document.getElementById("titulo")
let padre = document.getElementById("padre")
let carritoTitulo = document.getElementById("carrito")



let nombre = prompt("Ingresa tu nombre")
while (!nombre) {
  nombre = prompt("Por favor ingresa tu nombre")
}

saludo.innerText = `Hola ${nombre}, bienvenido a nuestra tienda.`

titulo.innerText = "Productos Apple"

let productos = [
  { id: 1, nombre: "Iphone 14 Pro", precio: 800, img: "img/iphone-14.png" },
  { id: 2, nombre: "Airpods 4ta Generacion", precio: 130, img: "img/airpods.jpeg" },
  { id: 3, nombre: "Apple Watch SE", precio: 400, img: "img/applewatch.png" },
  { id: 4, nombre: "MacBook Air M3", precio: 1400, img: "img/macprom3.png" }
]

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

  let iva = subTotal * 0.21; // 21% IVA
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
    const pedidoConfirmado = {
      nombre: nombre,
      carrito: carrito
    };
    localStorage.setItem("pedidoConfirmado", JSON.stringify(pedidoConfirmado));
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
}

for (const producto of productos) {
  let stock = document.createElement("div")
  stock.innerHTML = `<div class="tarjeta">
      <h3>${producto.nombre}</h3>
      <img src="${producto.img}" width="150">
      <b>Precio: $${producto.precio}</b>
      <button id="btn-${producto.id}">Añadir al carrito</button>
    </div>`
  padre.appendChild(stock);

  document.getElementById(`btn-${producto.id}`).addEventListener("click", () => {
    let itemEnCarrito = carrito.find(p => p.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  });
}

mostrarCarrito();

