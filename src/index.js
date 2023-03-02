import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';

const params = new URLSearchParams(window.location.search);
console.log(params.has('embed'))

const checkEmbed = ()=>{
    if(params.has('embed')){
        document.querySelectorAll('header,footer').forEach(x=>x.classList.add('embed'));
    }
}

const loader = ()=>{
   createLinkSVG();
   gallery.init();
   checkEmbed();
}

export {loader, gallery, params,checkEmbed}