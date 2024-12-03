let urlCandidatos = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json";

async function cargarCandidatoss() {
    try {
        let respuesta = await fetch(urlCandidatos);
        let Usuario = await respuesta.json(); // El resultado es un objeto, no un array.
        let contenedor = document.getElementById("datos");

        // Acceder directamente a las propiedades del objeto
        let div = document.createElement("div");
        div.classList.add("candidato");
        div.innerHTML = `
            <h3>Usuario: ${Usuario.username}</h3>
            <h3>Contraseña: ${Usuario.password}</h3>
        `;
        contenedor.appendChild(div);

    } catch (error) {
        console.error("Error al cargar los candidatos:", error);
    }
}

cargarCandidatoss();
