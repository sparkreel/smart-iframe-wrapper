class ScreenService {

    constructor(screenWidth, screenHeight) {
        this._screenWidth = screenWidth;
        this._screenHeight = screenHeight;
    }

    get screenWidth() {
        return this._screenWidth;
    }

    get screenHeight() {
        return this._screenHeight;
    }

    get isVertical() {
        return this.screenWidth < this.screenHeight;
    }

    get screenRatio() {
        return this.screenWidth / this.screenHeight
    }

    get uiWidth() {
        return this.isVertical ? 1080 : 1920;
    }

    get uiHeight() {
        return this.isVertical ? 1920 : 1080;
    }

    get uiRatio() {
        return this.uiWidth / this.uiHeight;
    }

}

export default () => {
    const fittoscreen = window.fittoscreen || false;

    const width = window.innerWidth
    const height = window.innerHeight

    const screenService = new ScreenService(width, height);

    let scale = 1;

    if (screenService.isVertical) {
        document.body.classList.add('vertical');
    } else {
        document.body.classList.remove('vertical');
    }


    if (screenService.screenRatio >= screenService.uiRatio) { // Wider or equal
        scale = screenService.screenHeight/ screenService.uiHeight;
    } else { // Narrower
        scale = screenService.screenWidth/ screenService.uiWidth;
    }


    let scaleX = fittoscreen ? screenService.screenWidth / screenService.uiWidth : scale;
    let scaleY = fittoscreen ?  screenService.screenHeight / screenService.uiHeight : scale;

    const el = document.body;
    el.style['-ms-zoom'] = scaleX < scaleY ? scaleX : scaleY;

    let offsetX = Math.floor((screenService.screenWidth - (scaleX * screenService.uiWidth)) / 2);
    let offsetY = Math.floor((screenService.screenHeight - (scaleY * screenService.uiHeight)) / 2);

    let scaleStr = "scale(" + scaleX + "," + scaleY + ")";
    if (offsetX > 0 || offsetY > 0) {
        scaleStr = "translateX(" + offsetX + "px) translateY(" + offsetY + "px) " + scaleStr;
    }
    el.style['-moz-transform'] = scaleStr;
    el.style['-o-transform'] = scaleStr;
    el.style['-webkit-transform'] = scaleStr;
    el.style['transform'] = scaleStr;
    el.style['transform-origin'] = "left top";
}
