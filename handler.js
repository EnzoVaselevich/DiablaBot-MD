import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {smsg} from './lib/simple.js';
import {format} from 'util';
import {fileURLToPath} from 'url';
import path, {join} from 'path';
import {unwatchFile, watchFile} from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import mddd5 from 'md5';
import ws from 'ws';

/**
 * @type {import('@whiskeysockets/baileys')}
 */
const {proto} = (await import('@whiskeysockets/baileys')).default;
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
const delay = (ms) => isNumber(ms) && new Promise((resolve) => setTimeout(function() {
  clearTimeout(this);
  resolve();
}, ms));

/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate
 */
export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || [];
  this.uptime = this.uptime || Date.now();
  if (!chatUpdate) {
    return;
  }
  this.pushMessage(chatUpdate.messages).catch(console.error);
  let m = chatUpdate.messages[chatUpdate.messages.length - 1];
  if (!m) {
    return;
  }
  if (global.db.data == null) await global.loadDatabase();
  /* Creditos a Otosaka (https://wa.me/51993966345) */

  if (global.chatgpt.data === null) await global.loadChatgptDB();

  /* ------------------------------------------------*/
  try {
    m = smsg(this, m) || m;
    if (!m) {
      return;
    }
    global.mconn = m 
    m.exp = 0;
    m.money = false;
    m.limit = false;
    try {
      // TODO: use loop to insert data instead of this
      const user = global.db.data.users[m.sender];
      /* Creditos a Otosaka (https://wa.me/51993966345) */

      const chatgptUser = global.chatgpt.data.users[m.sender];
      if (typeof chatgptUser !== 'object') {
        global.chatgpt.data.users[m.sender] = [];
      }

      /* ------------------------------------------------*/
      if (typeof user !== 'object') {
        global.db.data.users[m.sender] = {};
      }
      if (user) {
        if (!isNumber(user.exp)) user.exp = 0;
        if (!('premium' in user)) user.premium = false;
        if (!isNumber(user.joincount)) user.joincount = 2;
        if (!isNumber(user.limit)) user.limit = 20;
        if (!isNumber(user.money)) user.money = 15;
        if (!('registered' in user)) user.registered = false;
        if (!user.registered) {
          if (!('name' in user)) user.name = m.name;
          if (!isNumber(user.age)) user.age = -1;
          if (!isNumber(user.anggur)) user.anggur = 0;
          if (!isNumber(user.apel)) user.apel = 0;
          if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
          if (!isNumber(user.bibitapel)) user.bibitapel = 0;
          if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
          if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
          if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
          if (!isNumber(user.emas)) user.emas = 0;
          if (!isNumber(user.jeruk)) user.jeruk = 0;
          if (!isNumber(user.kayu)) user.kayu = 0;
          if (!isNumber(user.makanan)) user.makanan = 0;
          if (!isNumber(user.mangga)) user.mangga = 0;
          if (!isNumber(user.pisang)) user.pisang = 0;
          if (!isNumber(user.premiumDate)) user.premiumDate = -1;
          if (!isNumber(user.regTime)) user.regTime = -1;
          if (!isNumber(user.semangka)) user.semangka = 0;
          if (!isNumber(user.stroberi)) user.stroberi = 0;
        }
        if (!isNumber(user.afk)) user.afk = -1;
                if (!('autolevelup' in user)) user.autolevelup = true;
                if (!('role' in user)) user.role = 'Novato';
        if (!isNumber(user.agility)) user.agility = 0;
        if (!isNumber(user.anakanjing)) user.anakanjing = 0;
        if (!isNumber(user.anakcentaur)) user.anakcentaur = 0;
        if (!isNumber(user.anakgriffin)) user.anakgriffin = 0;
        if (!isNumber(user.anakkucing)) user.anakkucing = 0;
        if (!isNumber(user.anakkuda)) user.anakkuda = 0;
        if (!isNumber(user.anakkyubi)) user.anakkyubi = 0;
        if (!isNumber(user.anaknaga)) user.anaknaga = 0;
        if (!isNumber(user.anakpancingan)) user.anakpancingan = 0;
        if (!isNumber(user.anakphonix)) user.anakphonix = 0;
        if (!isNumber(user.anakrubah)) user.anakrubah = 0;
        if (!isNumber(user.anakserigala)) user.anakserigala = 0;
        if (!isNumber(user.anggur)) user.anggur = 0;
        if (!isNumber(user.anjing)) user.anjing = 0;
        if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0;
        if (!isNumber(user.antispam)) user.antispam = 0;
        if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0;
        if (!isNumber(user.apel)) user.apel = 0;
        if (!isNumber(user.aqua)) user.aqua = 0;
        if (!isNumber(user.arc)) user.arc = 0;
        if (!isNumber(user.arcdurability)) user.arcdurability = 0;
        if (!isNumber(user.arlok)) user.arlok = 0;
        if (!isNumber(user.armor)) user.armor = 0;
        if (!isNumber(user.armordurability)) user.armordurability = 0;
        if (!isNumber(user.armormonster)) user.armormonster = 0;
        if (!isNumber(user.as)) user.as = 0;
        if (!isNumber(user.atm)) user.atm = 0;
        if (!isNumber(user.axe)) user.axe = 0;
        if (!isNumber(user.axedurability)) user.axedurability = 0;
        if (!isNumber(user.ayam)) user.ayam = 0;
        if (!isNumber(user.ayamb)) user.ayamb = 0;
        if (!isNumber(user.ayambakar)) user.ayambakar = 0;
        if (!isNumber(user.ayamg)) user.ayamg = 0;
        if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0;
        if (!isNumber(user.babi)) user.babi = 0;
        if (!isNumber(user.babihutan)) user.babihutan = 0;
        if (!isNumber(user.babipanggang)) user.babipanggang = 0;
        if (!isNumber(user.bandage)) user.bandage = 0;
        if (!isNumber(user.bank)) user.bank = 0;
        if (!isNumber(user.banteng)) user.banteng = 0;
        if (!isNumber(user.batu)) user.batu = 0;
        if (!isNumber(user.bawal)) user.bawal = 0;
        if (!isNumber(user.bawalbakar)) user.bawalbakar = 0;
        if (!isNumber(user.bayam)) user.bayam = 0;
        if (!isNumber(user.berlian)) user.berlian = 10;
        if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
        if (!isNumber(user.bibitapel)) user.bibitapel = 0;
        if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
        if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
        if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
        if (!isNumber(user.botol)) user.botol = 0;
        if (!isNumber(user.bow)) user.bow = 0;
        if (!isNumber(user.bowdurability)) user.bowdurability = 0;
        if (!isNumber(user.boxs)) user.boxs = 0;
        if (!isNumber(user.brick)) user.brick = 0;
        if (!isNumber(user.brokoli)) user.brokoli = 0;
        if (!isNumber(user.buaya)) user.buaya = 0;
        if (!isNumber(user.buntal)) user.buntal = 0;
        if (!isNumber(user.cat)) user.cat = 0;
        if (!isNumber(user.catexp)) user.catexp = 0;
        if (!isNumber(user.catlastfeed)) user.catlastfeed = 0;
        if (!isNumber(user.centaur)) user.centaur = 0;
        if (!isNumber(user.centaurexp)) user.centaurexp = 0;
        if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0;
        if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0;
        if (!isNumber(user.clay)) user.clay = 0;
        if (!isNumber(user.coal)) user.coal = 0;
        if (!isNumber(user.coin)) user.coin = 0;
        if (!isNumber(user.common)) user.common = 0;
        if (!isNumber(user.crystal)) user.crystal = 0;
        if (!isNumber(user.cumi)) user.cumi = 0;
        if (!isNumber(user.cupon)) user.cupon = 0;
        if (!isNumber(user.diamond)) user.diamond = 3;
        if (!isNumber(user.dog)) user.dog = 0;
        if (!isNumber(user.dogexp)) user.dogexp = 0;
        if (!isNumber(user.doglastfeed)) user.doglastfeed = 0;
        if (!isNumber(user.dory)) user.dory = 0;
        if (!isNumber(user.dragon)) user.dragon = 0;
        if (!isNumber(user.dragonexp)) user.dragonexp = 0;
        if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0;
        if (!isNumber(user.emas)) user.emas = 0;
        if (!isNumber(user.emerald)) user.emerald = 0;
        if (!isNumber(user.enchant)) user.enchant = 0;
        if (!isNumber(user.esteh)) user.esteh = 0;
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.expg)) user.expg = 0;
        if (!isNumber(user.exphero)) user.exphero = 0;
                if (!isNumber(user.eleksirb)) user.eleksirb = 0;
                if (!isNumber(user.emasbatang)) user.emasbatang = 0;
                if (!isNumber(user.emasbiasa)) user.emasbiasa = 0;
                if (!isNumber(user.fideos)) user.fideos = 0;
        if (!isNumber(user.fishingrod)) user.fishingrod = 0;
        if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0;
        if (!isNumber(user.fortress)) user.fortress = 0;
        if (!isNumber(user.fox)) user.fox = 0;
        if (!isNumber(user.foxexp)) user.foxexp = 0;
        if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0;
        if (!isNumber(user.fullatm)) user.fullatm = 0;
        if (!isNumber(user.gadodado)) user.gadodado = 0;
        if (!isNumber(user.gajah)) user.gajah = 0;
        if (!isNumber(user.gamemines)) user.gamemines = false;
        if (!isNumber(user.ganja)) user.ganja = 0;
        if (!isNumber(user.gardenboxs)) user.gardenboxs = 0;
        if (!isNumber(user.gems)) user.gems = 0;
        if (!isNumber(user.glass)) user.glass = 0;
        if (!isNumber(user.glimit)) user.glimit = 20;
        if (!isNumber(user.glory)) user.glory = 0;
        if (!isNumber(user.gold)) user.gold = 0;
        if (!isNumber(user.griffin)) user.griffin = 0;
        if (!isNumber(user.griffinexp)) user.griffinexp = 0;
        if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0;
        if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0;
        if (!isNumber(user.gulai)) user.gulai = 0;
        if (!isNumber(user.gurita)) user.gurita = 0;
        if (!isNumber(user.harimau)) user.harimau = 0;
        if (!isNumber(user.haus)) user.haus = 100;
        if (!isNumber(user.healt)) user.healt = 100;
        if (!isNumber(user.health)) user.health = 100;
        if (!isNumber(user.healthmonster)) user.healthmonster = 0;
        if (!isNumber(user.healtmonster)) user.healtmonster = 0;
        if (!isNumber(user.hero)) user.hero = 1;
        if (!isNumber(user.herolastclaim)) user.herolastclaim = 0;
        if (!isNumber(user.hiu)) user.hiu = 0;
        if (!isNumber(user.horse)) user.horse = 0;
        if (!isNumber(user.horseexp)) user.horseexp = 0;
        if (!isNumber(user.horselastfeed)) user.horselastfeed = 0;
        if (!isNumber(user.ikan)) user.ikan = 0;
        if (!isNumber(user.ikanbakar)) user.ikanbakar = 0;
        if (!isNumber(user.intelligence)) user.intelligence = 0;
        if (!isNumber(user.iron)) user.iron = 0;
        if (!isNumber(user.jagung)) user.jagung = 0;
        if (!isNumber(user.jagungbakar)) user.jagungbakar = 0;
        if (!isNumber(user.jeruk)) user.jeruk = 0;
        if (!isNumber(user.joinlimit)) user.joinlimit = 1;
        if (!isNumber(user.judilast)) user.judilast = 0;
        if (!isNumber(user.kaleng)) user.kaleng = 0;
        if (!isNumber(user.kambing)) user.kambing = 0;
        if (!isNumber(user.kangkung)) user.kangkung = 0;
        if (!isNumber(user.kapak)) user.kapak = 0;
        if (!isNumber(user.kardus)) user.kardus = 0;
        if (!isNumber(user.katana)) user.katana = 0;
        if (!isNumber(user.katanadurability)) user.katanadurability = 0;
        if (!isNumber(user.kayu)) user.kayu = 0;
        if (!isNumber(user.kentang)) user.kentang = 0;
        if (!isNumber(user.kentanggoreng)) user.kentanggoreng = 0;
        if (!isNumber(user.kepiting)) user.kepiting = 0;
        if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0;
        if (!isNumber(user.kerbau)) user.kerbau = 0;
        if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0;
        if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0;
        if (!isNumber(user.kerjadua)) user.kerjadua = 0;
        if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0;
        if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0;
        if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0;
        if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0;
        if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0;
        if (!isNumber(user.kerjadualima)) user.kerjadualima = 0;
        if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0;
        if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0;
        if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0;
        if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0;
        if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0;
        if (!isNumber(user.kerjaempat)) user.kerjaempat = 0;
        if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0;
        if (!isNumber(user.kerjaenam)) user.kerjaenam = 0;
        if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0;
        if (!isNumber(user.kerjalima)) user.kerjalima = 0;
        if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0;
        if (!isNumber(user.kerjasatu)) user.kerjasatu = 0;
        if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0;
        if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0;
        if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0;
        if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0;
        if (!isNumber(user.kerjatiga)) user.kerjatiga = 0;
        if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0;
        if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0;
        if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0;
        if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0;
        if (!isNumber(user.korbanngocok)) user.korbanngocok = 0;
        if (!isNumber(user.kubis)) user.kubis = 0;
        if (!isNumber(user.kucing)) user.kucing = 0;
        if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0;
        if (!isNumber(user.kuda)) user.kuda = 0;
        if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0;
        if (!isNumber(user.kyubi)) user.kyubi = 0;
        if (!isNumber(user.kyubiexp)) user.kyubiexp = 0;
        if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0;
        if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0;
        if (!isNumber(user.labu)) user.labu = 0;
        if (!isNumber(user.laper)) user.laper = 100;
        if (!isNumber(user.lastadventure)) user.lastadventure = 0;
        if (!isNumber(user.lastbansos)) user.lastbansos = 0;
        if (!isNumber(user.lastberbru)) user.lastberbru = 0;
        if (!isNumber(user.lastberkebon)) user.lastberkebon = 0;
        if (!isNumber(user.lastbunga)) user.lastbunga = 0;
        if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0;
                if (!isNumber(user.lastcoins)) user.lastcoins = 0;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
        if (!isNumber(user.lastcode)) user.lastcode = 0;
                if (!isNumber(user.lastcofre)) user.lastcofre = 0;
        if (!isNumber(user.lastcodereg)) user.lastcodereg = 0;
        if (!isNumber(user.lastcrusade)) user.lastcrusade = 0;
        if (!isNumber(user.lastdagang)) user.lastdagang = 0;
                if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0;
        if (!isNumber(user.lastduel)) user.lastduel = 0;
        if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
        if (!isNumber(user.lasteasy)) user.lasteasy = 0;
        if (!isNumber(user.lastfight)) user.lastfight = 0;
        if (!isNumber(user.lastfishing)) user.lastfishing = 0;
        if (!isNumber(user.lastgift)) user.lastgift = 0;
        if (!isNumber(user.lastgojek)) user.lastgojek = 0;
        if (!isNumber(user.lastgrab)) user.lastgrab = 0;
        if (!isNumber(user.lasthourly)) user.lasthourly = 0;
        if (!isNumber(user.lasthunt)) user.lasthunt = 0;
        if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0;
        if (!isNumber(user.lastjb)) user.lastjb = 0;
        if (!isNumber(user.lastkill)) user.lastkill = 0;
        if (!isNumber(user.lastlink)) user.lastlink = 0;
        if (!isNumber(user.lastlumber)) user.lastlumber = 0;
        if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0;
        if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0;
        if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0;
        if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0;
        if (!isNumber(user.lastmining)) user.lastmining = 0;
        if (!isNumber(user.lastmisi)) user.lastmisi = 0;
        if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;
        if (!isNumber(user.lastmulung)) user.lastmulung = 0;
        if (!isNumber(user.lastnambang)) user.lastnambang = 0;
        if (!isNumber(user.lastnebang)) user.lastnebang = 0;
        if (!isNumber(user.lastngocok)) user.lastngocok = 0;
        if (!isNumber(user.lastngojek)) user.lastngojek = 0;
        if (!isNumber(user.lastopen)) user.lastopen = 0;
        if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0;
                if (!isNumber(user.lastpago)) user.lastpago = 0;
        if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0;
        if (!isNumber(user.lastrampok)) user.lastrampok = 0;
        if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0;
        if (!isNumber(user.lastrob)) user.lastrob = 0;
        if (!isNumber(user.lastroket)) user.lastroket = 0;
        if (!isNumber(user.lastsda)) user.lastsda = 0;
        if (!isNumber(user.lastseen)) user.lastseen = 0;
        if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0;
                if (!isNumber(user.lastspam)) user.lastspam = 0;
        if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0;
        if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0;
        if (!isNumber(user.laststringclaim)) user.laststringclaim = 0;
        if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0;
        if (!isNumber(user.lastturu)) user.lastturu = 0;
        if (!isNumber(user.lastwar)) user.lastwar = 0;
        if (!isNumber(user.lastwarpet)) user.lastwarpet = 0;
        if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0;
        if (!isNumber(user.lastweekly)) user.lastweekly = 0;
        if (!isNumber(user.lastwork)) user.lastwork = 0;
        if (!isNumber(user.legendary)) user.legendary = 0;
        if (!isNumber(user.lele)) user.lele = 0;
        if (!isNumber(user.leleb)) user.leleb = 0;
        if (!isNumber(user.lelebakar)) user.lelebakar = 0;
        if (!isNumber(user.leleg)) user.leleg = 0;
        if (!isNumber(user.level)) user.level = 0;
        if (!isNumber(user.limit)) user.limit = 20;
        if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1;
        if (!isNumber(user.lion)) user.lion = 0;
        if (!isNumber(user.lionexp)) user.lionexp = 0;
        if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0;
        if (!isNumber(user.lobster)) user.lobster = 0;
        if (!isNumber(user.lumba)) user.lumba = 0;
        if (!isNumber(user.magicwand)) user.magicwand = 0;
        if (!isNumber(user.magicwanddurability)) user.magicwanddurability = 0;
        if (!isNumber(user.makanancentaur)) user.makanancentaur = 0;
        if (!isNumber(user.makanangriffin)) user.makanangriffin = 0;
        if (!isNumber(user.makanankyubi)) user.makanankyubi = 0;
        if (!isNumber(user.makanannaga)) user.makanannaga = 0;
        if (!isNumber(user.makananpet)) user.makananpet = 0;
        if (!isNumber(user.makananphonix)) user.makananphonix = 0;
        if (!isNumber(user.makananserigala)) user.makananserigala = 0;
     