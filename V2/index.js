(function () {
    let CSS = {
        _data: {
            r: getComputedStyle(document.documentElement),
            w: document.documentElement.style
        },
        get: prop => CSS._data.r.getPropertyValue(prop),
        set: (prop, val) => CSS._data.w.setProperty(prop, val),
        rgba: (prop, opacity = 1.0) => `rgba(${CSS.get(prop)},${opacity})`
    };
    let STATE = {
        menu: false
    };
    let HTML = {
        body: document.querySelector('body'),
        container: document.getElementById('container'),
        menu: document.getElementById('btnMenu'),
        popNav: document.getElementById('popNav'),
        goAbout: document.getElementById('btnAbout'),
        goPortfolio: document.getElementById('btnPortfolio'),
        goContact: document.getElementById('btnContact'),
        goTop: document.getElementById('btnTop'),
        about: document.getElementById('about'),
    };

    HTML.menu.addEventListener('click', _ => {
        if (STATE.menu) {
            HTML.popNav.style.top = '-2500px';
            HTML.container.style.display = 'inherit';
            CSS.set('--btn-menu-color', CSS.rgba('--c-back'));
            HTML.menu.style.backgroundColor = CSS.rgba('--c-hlight');
            setTimeout(() => { HTML.menu.innerHTML = '<i class="icon-menu"></i>' }, 200);
        } else {
            HTML.popNav.style.top = '0';
            HTML.container.style.display = 'none';
            CSS.set('--btn-menu-color', CSS.rgba('--c-hmark'));
            HTML.menu.style.backgroundColor = CSS.rgba('--c-back');
            setTimeout(() => { HTML.menu.innerHTML = '<i class="icon-cancel"></i>' }, 200);
        }
        STATE.menu = !STATE.menu;
    });


    function checkHeightNeeded(section, dynamic = false) {
        console.log(section.id + ': ' + section.scrollHeight + ', ' + window.innerHeight);
        return (section.scrollHeight > window.innerHeight)
            ? '100%'
            : (dynamic)
                ? CSS.get('--full-height-dynamic')
                : CSS.get('--full-height');
    }

    function sizeEvents() {
        CSS.set('--vh', `${window.innerHeight * 0.01}px`);

        const sections = [HTML.about];
        for (const section of sections) {
            section.style.height = checkHeightNeeded(section);
        }

    }
    window.addEventListener('resize', sizeEvents);
    window.addEventListener("orientationchange", sizeEvents);
    setTimeout(sizeEvents, 300);

    yall(); // lazyload imgs
})();
