import pug from 'pug';
import fs from 'fs';

let pugFiles = [
    'index'
]

let pugSourceFolder = './pug';
let pugOutputFolder = './docs'

for (let file of pugFiles){
var htmlOutput = pug.render(fs.readFileSync(
    `${pugSourceFolder}/${file}.pug`, "utf-8"),
    {filename: `${pugSourceFolder}/${file}.pug`,
pretty: true}
    )
   
   // htmlOutput = beautify(htmlOutput);
  fs.writeFileSync(`${pugOutputFolder}/${file}.html`, htmlOutput, "utf-8");
}