const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description: "Este comando pasa de cancion a la siguiente",
    run: async (interaction, reproductor) => {
        try{
            mensajeroController.siguienteCancion(interaction)
            reproductor.siguienteCancion()
        }catch(error){
            mensajeroController.error(error.message, interaction)
        }
    }
}