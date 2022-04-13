class SCROLL{
    constructor(set) {
        if(typeof set.element == 'string') {
            this.el = document.querySelector(set.element);
        }else if(set.element instanceof HTMLElement) {
            this.el = set.element
        }
        this.top = set.top ?? 63;
        this.el.style.position = 'fixed';
        this.unit = set.unit
        this.el.style.top = this.scrollUnit() + 'px';
        window.addEventListener('scroll', () => this.scroll())
        window.addEventListener('resize', () => this.scroll())
    }
    
    scroll() {
        this.size = this.scrollUnit();
        if(this.size - scrollY > 0) {
            this.el.style.top = this.size - scrollY + 'px';
        }else {
            this.el.style.top = 0;
        }
    }
    scrollUnit () {
        if(this.unit == 'px') {
            return this.top >= 0 ? this.top : 0;
        }else if(this.unit == '%' || this.unit == undefined) {
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight
        }
    }
    calc(height, top) {
        return height * top / 100
    }
}


let scroll = new SCROLL({
    element: '.header__nav',
    unit: 'px'
});




