const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description: "Este comando devuelve la descripcion de todos los comandos admitidos por el bot",
    run: (interaction, reproductor) => {
        try {
            const comandos = ["clear", "lista", "next", "p", "resume", "saludo", "pause", "help", "plista"]
            let cadenaDescripciones = ""
            for (let i = 0; i < comandos.length; i++) {
                let comandoABuscar = comandos[i];
    
                let comandoObjeto = require(`../commands/${comandoABuscar}.js`)
                
                cadenaDescripciones += `${i+1} - !${comandoABuscar} : ${comandoObjeto.description} \n \n`
            }
    
            mensajeroController.listarComandos(interaction, cadenaDescripciones)
        
        } catch (error) {
            mensajeroController.error(error.message, interaction)
        }
    }
}