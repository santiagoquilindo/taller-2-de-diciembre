let urlCandidatos = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";

// Objeto para almacenar los votos
let votos = {};

// Función para cargar los candidatos desde la API
async function cargarCandidatos() {
    try {
        let respuesta = await fetch(urlCandidatos);
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar la lista de candidatos.");
        }
        let candidatos = await respuesta.json();

        if (!Array.isArray(candidatos)) {
            throw new Error("La respuesta de la API no es un array.");
        }

        // Recuperar los votos desde localStorage o inicializar
        recuperarVotos(candidatos);

        let contenedor = document.getElementById("candidatos");
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de cargar candidatos

        // Crear la interfaz para cada candidato
        candidatos.forEach(candidato => {
            let div = document.createElement("div");
            div.classList.add("candidato");

            const foto = candidato.foto || 'ruta/default.jpg'; // Foto por defecto
            const nombre = candidato.nombre || 'Nombre no disponible';
            const programa = candidato.programa || 'Programa no disponible';

            div.innerHTML = `
                <img src="${foto}" alt="Foto de ${nombre}" onclick="votar('${nombre}')">
                <h3>${nombre}</h3>
                <p>${programa}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar los candidatos:", error);
        alert("Hubo un problema al cargar los datos. Inténtalo más tarde.");
    }
}

// Función para registrar el voto
function votar(nombre) {
    let confirmacion = confirm(`¿Estás seguro de votar por ${nombre}?`);
    if (confirmacion) {
        if (votos[nombre] !== undefined) {
            votos[nombre]++; // Incrementar el conteo de votos
            guardarVotos(); // Guardar los votos actualizados en localStorage
            alert(`Has votado por ${nombre}.`);
        } else {
            alert("Hubo un problema al registrar tu voto.");
        }
    }
}

// Función para guardar los votos en localStorage
function guardarVotos() {
    localStorage.setItem('votos', JSON.stringify(votos));
}

// Función para recuperar los votos desde localStorage
function recuperarVotos(candidatos) {
    let votosGuardados = localStorage.getItem('votos');
    if (votosGuardados) {
        votos = JSON.parse(votosGuardados);
    } else {
        // Inicializar los votos si no hay datos guardados
        candidatos.forEach(candidato => {
            votos[candidato.nombre] = 0;
        });
    }
}

// Llamar a la función para cargar candidatos al inicio
cargarCandidatos();
