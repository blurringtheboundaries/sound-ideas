export const toggleFullscreen = ()=>{
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if(document.webkitFullscreenElement){
        document.webkitExitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
    } else if(document.documentElement.webkitRequestFullscreen){
        document.documentElement.webkitRequestFullscreen();
    } else {
        if(window.top!=window.self){
            window.top.location.href=window.location.href;
        } else {
            window.history.back();
        }
    }
    // redundant? the iframe should resize itself
    if(window.onresize)window.onresize();
}    