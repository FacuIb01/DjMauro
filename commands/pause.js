const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

module.exports = {
    description: "Este comando detiene el reproductor de musica",
    run: async (interaction, reproductor) => {
        try{
            reproductor.pause()
            mensajero.detener(interaction)
        }catch(error){
            mensajero.error(error.message, interaction)
        }
    }
}