const {createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus   } = require('@discordjs/voice');
const ytsr = require('@distube/ytsr');
const ytdl = require("@distube/ytdl-core");
const { EventEmitter } = require('events');
const Cancion = require('./cancion');


class Reproductor extends EventEmitter{
    constructor(){
        super()
        if(typeof Reproductor.instance === "object"){
            return Reproductor.instance;
        }
        this.audioPlayer = createAudioPlayer();
        this.reproduciendo = false;
        this.lista = [];
        this.actual = null;
        this.subscriptores = []
        

        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            this.reproducirSiguiente();
        });

        Reproductor.instance = this;
        return this;
    }

    getAudioPlayer(){
        return this.audioPlayer
    }

    async reproducir(nombreCancion){
        try{

            if(nombreCancion == ""){
                throw new Error("Ingresa un nombre de cancion querido... no tengo que explicarte todo")
            }
            let cancion = await this.crearInfoCancion(nombreCancion)
    
            if(this.reproduciendo){
                this.agregarCancionALista(cancion)
                return;
            }

            let stream = this.obtenerStreamAudio(cancion.url);
    
            this.setActual(cancion)
    
            // Crear recurso de audio correctamente
            let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    
            this.audioPlayer.play(resource)
    
            this.reproduciendo = true;
            
            //emitimos el evento para que el mensajero pueda obtener el mensaje correctamente
            this.emit("nuevaCancion", this.actual)

            return;
        }catch(err){
            throw Error(err.message)
        }
    }

    async crearInfoCancion(nombreCancion){
        let cancion = null;

        await ytsr(`${nombreCancion}`, { safeSearch: true, limit: 1 }).then(result => {
            let song = result.items[0];
            cancion = new Cancion(song.name, song.url, song.duration, song.views, song.thumbnail)
        })
        
        return cancion 
    }

    agregarCancionALista(urlCancion){
        this.lista.push(urlCancion)
    }

    async reproducirSiguiente(){
        let cancion = this.lista.shift()

        if(cancion == undefined){
            this.reproduciendo = false;
            this.audioPlayer.stop()
            return;
        }

        let stream = this.obtenerStreamAudio(cancion.url);

        this.setActual(cancion)

        // Crear recurso de audio correctamente
        let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

        this.audioPlayer.play(resource)

        this.emit("nuevaCancion", this.actual ,undefined)
        
        return;
    }


    //esta funcion devuelve el audio del video que queremos ver.
    obtenerStreamAudio (urlCancion) {
        return ytdl(`${urlCancion}`, {
            filter: "audioonly",
            quality: "highestaudio",
        });
    }

    siguienteCancion(){
        if(!this.lista.length){
            throw new Error("La lista de canciones esta vacia bro")
        }
        this.audioPlayer.stop()
        this.reproducirSiguiente()

    }

    setActual(cancion){
        this.actual = cancion
    }

    devolverLista() {
        return this.lista
    }

    pause(){
        this.audioPlayer.pause()
    }

    unpause(){
        this.audioPlayer.unpause()
    }

    clear(){
        this.audioPlayer.stop()
        this.lista = [];
        this.reproduciendo = false
    }

    getActual(){
        return this.actual
    }

    getReproduciendo(){
        return this.reproduciendo
    }

}

module.exports = Reproductor;