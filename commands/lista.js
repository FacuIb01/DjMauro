module.exports = {
    description: "Esta funcion permite ver el listado de canciones en el reproductor de musica",
    run: async (message, reproductor) => {
        const lista = await reproductor.devolverLista()
        if(lista.length === 0){
            return message.reply("Lista vacia")
        }else{
            try{
                let listaString = "Canciones en cola de espera: \n"

                for (let i = 0; i < lista.length; i++) {
                    listaString += `${i+1}-${lista[i].nombre} \n`
                }

                return message.reply(listaString)
            }catch(err){
                message.send(err.message)
            }
        }
    }
}