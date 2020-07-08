const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/util');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        //Crear sala 
        client.join(usuario.sala);
        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        //muestra todos los usuarios conectados
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));
        callback(usuarios.getPersonasPorSala(usuario.sala));
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat`));
        //muestra todas las personas que siguen conectados cuando alguien se desconecta
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    //Enviar mensaje a todo el mundo
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getElementById(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    //Mensajes privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getElementById(client.id);
        client.broadcast.to(data.destino).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });


});