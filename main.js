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

function saludarUsuario() {
  let nombre = prompt("Ingresa tu nombre")
  alert("Bienvenido " + nombre + "!!")
}

const productos = ["Iphone", "Apple Watch", "MacBook"]
const carrito = []


function mostrarProductos(productos) {
  alert("Productos disponibles:\n" + productos.join("\n"))
}

function comprar(productos, carrito) {
  let continuar = true
  while (continuar) {
    let productoAgregado = prompt("Agrega un producto")
    if (productoAgregado === null) {
      break
    } else if (productos.includes(productoAgregado)) {
      carrito.push(productoAgregado)
    } else {
      alert("Producto no encontrado")
    }
    continuar = confirm("Seguir agregando productos?")
  }
}

function mostrarCarrito(carrito) {
  if (carrito.length) {
    alert("Productos agregados:\n" + carrito.join("\n"))
  } else {
    alert("Te esperamos cuando gustes!!")
  }
}

saludarUsuario();
mostrarProductos(productos);
comprar(productos,carrito);
mostrarCarrito(carrito);

console.log(carrito);