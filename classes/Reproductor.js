const {createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus   } = require('@discordjs/voice');
const ytsr = require('@distube/ytsr');
const ytdl = require("@distube/ytdl-core");
const Cancion = require('./cancion');


class Reproductor{
    constructor(){
        if(typeof Reproductor.instance === "object"){
            return Reproductor.instance;
        }
        this.audioPlayer = createAudioPlayer();
        this.reproduciendo = false;
        this.lista = [];
        this.actual = null;
        

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
    
            this.setActual(cancion.nombreCancion)
    
            // Crear recurso de audio correctamente
            let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    
            this.audioPlayer.play(resource)
    
            this.reproduciendo = true;
    
            return;
        }catch(err){
            throw Error(err.message)
        }
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

        this.setActual(cancion.nombreCancion)

        // Crear recurso de audio correctamente
        let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

        this.audioPlayer.play(resource)

        return;
    }

    async crearInfoCancion(nombreCancion){
            let cancion = null;

            await ytsr(`${nombreCancion}`, { safeSearch: true, limit: 1 }).then(result => {
                let song = result.items[0];
                cancion = new Cancion(nombreCancion, song.url, song.duration, song.views, song.thumbnail)
            })
            
            return cancion 
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

    setActual(nombreCancion){
        this.actual = nombreCancion
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
    }



}

module.exports = Reproductor;