const Mensajero = require("../classes/Mensajero")
const MensajeroController = require("../controllers/MensajeroController")
const mensajero = new Mensajero()
const mensajeroController = new MensajeroController()

module.exports = {
    description: "Este comando permite obtener un listado de canciones bajo el nombre indicado y así poder elegir cual reproducir mediante su URL",
    run: async (interaction, reproductor) => {
            try {

                let nombreCancion = interaction.content.split(" ").slice(1).join(" ")

                mensajeroController.listarCanciones(interaction,nombreCancion)
            } catch (error) {
                mensajero.error(error.message, interaction)
            }
    }
}