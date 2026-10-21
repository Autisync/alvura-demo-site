/*!
 * What the page does: the visitor tracker, the language switch, the booking
 * section, "next free" in the hero, the enquiry form, "open now", the phone
 * and WhatsApp buttons (fictional numbers, so they explain themselves).
 * Everything reads window.SITE_CONFIG, which build.mjs writes, and
 * window.I18N (i18n.js).
 */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var API = String(C.api || 'https://api.autisync.com/api').replace(/\/+$/, '');
  var APP = String(C.app || 'https://app.autisync.com').replace(/\/+$/, '');
  var I = window.I18N;
  var lang = function () { return I.lang(); };
  var js = function () { return I.js[lang()]; };
  var clean = document.documentElement.hasAttribute('data-clean');

  // Visitors, in the CRM (Visitors > Tracking gives the key). No cookies.
  if (C.trackKey) {
    var s = document.createElement('script');
    s.src = APP + '/t.js';
    s.defer = true;
    s.setAttribute('data-site', C.trackKey);
    s.setAttribute('data-api', API);
    document.head.appendChild(s);
  }
  function track(type, label) { try { window.autisyncTrack && window.autisyncTrack(type, label); } catch (e) { /* never in the way */ } }

  function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  /** The page's own words for a CRM service, in the current language. */
  function serviceInfo(svc) {
    var n = String(svc.name || '').toLowerCase();
    var hit = I.services.filter(function (x) { return x.names.some(function (y) { return y.toLowerCase() === n; }); })[0];
    return hit ? hit[lang()] : null;
  }
  function namesFor(key) {
    var hit = I.services.filter(function (x) { return x.key === key; })[0];
    return hit ? hit.names : [key];
  }
  function orderOf(svc) {
    var n = String(svc.name || '').toLowerCase();
    for (var i = 0; i < I.services.length; i++) if (I.services[i].names.some(function (y) { return y.toLowerCase() === n; })) return i;
    return 99;
  }
  function staffName(full) {
    var m = I.staff[full];
    return m ? m[lang()] : full;
  }
  function bookingCopy() { return js().booking; }

  ready(function () {
    // ── Language: EN | PT, remembered on this device, ?lang= in the address ──
    each('[data-set-lang]', function (b) {
      b.addEventListener('click', function () {
        var want = b.getAttribute('data-set-lang');
        if (want === lang()) return;
        try { localStorage.setItem('alvura-lang', want); } catch (e) { /* private mode */ }
        try {
          var u = new URL(location.href); u.searchParams.set('lang', want);
          history.replaceState(null, '', u.pathname + u.search + u.hash);
        } catch (e) { /* old browser */ }
        I.apply(want);
        track('click', 'Language: ' + want);
      });
    });
    // The "clean view" link keeps the language.
    each('[data-clean-link]', function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var u = new URL(location.href); u.searchParams.set('demo', '0'); u.searchParams.set('lang', lang());
        location.href = u.pathname + u.search;
      });
    });

    // ── Booking ──
    var host = document.querySelector('[data-booking]');
    if (host && window.AutisyncBooking) {
      window.AutisyncBooking.mount(host, {
        api: API, app: APP, slug: C.bookingSlug, copy: bookingCopy(), lang: lang, person: staffName,
        order: orderOf,
        label: function (svc) {
          var info = serviceInfo(svc);
          return info ? { name: info.name, description: info.description, price: info.price } : null;
        },
      });
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-book]');
      if (!b || !host) return;
      var key = b.getAttribute('data-book');
      e.preventDefault();
      if (key) window.AutisyncBooking.choose(namesFor(key));
      else host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ── Next free time, read from the diary ──
    var found = {};
    function showNext(el) {
      var f = found[el.getAttribute('data-next-free')];
      if (!f) return;
      var n = window.AutisyncBooking.describe(f, bookingCopy());
      var put = function (sel, v) { var x = el.querySelector(sel); if (x) x.textContent = v || ''; };
      put('[data-nf-day]', n.day);
      put('[data-nf-time]', n.time);
      put('[data-nf-staff]', n.staff ? js().withStaff(staffName(n.staff)) : '');
      if (!n.staff) each('[data-nf-if-staff]', function (x) { x.hidden = true; });
      el.setAttribute('data-state', 'ready');
    }
    each('[data-next-free]', function (el) {
      var key = el.getAttribute('data-next-free');
      window.AutisyncBooking.nextFree({ api: API, slug: C.bookingSlug, service: namesFor(key) })
        .then(function (f) { if (!f) { el.hidden = true; return; } found[key] = f; showNext(el); })
        .catch(function () { el.hidden = true; });
    });

    // ── Enquiry form: goes to the website's form in the CRM, as a lead ──
    var formSection = null;
    function findForm() {
      if (formSection) return Promise.resolve(formSection);
      return fetch(API + '/sites/public/render?siteSlug=' + encodeURIComponent(C.siteSlug), { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('site'); return r.json(); })
        .then(function (d) {
          var all = [];
          (d.pages || [d.page]).forEach(function (p) { (p && p.sections || []).forEach(function (sct) { all.push(sct); }); });
          var hit = all.filter(function (sct) { return sct.section_type === 'contact_form'; })[0];
          if (!hit) throw new Error('form');
          formSection = hit.id;
          return formSection;
        });
    }
    each('form[data-enquiry]', function (form) {
      var status = form.querySelector('[data-status]');
      var button = form.querySelector('button[type="submit"]');
      var say = function (msg, kind) { if (status) { status.textContent = msg; status.setAttribute('data-kind', kind || ''); } };
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.website && form.website.value) return; // a bot filled the hidden field
        var data = {};
        Array.prototype.forEach.call(form.elements, function (f) {
          if (!f.name || f.name === 'website' || f.type === 'submit') return;
          if (f.type === 'checkbox') { data[f.name] = f.checked ? 'yes' : 'no'; return; }
          if (f.type === 'radio' && !f.checked) return;
          data[f.name] = f.value.trim();
        });
        data.language = lang();
        if (!data.fullName || data.fullName.length < 2) return say(js().needName, 'error');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || '')) return say(js().badEmail, 'error');
        var q = new URLSearchParams(location.search);
        button.disabled = true;
        say(js().sending);
        findForm().then(function (id) {
          return fetch(API + '/sites/public/forms/' + id + '/submit', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: data, utm: { source: q.get('utm_source') || '', medium: q.get('utm_medium') || '', campaign: q.get('utm_campaign') || '' }, tracking: { page: location.href } }),
          });
        }).then(function (r) {
          if (!r.ok) throw new Error('send');
          form.reset();
          form.setAttribute('data-sent', '');
          say(js().thanks, 'ok');
          track('convert', form.getAttribute('data-enquiry') || 'Enquiry sent');
        }).catch(function () {
          say(js().failed, 'error');
        }).then(function () { button.disabled = false; });
      });
    });

    // ── Open now / opens at, in the clinic's own time ──
    var HOURS = { 1: ['08:30', '19:00'], 2: ['08:30', '19:00'], 3: ['08:30', '19:00'], 4: ['08:30', '19:00'], 5: ['08:30', '19:00'], 6: ['09:00', '13:00'] };
    function openNow() {
      var el = document.querySelector('[data-open-now]');
      if (!el) return;
      var w = js(), parts = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: w.zoneOpen, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
        .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
      var dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
      var now = (parts.hour === '24' ? '00' : parts.hour) + ':' + parts.minute;
      var today = HOURS[dow], text;
      el.removeAttribute('data-open');
      if (today && now >= today[0] && now < today[1]) {
        text = w.openNow(w.hhmm(today[1]));
        el.setAttribute('data-open', '');
      } else {
        for (var i = 0; i < 8; i++) {
          var d = (dow + i) % 7, h = HOURS[d];
          if (!h || (i === 0 && now >= h[0])) continue;
          text = w.opensAt(i === 0 ? w.today : i === 1 ? w.tomorrow : w.days[d], w.hhmm(h[0]));
          break;
        }
      }
      var t = el.querySelector('[data-open-text]');
      if (t && text) t.textContent = text;
    }
    openNow();

    // ── Toast (phone numbers are fictional) ──
    var toast = document.querySelector('[data-toast]'), toastTimer = null;
    function say(msg) {
      if (!toast) return;
      toast.textContent = msg; toast.hidden = false;
      requestAnimationFrame(function () { toast.setAttribute('data-show', ''); });
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.removeAttribute('data-show'); setTimeout(function () { toast.hidden = true; }, 300); }, 6000);
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-phone]');
      if (!a) return;
      e.preventDefault();
      say(clean ? js().phoneClean : js().phoneDemo);
      track('click', 'Phone (demo)');
    });

    // ── WhatsApp panel ──
    var wa = document.querySelector('[data-wa]');
    if (wa) {
      var panel = wa.querySelector('.wa-panel'), open = wa.querySelector('[data-wa-open]');
      var setOpen = function (on) {
        panel.hidden = !on; open.setAttribute('aria-expanded', String(on));
        if (on) { var f = panel.querySelector('.wa-x'); if (f) f.focus(); track('click', 'WhatsApp (demo)'); } else open.focus({ preventScroll: true });
      };
      open.addEventListener('click', function () { setOpen(panel.hidden); });
      each('[data-wa-close]', function (x) { x.addEventListener('click', function () { setOpen(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });
    }

    // ── When the language changes ──
    document.addEventListener('langchange', function () {
      if (window.AutisyncBooking) window.AutisyncBooking.setCopy(bookingCopy());
      each('[data-next-free]', showNext);
      openNow();
      each('form[data-enquiry] [data-status]', function (x) { x.textContent = ''; });
    });

    // The demo note can be put away for the rest of the visit.
    var note = document.querySelector('.demo-note');
    try { if (note && sessionStorage.getItem('alvura-note') === 'hidden') note.hidden = true; } catch (e) { /* private mode */ }
    // Out of the way while the "how it works" section (which explains itself) is on screen.
    var how = document.querySelector('#how');
    if (note && how && 'IntersectionObserver' in window) {
      var waBox = document.querySelector('[data-wa]');
      new IntersectionObserver(function (es) { es.forEach(function (e) { note.classList.toggle('away', e.isIntersecting); if (waBox && window.innerWidth < 700) waBox.classList.toggle('away', e.isIntersecting); }); }, { threshold: 0.05 }).observe(how);
    }
    each('[data-demo-close]', function (x) {
      x.addEventListener('click', function () {
        note.hidden = true;
        try { sessionStorage.setItem('alvura-note', 'hidden'); } catch (e) { /* private mode */ }
      });
    });

    each('[data-year]', function (el) { el.textContent = new Date().getFullYear(); });
  });
})();
