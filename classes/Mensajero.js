const { EmbedBuilder } = require('discord.js');
const ytsr = require('@distube/ytsr');

class Mensajero{
    constructor(client, eventos){

        if(typeof Mensajero.instance === "object"){
            return Mensajero.instance;
        }
        this.client = client
        this.canalTexto = undefined
        eventos.on("nuevaCancion", (cancion)=> {
            try{
                this.embedNuevaCancion(cancion, this.canalTexto)
            }catch(error){
                this.error(error.message)
            }
        })

        Mensajero.instance = this;
        return this;
    }

    saludo(interaction){
        let nombreAutor = interaction.author
        interaction.reply(`Hola ${nombreAutor}, como estas?`)
    }

    error(errorMessage, interaction){
        const embedError = new EmbedBuilder()
        .setTitle("❌ Error")
        .setDescription(errorMessage)
        .setColor("Red")
        if(!this.canalTexto){
            interaction.reply({embeds: [embedError]})
        }else{
            this.canalTexto.send({ embeds: [embedError] })
        }
    }

    siguienteCancion(interaction){
        try{
            this.actualizarCanalTexto(interaction)
            interaction.react(`⏩`)
        }catch (error) {
            this.error(error.message, interaction)
        }
    }

    detener(interaction){
        try {
            this.actualizarCanalTexto(interaction)
            interaction.react(`⏸`)
        } catch (error) {
            this.error(error.message, interaction)
        }
    }

    resume(interaction){
        try {
            interaction.react(`▶`)
        } catch (error) {
            this.error(error.message, interaction)
        }
    }

    cargandoCancion(interaction){
        try{
            this.actualizarCanalTexto(interaction)
            interaction.reply("Buscando cancion")
        }catch(error){
            this.error(error.message, interaction)
        }
    }

    actualizarCanalTexto(interaction){
        const canal = interaction.channel
        this.canalTexto = canal
    }


    embedNuevaCancion(cancion){
        const mensajeCancion = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle(`${cancion.nombre}`)
        .setThumbnail(`${cancion.thumbnail}`)
        .addFields(
            { name: "🔍 Vistas", value: `\`\`\`diff\n ${cancion.views}\n\`\`\`` , inline: true},
            { name: `⏱ Duracion`, value: `\`\`\`diff\n ${cancion.duracion}\n\`\`\``, inline: true },
        )
        .setImage("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDU5dDQ0bzljZ3JkaWFxc3ZoeXZscXU3Y2dsNG0wZW1lbndqYjF4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U2ato3NGKmjnMpCvq2/giphy.gif")
        

        this.canalTexto.send({ embeds: [mensajeCancion] });
    }

    listar(interaction, lista, nameTitle, nameField){
        const mensajeLista = new EmbedBuilder()
        .setTitle(`${nameTitle}`)
        .setColor("DarkBlue")
        .addFields(
            { name: `${nameField}`, value: `\`\`\`yaml\n${lista}\n\`\`\``, inline: false }
        )

        interaction.reply({embeds: [mensajeLista]})
    }

    
    async buscarCancionesYListar(nombreCancion){
        const canciones = await this.crearInfoCanciones(nombreCancion)
        let listaCanciones = ""

        canciones.forEach((e) => {
            listaCanciones +=  `${e.name} - ${e.url} \n \n`
        })
        return listaCanciones
    }
    
    async crearInfoCanciones(nombreCancion){
        let canciones = [];
        await ytsr(`${nombreCancion}`, { safeSearch: true, limit: 5 }).then(result => {
        canciones = result.items;
        })

        return canciones 
        }
    

    listaBorrada(interaction){
        try{
            interaction.react("⏹")
        }catch(error){
            this.error(error.message, interaction)
        }
    }

}

module.exports = Mensajero