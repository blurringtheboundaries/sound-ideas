export const generateQRCode = (container, url, id='qr')=>{
    container
        .innerHTML = new QRCode({
            content: url,
            padding: 4,
            width: 512,
            height: 512,
            color: "#111F34",
            background: "none",
            typeNumber:10,
            ecl: "Q",
        }).svg().replace('<svg', `<svg viewbox="0, 0, 512, 512" id="${id}" `);
}