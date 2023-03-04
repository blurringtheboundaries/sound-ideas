import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';
import { ScreenInstrument, CM } from './instrument.js';
import { toggleFullscreen } from './toggleFullScreen.js';

const params = new URLSearchParams(window.location.search);
console.log(params.has('embed'))

const checkEmbed = ()=>{
    if(params.has('embed')){
        document.querySelectorAll('header,footer,.instrument__title,.instrument__fullscreen,body')
            .forEach(x=>x.classList.add('embed'));
    }
}




const loader = ()=>{
   createLinkSVG();
   gallery.init();
   checkEmbed();

   document.querySelectorAll('.instrument__fullscreen').forEach(x=>x.addEventListener('click', toggleFullscreen));
   document.querySelectorAll('header,footer').forEach(x=>x.classList.add('allowDefault'));
   document.addEventListener('screen-instrument-message', e=> {console.log('🎚',e)})
}

export {
    loader, 
    gallery, 
    params,
    checkEmbed,
    toggleFullscreen
}