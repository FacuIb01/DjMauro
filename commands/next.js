module.exports = {
    description: "esta funcion pasa de cancion a la siguiente",
    run: async (message, reproductor) => {
        try{
            reproductor.siguienteCancion()
            message.reply("Pasando a la siguiente cancion...")
        }catch(err){
            message.reply(err.message)
        }
    }
}