module.exports = {
    description: "esta funcion vuelve a reproducir la canción que estaba sonando",
    run: async (message, reproductor) => {
        try{
            reproductor.unpause()
        }catch(err){
            message.reply(err.message)
        }
    }
}