  document.querySelector('#instrument__chord-player').addEventListener('touchstart',(e)=>{
    e.preventDefault();
  })

  document.querySelector('#instrument__chord-player').addEventListener('touchmove',(e)=>{
    e.preventDefault();
  })

  // default chords
  let buttonNotes = ['C','F','G','Am'];
  
  document.querySelector('#instrument__chord-player').querySelectorAll('.button').forEach((x,i)=>{
    let button = document.createElement('button');
    button.classList.add('chord-selection__button');
    button.innerHTML = `
    <svg id="chord-selection__button__svg_${i}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <defs>
        <style>
          .selected{
            fill:black;
          }
        </style>

      </defs>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="50" fill="white">
        ${buttonNotes[i]}
      </text>
    </svg>
    `;
    
    button.setAttribute('id',x.id);

    let rect = x.getBoundingClientRect();
    button.style.left = rect.left + 'px';
    button.style.top = rect.top + 'px';
    button.style.width = rect.width + 'px';
    button.style.height = rect.height + 'px';
    button.style.display='block';
    button.style.position='absolute';
    document.querySelector('#chord-selection').appendChild(button);
  })

  window.onresize = () => {
    
    document.querySelector('#instrument__chord-player').querySelectorAll('.button').forEach(x=>{
      let button = document.querySelector('#chord-selection').querySelector('#'+x.id);
      let rect = x.getBoundingClientRect();
      button.style.left = rect.left + 'px';
      button.style.top = rect.top + 'px';
      button.style.width = rect.width + 'px';
      button.style.height = rect.height + 'px';
    })
    
  }

  window.onresize();
  //- instrument.initChordElement();