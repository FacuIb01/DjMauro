const Mensajero = require("../classes/Mensajero")
const mensajero = new Mensajero()

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
                
                mensajero.listarCanciones(interaction, listaString)
            }catch(error){
                mensajero.error(error.message, interaction)
            }
        }
    }
}