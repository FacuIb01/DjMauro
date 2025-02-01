module.exports = {
    description: "esta funcion detiene el reproductor de musica",
    run: async (message, reproductor) => {
        try{
            reproductor.clear()
            message.reply("Lista borrada")
        }catch(err){
            message.reply(err.message)
        }
    }
}