import pkg from 'qrcode-svg';
const QRCode = pkg;

const qrCheck = function(error) {
    if (error) throw error;
    console.log('File created.');
}

window.QRCode = QRCode;

function displayThumbnail(element, value){
    element.classList.add('hover');
    element.querySelector('img.thumbnail').classList[value ? 'add' : 'remove']('active');
}

const displayThumbnails = (e)=>{
    const value = e.target.value === 'Icons';
    document.querySelectorAll('.qr').forEach(x=>{
        displayThumbnail(x, value);
    })
}

const pages = {
    'index': 'https://blurringtheboundaries.github.io/sound-ideas/index.html'
}



const initGallery = ()=>{
    // we are on the gallery page, so we probably don't have any specific multitouch elements for now
    if(typeof multitouchMapper != 'undefined')multitouchMapper.unlisten();

    document.body.addEventListener('click', e=>{
        document.querySelectorAll('.qr').forEach(x=>{
            x.classList.remove('blurred');
            x.classList.remove('hover');
            x.querySelector('img.logo').classList.remove('selected');   
            x.querySelector('img.thumbnail').classList.remove('selected');
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
    
    document.querySelectorAll('.qr').forEach(x=>{
        x.classList.remove('blurred');
        x.addEventListener('mouseenter', (e)=>{
            x.classList.remove('hover');
            x.querySelector('img.logo').classList.add('selected');
            x.querySelector('img.thumbnail').classList.add('selected');
            
            document.querySelectorAll('.qr').forEach(y=>{
                if (y !== x){
                    y.classList.add('blurred');
                    
                }
            })
        })
    
        
        x.addEventListener('mouseleave', (e)=>{
            x.querySelector('img.logo').classList.remove('selected');
            x.querySelector('img.thumbnail').classList.remove('selected');
            
            document.querySelectorAll('.qr').forEach(y=>{
                if (y !== x){
                    y.classList.remove('blurred');
                }
            })
        })
    
    })

    document.querySelector('#options__icon-type').value =  localStorage.getItem('icon-type') || 'Icons'
    const value = document.querySelector('#options__icon-type').value === 'Icons';
    document.querySelectorAll('.qr').forEach(x=>{
        displayThumbnail(x, value);
    })

    Object.entries(pages).forEach(([name, url])=>{
            
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
            console.log(document.querySelector(`#qr__${name}`));
            // if parent element is <a> then add href from url
            console.log('✅',x.parentElement);
            if (x.parentElement.tagName === 'A'){
                x.parentElement.setAttribute('href', url);    
            }
        })
    
    })
    
}

const gallery = {
    init: initGallery,
    displayThumbnails: displayThumbnails,
    displayThumbnail: displayThumbnail,
    pages: pages
}

export {gallery};