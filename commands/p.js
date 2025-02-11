const { joinVoiceChannel} = require('@discordjs/voice');
const Mensajero = require("../classes/Mensajero")

function conectarBot(canal) {
    return joinVoiceChannel({
        channelId: canal.id,
        guildId: canal.guild.id,
        adapterCreator: canal.guild.voiceAdapterCreator,
    });
}


module.exports = {
    description: "este comando es el encargado de reproducir la musica creando un reproductor",
    run: async (interaction, reproductor) => {
        try {
            const mensajero = new Mensajero(interaction)

            if(!interaction.member.voice.channel){
                interaction.channel.send("Tenes que estar en un chat de voz papito no me bolacees")
                return;
            }
            
            let nombreCancion = interaction.content.split(" ").slice(1).join(" ")
            
            const canal = interaction.member.voice.channel
            
            const conexion = conectarBot(canal);
            
            // Agregar el player a la conexión de voz
            conexion.subscribe(reproductor.getAudioPlayer());
            interaction.reply("cargando cancion...")
            
            // Reproducir el audio
            await reproductor.reproducir(nombreCancion, interaction)

            //Mensaje Embebido
            if(!reproductor.getReproduciendo()){
                mensajero.mensajeEmbebido(reproductor.getActual(), interaction)
            }
        } catch (error) {
            interaction.channel.send(error.message);
        }

    }
}

