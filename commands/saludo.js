const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description : "Este comando devuelve un saludo con el nombre del usuario que lo invoca",
    run:  async (interaction) => {
        try {
            mensajeroController.saludo(interaction)
        } catch (error) {
            mensajeroController.error(error.message, interaction)
        }
    }
}

