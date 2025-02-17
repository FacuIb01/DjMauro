const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

module.exports = {
    description: "Este comando permite ver el listado de canciones en el reproductor de musica",
    run: async (interaction, reproductor) => {
        const lista = await reproductor.devolverLista()
        if(lista.length === 0){
            return mensajero.error("Lista vacia")
        }else{
            try{
                let listaString = ""
                for (let i = 0; i < lista.length; i++) {
                    listaString += `${i+1}-${lista[i].nombre} \n`
                }
                
                mensajeroController.listarCola(interaction, listaString)
            }catch(error){
                mensajeroController.error(error.message, interaction)
            }
        }
    }
}