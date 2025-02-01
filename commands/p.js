const { joinVoiceChannel} = require('@discordjs/voice');

function conectarBot(canal) {
    return joinVoiceChannel({
        channelId: canal.id,
        guildId: canal.guild.id,
        adapterCreator: canal.guild.voiceAdapterCreator,
    });
}

module.exports = {
    description: "este comando es el encargado de reproducir la musica creando un reproductor",
    run: async (message, reproductor) => {
        try {
            if(!message.member.voice.channel){
                message.channel.send("Tenes que estar en un chat de voz papito no me bolacees")
                return;
            }

            let nombreCancion = message.content.split(" ").slice(1).join(" ")


            const canal = message.member.voice.channel
                        
            const conexion = conectarBot(canal);

            // Agregar el player a la conexión de voz
            conexion.subscribe(reproductor.getAudioPlayer());

            // Reproducir el audio
            await reproductor.reproducir(nombreCancion)
            message.reply("cargando cancion...")
        } catch (error) {
            message.reply(error.message);
        }

    }
}

