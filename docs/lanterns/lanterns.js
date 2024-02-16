//* Tone
window.settings = {
    pollInterval: 50,
    multiplier: 25,
    soundInput: false,
    meterInput: false
}

window.dataBuffer = {
    10:'',
    22:'',
    34:'',
    46:'',
    58:'',
    70:'',
    82:'',
    94:''
}

window.mic = new Tone.UserMedia();
window.meter = new Tone.Meter();
mic.connect(meter);

function stringRGBToHex(rgbString) {
    let separator = rgbString.indexOf(",") > -1 ? "," : " ";
    let rgb = rgbString.substr(4).split(")")[0].split(separator)
                       .map(value => {
                           if (value.includes('%')) {
                               value = Math.round(parseFloat(value) * 2.55);
                           }
                           return (+value).toString(16).padStart(2, '0');
                       });
  
    return `#${rgb.join('')}`;
}


const checkMeter = ()=>{
    let value = Tone.dbToGain(meter.getValue()) * settings.multiplier;
    document.querySelectorAll('.meter').forEach(element=>{
        element.style.backgroundColor = `rgba(255, 255, 255, ${value})`;
    });
    if(settings.soundInput){
        let colour = document.querySelector('.colours').value;
        
        let rgb = colour
            .replace('#','')
            .match(/.{1,2}/g)
            .map((item)=>parseInt(item, 16))
            .map((item)=>value*item)
            .map(item=>CM.map(item, 0, 255, 0, 255, true, true))
            .map(item=>item.toString(16).padStart(2, '0'))
            .join('');
            
        // console.log(colour, value, `#${rgb}`);
        document.querySelector('.virtualLantern[data-channel="10"]').style.backgroundColor = `#${rgb}`;
        if(serial.connected){
            if(window.dataBuffer['10'] != rgb){
                serial.write(`11${rgb}\n`);
            }
        }
        window.dataBuffer[10] = rgb;
        let colour2 = document.querySelector('#colourPicker2').value;
        let rgb2 = colour2
            .replace('#','')
            .match(/.{1,2}/g)
            .map((item)=>parseInt(item, 16))
            .map((item)=>value*item)
            .map(item=>CM.map(item, 0, 255, 0, 255, true, true))
            .map(item=>item.toString(16).padStart(2, '0'))
            .join('');
            
        // console.log(colour, value, `#${rgb2}`);
        document.querySelector('.virtualLantern[data-channel="22"]').style.backgroundColor = `#${rgb2}`;
        if(serial.connected){
            if(window.dataBuffer['22'] != rgb2){
                setTimeout(()=>{serial.write(`22${rgb2}\n`)}, 10);
                // serial.write(`22${rgb2}\n`);
            }
        }
        window.dataBuffer[22] = rgb2;
        
    }
    if(settings.meterInput)setTimeout(checkMeter, settings.pollInterval);
}

//* hex channel numbers: 10, 22, 34, 46, 58, 70, 82, 94

window.addEventListener('load', ()=>{
    document.querySelectorAll('.colours').forEach(element=>{
        element.addEventListener('input', (e)=>{
            let colourString = e.target.value.replace('#',e.target.dataset.channel).toUpperCase()+"\n"
            console.log('colour', e.target.value);
            if(window.verbose) console.log(colourString);
            if(!serial.connected) return;
        if(!settings.soundInput) serial.write(colourString);
        })  
    })
    
    document.querySelectorAll('.microphone').forEach(element=>{
        element.addEventListener('click', (e)=>{
            let value = e.target.ariaChecked == 'true' ? 'false' : 'true';
            e.target.ariaChecked = value;
            if(value == 'true'){
                settings.soundInput = true;
                mic.open().then(()=>{console.log('Mic open')});
                settings.meterInput = true;
                checkMeter();
            }
            else{
                settings.soundInput = false;
                mic.close();
                settings.meterInput = false;
            }
        })
    })
    
    document.querySelectorAll('.connect').forEach(element=>{
        element.addEventListener('click', (e)=>{
            Tone.start();
            if(serial.connect()){
                setInterval(()=>{
                    if(serial.connected){
                        e.target.disabled = true;
                        e.target.innerHTML = "CONNECTED";
                    }
                }, 1000)
            }
            
        })
    })
    
    document.querySelectorAll('.gainFader').forEach(element=>{
        element.addEventListener('input', (e)=>{
            settings.multiplier = e.target.value * 100;
            document.querySelectorAll('.gainReading').forEach(element=>{
                element.innerHTML = Math.round(settings.multiplier, 2);
            });
        })
    })
})

document.querySelectorAll('.wedge').forEach(x=>{
    x.addEventListener('click',e=>{
        let newValue = stringRGBToHex(e.target.style.fill);
        document.querySelector('.colours').value = newValue;
    })
})

