// ---------------- ELEMENTOS DOM ----------------

let saludo = document.getElementById("saludo");
let titulo = document.getElementById("titulo");
let padre = document.getElementById("padre");
let carritoTitulo = document.getElementById("carrito");

let btnMoneda;

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

let dolar = 0;
let monedaActual = localStorage.getItem("moneda") || "USD";

// ---------------- API DOLAR ----------------

async function obtenerDolar() {
  try {
    const resp = await fetch("https://dolarapi.com/v1/dolares/oficial");
    const data = await resp.json();
    return data.venta;
  } catch (error) {
    console.error("Error con API dólar:", error);
    return 1;
  }
}

// ---------------- FETCH PRODUCTOS ----------------

async function cargarProductos() {
  try {
    const response = await fetch("../productos.json");
    productos = await response.json();
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// ---------------- LOGIN ----------------

let cardInicio = document.createElement("div");
cardInicio.classList.add("card-inicio");

let tituloCard = document.createElement("h2");
tituloCard.innerText = "Iniciar sesión";

let inputNombre = document.createElement("input");
inputNombre.placeholder = "Nombre de usuario";

let mensajeError = document.createElement("p");
mensajeError.innerText = "Ingresa tu nombre";
mensajeError.style.display = "none";
mensajeError.classList.add("mensaje-error");

let btnIniciar = document.createElement("button");
btnIniciar.innerText = "Iniciar";
btnIniciar.classList.add("btn");

cardInicio.append(tituloCard, inputNombre, mensajeError, btnIniciar);
saludo.appendChild(cardInicio);

inputNombre.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnIniciar.click();
});

inputNombre.addEventListener("input", () => {
  if (inputNombre.value.trim() !== "") {
    mensajeError.style.display = "none";
  }
});

btnIniciar.addEventListener("click", iniciarApp);

// ---------------- INICIAR APP ----------------

async function iniciarApp() {
  let nombre = inputNombre.value.trim();

  if (!nombre) {
    mensajeError.style.display = "block";
    return;
  }

  saludo.innerText = `Hola ${nombre}, bienvenid@ a la tienda`;
  cardInicio.style.display = "none";
  titulo.innerText = "Productos Apple";

  carritoTitulo.style.display = "block";

  btnMoneda = document.getElementById("toggleMoneda");
  btnMoneda.style.display = "inline-block";

  dolar = await obtenerDolar();
  await cargarProductos();

  btnMoneda.innerText =
    monedaActual === "USD"
      ? "Mostrar en ARS"
      : "Mostrar en USD";

  renderProductos();
  mostrarCarrito();
}

// ---------------- PRODUCTOS ----------------

function renderProductos() {
  padre.innerHTML = "";

  productos.forEach(producto => {
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    let nombre = document.createElement("h3");
    nombre.innerText = producto.nombre;

    let img = document.createElement("img");
    img.src = producto.img;
    img.width = 150;

    let precio = document.createElement("b");

    if (monedaActual === "USD") {
      precio.innerText = `$${producto.precio} USD`;
    } else {
      precio.innerText = `$${(producto.precio * dolar).toFixed(0)} ARS`;
    }

    let boton = document.createElement("button");
    boton.innerText = "Agregar";
    boton.classList.add("btn");

    boton.addEventListener("click", () => agregarAlCarrito(producto));

    tarjeta.append(nombre, img, precio, boton);
    padre.appendChild(tarjeta);
  });
}

// ---------------- CARRITO ----------------

function agregarAlCarrito(producto) {
  let item = carrito.find(p => p.id === producto.id);

  if (item) item.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Producto agregado",
    showConfirmButton: false,
    timer: 1200
  });
}

function aumentarCantidad(id) {
  let item = carrito.find(p => p.id === id);
  if (item) item.cantidad++;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function disminuirCantidad(id) {
  let item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad--;

    if (item.cantidad <= 0) {
      carrito = carrito.filter(p => p.id !== id);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  carritoTitulo.innerHTML = "<b>Detalle de tu compra:</b><br><br>";

  if (carrito.length === 0) {
    carritoTitulo.innerHTML += "Tu carrito está vacío";
    return;
  }

  let subTotal = 0;

  carrito.forEach(item => {
    let contenedor = document.createElement("div");
    contenedor.classList.add("item-carrito");

    let nombre = document.createElement("p");
    nombre.innerText = item.nombre;

    let controles = document.createElement("div");
    controles.classList.add("controles");

    let btnMenos = document.createElement("button");
    btnMenos.innerText = "➖";
    btnMenos.classList.add("btn");
    btnMenos.onclick = () => disminuirCantidad(item.id);

    let cantidad = document.createElement("span");
    cantidad.innerText = item.cantidad;

    let btnMas = document.createElement("button");
    btnMas.innerText = "➕";
    btnMas.classList.add("btn");
    btnMas.onclick = () => aumentarCantidad(item.id);

    let btnEliminar = document.createElement("button");
    btnEliminar.innerText = "❌";
    btnEliminar.classList.add("btn");
    btnEliminar.onclick = () => eliminarProducto(item.id);

    controles.append(btnMenos, cantidad, btnMas, btnEliminar);

    let precio = document.createElement("p");
    let precioItem = item.precio * item.cantidad;

    if (monedaActual === "USD") {
      precio.innerText = `$${precioItem} USD`;
    } else {
      precio.innerText = `$${(precioItem * dolar).toFixed(0)} ARS`;
    }

    subTotal += precioItem;

    contenedor.append(nombre, controles, precio);
    carritoTitulo.appendChild(contenedor);
  });

  let iva = subTotal * 0.21;
  let total = subTotal + iva;

  let resumen = document.createElement("p");

  if (monedaActual === "USD") {
    resumen.innerHTML = `
      -----------------<br>
      Subtotal: $${subTotal.toFixed(2)} USD<br>
      IVA: $${iva.toFixed(2)} USD<br>
      <b>Total: $${total.toFixed(2)} USD</b><br><br>
    `;
  } else {
    resumen.innerHTML = `
      -----------------<br>
      Subtotal: $${(subTotal * dolar).toFixed(0)} ARS<br>
      IVA: $${(iva * dolar).toFixed(0)} ARS<br>
      <b>Total: $${(total * dolar).toFixed(0)} ARS</b><br><br>
    `;
  }

  let btnVaciar = document.createElement("button");
  btnVaciar.innerText = "Cancelar";
  btnVaciar.classList.add("btn");

  let btnConfirmar = document.createElement("button");
  btnConfirmar.innerText = "Confirmar";
  btnConfirmar.classList.add("btn");

  btnVaciar.onclick = () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  };

  btnConfirmar.onclick = confirmarCompra;

  let contenedorBotones = document.createElement("div");
  contenedorBotones.classList.add("acciones-carrito");

  contenedorBotones.append(btnVaciar, btnConfirmar);

  carritoTitulo.append(resumen, contenedorBotones);
}

// ---------------- COMPRA CON FORMULARIO ----------------

function confirmarCompra() {
  if (carrito.length === 0) return;

  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  let iva = total * 0.21;
  let final = total + iva;

  if (monedaActual !== "USD") {
    total *= dolar;
    iva *= dolar;
    final *= dolar;
  }

  Swal.fire({
    title: "Datos de compra",
    html: `
      <input id="nombreCliente" class="swal2-input" placeholder="Nombre completo">
      <input id="emailCliente" class="swal2-input" placeholder="Email">

      <select id="metodoPago" class="swal2-input">
        <option value="">Forma de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia</option>
        <option value="tarjeta">Tarjeta</option>
      </select>

      <div id="datosTarjeta" style="display:none;">
        <input id="numeroTarjeta" class="swal2-input" placeholder="Número de tarjeta">
        <input id="nombreTarjeta" class="swal2-input" placeholder="Titular">
        <input id="vencimiento" class="swal2-input" placeholder="MM/AA">
        <input id="cvv" class="swal2-input" placeholder="CVV">
      </div>

      <br>
      <b>Total: $${monedaActual === "USD" ? final.toFixed(2) : final.toFixed(0)} ${monedaActual}</b>
    `,
    showCancelButton: true,
    confirmButtonText: "Finalizar",
    didOpen: () => {
      const metodo = document.getElementById("metodoPago");
      const tarjetaDiv = document.getElementById("datosTarjeta");

      metodo.addEventListener("change", () => {
        tarjetaDiv.style.display = metodo.value === "tarjeta" ? "block" : "none";
      });
    },
    preConfirm: () => {
      const nombre = document.getElementById("nombreCliente").value;
      const email = document.getElementById("emailCliente").value;
      const metodo = document.getElementById("metodoPago").value;

      if (!nombre || !email || !metodo) {
        Swal.showValidationMessage("Completá todos los campos");
        return false;
      }

      let datosTarjeta = null;

      if (metodo === "tarjeta") {
        const numero = document.getElementById("numeroTarjeta").value;
        const titular = document.getElementById("nombreTarjeta").value;
        const venc = document.getElementById("vencimiento").value;
        const cvv = document.getElementById("cvv").value;

        if (!numero || !titular || !venc || !cvv) {
          Swal.showValidationMessage("Completá los datos de la tarjeta");
          return false;
        }

        datosTarjeta = { numero, titular, venc, cvv };
      }

      return { nombre, email, metodo, datosTarjeta };
    }
  }).then(result => {
    if (result.isConfirmed) {
      // 🔥 Guardar compra
      const compra = {
        cliente: result.value,
        carrito,
        moneda: monedaActual,
        total: final,
        fecha: new Date().toLocaleString()
      };

      localStorage.setItem("ultimaCompra", JSON.stringify(compra));

      Swal.fire({
        title: "Compra finalizada 🎉",
        text: "Gracias por tu compra",
        icon: "success",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn"
        }
      });

      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    }
  });
}

// ---------------- TOGGLE MONEDA ----------------

document.getElementById("toggleMoneda").addEventListener("click", () => {
  monedaActual = monedaActual === "USD" ? "ARS" : "USD";

  localStorage.setItem("moneda", monedaActual);

  btnMoneda.innerText =
    monedaActual === "USD"
      ? "Mostrar en ARS"
      : "Mostrar en USD";

  renderProductos();
  mostrarCarrito();
});