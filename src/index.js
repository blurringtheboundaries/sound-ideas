import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';
import { ScreenInstrument, CM } from './instrument.js';

const params = new URLSearchParams(window.location.search);
console.log(params.has('embed'))

const checkEmbed = ()=>{
    if(params.has('embed')){
        document.querySelectorAll('header,footer,.instrument__title,.instrument__fullscreen,body')
            .forEach(x=>x.classList.add('embed'));
    }
}

const toggleFullscreen = ()=>{
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if(document.webkitFullscreenElement){
        document.webkitExitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
    } else if(document.documentElement.webkitRequestFullscreen){
        document.documentElement.webkitRequestFullscreen();
    } else {
        if(window.top!=window.self){
            window.top.location.href=window.location.href;
        } else {
            // go back
            window.history.back();
        }
    }
}    


const loader = ()=>{
   createLinkSVG();
   gallery.init();
   checkEmbed();
   document.querySelectorAll('.instrument__fullscreen').forEach(x=>x.addEventListener('click', toggleFullscreen));
}

export {
    loader, 
    gallery, 
    params,
    checkEmbed,
    toggleFullscreen
}