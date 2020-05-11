class Interfaz {
	constructor() {
		this.init();
	}

	init() {
		this.construirSelect();
	}
	construirSelect() {
		cotizador.obtenerMonedasAPI().then((monedas) => {
			const select = document.querySelector('#criptomoneda');
			for (const [key, value] of Object.entries(monedas.monedas.Data)) {
				//agregar las opciones de moneda
				const opcion = document.createElement('option');
				opcion.value = value.Symbol;
				opcion.appendChild(document.createTextNode(value.CoinName));
				select.appendChild(opcion);
			}
		});
	}
	mostrarMensaje(mensaje, clases) {
		const div = document.createElement('div');
		div.className = clases;
		div.appendChild(document.createTextNode(mensaje));

		//mostrar contenido
		const divMensaje = document.querySelector('.mensajes');
		divMensaje.appendChild(div);

		setTimeout(() => {
			div.remove();
		}, 3000);
	}

	//imprimir el resultado de la cotizacion
	mostrarResultado(resultado, moneda, crypto) {
		const datosMoneda = resultado[crypto][moneda];

		let precio = datosMoneda.PRICE.toFixed(4);
		let porcentajeActualizacion = datosMoneda.CHANGEPCTDAY.toFixed(4),
			actualizacion = new Date(
				datosMoneda.LASTUPDATE * 1000
			).toLocaleDateString('es-MX');

		//construir el html
		let html = `
        <div class="card bg-warning">
            <div class="card-body text-light">
            <h2 class="card-title">Resultado</h2>
            <p>Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio}</p>
            <p>Variacion del ultimo dia: ${porcentajeActualizacion}%</p>
            <p>Ultimo dia de catualizacion: ${actualizacion}</p>
            </div>
        </div>
        
        `;

		this.mostrarSpinner();

		//insetar al html
		setTimeout(() => {
			document.querySelector('#resultado').innerHTML = html;

			const spinner = document.querySelector('.contenido-spinner');
			spinner.style.display = 'none';
		}, 3000);
	}

	mostrarSpinner() {
		const spinner = document.querySelector('.contenido-spinner');
		spinner.style.display = 'block';
	}
}
