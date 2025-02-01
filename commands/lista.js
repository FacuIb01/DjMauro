module.exports = {
    description: "Esta funcion permite ver el listado de canciones en el reproductor de musica",
    run: async (message, reproductor) => {
        console.log(reproductor.devolverLista())
    }
}