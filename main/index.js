const {Client, Events} = require("discord.js")
require("dotenv").config()
const Reproductor = require("../classes/reproductor.js")
const ReproductorController = require("../controllers/ReproductorController")
const Mensajero = require("../classes/Mensajero")
const MensajeroController = require("../controllers/MensajeroController.js")

//SET UP
const client = new Client({
    intents: 53608447
})
const reproductor = new Reproductor()
const reproductorController = new ReproductorController(reproductor)
const mensajero = new Mensajero(client, reproductor)
const mensajeroController =  new MensajeroController(mensajero)
//SET UP

const comandos = ["clear", "lista", "next", "p", "resume", "saludo", "pause", "help", "plista"]

client.on(Events.ClientReady, async() => {
        console.log(`Conectado como ${client.user.username}!`)
} )

client.on(Events.MessageCreate, async(interaction) => {
    //si el mensaje no comienza con ! entonces no hacemos nada
    if(!interaction.content.startsWith("!")) return;
    
    //obtenemos la accion
    let accion = interaction.content.split(" ")[0].slice(1);
    if(!comandos.includes(accion)){
        return interaction.reply("No conozco ese comando")
    }

    try{
        let comando = require(`../commands/${accion}.js`)
        comando.run(interaction, reproductorController)
    }catch(error){
        mensajero.error(error.message, interaction)
    }

})

client.login(process.env.CLAVE_BOT)


