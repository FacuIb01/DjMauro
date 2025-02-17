

class MensajeroController{
    constructor(mensajero){

        if(typeof MensajeroController.instance === "object"){
            return MensajeroController.instance;
        }
        this.mensajero = mensajero

        MensajeroController.instance = this;
        return this;
    }
        saludo(interaction){
            this.mensajero.saludo(interaction)
        }
    
        error(errorMessage, interaction){
            this.mensajero.error(errorMessage, interaction)
        }
    
        siguienteCancion(interaction){
            this.mensajero.siguienteCancion(interaction)
        }
    
        detener(interaction){
            this.mensajero.detener(interaction)
        }
    
        resume(interaction){
            this.mensajero.resume(interaction)
        }
    
        cargandoCancion(interaction){
            this.mensajero.cargandoCancion(interaction)
        }
    
        listarCola(interaction, lista){
            this.mensajero.listar(interaction, lista, `📜 Lista de reproduccion`, "📌 Elementos:")
        }
    
        listarComandos(interaction, lista){
            this.mensajero.listar(interaction,lista, `📜 Lista de comandos`, "📌 Comandos:")
        }

    async listarCanciones(interaction, nombreCancion){
        let canciones = await this.mensajero.buscarCancionesYListar(nombreCancion)

        this.mensajero.listar(interaction, canciones, `📜 Lista de canciones`, "📌 Copiar url y usar comando !p para reproducir la cancion deseada:")
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

module.exports = MensajeroController