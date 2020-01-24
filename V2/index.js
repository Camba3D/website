// --- 3rd party ---
// ------------------------------------------------------------------------- //

// YALL
var yall = function () { "use strict"; return function (e) { var n = (e = e || {}).lazyClass || "lazy", t = e.lazyBackgroundClass || "lazy-bg", o = "idleLoadTimeout" in e ? e.idleLoadTimeout : 200, i = e.observeChanges || !1, r = e.events || {}, a = window, s = "requestIdleCallback", u = "IntersectionObserver", c = ["srcset", "src", "poster"], d = [], queryDOM = function (e, o) { return d.slice.call((o || document).querySelectorAll(e || "img." + n + ",video." + n + ",iframe." + n + ",." + t)) }, yallLoad = function (n) { var o = n.parentNode; "PICTURE" == o.nodeName && yallApplyFn(queryDOM("source", o), yallFlipDataAttrs), "VIDEO" == n.nodeName && yallApplyFn(queryDOM("source", n), yallFlipDataAttrs), yallFlipDataAttrs(n), n.autoplay && n.load(); var i = n.classList; i.contains(t) && (i.remove(t), i.add(e.lazyBackgroundLoaded || "lazy-bg-loaded")) }, yallBindEvents = function (e) { for (var n in r) e.addEventListener(n, r[n].listener || r[n], r[n].options || void 0) }, yallFlipDataAttrs = function (e) { var _loop = function (n) { c[n] in e.dataset && a.requestAnimationFrame((function () { e.setAttribute(c[n], e.dataset[c[n]]) })) }; for (var n in c) _loop(n) }, yallApplyFn = function (e, n) { for (var t = 0; t < e.length; t++)n instanceof a[u] ? n.observe(e[t]) : n(e[t]) }, yallIntersectionObserve = function (e) { if (e.isIntersecting || e.intersectionRatio) { var t = e.target; s in a && o ? a[s]((function () { yallLoad(t) }), { timeout: o }) : yallLoad(t), t.classList.remove(n), f.unobserve(t), (l = l.filter((function (e) { return e != t }))).length || i || f.disconnect() } }, yallMutationObserve = function (e) { l.indexOf(e) < 0 && (l.push(e), yallBindEvents(e), f.observe(e)) }, l = queryDOM(); if (/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent)) yallApplyFn(l, yallLoad); else if (u in a && u + "Entry" in a) { var f = new a[u]((function (e) { yallApplyFn(e, yallIntersectionObserve) }), { rootMargin: ("threshold" in e ? e.threshold : 200) + "px 0%" }); yallApplyFn(l, yallBindEvents), yallApplyFn(l, f), i && yallApplyFn(queryDOM(e.observeRootSelector || "body"), (function (n) { new MutationObserver((function () { yallApplyFn(queryDOM(), yallMutationObserve) })).observe(n, e.mutationObserverOptions || { childList: !0, subtree: !0 }) })) } } }();

// SmtpJS
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

// Smooth scroll polyfill
var scroll = new SmoothScroll('a[href*="#"]', {
    header: '[data-scroll-header]'
});
// var scroll = new SmoothScroll('a[href*="#"]');
// ------------------------------------------------------------------------- //
// ---------------------------------------------- //
// --------------------- //

/**
 * Check the current scroll position using 'window' or 'document' as fallback.
 */
function currScrollPos() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

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
        nav: document.getElementById('nav'),
        logo: document.getElementById('logo'),
        menu: document.getElementById('btnMenu'),
        popNav: document.getElementById('popNav'),
        goAbout: document.getElementById('btnAbout'),
        goPortfolio: document.getElementById('btnPortfolio'),
        goContact: document.getElementById('btnContact'),
        about: document.getElementById('about'),
    };

    const yOffset = 10;
    let oldYPos = yOffset;

    const popNav = {
        onClose: _ => {
            setTimeout(() => {
                HTML.logo.style.color = CSS.rgba('--c-hmark');
                HTML.logo.style.textShadow = '0 0 15px rgba(var(--c-hmark),.35)';
                HTML.nav.style.backgroundColor = CSS.rgba('--c-back');

                setTimeout(() => { HTML.menu.innerHTML = '<i class="icon-menu"></i>' }, 100);
                setTimeout(() => { HTML.menu.getElementsByTagName('i')[0].style.color = CSS.rgba('--c-hmark'); }, 101);
            }, 400);


            HTML.container.classList = 'container';
            HTML.popNav.style.top = '-2000px';

            if (oldYPos > yOffset) scroll.animateScroll(oldYPos);

        },
        onOpen: _ => {
            HTML.logo.style.color = CSS.rgba('--c-back');
            HTML.logo.style.textShadow = '0 0 15px rgba(var(--c-back),.35)';
            HTML.nav.style.backgroundColor = CSS.rgba('--c-hmark');
            setTimeout(() => { HTML.menu.innerHTML = '<i class="icon-cancel"></i>' }, 100);
            setTimeout(() => { HTML.menu.getElementsByTagName('i')[0].style.color = CSS.rgba('--c-back'); }, 101);

            oldYPos = currScrollPos();
            if (oldYPos < yOffset) oldYPos = yOffset;
            scroll.animateScroll(yOffset);
            setTimeout(() => { HTML.container.classList = 'container-alt'; }, 750);

            HTML.popNav.style.top = '0';
        },
        toggle: _ => {
            (!STATE.menu) ? popNav.onOpen() : popNav.onClose();
            STATE.menu = !STATE.menu;
        },
    }
    HTML.menu.addEventListener('click', popNav.toggle);

    window.addEventListener("resize", _ => {
        console.log("WIDTH: " + window.innerWidth);
        if (window.innerWidth > 650 && STATE.menu) { popNav.onClose(); }
    });

    const onclicPopNav = _ => { if (STATE.menu) { popNav.onClose(); oldYPos = -1; } }
    HTML.logo.addEventListener('click', onclicPopNav);
    // HTML.logo.addEventListener('click', _ => { scroll.animateScroll(0); });
    HTML.goAbout.addEventListener('click', onclicPopNav);
    HTML.goPortfolio.addEventListener('click', onclicPopNav);
    HTML.goContact.addEventListener('click', onclicPopNav);




    yall(); // lazyload imgs
})();
