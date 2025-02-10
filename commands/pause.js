module.exports = {
    description: "esta funcion detiene el reproductor de musica",
    run: async (message, reproductor) => {
        try{
            reproductor.pause()
            message.reply("Detuvierto")
        }catch(err){
            message.reply(err.message)
        }
    }
}