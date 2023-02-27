const loader = ()=>{
    const testText = document.createElement('p');
    testText.innerHTML = 'test page';
    document.body.appendChild(testText);
}



export {loader}