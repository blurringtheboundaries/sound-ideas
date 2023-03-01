import { gallery } from './gallery.js';


const loader = ()=>{
    const links = document.querySelectorAll("a.link");
    links.forEach((link) => {
        // add an icon to the end of the link -- no alt text because the link element is sufficient
        link.insertAdjacentHTML("beforeend", `<object data="icons/noun-link-1047903-FFFFFF.svg" class="main__link__icon" style="width:1em; height:1em;" aria-hidden="true">`);
        let color = getComputedStyle(link).getPropertyValue('color');
        link.querySelector("object").addEventListener("load", (e) => {
     
                e.target.contentDocument.querySelectorAll('g').forEach(y=>y.setAttribute('stroke',color))
        });
    });
}



export {loader, gallery}