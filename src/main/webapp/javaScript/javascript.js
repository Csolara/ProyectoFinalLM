/**
 * 
 */

// Función para obtener los parámetros de la URL
function obtenerParametrosURL() {
    let urlParams = new URLSearchParams(window.location.search);
    let nombreProducto = urlParams.get('nombre');
    let precioProducto = urlParams.get('precio');
    return { nombre: nombreProducto, precio: precioProducto };
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito() {
    // Obtener los parámetros de la URL
    let { nombre, precio } = obtenerParametrosURL();

    // Obtener la tabla del carrito
    let tablaCarrito = document.getElementById("carrito");

    // Crear una nueva fila para el producto
    let nuevaFila = document.createElement("tr");
    nuevaFila.setAttribute("align", "center");

    // Crear las celdas para la nueva fila
    let celdaCantidad = document.createElement("td");
    celdaCantidad.classList.add("col-2");
    celdaCantidad.innerHTML = `
        <button class="btn border">+</button>
        <span class="cantidadProducto">1</span>
        <button class="btn border">-</button>
    `;

    let celdaNombre = document.createElement("td");
    celdaNombre.classList.add("col-6");
    celdaNombre.textContent = nombre;

    let celdaPrecio = document.createElement("td");
    celdaPrecio.classList.add("text-right");
    celdaPrecio.textContent = precio + "€";

    // Agregar las celdas a la nueva fila
    nuevaFila.appendChild(celdaCantidad);
    nuevaFila.appendChild(celdaNombre);
    nuevaFila.appendChild(celdaPrecio);

    // Insertar la nueva fila en la tabla del carrito
    tablaCarrito.insertBefore(nuevaFila, tablaCarrito.lastChild.previousSibling);
}

// Llamar a la función para agregar el producto al carrito cuando la página se cargue
window.onload = agregarProductoAlCarrito;

/**function actualizarCantidadYPrecio(cantidadId, precioId, precioUnitario, cambio) {
	const cantidadElement = document.getElementById(cantidadId);
	const precioElement = document.getElementById(precioId);

	let cantidad = parseInt(cantidadElement.innerText, 10);
	if (!isNaN(cantidad)) {
		cantidad += cambio;
		if (cantidad < 0) cantidad = 0;
		cantidadElement.innerText = cantidad;

		const nuevoPrecio = cantidad * precioUnitario;
		precioElement.innerText = `${nuevoPrecio.toLocaleString()}€`;

		actualizarTotal();
	} else {
		console.error("El valor de cantidad no es un número válido.");
	}
}

function sumar(cantidadId, precioId, precioUnitario) {
	actualizarCantidadYPrecio(cantidadId, precioId, precioUnitario, 1);
}

function restar(cantidadId, precioId, precioUnitario) {
	actualizarCantidadYPrecio(cantidadId, precioId, precioUnitario, -1);
}

function actualizarTotal() {
	const precios = document.querySelectorAll("[id^='precio']");
	let total = 0;

	precios.forEach(precioElement => {
		let precio = parseInt(precioElement.innerText.replace(/[^0-9]/g, ''));
		if (!isNaN(precio)) {
			total += precio;
		}
	});

	const totalElement = document.getElementById('total');
	totalElement.innerText = total.toLocaleString();
}

function vaciarCarrito() {
	// Establecer todas las cantidades a 0
	document.querySelectorAll("[id^='cantidad']").forEach(elemento => {
		elemento.innerText = "0";
	});

	// Establecer todos los precios a 0
	document.querySelectorAll("[id^='precio']").forEach(elemento => {
		elemento.innerText = "0€";
	});

	// Actualizar el total a 0
	document.getElementById("total").innerText = "0";
}*/


// FORMULARIO


document.getElementById('cc-name').addEventListener('input', function(event) {
	if (this.value.match(/[^a-zA-Z ]/g)) {
		this.value = this.value.replace(/[^a-zA-Z ]/g, '');
	}
});

function restrictInput(e, maxLength) {
	// Evitar más entrada si se alcanza la longitud máxima
	if (e.target.value.length >= maxLength && e.keyCode !== 8 && e.keyCode !== 46) {
		e.preventDefault();
	}
}

function handlePaste(e, maxLength) {
	// Permitir tiempo para que el valor se pegue
	setTimeout(function() {
		e.target.value = e.target.value.slice(0, maxLength);
	}, 1);
}

// Eventos para el número de tarjeta
var ccNumber = document.getElementById('cc-number');
ccNumber.addEventListener('keypress', function(e) {
	restrictInput(e, 16);
});
ccNumber.addEventListener('input', function(e) {
	handlePaste(e, 16);
});

// Eventos para la fecha de caducidad
var ccExpiration = document.getElementById('cc-expiration');
ccExpiration.addEventListener('keypress', function(e) {
	restrictInput(e, 5);
});
ccExpiration.addEventListener('input', function(e) {
	handlePaste(e, 5);
});

// Eventos para el CVC
var ccCVV = document.getElementById('cc-cvv');
ccCVV.addEventListener('keypress', function(e) {
	restrictInput(e, 3);
});
ccCVV.addEventListener('input', function(e) {
	handlePaste(e, 3);
});

function validateExpirationDate() {
	var input = document.getElementById('cc-expiration');
	var errorDiv = document.getElementById('date-error');
	var parts = input.value.split('/');

	if (parts.length === 2) {
		var month = parseInt(parts[0], 10);
		var year = parseInt(parts[1], 10);

		// Comprobar si el mes es válido
		if (month < 1 || month > 12) {
			errorDiv.style.display = 'block';
			errorDiv.textContent = 'Mes no válido. Debe ser entre 01 y 12.';
			return false;
		}

		// Comprobar si la fecha supera el 31/12
		if (month === 12 && year > 99) { // Considerando el formato AA como año
			errorDiv.style.display = 'block';
			errorDiv.textContent = 'La fecha no debe superar el 31/12 de cualquier año.';
			return false;
		}

		// Si todo está correcto, ocultar el mensaje de error
		errorDiv.style.display = 'none';
		return true;
	}

	errorDiv.style.display = 'block';
	errorDiv.textContent = 'Formato de fecha incorrecto. Debe ser MM/AA.';
}

document.getElementById('cc-expiration').addEventListener('input', validateExpirationDate);

document.getElementById('your-form-id').addEventListener('submit', function(e) {
	var paymentMethods = document.getElementsByName('paymentMethod');
	var selectedMethod = Array.from(paymentMethods).some(input => input.checked);

	if (!selectedMethod) {
		e.preventDefault(); // Detener la presentación del formulario
		alert('Debe seleccionar un método de pago.');
	}
});