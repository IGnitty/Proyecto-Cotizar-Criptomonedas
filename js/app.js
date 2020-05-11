const cotizador = new API(
	'10c0597639210c463b91ab5aa982a84bc46d4735195433b22c6f82b7ac6ad01b'
);
const ui = new Interfaz();

// Leer el formulario
const formulario = document.querySelector('#formulario');

//listener
formulario.addEventListener('submit', (event) => {
	event.preventDefault();

	//leer la moneda seleccionada
	const monedaSelect = document.querySelector('#moneda');
	const monedaSeleccionada =
		monedaSelect.options[monedaSelect.selectedIndex].value;

	//leer la criptomoneda Seleccionada
	const CryptoSelect = document.querySelector('#criptomoneda');
	const CryptoSeleccionada =
		CryptoSelect.options[CryptoSelect.selectedIndex].value;

	// comprobar que ambos campos tengan algo seleccionado

	if (monedaSeleccionada === '' || CryptoSeleccionada === '') {
		//arrojar una alerta de error
		ui.mostrarMensaje(
			'Ambos campos son obligatorios',
			'alert bg-danger text-center'
		);
	} else {
		//todo bien, consultar la api

		cotizador
			.obtenerValores(monedaSeleccionada, CryptoSeleccionada)
			.then((data) => {
				ui.mostrarResultado(
					data.resultado.RAW,
					monedaSeleccionada,
					CryptoSeleccionada
				);
			});
	}
});
