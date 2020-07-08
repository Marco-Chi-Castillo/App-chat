
class Usuarios {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre, sala) {
    let persona = { id, nombre, sala };
    this.personas.push(persona);

    return this.personas;
  }

  getElementById(id) {
    //buscamos en el arreglo un dato igual al ID
    let persona = this.personas.filter(people => {
      return people.id === id;
    })[0];

    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala) {
    let personaEnSala = this.personas.filter(persona => {
      return persona.sala === sala
    });

    return personaEnSala;
  }

  borrarPersona(id) {
    let personaBorrada = this.getElementById(id);
    //actualizamos el arreglo con todas las personas excluyendo a la persona con ese ID
    this.personas = this.personas.filter(persona => {
      return persona.id != id;
    });

    return personaBorrada;
  }
}

module.exports = {
  Usuarios
}