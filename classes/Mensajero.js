const { EmbedBuilder } = require('discord.js');

class Mensajero{
    constructor(interaction){
        this.canal = interaction.channel
    }

    mensajeEmbebido(cancion){
        const mensajeCancion = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${cancion.nombre}`)
        .setThumbnail(`${cancion.thumbnail}`)
        .addFields(
            { name: "Vistas", value: `${cancion.views}` },
            { name: `Duracion`, value: `${cancion.duracion}`, inline: true },
        )

        canal.send({ embeds: [mensajeCancion] });
    }

}

module.exports = Mensajero