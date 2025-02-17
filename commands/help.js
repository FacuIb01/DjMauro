const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

module.exports = {
    description: "Este comando devuelve la descripcion de todos los comandos admitidos por el bot",
    run: (interaction, reproductor) => {
        const comandos = ["clear", "lista", "next", "p", "resume", "saludo", "pause", "help", "plista"]
        let cadenaDescripciones = ""
        for (let i = 0; i < comandos.length; i++) {
            let comandoABuscar = comandos[i];

            let comandoObjeto = require(`../commands/${comandoABuscar}.js`)
            
            cadenaDescripciones += `${i+1} - !${comandoABuscar} : ${comandoObjeto.description} \n \n`
        }

        mensajero.listarComandos(interaction, cadenaDescripciones)
    }
}