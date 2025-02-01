class ReproductorController{
    constructor(reproductor){
        this.reproductor = reproductor
    }

    getAudioPlayer(){
        return this.reproductor.getAudioPlayer()
    }
    async reproducir(nombreCancion){
        this.reproductor.reproducir(nombreCancion)
    }
    async reproducirSiguiente(){
        this.reproductor.reproducirSiguiente()
    }

    siguienteCancion(){
        this.reproductor.siguienteCancion()
    }

    devolverLista() {
        this.reproductor.devolverLista()
    }

    stop(){
        this.reproductor.stop()
    }

    clear(){
        this.reproductor.clear()
    }

}


module.exports = ReproductorController