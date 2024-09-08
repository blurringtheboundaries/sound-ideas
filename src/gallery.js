import pkg from 'qrcode-svg';
import {pages} from './pages.js';

// todo: import the QR Code package from CM toolbox to take advantage of future updates

const QRCode = pkg;

function styleQR(){
    let width = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].width.baseVal.value;
    let firstX = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].x.baseVal.value;
    let firstY = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].x.baseVal.value;
    let firstRow = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).filter(x=>x.x.baseVal.value == firstX)
    // let xValues = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).map(x=>x.x.baseVal.value);
    let yValues = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).map(x=>x.y.baseVal.value);
    
    let allRects = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)'));
    let rows = [], count = 0;
    for(let i=0;i<firstRow.length;i++){
        let currentRow = allRects.filter(x=>Math.floor(x.y.baseVal.value + firstY) == Math.floor(width * i));
        rows.push(currentRow)

    }
    console.log(rows, firstX, firstY)
    rows.forEach((row,i)=>{row.forEach(x=>{x.style.opacity = Math.random()})})
    
}


const qrCheck = function(error) {
    if (error) throw error;
    console.log('File created.');
}

window.QRCode = QRCode;

/**
 * Display a thumbnail over the QR code
 * @param {*} element 
 * @param {*} value 
 */

function displayThumbnail(element, value){
    element.classList.add('hover');
    element.querySelector('img.thumbnail').classList[value ? 'add' : 'remove']('active');
}

/**
 * 
 * @returns {string} the name of the current page
 */

const getPageName = ()=>{
    return window.location.href.split('/').at(-1).split('.html')[0]
}

const displayThumbnails = (e)=>{
    const value = e.target.value === 'Icons';
    document.querySelectorAll('.qr').forEach(x=>{
        displayThumbnail(x, value);
    })
}

/**
 * Initialise gallery page
 */

const initGallery = ()=>{
    if(getPageName() === 'gallery' || getPageName() === 'index' || getPageName() === '' ){
        // probably don't need multitouchMapper here...let's disable it for now
        if(typeof multitouchMapper != 'undefined') multitouchMapper.unlisten();
    }

    document.body.addEventListener('click', e=>{
        document.querySelectorAll('.qr').forEach(qrElement=>{
            qrElement.classList.remove('blurred');
            qrElement.classList.remove('hover');
            qrElement.querySelector('img.logo').classList.remove('selected');   
            qrElement.querySelector('img.thumbnail').classList.remove('selected');
        })
    })

    document.querySelectorAll('#options select').forEach(selection=>{
        selection.addEventListener('change', e=>{
            localStorage.setItem('icon-type', e.target.value)
            const value = e.target.value === 'Icons';
            document.querySelectorAll('.qr').forEach(x=>{
                displayThumbnail(x, value);
            })
        })
    })
    
    document.querySelectorAll('.qr').forEach(qrElement=>{
        qrElement.classList.remove('blurred');
        qrElement.addEventListener('mouseenter', (e)=>{
            qrElement.classList.remove('hover');
            qrElement.querySelector('img.logo').classList.add('selected');
            qrElement.querySelector('img.thumbnail').classList.add('selected');
            
            document.querySelectorAll('.qr').forEach(y=>{
                if (y !== qrElement){
                    y.classList.add('blurred');
                    
                }
            })
        })
    
        qrElement.addEventListener('mouseleave', (e)=>{
            qrElement.querySelector('img.logo').classList.remove('selected');
            qrElement.querySelector('img.thumbnail').classList.remove('selected');
            
            document.querySelectorAll('.qr').forEach(y=>{
                if (y !== qrElement){
                    y.classList.remove('blurred');
                }
            })
        })
    
    })

    document.querySelectorAll('#options__icon-type').forEach(x=>{
        x.value =  localStorage.getItem('icon-type') || 'Icons';
        const value = document.querySelector('#options__icon-type').value === 'Icons';
        document.querySelectorAll('.qr').forEach(y=>{
            displayThumbnail(y, value);
        })
    })  

    Object.entries(pages).forEach(([name, url])=>{
        // todo: the icon, svg, logo, and thumbnail could all be created dynamically here instead of being hard-coded in the HTML. It'd make future updates much easier.
        document.querySelectorAll(`.qr #svg_${name}`).forEach(x=>{
            x.innerHTML = new QRCode({
                content: url,
                padding: 4,
                width: 512,
                height: 512,
                color: "#111F34",
                background: "none",
                typeNumber:10,
                ecl: "Q",
            }).svg().replace('<svg', `<svg viewbox="0, 0, 512, 512" id="qr__${name}" `);
            
            document.querySelector(`#qr__${name}`).classList.add('qr__svg');
            if (x.parentElement.tagName === 'A'){
                x.parentElement.setAttribute('href', url);    
            }
            
        })
    })
    
}

function getCentralBoxes(){
    
}

const gallery = {
    init: initGallery,
    displayThumbnails: displayThumbnails,
    displayThumbnail: displayThumbnail,
    pages: pages
}

export { gallery };