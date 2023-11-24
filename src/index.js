import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';
import { ScreenInstrument, CM } from './instrument.js';
import { toggleFullscreen } from './toggleFullScreen.js';

import { generateRandomId } from './generateRandomId.js';
import { generateQRCode } from './generateQRCode.js';
import { scaleHandler } from './scaleHandler.js';

import tippy from 'tippy.js';
window.tippy = tippy;

const params = new URLSearchParams(window.location.search);

const checkEmbed = ()=>{
    if(params.has('embed')){
        document.querySelectorAll(
            'header,footer,.instrument__title,.instrument__fullscreen,body'
            ).forEach(x=>x.classList.add('embed'));
    }
}

window.ScreenInstrument = ScreenInstrument;

const loader = ()=>{
   createLinkSVG();
   gallery.init();
   checkEmbed();
   
//    tippy('#options__icon-type',{content:'Choose to show buttons as thumbnails or QR codes.', placement:'bottom', arrow:true, animation:'fade', theme:'light'})
   
   document.querySelectorAll('.instrument__fullscreen').forEach(x=>x.addEventListener('click', toggleFullscreen));
   document.querySelectorAll('header,footer').forEach(x=>x.classList.add('allowDefault'));
   document.addEventListener('screen-instrument-message', (e)=> {
        Tone.start();
        document.querySelectorAll('.audio_message').forEach(x=>{  
            x.innerHTML=e.detail.message;
            x.classList.add('show');
            setTimeout(()=>x.classList.remove('show'), 2000);
        });
   })
}

export {
    loader, 
    gallery, 
    params,
    checkEmbed,
    toggleFullscreen,
    generateRandomId,
    generateQRCode,
    scaleHandler
}

Object.assign(window,{
    generateQRCode
})