let urlAdministrador = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json";

async function validarAdministrador() {
    try {
        let respuesta = await fetch(urlAdministrador);
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo del administrador.");
        }
        let administrador = await respuesta.json();
        let usuario = prompt("Eres usuario o administrador:").trim();
        let clave = prompt("Clave:").trim();
        if (usuario === administrador.usuario && clave === administrador.clave) {
            alert("Credenciales correctas. Acceso permitido.");
            return true;
        } else {
            alert("Usuario o clave incorrectos. Intenta nuevamente.");
            return false;
        }
    } catch (error) {
        console.error("Error al validar administrador:", error);
        alert("Hubo un problema al validar las credenciales. Inténtalo más tarde.");
        return false;
    }
}

async function iniciarElecciones() {
    let esValido = await validarAdministrador();
    if (esValido) {
        alert("La Elección 2024 ha comenzado.");
        limpiarResultados(); // Limpiar resultados previos
    }
}

async function cerrarElecciones() {
    let esValido = await validarAdministrador();
    if (esValido) {
        alert("La Elección 2024 ha finalizado.");
        mostrarResultados();
    }
}

function mostrarResultados() {
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = '<h2>Resultados:</h2>';

    for (let candidato in votos) {
        resultadosDiv.innerHTML += `<p>${candidato}: ${votos[candidato]} votos</p>`;
    }
}

function limpiarResultados() {
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ''; 
}

document.getElementById("iniciarElecciones").addEventListener("click", iniciarElecciones);
document.getElementById("cerrarElecciones").addEventListener("click", cerrarElecciones);


async function iniciarElecciones() {
    let esValido = await validarAdministrador();
    if (esValido) {
        alert("La Elección 2024 ha comenzado.");
        limpiarResultados(); // Limpiar la interfaz de resultados
        limpiarVotos(); // Limpiar los votos almacenados
    }
}

// Función para limpiar los votos almacenados en localStorage
function limpiarVotos() {
    localStorage.removeItem('votos');
    votos = {}; // Reiniciar el objeto de votos
}
