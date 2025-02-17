const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

module.exports = {
    description : "Este comando devuelve un saludo con el nombre del usuario que lo invoca",
    run:  async (interaction) => {
        try {
            mensajero.saludo(interaction)
        } catch (error) {
            mensajero.error(error.message, interaction)
        }
    }
}

