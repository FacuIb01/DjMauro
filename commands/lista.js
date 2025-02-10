module.exports = {
    description: "Esta funcion permite ver el listado de canciones en el reproductor de musica",
    run: async (message, reproductor) => {
        const lista = await reproductor.devolverLista()
        if(lista.length === 0){
            return message.reply("Lista vacia")
        }else{
            let listaString = ""
    
            lista.forEach(element => {
                listaString += `-${element.nombre} \n`
            });
    
    
            return message.reply(listaString)
        }
    }
}