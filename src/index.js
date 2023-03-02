import { gallery } from './gallery.js';
import { createLinkSVG } from './links.js';


const loader = ()=>{
   createLinkSVG();
   gallery.init();
}

export {loader, gallery}