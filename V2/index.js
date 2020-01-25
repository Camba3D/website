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

// ------------------------------------------------------------------------- //
// ---------------------------------------------- //
// --------------------- //

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


    /* CONTACT logic */
    document.getElementById('contactSubmit').addEventListener('click', _ => {

        let timeouts = [];
        const msgAlert = (msg, icon = '⚠️', color = CSS.rgba('--c-hmark', .85)) => {
            for (const timeout of timeouts) { clearTimeout(timeout); }

            const _contactSubmit = document.getElementById('contactSubmit');
            const _alertBlock = document.getElementsByClassName('contact-alert')[0];
            const _icon = document.getElementsByClassName('contact-alert-icon')[0];
            const _msg = document.getElementsByClassName('contact-alert-msg')[0];

            _alertBlock.style.backgroundColor = color;
            _icon.textContent = icon;
            _msg.textContent = msg;
            _contactSubmit.style.opacity = 0;

            timeouts.push(setTimeout(() => { _alertBlock.style.display = 'grid'; }, 300));
            timeouts.push(setTimeout(() => { _alertBlock.style.opacity = 1; _contactSubmit.style.display = 'none'; }, 303));
            timeouts.push(setTimeout(() => { _alertBlock.style.opacity = 0; }, 3000));
            timeouts.push(setTimeout(() => { _alertBlock.style.display = 'none'; _contactSubmit.style.display = 'inherit'; }, 3350));
            timeouts.push(setTimeout(() => { _contactSubmit.style.opacity = 1; }, 3400));
        };

        const fields = [
            document.getElementById('contactFromName'),
            document.getElementById('contactFrom'),
            document.getElementById('contactSubject'),
            document.getElementById('contactMsg')
        ];
        if (fields.some(el => el.value === '')) {
            msgAlert('Must not be empty inputs.', '⚠️', '#d36f4e');
            return;
        }

        msgAlert('Connecting to the server.', '⏳', '#4e6fd3');
        const timeoutSMTP = setTimeout(_ => { msgAlert('Time out. Sorry, try again later.', '⌛️', '#4e6fa3'); }, 3500);

        Email.send({
            SecureToken: '02c23bcd-40c2-48f9-9453-fd3a6a1a0cfd',
            To: 'hello@cambalamas.com',
            FromName: fields[0].value,
            From: fields[1].value,
            Subject: fields[2].value,
            Body: fields[3].value,
        }).then(status => {
            clearTimeout(timeoutSMTP);
            if (status === 'OK') {
                msgAlert('Message sent successfully.', '✅', '#428542');
                fields.forEach(el => { el.value = ''; })
            } else {
                msgAlert(status, '😕');
            }
        });
    });

    window.addEventListener('scroll', _ => {
        const currScrollPos = window.pageYOffset || document.documentElement.scrollTop;

        const limit = currScrollPos + 30;
        const sections = ['top', 'about', 'portfolio', 'contact', 'footer'];

        for (const se of sections) {
            const el = document.getElementById(se);
            const top = el.getBoundingClientRect().top + currScrollPos;
            if (('#' + se !== window.location.hash) && top < limit && top + el.scrollHeight > limit) { window.history.pushState({}, "", '#' + se); }
        }
    });

    yall(); // lazyload imgs
})();
