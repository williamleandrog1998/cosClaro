"use strict";

let btnInicioBot = document.getElementById("btnInicioBot");

btnInicioBot.addEventListener("click", async () => {
    try {

        const response = await fetch('/inicioBot', {
            method: 'POST',
        });
        if (response.ok) {
            const data = await response.json(); // Analiza la respuesta JSON
            console.log(data.message); // Muestra el mensaje desde el servido 
        } else {
            console.log('Error en la solicitud al servidor');
        }
        // 
        btnInicioBot.disabled = true;
    } catch (error) {
        console.error(error);
    }
});


// Función para cargar y mostrar u ocultar el botón según el valor de data.encolados
async function cargarYActualizarBoton() {
    try {
        // btnInicioBot.disabled = false;
        const response = await fetch('/bottonBot', {
            method: 'POST',
        });
        if (response.ok) {
            const data = await response.json(); // Analiza la respuesta JSON

            if (data.botStatus == 'OFF' && data.encolados > 0) {
                btnInicioBot.disabled = false;
            } else {
                btnInicioBot.disabled = true;
            }
        } else {
            console.log('Error en la solicitud al servidor');
        }
    } catch (error) {
        console.error(error);
    }
}

// Llama a la función para cargar y mostrar u ocultar el botón cuando se carga la página
document.addEventListener("DOMContentLoaded", cargarYActualizarBoton);


