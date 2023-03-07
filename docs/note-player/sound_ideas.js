document.body.addEventListener('scroll',(e)=>{
    e.preventDefault();
})

// ---------------------------------setup---------------------------------

let noteArray = ['C4','D4','E4','G4','A4','C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6']
    .slice(0,document.querySelectorAll('.screenNote').length);

const getNoteId = function(id){
    return parseInt(id.split('_')[1])
}

// ---------------------------------set up instrument-----------------------

var instrument = new Instrument(noteArray, document.querySelector('#instrument__underlay'), false, 'instrument', {}, false);

instrument
    .placeAll(document.querySelector('#instrument__underlay'),'#note_INDEX')
    .setParameters({
        synth:{
            oscillator:{
                type:'sine2',
                volume:-16
            }
        }
    })
    .refreshElements()
    .cull()

// ---------------------------------set event listeners-----------------------

multitouchMapper
    .addStyles()
    .setDefaultAction(()=>{console.log('default')})
    .setAction('.screenNote',{
        start: function(element, e, obj){
            instrument
                .noteEvent(getNoteId(element.id),1)
                .bend(getNoteId(element.id), 0)
        },
        enter: function(element, e, obj){
            instrument
                .noteEvent(getNoteId(element.id),1)
                .bend(getNoteId(element.id), 0)
        }, 
        end: function(element, e, obj){
            instrument
                .noteEvent(getNoteId(element.id),0)
                .bend(getNoteId(element.id), 0)
        },
        leave: function(element, e, obj){
            instrument
                .noteEvent(getNoteId(element.id),0)
                .bend(getNoteId(element.id), 0)
        },
        move: function(element, e, obj){
            instrument
                .bend(getNoteId(element.id), -obj.distance.y)
        }
    })

keyboardMapper
    .keymap_assign({
        Digit: (e, item, down) => {
            if(!e.repeat){
            let note = parseInt(item)-1;              
                if (down) instrument.select(note, e.shiftKey);
                if(!e.shiftKey)instrument.noteEvent(note, down ? 1 : 0);
            }
        }
    })
        

