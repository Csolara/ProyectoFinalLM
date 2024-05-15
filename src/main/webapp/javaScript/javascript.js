/**
 * 
 */

function actualizarCantidadYPrecio(cantidadId, precioId, precioUnitario, cambio) {
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
}
