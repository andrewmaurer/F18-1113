var __cookieConsent = {};

__cookieConsent.getValue = function() {
    var n = '__cookie_consent=',
        a = decodeURIComponent(document.cookie).split(';');

    for (var i = 0; i < a.length; i++) {
        var c = a[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(n) == 0) {
            return parseInt(c.substring(n.length, c.length));
        }
    }

    return null;
}

__cookieConsent.setValue = function(v) {
    v = parseInt(v);
    v = v >= 0 && v <= 2 ? v : -1;
    if (v < 0) return;

    var e = new Date,
        t = new Date;
    t.setHours(e.getHours() + 1);

    switch (v) {
        case 0:
            e = t.toUTCString();
            break;
        case 1:
            e.setFullYear(e.getFullYear() + 100);
            __cookieConsent.killMessage();
            break;
        case 2:
            e = t.toUTCString();
            __cookieConsent.killMessage();
            break;
    }

    var d = __cookieConsent.getDomain(window.location.hostname);

    document.cookie = '__cookie_consent='+v+';expires='+e+';domain='+d+';path=/;';
}

__cookieConsent.killCookie = function() {
    var e = new Date;
    e.setDate(e.getDate() - 1);

    var d = __cookieConsent.getDomain(window.location.hostname);

    document.cookie = '__cookie_consent=0;expires='+e+';domain='+d+';path=/;';
}

__cookieConsent.killMessage = function() {
    var w = document.getElementById('__cookie-consent-wrapper');
    if (w !== null) {
        w.outerHTML = '';
    }
}

__cookieConsent.getDomain = function(d) {
    var p = d.split('.');

    if (p.length <= 2) {
        return __cookieConsent.buildDomain(p);
    }

    p = p.slice(-3);

    if (p[2].length >= 3 || p[1].length > 3) {
        return __cookieConsent.buildDomain(p.slice(-2));
    }

    return __cookieConsent.buildDomain(p);
}

__cookieConsent.buildDomain = function(p) {
    var d = '.' + p.join('.');
    return d;
}

__cookieConsent.value = __cookieConsent.getValue();

if (__cookieConsent.value !== 2) {
    __cookieConsent.setValue(2);
}
