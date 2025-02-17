class ReproductorController{
    constructor(reproductor){
        this.reproductor = reproductor
    }

    getAudioPlayer(){
        return this.reproductor.getAudioPlayer()
    }

    async reproducir(nombreCancion, canalTexto){
        try{
            await this.reproductor.reproducir(nombreCancion, canalTexto)
        }catch(err){
            throw Error(err.message)
        }
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

    pause(){
        this.reproductor.pause()
    }

    unpause(){
        this.reproductor.unpause()
    }

    clear(){
        this.reproductor.clear()
    }

    devolverLista(){
        return this.reproductor.devolverLista()
    }

    getActual(){
        return this.reproductor.obtenerActual()
    }

    getReproduciendo(){
        return this.reproductor.getReproduciendo()
    }



}


module.exports = ReproductorController