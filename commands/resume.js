const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

module.exports = {
    description: "Este comando vuelve a reproducir la canción que estaba sonando",
    run: async (interaction, reproductor) => {
        try{
            reproductor.unpause()
            mensajero.resume(interaction)
        }catch(error){
            mensajero.error(error.message, interaction)
        }
    }
}