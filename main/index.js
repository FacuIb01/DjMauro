const {Client, Events} = require("discord.js")
const Reproductor = require("../classes/reproductor")
const ReproductorController = require("../controllers/ReproductorController")
const reproductor = new Reproductor()
const reproductorController = new ReproductorController(reproductor)
require("dotenv").config()
const comandos = ["clear", "lista", "next", "p", "resume", "saludo", "pause"]

const client = new Client({
    intents: 53608447
})

client.on(Events.ClientReady, async() => {
        console.log(`Conectado como ${client.user.username}!`)
} )

client.on(Events.MessageCreate, async(message) => {
    //si el mensaje no comienza con ! entonces no hacemos nada
    if(!message.content.startsWith("!")) return;
    
    //obtenemos la accion
    let accion = message.content.split(" ")[0].slice(1);
    if(!comandos.includes(accion)){
        return message.reply("No conozco ese comando")
    }

    try{
        let comando = require(`../commands/${accion}.js`)
        comando.run(message, reproductorController)
    }catch(err){
        message.reply(err)
    }

})

client.login(process.env.CLAVE_BOT)


