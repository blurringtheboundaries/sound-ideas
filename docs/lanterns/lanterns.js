//* Tone
window.settings = {
    pollInterval: 30,
    multiplier: 25,
    soundInput: false,
    meterInput: false
}
const pollInterval = 30;
window.mic = new Tone.UserMedia();
window.meter = new Tone.Meter();
mic.connect(meter);

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
            // .map(item=>Math.min(item, 0))
            // convert item back to hex
            // .map(item=>item.toString(16))
            .map(item=>item.toString(16).padStart(2, '0'))
            
            
            // .map(item=>item*value)
            // .map((item)=>CM.map(value, 0, 255, 0, item, true, true))
            .join('');
            
        console.log(colour, value, `#${rgb}`);
        if(serial.connected)serial.write(`10${rgb}\n`);
        // let test = CM.map(value, 0, 1, 0, 255, true, true);
        
    }
    if(settings.meterInput)setTimeout(checkMeter, settings.pollInterval);
}

//* hex channel numbers: 10, 22, 34, 46, 58, 70, 82, 94

window.addEventListener('load', ()=>{
    document.querySelectorAll('.colours').forEach(element=>{
        element.addEventListener('input', (e)=>{
            let colourString = e.target.value.replace('#',e.target.dataset.channel).toUpperCase()+"\n"
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
            // let value = e.target.value;
            // let channel = e.target.dataset.channel;
            // let colourString = `#${value}${value}${value}${value}${value}${value}\n`.toUpperCase();
            // if(window.verbose) console.log(colourString);
            // if(!serial.connected) return;
            // serial.write(colourString);
        })
    })
    
    document.querySelectorAll('.connect').forEach(element=>{
        element.addEventListener('click', (e)=>{
            Tone.start();
            // mic.open().then(()=>{console.log('Mic open')});
            // checkMeter();
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
        })
    })
})

