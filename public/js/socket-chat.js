var socket = io();

let params = new URLSearchParams(window.location.search);

//optenemos la información del usuario mediante el url
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);
});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on('listaPersona', function (usuarios) {
    console.log(usuarios);
});

//Mensajes privados.

socket.on('mensajePrivado', function (mensaje) {
    console.log('mensaje privado:', mensaje);
});