/**
 * 
 * @param {HTMLElement} container 
 * @param {String} url 
 * @param {String} id 
 * @param {String} bg 
 */

export const generateQRCode = (container, url, id = 'qr', bg = 'none') => {
    const QR = new QRCode({
        content: url,
        padding: 4,
        width: 512,
        height: 512,
        color: "#111F34",
        background: bg,
        typeNumber: 10,
        ecl: "Q",
    }).svg()
      .replace('<svg', `<svg viewbox="0, 0, 512, 512" id="${id}" class="qr__svg"`);
    
    container.innerHTML = QR;        
}