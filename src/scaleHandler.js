export const scaleHandler = {
    current:{
        root:'C',
        scale:'major',
        octave:4,
        range:2
    },
    
    inputs:{
        root:document.querySelector('#select_root'),
        scale:document.querySelector('#select_scale'),
        octave:document.querySelector('#select_octave')
    },
    
    defaults:{
        notes:['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
        //- scales:['major','minor','blues'],
        scales:Scale.names(),
        octaves:[2, 3, 4, 5, 6, 7]
    },
    
    notes:[],
    
    cssSelector:'.screenNote',
    
    callback:function(){
        instrument.setNotes(this.notes);
    },
    
    populate_select_octave(start=1, input_octave = this.inputs.octave){
        input_octave.innerHTML=''
        this.defaults.octaves.forEach(octaveValue=>{
            let element = document.createElement('option')
            element.innerHTML = octaveValue;
            input_octave.appendChild(element);
        })
        input_octave.value = this.current.octave;
        return this;
    },
    
    populate_select_root(start='C', input_root = this.inputs.root){
        input_root.innerHTML=''
        this.defaults.notes.forEach(noteValue=>{
            let element = document.createElement('option')
            element.innerHTML = noteValue;
            input_root.appendChild(element);
        })
        input_root.value = this.current.root;
        return this;
    },
    
    populate_select_scale(root=this.current.root, input_scale = this.inputs.scale){
        input_scale.innerHTML='';
        
        this.defaults.scales.forEach(scaleValue=>{
            let element = document.createElement('option')
            element.innerHTML = scaleValue;
            input_scale.appendChild(element);
        })
        input_scale.value = this.current.scale;
        return this;
    },
    
    setScale(options={}){
        Object.assign(this.current,options);
        this.update();
        return this;
    },
    
    setOctave(options={}){
        Object.assign(this.current,options);
        this.update();
        return this;
    },
    
    update(){
        let {root, scale, octave, range} = this.current;
        this.notes =[]
        for(let i=0;i<range;i++){
            this.notes = this.notes.concat(Scale.get(`${root}${parseInt(octave)+i} ${scale}`).notes);
        }
        
        this.callback();
    },
    
    addListeners(){
        this.inputs.root.addEventListener('input',function(){
                scaleHandler.root = this.value;
                scaleHandler.populate_select_scale();
                scaleHandler.setScale({root:this.value})
        });
        
        this.inputs.scale.addEventListener('input',function(){
            scaleHandler.setScale({scale:this.value})
        });
        
        this.inputs.octave.addEventListener('input',function(){
            scaleHandler.setOctave({octave:this.value})
        });
    },
    
    init(){
        this.populate_select_root();
        this.populate_select_scale();
        this.populate_select_octave();
        this.addListeners();
    }
}