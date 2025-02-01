module.exports = {
    description: "esta funcion detiene el reproductor de musica",
    run: async (message, reproductor) => {
        try{
            reproductor.stop()
            message.reply("ALTOOOOOOOOO")
        }catch(err){
            message.reply(err.message)
        }
    }
}