function display(msg){
  document.getElementById('display').innerHTML=msg;
}
  
function rotate(text, noOfChars = 0){
  const chars = Array.from(text);
  const n = noOfChars % chars.length;
  const newArr = chars.slice(n).concat(chars.slice(0, n));
  return newArr.join("");
}
  
  
let basic = "TTSTTTS";
let modes = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

let chosenMode = 'Dorian', currentScale;

let octave = 4;
let key = cm.stom('C0');

let chromatic = ['C', 'C#', 'D', 'D#','E','F', 'F#','G','G#','A','B'];
let octaves = [0, 1, 2, 3, 4, 5, 6];

let scales = {modes:{}};
let msg = "";

modes.forEach((mode, i) => {
  let output = rotate(basic,i)
  scales.modes[mode]=[];
  let num=0;
  for (let interval of [0].concat(Array.from(output))){
    num += interval == 0 ? 0 : (interval == 'T' ? 2 : 1);
    scales.modes[mode].push(num)
  }
  msg += `${mode}: ${output}, ${scales.modes[mode]}<br>`
});

// display(msg)
// let menus = {
//   modes: cm.create('select',{
//     id:'modeMenu',
//     oninput:function(){chooseMode(this.value)}
//   }),
//   notes : cm.create('select',{
//     id:'noteMenu',
//    oninput:function(){setKey(this.value)}
//   }),
//   octave : cm.create('select',{
//     id:'octaveMenu',
//    oninput:function(){setOctave(parseInt(this.value))}
//   }),
//   range : cm.create('input',{
//     id:'rangeMenu',
//     min:1,
//     max:256,
//     type:'number',
//     value:8
//   })
// }
//
// cm.populate(menus.modes, modes, 'Dorian')
// cm.populate(menus.notes, chromatic, 'C')
// cm.populate(menus.octave, octaves, 3);

// modes.forEach((x)=>modeMenu.appendChild(cm.create('option',{value:x,innerHTML:x})))

  // document.getElementById('display').appendChild(menus.notes)
  // document.getElementById('display').appendChild(menus.modes)
  // document.getElementById('display').appendChild(menus.octave)
  // document.getElementById('display').appendChild(menus.range)
  // menus.octave.oninput()

/**
 * @class CM_Instrument
 * @param {Object} p - parameters
 */

class CM_Instrument{
  constructor(p){
    console.log('number of voices:',p.voices)
    
    this.output = new Tone.Channel().toDestination();
    this.voices=[];
    this.current=[0];

    this.steal = 'steal' in p ? p.steal : true;
    for(let i=0;i<p.voices;i++){
      console.log('created',i)
      let osc = new Tone.Oscillator({frequency:cm.mtof(60+i),type:"sine", volume:cm.v(0.2)})
      let env = new Tone.AmplitudeEnvelope({release:10})
      env.id=i;
      
      //let's go with buggy polyphony for now, but update w callback later
      //env.triggerRelease = function(time){}
      osc.start()
      osc.connect(env)
      env.connect(this.output)
      this.voices.push({osc:osc, env:env, active:false, pitch:0});
    }
  }
  
  noteOn(pitch, velocity){
    let voice = this.assign(pitch, true)
    // console.log('VOICE', voice)
    switch(voice){
      case 'full':
        // console.log('full')
        break;
      case 'not present':
        // console.log('attempted note off')
        break;
      default:
        this.voices[voice].osc.frequency.value=cm.mtof(pitch)
        this.voices[voice].env.triggerAttack()
    }
  }

  noteOff(pitch, velocity){
    let voice = this.assign(pitch, false)
    // console.log('VOICE', voice)
    switch(voice){
      case 'full':
        // console.log('full')
        break;
      case 'not present':
        // console.log('attempted note off')
        break;
      default:
        this.voices[voice].env.triggerRelease()

    }
  }
  
  assign(pitch, active){
    // console.log('attempt with pitch '+pitch + ' ' + active)
    let index = this.current.indexOf(pitch)
    if (!active){
      // console.log('note off',pitch, index)
      switch(index){
        case -1:
          return 'not present'; // can't turn it off if it isn't in the queue
          // console.log(this.current)
        default:
          //set a callback according to release time?
          console.log()
          return index
        }
  } else {
    if(index!=-1){
      return this.current.indexOf(pitch)
    } else {
      if(this.current.length>=this.voices.length){
        if(this.steal){
          this.current = this.current.slice(1)
        } else {
          // console.log('full');
          return 'full';
        }
      }
      this.current.push(pitch)

      let newIndex= this.current.indexOf(pitch)
      return newIndex

      }
  }
}
}


function chooseMode(chosenMode){
  currentScale = scales.modes[chosenMode];
  
  console.log('new scale',currentScale[0], currentScale[currentScale.length-1])
  
  if(currentScale[0] % currentScale[currentScale.length-1] == 0){
    currentScale = currentScale.slice(0,-1)
  }
  
  console.log(currentScale);
}

chooseMode('Dorian');

function setKey(str){
  key = cm.stom(str+-1)
  console.log(key)
}

function setOctave(newOctave){
  octave = newOctave
}

let numVoices = 8;
let test = new CM_Instrument({voices:8, steal:true});