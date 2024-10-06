let jugadores = [];
let equipos = [];
let posiciones = [];

async function fetchData() {
    try {
        const response = await fetch('./db/data.json');
        const data = await response.json();
        equipos = data.equipos;
        posiciones = data.posiciones;
        cargarEquipos();
        cargarPosiciones();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    } finally {
        console.log('Todos los datos de data.json fueron cargados correctamente');
    }
}

function cargarEquipos() {
    const selectEquipo = document.getElementById('equipo');
    const filtroEquipo = document.getElementById('filtroEquipo');
    selectEquipo.innerHTML = '';
    filtroEquipo.innerHTML = '<option value="">Filtrar por equipo</option>'; 

    equipos.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo.nombre;
        option.textContent = equipo.nombre;
        selectEquipo.appendChild(option);

        const filtroOption = option.cloneNode(true);
        filtroEquipo.appendChild(filtroOption);
    });
}

function cargarPosiciones() {
    const selectPosicion = document.getElementById('posicion');
    const filtroPosicion = document.getElementById('filtroPosicion');
    selectPosicion.innerHTML = '';
    filtroPosicion.innerHTML = '<option value="">Filtrar por posición</option>';

    posiciones.forEach(posicion => {
        const option = document.createElement('option');
        option.value = posicion;
        option.textContent = posicion;
        selectPosicion.appendChild(option);

        const filtroOption = option.cloneNode(true);
        filtroPosicion.appendChild(filtroOption);
    });
}

function agregarJugador() {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const equipo = document.getElementById('equipo').value;
    const posicion = document.getElementById('posicion').value;
    const avatarInput = document.getElementById('avatar');
    const avatar = avatarInput.files[0] ? URL.createObjectURL(avatarInput.files[0]) : 'assets/avatar.png';

    if (nombre && !isNaN(edad) && equipo && posicion) {
        const jugador = { nombre, edad, equipo, posicion, avatar };
        jugadores.push(jugador);
        mostrarJugadores();
        limpiarFormulario();
    }
}

function mostrarJugadores(filtroEquipo = '', filtroPosicion = '') {
    const lista = document.getElementById('listaJugadores');
    lista.innerHTML = '';

    let jugadoresFiltrados = jugadores;
    if (filtroEquipo) {
        jugadoresFiltrados = jugadoresFiltrados.filter(jugador => jugador.equipo === filtroEquipo);
    }
    if (filtroPosicion) {
        jugadoresFiltrados = jugadoresFiltrados.filter(jugador => jugador.posicion === filtroPosicion);
    }

    jugadoresFiltrados.forEach((jugador, index) => {
        const equipo = equipos.find(equipo => equipo.nombre === jugador.equipo);
        if (equipo) {
            const escudoEquipo = equipo.escudo;
            const div = document.createElement('div');
            div.classList.add('jugador');
            div.innerHTML = `
                <img src="${jugador.avatar}" alt="Avatar" class="avatar">
                <div class="jugador-info">
                    <strong>${jugador.nombre}</strong>
                    <span><img src="${escudoEquipo}" alt="Escudo" class="escudo"></span>
                    <span>${jugador.equipo}</span>
                    <span>Edad: ${jugador.edad}</span>
                    <span>Posición: ${jugador.posicion}</span>
                    <div>
                        <button class="boton" onclick="editarJugador(${index})">Editar</button>
                        <button class="boton" onclick="eliminarJugador(${index})">Eliminar</button>
                    </div>
                </div>
                </div>
            `;
            lista.appendChild(div);
        }
    });
}

function eliminarJugador(index) {
    jugadores.splice(index, 1);
    mostrarJugadores();
}

function editarJugador(index) {
    const jugador = jugadores[index];
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('edad').value = jugador.edad;
    document.getElementById('equipo').value = jugador.equipo;
    document.getElementById('posicion').value = jugador.posicion;
    document.getElementById('avatar').value = '';

    eliminarJugador(index);
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('equipo').selectedIndex = 0;
    document.getElementById('posicion').selectedIndex = 0;
    document.getElementById('avatar').value = '';
}

function aplicarFiltros() {
    const filtroEquipo = document.getElementById('filtroEquipo').value;
    const filtroPosicion = document.getElementById('filtroPosicion').value;
    mostrarJugadores(filtroEquipo, filtroPosicion);
}

function ordenarJugadores(criterio) {
    jugadores.sort((a, b) => {
        if (criterio === 'edad') {
            return a.edad - b.edad;
        } else if (criterio === 'equipo') {
            return a.equipo.localeCompare(b.equipo);
        } else if (criterio === 'posicion') {
            return a.posicion.localeCompare(b.posicion);
        }
    });
    mostrarJugadores();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Documento cargado correctamente");
    fetchData();
});

document.getElementById('agregarJugador').addEventListener('click', agregarJugador);
document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
document.getElementById('ordenarPorEdad').addEventListener('click', () => ordenarJugadores('edad'));
document.getElementById('ordenarPorEquipo').addEventListener('click', () => ordenarJugadores('equipo'));
document.getElementById('ordenarPorPosicion').addEventListener('click', () => ordenarJugadores('posicion'));