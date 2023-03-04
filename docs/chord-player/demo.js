const presetTemplate = {
    envelope:{
        attack:0,
        decay:1,
        sustain:1,
        release:1
    },
    oscillator:{
        type:'sine',
        partials:[],
        partialCount:0

    }
}
// todo: make some template functions so that these don't have to be written out every time

const assign = function(){
    
  instrument.setAnimationsAsDictionary({
      'down': function(){
              this.screenElement.element.classList.add('playing')
      },
      'up': function(){
          this.screenElement.element.classList.remove('playing')     
      },
      'setNote': function(){
          let colour = cm.stom(this.note) % 12 * 30;
          this.screenElement.element.style.fill=`hsl(${colour}deg 40% 40%)`;
      }
    }).refreshElements()
      .initChordElement()
      .setChordList('C /G, F major, G major, A m/E')
      .selectChord(0)

  // set up midi
  window.midiMapper = new MidiMapper()
  midiMapper.listen();

  let guitarStrings = [40,45,50,55,59,64];

  // todo: add 'assign as dictionary' to midiMapper

  guitarStrings.forEach((x,i)=>{
      midiMapper.assign(16, 'note', x, function(velocity){
          instrument.noteEvent(i,velocity/127);
      })
      midiMapper.assign(16, 'noteOff', x, function(velocity){
          instrument.noteEvent(i,0);
      })
  })
  
  // testing: set the four lowest notes on channel 1 to switch chords
  if(typeof instrument.chordList !='undefined'){
      for(let i=0;i<instrument.chordList.length;i++){
          midiMapper.map[0].note[i] = function(){
              instrument.selectChord(i)
          }
      }
  }

  midiMapper.assignRange(2,'full',function(pitch,velocity){
      console.log('♦️ playing notes..')
  });

}