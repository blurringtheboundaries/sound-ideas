import pug from 'pug';
import fs from 'fs';

let pugFiles = [
    'index',
    'gallery',
    'chord-player',
    'note-player',
    'fullscreen',
    'embed-demo',
    'embed-copper',
    'setup',
    'fader',
    'chord-sequencer', 
    'sensors',
    'painting'
]

// 'note-player/copper'

let pugSourceFolder = './pug';
let pugOutputFolder = './docs'

for (let file of pugFiles){
var htmlOutput = pug.render(fs.readFileSync(
    `${pugSourceFolder}/${file}.pug`, "utf-8"),
    {
        filename: `${pugSourceFolder}/${file}.pug`,
        pretty: true}
    )
   
  fs.writeFileSync(`${pugOutputFolder}/${file}.html`, htmlOutput, "utf-8");
}