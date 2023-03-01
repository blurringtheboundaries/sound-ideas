import { gallery } from './gallery.js';


const loader = ()=>{
    const links = document.querySelectorAll("a.link");
    links.forEach((link) => {
        // add an icon to the end of the link -- no alt text because the link element is sufficient
        link.insertAdjacentHTML("beforeend", `<img src="icons/noun-link-1047903-FFFFFF.svg" style="width:1em; height:1em;" aria-hidden="true">`);
    });
}



export {loader, gallery}