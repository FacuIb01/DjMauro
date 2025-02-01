module.exports = {
    description : "Este comando devuelve un saludo con el nombre del usuario que lo invoca",
    run:  async (message) => {
        let nombreAutor = message.author
        return message.reply(`Hola ${nombreAutor}, como estas?`)
    }
}

