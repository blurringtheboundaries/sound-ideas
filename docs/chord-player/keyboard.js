keyboardMapper.keymap_assign({
    Digit: (e, item, down) => {
        if(!e.repeat){
        let note = parseInt(item)-1;              
            if (down) instrument.select(note, e.shiftKey);
            if(!e.shiftKey)instrument.noteEvent(note, down ? 1 : 0);
        }
    },
    Key: (e, item, down) => {
        if(!e.repeat){
            let chordKeys = ['Z','X','C','V'];
            if(chordKeys.includes(item)){
                
                instrument.selectChord(chordKeys.indexOf(item));
            }
        }
    }
})