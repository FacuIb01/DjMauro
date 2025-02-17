const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

module.exports = {
    description: "Este comando pasa de cancion a la siguiente",
    run: async (interaction, reproductor) => {
        try{
            reproductor.siguienteCancion()
            mensajero.siguienteCancion(interaction)
        }catch(error){
            mensajero.error(error.message, interaction)
        }
    }
}