// External toolbox by Charles Matthews 2022

let cm = {
  //Tone specifics
  mtof:function(num, transpose = 0){
    sym = Tone.Frequency(num, "midi").transpose(transpose)
    return Tone.Frequency(num, "midi").toFrequency()
  },

  mtos:function(num, transpose = 0, note=""){
    num = Tone.Frequency(num, "midi").transpose(transpose);
    return Tone.Frequency(num, "midi").toNote();
  },

  stof:function(sym, transpose = 0){
    sym = Tone.Frequency(sym).transpose(transpose)
    return Tone.Frequency(sym).toFrequency()
  },

  stom:function(sym, transpose = 0){
    sym = Tone.Frequency(sym).transpose(transpose)
    return Tone.Frequency(sym).toMidi()
  },

  ftos:function(freq, transpose = 0){
    sym = Tone.Frequency(freq).transpose(transpose)
    return Tone.Frequency(freq).toNote()
  },

  v:function(num){
    return Tone.gainToDb(num)
  },

  //General mapping tools
  map:function(value, x1, y1, x2, y2, constrain = false){
    value = (value - x1) * (y2 - x2) / (y1 - x1) + x2
    return constrain ? this.constrain(value,x2,y2) : value;
  },

  constrain:function(value, min, max){
    return value > max ? max : value < min ? min : value;
  },

  rot:function(array, amount){
    let output = [array.slice(amount), array.slice(0,amount)]
    return output[0].concat(output[1]);
  },

  //DOM manipulation

  set: function(element, obj){
    Object.entries(obj).forEach((x)=>{
      let [index, value] = x;
      switch(index){
        case 'custom':
          Object.entries(value).forEach((y)=>element.setAttribute(...y));
        break;
        case 'style':
          Object.entries(value).forEach((y)=>element.style[y[0]]=y[1]);
        break;
        default:
          element[index] = value;
      }
    })
  },

  setNS: function(element, obj){
    Object.entries(obj).forEach((x)=>{
      let [index, value] = x;
      switch(index){
        case 'custom':
          Object.entries(value).forEach((y)=>{
            element.setAttributeNS(xmlns,...y)
            // console.log(element)
          });
        break;
        case 'style':
          Object.entries(value).forEach((y)=>element.style[y[0]]=y[1]);
        break;
        default:
          element[index] = value;
      }
    })
  },

  create:function(type, obj){
    let element = document.createElement(type)
    this.set(element, obj)
    return element
  },

  createNS:function(type, obj){
    let element = document.createElementNS(xmlns, type)
    this.set(element, obj)
    return element
  },

  populate:function(menu, items, selected=false, type='option'){
      items.forEach((x)=>{
          let item = menu.appendChild(this.create(type,{value:x,innerHTML:x}))
          if(selected!=false)menu.value=selected
      })
  },

  within(x=0, y=0, values={left:0,right:0,top:0, bottom:0}){
    let output = x >= values.left && x <= values.right && y >= values.top && y <= values.bottom;
    return output;
  }
}

cm.createAnimation = function(attribute,events,duration,parameters={}){
  let values = '', times = ''
  events.forEach(([time,value],i)=>{
      if(parseFloat(time) % 1 ==0)time+='.00';
      let divider = i < Object.keys(events).length-1?'; ':'';
      times += `${time}${divider}`;
      values += `${value}${divider}`;
  })
  
  let output = cm.createNS(attribute='translate' ? 'animateTransform' : 'animate',{
      custom:{
          attributeName: attribute,
          begin: 'indefinite',
          repeatCount: '1',
          dur: `${duration}s`,
          fill: 'freeze',
          keyTimes:times,
          values:values
      }
  })
  output = Object.assign(output, parameters)
  return output;
}

cm.addAnimation = function(element,attribute,events,duration,parameters={}){
    let domElement = typeof element == 'object' ? element : document.getElementById(element)
    // console.log('id' in parameters)
    if(!('id' in parameters))parameters['id'] = `${domElement.id}_${attribute}`
    let animation = cm.createAnimation(attribute,events,duration,parameters)
    domElement.appendChild(animation);
    return animation
}

function interpolate(a, b, n) {
  return ((1 - n) * a) + (n * b);
}

function notify(...args){
  if (settings.verbose) {
    let message = '';
    for (let item of args){
      message+=item + ' ';
    }
    console.log(message);
  }
}

cm.apply = function apply(source, target){
  Object.entries(source).forEach((x)=>{
    target.setAttribute(...x)
  })
  for (let item of Object.keys(source)){
    target.setAttribute(item, source[item])
  }
}

function getTransformType(element){
  return element.getAttribute('transform').split("(")[0]
}

function includesScale(element){
  let testSplit = element.getAttribute('transform').includes('scale');
  return testSplit;
}

function getScale(element){
    let scaleValue = element.getAttribute('transform').split('scale').slice(-1)[0].replace(/[\(\)']+/g,'')
    scaleValue = parseFloat(scaleValue);
    return scaleValue;
}

function getTransformArray(element){
  if (getTransformType(element) == 'translate'){
    if (includesScale(element)){
      return element.getAttribute('transform').split("(")[1].split(")")[0].split(" ");
    } else {
        return element.getAttribute('transform').split("(")[1].split(")")[0].split(" ");
    }

  } else if (getTransformType(element) == 'matrix'){
    return element.getAttribute('transform').split("(")[1].split(")")[0].split(" ").slice(-2)
  }
}


function createE(type,attributes){
  var addr = document.createElementNS(xmlns, type);
  Object.entries(attributes).forEach((x)=>addr.setAttribute(...x))
  return addr
} 