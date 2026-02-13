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

const productos = ["Iphone", "Airpods" , "Apple Watch", "MacBook"]
const precios = [800, 130, 400, 1400]
const carrito = []
const carritoPrecios = []
const productosMinuscula = []

for (let i = 0; i < productos.length; i++) {
  productosMinuscula.push(productos[i].toLowerCase())
}

function mostrarProductos(productos, precios) {

  let mensaje = "Productos disponibles:\n\n"

  for (let i = 0; i < productos.length; i++) {
    mensaje += productos[i] + " - $" + precios[i] + "\n"
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
mostrarProductos(productos, precios);
let datos = comprar(productos, carrito, precios)
let subTotal = datos[0]
let iva = datos[1]
let totalFinal = datos[2]
mostrarCarrito(carrito, carritoPrecios, totalFinal, iva, subTotal);
console.log("Carrito", carrito);
console.log("Precios", carritoPrecios);
console.log("Total", totalFinal);