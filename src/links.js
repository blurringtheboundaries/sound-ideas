/**
 * This script adds a link icon to the end of all links with the class "link"
 * The icon is an SVG object that is loaded from the file icons/noun-link-1047903-FFFFFF.svg
 * @property {string} svgUrl - the url of the svg file
 * @property {string} svgClass - the class of the svg object
 * @property {NodeList} links - the links to which the icon will be added
 * 
 */

export function createLinkSVG(
    svgUrl = 'icons/noun-link-1047903-FFFFFF.svg',
    svgClass = 'main__link__icon',
    links = document.querySelectorAll("a.link")) {
    
    links.forEach((link) => {
        // add an icon to the end of the link -- no alt text because the link element is sufficient
        link.insertAdjacentHTML("beforeend", `<object data="${svgUrl}" class="${svgClass}" style="width:1em; height:1em;" aria-hidden="true">`);
        let color = getComputedStyle(link).getPropertyValue('color');
        link.querySelector("object").addEventListener("load", (e) => {
                e.target.contentDocument.querySelectorAll('g').forEach(y=>y.setAttribute('stroke',color))
        });
    });
}

