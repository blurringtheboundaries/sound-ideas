import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';
import { ScreenInstrument, CM } from './instrument.js';

const params = new URLSearchParams(window.location.search);
console.log(params.has('embed'))

const checkEmbed = ()=>{
    if(params.has('embed')){
        document.querySelectorAll('header,footer,.instrument__title,.instrument__fullscreen').forEach(x=>x.classList.add('embed'));
    }
}

const openFullscreen = ()=>{
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }    
}

const loader = ()=>{
   createLinkSVG();
   gallery.init();
   checkEmbed();
}

export {
    loader, 
    gallery, 
    params,
    checkEmbed,
    openFullscreen
}