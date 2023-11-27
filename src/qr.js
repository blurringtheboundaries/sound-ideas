let width = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].width.baseVal.value;
let firstX = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].x.baseVal.value;
let firstY = document.querySelectorAll('#qr__gallery rect:not(:first-child)')[0].x.baseVal.value;
let firstRow = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).filter(x=>x.x.baseVal.value == firstX)
// let xValues = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).map(x=>x.x.baseVal.value);
let yValues = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')).map(x=>x.y.baseVal.value);
// console.log(Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)')))
// console.log(yValues)
let allRects = Array.from(document.querySelectorAll('#qr__gallery rect:not(:first-child)'));
let rows = [], count = 0;
do{
    
} while ()
console.log(rows, firstX, firstY)
rows.forEach((row,i)=>{row.forEach(x=>{x.style.opacity = Math.random()})})