const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description: "Este comando vuelve a reproducir la canción que estaba sonando",
    run: async (interaction, reproductor) => {
        try{
            reproductor.unpause()
            mensajeroController.resume(interaction)
        }catch(error){
            mensajeroController.error(error.message, interaction)
        }
    }
}