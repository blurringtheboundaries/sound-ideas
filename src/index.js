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
        // try a throw/catch here
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else {
            // todo: add a back button or message
            console.log('fullscreen not supported -- goto page with ?embed=true to hide header and footer')
            window.top.location.href=window.location.href;
        }
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