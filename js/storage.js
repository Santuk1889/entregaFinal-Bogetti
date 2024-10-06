function guardarJugadores() {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    Swal.fire('Jugadores guardados en el almacenamiento local.');
}

function recuperarJugadores() {
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
        jugadores = JSON.parse(jugadoresGuardados);
        mostrarJugadores();
    } else {
        Swal.fire('No hay jugadores guardados.');
    }
}

function borrarJugadores() {
    localStorage.removeItem('jugadores');
    jugadores = [];
    mostrarJugadores();
    Swal.fire('Jugadores borrados del almacenamiento local.');
}

function vaciarJugadores() {
    jugadores = [];
    mostrarJugadores();
    Swal.fire('Lista de jugadores vaciada.');
}

document.getElementById('guardar').addEventListener('click', guardarJugadores);
document.getElementById('recuperar').addEventListener('click', recuperarJugadores);
document.getElementById('borrar').addEventListener('click', borrarJugadores);
document.getElementById('vaciar').addEventListener('click', vaciarJugadores);
