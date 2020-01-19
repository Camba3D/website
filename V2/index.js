let CSS = {
    _data: {
        r: getComputedStyle(document.documentElement),
        w: document.documentElement.style
    },
    get: prop => CSS._data.r.getPropertyValue(prop),
    set: (prop, val) => CSS._data.w.setProperty(prop, val),
    rgba: (prop, opacity = 1.0) => `rgba(${CSS.get(prop)},${opacity})`
};

let menu = false;
function toogleMenu() {
    let popNav = document.getElementById("popNav");
    let menuBtn = document.getElementById("btnHamburger");
    let topBtn = document.getElementById("btnTop");
    if (menu) {
        popNav.style.top = '-120vh'
        menuBtn.style.backgroundColor = CSS.rgba('--c-hlight');
        topBtn.style.backgroundColor = CSS.rgba('--c-hlight');
        CSS.set('--btn-menu-color', CSS.rgba('--c-back'));
        setTimeout(() => {
            menuBtn.innerHTML = '<i class="icon-menu"></i>'
        }, 200);
    } else {
        popNav.style.top = 0;
        menuBtn.style.backgroundColor = CSS.rgba('--c-back');
        topBtn.style.backgroundColor = CSS.rgba('--c-back');
        CSS.set('--btn-menu-color', CSS.rgba('--c-hmark'));
        setTimeout(() => {
            menuBtn.innerHTML = '<i class="icon-cancel"></i>'
        }, 200);
    }
    menu = !menu;
}


(function () {

    function resizeEvents() {
        CSS.set('--vh', `${window.innerHeight * 0.01}px`);
    }
    window.addEventListener('resize', resizeEvents);
    resizeEvents();

    yall(); // lazyload imgs
})();
