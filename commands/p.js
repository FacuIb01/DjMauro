const { joinVoiceChannel} = require('@discordjs/voice');
const MensajeroController = require("../controllers/MensajeroController.js")
const mensajeroController =  new MensajeroController()

function conectarBot(canal) {
    return joinVoiceChannel({
        channelId: canal.id,
        guildId: canal.guild.id,
        adapterCreator: canal.guild.voiceAdapterCreator,
    });
}


module.exports = {
    description: "Este comando es el encargado de reproducir la musica creando un reproductor",
    run: async (interaction, reproductor) => {
        try {
            if(!interaction.member.voice.channel){
                throw new Error("Tenes que estar en un chat de voz papito no me bolacees")
            }
            
            let nombreCancion = interaction.content.split(" ").slice(1).join(" ")
            
            const canal = interaction.member.voice.channel
            
            const conexion = conectarBot(canal);
            
            // Agregar el player a la conexión de voz
            conexion.subscribe(reproductor.getAudioPlayer());
            mensajeroController.cargandoCancion(interaction)
            
            // Reproducir el audio
            await reproductor.reproducir(nombreCancion)

        } catch (error) {
            mensajeroController.error(error.message, interaction);
        }

    }
}

