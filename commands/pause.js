const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description: "Este comando detiene el reproductor de musica",
    run: async (interaction, reproductor) => {
        try{
            reproductor.pause()
            mensajeroController.detener(interaction)
        }catch(error){
            mensajeroController.error(error.message, interaction)
        }
    }
}