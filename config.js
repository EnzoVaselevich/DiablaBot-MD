/* ⚙️ Credits to:
* AzamiJs
* Elrebelde21
* GataNina-Li */

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'

global.owner = [

['5491130182250', '✨Enzito(OFC)💥', true]];

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +59309090909
global.confirmCode = ''

global.suittag = ['5214531287294']
global.mods = []
global.prems = []

//Solo desarrolladores aprobados
global.isdev = [['5217294888993'], ['5492266466080'], ['5492266613038'], ['5215610314499']]

//Aqui encuentras los nombres del bot
global.packname = ''
global.author = 'DiblaBot-MD'
global.wm = '© DiablitaBot-MD'
global.wm2 = 'DiablaBot | MD'
global.azami = 'EnzitoOFC'
global.cb = 'DiablaBot-MD'

//Las Versiones Y Entre Otros
global.vs = 'V2'
global.library = 'Baileys'
global.baileys = '@whiskeysockets/baileys'
global.lenguaje = 'Español'
global.menudi = ['⛶','❏','⫹⫺']
global.dev = '¿Enzo ~ Zam?'
global.devnum = '+5491130182250'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.yellow('Se actualizo el archivo config.js'))
import(`${file}?update=${Date.now()}`)
})
