const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const menu = require("./lib/menu.js");
const tambahan = require("./lib/tambahan.js")
const donasi = require("./lib/donasi.js");
const info = require("./lib/info.js");

/////////////////
const BotName = 'Putra_Prawangsa'; 
const instagram = 'KOSONG'; 
const telegram = 'Tidak Punya'; 
const kapanbotaktif = '24 JAM OFFLINE ~SIBUK  !!!~'; 
const youtube = 'Tidak Punya';
//const grupch1 = 'belum ada grup'; 
//const grupch2 = 'belum ada grup' ; 
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] SCAN QR !!!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
 //uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log('Bot by Putra_Prawangsa')
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by Putra_Prawangsa`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Groups

if (text.includes("!buatgrup"))
   {
var nama = text.split("!buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("Grup telah dibuat dengan id: " + group.gid)
conn.sendMessage(group.gid, "Halo semua!!!", MessageType.extendedText) // say hello to everyone on the group

}
//chat
if (text == 'halo')
{
conn.sendMessage(id, tambahan.halo ,MessageType.text);
}
else if (text == 'Intro')
{
conn.sendMessage(id, tambahan.intro ,MessageType.text);
}
else if (text == 'hai')
{
conn.sendMessage(id, tambahan.hai ,MessageType.text);
}
else if (text == 'assalamualaikum')
{
conn.sendMessage(id, tambahan.ass ,MessageType.text);
}
else if (text == 'bro')
{
conn.sendMessage(id, tambahan.bro ,MessageType.text);
}
else if (text == 'p')
{
conn.sendMessage(id, tambahan.p ,MessageType.text);
}
else if (text == 'test')
{
  conn.sendMessage(id, tambahan.test, MessageType.text);
}
else if (text == 'HALO')
{
conn.sendMessage(id, tambahan.halo ,MessageType.text);
}
else if (text == 'Halo')
{
conn.sendMessage(id, tambahan.halo ,MessageType.text);
}
else if (text == 'Hai')
{
conn.sendMessage(id, tambahan.hai ,MessageType.text);
}
else if (text == 'Assalamualaikum')
{
conn.sendMessage(id, tambahan.ass ,MessageType.text);
}
else if (text == 'Bro')
{
conn.sendMessage(id, tambahan.bro ,MessageType.text);
}
else if (text == 'P')
{
conn.sendMessage(id, tambahan.p ,MessageType.text);
}
else if (text == 'Test')
{
  conn.sendMessage(id, tambahan.test, MessageType.text);
}
else if (text == 'HAI')
{
conn.sendMessage(id, tambahan.hai ,MessageType.text);
}
else if (text == 'ASSALAMUALAIKUM')
{
conn.sendMessage(id, tambahan.ass ,MessageType.text);
}
else if (text == 'BRO')
{
conn.sendMessage(id, tambahan.bro ,MessageType.text);
}
else if (text == 'TEST')
{
  conn.sendMessage(id, tambahan.test, MessageType.text);
}
// Fitur
if(text.includes("$cek")){
var num = text.replace(/.cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn

const exists = await conn.isOnWhatsApp (gg)
console.log(exists);
conn.sendMessage(id ,`Nomor HPmu Adalah: ${id.split("@s.whatsapp.net")[0]}`, MessageType.text)
}

if (text.includes("$say")){
  const teks = text.replace(/.say /, "")
conn.sendMessage(id, teks, MessageType.text)
	
}
if (text.includes('$nulis')){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
  var teks = text.replace(/.nulis /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
		  conn.sendMessage(id, '*SUKSES*', MessageType.text)
        })
    })
}

if (text.includes("$ytmp3")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.ytmp3 /, "")
axios.get(`http://scrap.terhambar.com/yt?link=${teks}`).then((res) => {
    let hasil = `${res.data.title}\n\n${res.data.filesize}\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}
if (text.includes("$infoig")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
  const teks = text.replace(/.infoig /, "")
  axios.get(`https://st4rz.herokuapp.com/api/stalk?username=${teks}`).then ((res) =>{
  conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
  let hasil = `BIODATA INSTAGRAM ATAS NAMA _${teks}_ \n\n *Username* : _${res.data.Username}_ \n *Nama* : _${res.data.Name}_ \n *Jumlah Followers* : _${res.data.Jumlah_Followers}_ \n *Jumlah_Following* : _${res.data.Jumlah_Following}_ \n *Jumlah_Post* : _${res.data.Jumlah_Post}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
	  conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}
if (text.includes("$infogempa")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
  const teks = text.replace(/.infogempa /, "")
  axios.get(`https://st4rz.herokuapp.com/api/infogempa`).then ((res) =>{
  conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
  let hasil = ` *INFO GEMPA* \n\ *Lokasi* : _${res.data.lokasi}_ \n *Kedalaman* : _${res.data.kedalaman}_ \n *Koordinat* : _${res.data.koordinat}_ \n *Magnitude* : _${res.data.magnitude}_ \n *Waktu* : _${res.data.waktu}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
	  conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}
if (text.includes("$chord")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.chord /, "")
axios.get(`https://st4rz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
	conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
    let hasil = `Cord Lagu ${teks}  \n\nCord: _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

if (text.includes("$yt")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.yt /, "")
axios.get(`http://scrap.terhambar.com/yt?link=${teks}`).then((res) => {
    let hasil = `${res.data.title}\n\n${res.data.filesize}\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

if (text.includes("$tts")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.tts /, "")
const gtts = (`https://rest.farzain.com/api/tts.php?id=${teks}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    conn.sendMessage(id, gtts ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
}

if (text.includes("$fb")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.fb /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/epbe?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `${res.data.title}\n\n${res.data.filesize}\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

if (text.includes("$ig")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.ig /, "")
axios.get(`https://st4rz.herokuapp.com/api/ig?url=${teks}`).then((res) => {
    let hasil = `${res.data.filesize}\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

if (text.includes("$twt")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `${res.data.filesize}\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}
if (text.includes("$tiktok")) {
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const tictoc = text.replace(/.tiktok /, "")
axios.get(`https://st4rz.herokuapp.com/api/tiktok?url=${tictoc}`).then((res) => {
     let titoe = `${res.data.deskripsi} \n\n${res.data.durasi}\n\n${res.data.nama}\n\n${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}
if (text.includes("$sholat")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
  const teks = text.replace(/.sholat /, "")
  axios.get(`https://mhankbarbar.herokuapp.com/api/jadwalshalat?daerah=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then ((res) =>{
  let hasil = `Jadwal sholat di *[${teks} ]* hari ini adalah\n\n👉Imsyak : ${res.data.Imsyak}\n👉Subuh : ${res.data.Subuh} WIB\n👉Dzuhur : ${res.data.Dzuhur}WIB\n👉Ashar : ${res.data.Ashar} WIB\n👉Maghrib : ${res.data.Maghrib}\n👉Isya : ${res.data.Isya} WIB\n👉Tengah malam : ${res.data.Dhuha} WIB`;
  conn.sendMessage(id, hasil, MessageType.text);
	  conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

if (text.includes("$wiki")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const teks = text.replace(/.wiki /, "")
axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
	conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
    let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
}

   else if (text.includes("$nama")) {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split(".nama ")[1];
    var req = nama.replace(/ /g,"+");
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
      },function(error, response, body){
          let $ = cheerio.load(body);
          var y = $.html().split('arti:')[1];
          var t = y.split('method="get">')[1];
          var f = y.replace(t ," ");
          var x = f.replace(/<br\s*[\/]?>/gi, "\n");
          var h  = x.replace(/<[^>]*>?/gm, '');
      console.log(""+ h);
      conn.sendMessage(id,
            `
      Arti dari namamu adalah
____________________________________
         Nama _*${nama}*_ ${h}
____________________________________
`,
 MessageType.text);
	    conn.sendMessage(id, '*SUKSES*', MessageType.text)
  });
}
  else if (text.includes("$pasangan")) {
	 conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
    const request = require('request');
    var gh = text.split(".pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `
____________________________________
 *Kecocokan berdasarkan nama*
 ${d}
____________________________________
    `, MessageType.text);
	    conn.sendMessage(id, '*SUKSES*', MessageType.text)
  }); 
}
if (text == '$menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, telegram, youtube, kapanbotaktif) ,MessageType.text);
}
else if (text == '$quran'){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
	
}

else if (text == '$donasi'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donasi.donasi(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, telegram, youtube, kapanbotaktif) ,MessageType.text);
}
else if (text == '$info'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, telegram, youtube, kapanbotaktif) ,MessageType.text);
}
else if (text == '$pict'){
conn.sendMessage(id, 'ulangi dengan  $pict cewek/cowok\n\nMisal: $pict cowok' ,MessageType.text);
}
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '$sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
		 conn.sendMessage(id, '*SUKSES*', MessageType.text)
         });
      }
   }
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '$pantun')
      {
conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
		 conn.sendMessage(id, '*SUKSES*', MessageType.text)
            });
      }

   };
      if (text.includes("$covid"))
   {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {

    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,`DATA WABAH COVID-19 TERBARU DI INDONESIA\n\nPositif ==> *[${positif} ]* \nSembuh ==> *[${sembuh} ]*\nMeninggal ==> *[${meninggal} ]*\nDirawat ==> *[${dirawat} ]*`, MessageType.text);
conn.sendMessage(id, '*SUKSES*', MessageType.text)
   }
   if (text.includes("$quotes"))
   {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
     
     _${kata}_
        
    
	*Putra_Prawangsa*
         `, MessageType.text
            );
conn.sendMessage(id, '*SUKSES*', MessageType.text)
         });
   }
   if (text.includes("$pict cewek"))
   {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "remaja cantik", "cewek korea", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       conn.sendMessage(id, '*SUKSES*', MessageType.text)
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   if (text.includes("$pict cowok"))
   {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy", "cowok indo ganteng", "cowok korea"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok =  z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok) 
        .then(
            (response) => {
  var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       conn.sendMessage(id, '*SUKSES*', MessageType.text)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

if (text.includes("$animepict"))
   {
	   conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic", "anime hd", "gambar anime hd"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       conn.sendMessage(id, '*SUKSES*', MessageType.text)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
}
if (text.includes("$pokemon"))
{
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
var items = ["anime pokemon"];
var nime = items[Math.floor(Math.random() * items.length)];
var url = "https://api.fdci.se/rep.php?gambar=" + nime;
axios.get(url)
.then((result) => {
var n = JSON.parse(JSON.stringify(result.data));
var nimek =  n[Math.floor(Math.random() * n.length)];
imageToBase64(nimek) 
.then(
(response) => {
conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
var buf = Buffer.from(response, 'base64'); 
conn.sendMessage(
id,
buf,MessageType.image)
	conn.sendMessage(id, '*SUKSES*', MessageType.text)
}
)
.catch(
(error) => {
console.log(error);
}
)
});
}
if (text.includes("$loli"))
{
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
var items = ["anime loli"];
var nime = items[Math.floor(Math.random() * items.length)];
var url = "https://api.fdci.se/rep.php?gambar=" + nime;
axios.get(url)
.then((result) => {
var n = JSON.parse(JSON.stringify(result.data));
var nimek =  n[Math.floor(Math.random() * n.length)];
imageToBase64(nimek) 
.then(
 (response) => {
conn.sendMessage(id, 'Sedang diproses...', MessageType.text)
var buf = Buffer.from(response, 'base64'); 
 conn.sendMessage(
id,
buf,MessageType.image)
	 conn.sendMessage(id, '*SUKSES*', MessageType.text)
})
.catch(
(error) => {
console.log(error);
})
});
}
if (text.includes("$lirik")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
	const teks = text.split("$lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	 	let hasil = `\n*[${teks}]*\n\n\n____________________________________\n ${res.data.result.lirik}\n\n____________________________________`
	conn.sendMessage(id, hasil, MessageType.text)
		conn.sendMessage(id, '*SUKSES*', MessageType.text)
	})
}
if (text.includes("$alay")){
	conn.sendMessage(id, '*Sedang diproses...*', MessageType.text)
	const alay = text.split("$alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text)
		 conn.sendMessage(id, '*SUKSES*', MessageType.text)
	})
}










//AKHIRNYAAAAAAAA


})
