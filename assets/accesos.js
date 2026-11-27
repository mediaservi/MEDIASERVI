/* mediaservi.com · ACCESOS DIRECTOS (norma del 27-11-2026): la web, la portada AVHUB y una línea por app, con la dirección entera y COPIAR; idioma de la web (catalán si el navegador lo está) · #accesos lo abre al cargar · Licencia GPL-3.0 */
(function () {
  'use strict';
  var T = { es: ['Accesos directos', 'Estás aquí', 'Copiar', 'Copiado', 'Cerrar', 'La web de mediaservi', 'Portada: todas las herramientas', 'Pantallas LED y proyección', 'Audio, escenario y sistemas', 'Cartelería digital', 'Visuales reactivos a la música', 'Juegos con el móvil como mando'],
            en: ['Direct links', 'You are here', 'Copy', 'Copied', 'Close', 'The mediaservi website', 'Home: all the tools', 'LED screens and projection', 'Audio, stage and systems', 'Digital signage', 'Music-reactive visuals', 'Games with your phone as controller'],
            ca: ['Accessos directes', 'Ets aquí', 'Copiar', 'Copiat', 'Tancar', 'El web de mediaservi', 'Portada: totes les eines', 'Pantalles LED i projecció', 'Àudio, escenari i sistemes', 'Cartelleria digital', 'Visuals reactius a la música', 'Jocs amb el mòbil com a comandament'] };
  var A = [['MEDIASERVI', 'https://mediaservi.com/', 5, '#60ff00'], ['AVHUB', 'https://avhub.mediaservi.com/', 6, '#a46bff'], ['SCREENS', 'https://screens.mediaservi.com/', 7, '#d4ff00'], ['SYSTEMS', 'https://systems.mediaservi.com/', 8, '#00b4ff'], ['ADPOSTER', 'https://adposter.mediaservi.com/', 9, '#ffb000'], ['VJSHOW', 'https://vjshow.mediaservi.com/', 10, '#00ff04'], ['MSGAME', 'https://msgame.mediaservi.com/', 11, '#e100ff']];
  var lang = function () { var d = String(document.documentElement.lang || 'es').slice(0, 2).toLowerCase(); if (d === 'en') return 'en'; return /^ca\b/i.test(navigator.language || '') ? 'ca' : 'es'; };
  var esc = function (x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function copia(v, b, t) {
    var ok = function () { b.textContent = t[3]; b.classList.add('ok'); setTimeout(function () { b.textContent = t[2]; b.classList.remove('ok'); }, 1600); };
    try { navigator.clipboard.writeText(v).then(ok, function () { viejo(); }); } catch (e) { viejo(); }
    function viejo() { var x = document.createElement('textarea'); x.value = v; x.setAttribute('readonly', ''); x.style.cssText = 'position:fixed;opacity:0;left:-9999px'; document.body.appendChild(x); x.select(); try { document.execCommand('copy'); ok(); } catch (e) {} x.remove(); }
  }
  function abrir() {
    if (document.querySelector('.ad-ov')) return;
    if (!document.getElementById('ad-css')) { var st = document.createElement('style'); st.id = 'ad-css'; st.textContent =
      '.ad-ov{position:fixed;inset:0;z-index:2147483003;display:grid;place-items:center;padding:12px;box-sizing:border-box;background:rgba(4,4,8,.74);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}' +
      '.ad-win{width:min(40rem,100%);max-height:calc(100dvh - 24px);overflow:auto;box-sizing:border-box;border-radius:14px;background:linear-gradient(180deg,#2b2c31,#1b1c20);border:1px solid #000;box-shadow:0 0 0 1px rgba(255,255,255,.08) inset,0 1.4rem 3rem rgba(0,0,0,.7);padding:16px 18px 14px;color:#d6dbe2;font:500 14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;text-align:left;letter-spacing:0;text-transform:none}' +
      '.ad-win h3{margin:0 0 10px;font:600 .82rem/1.2 "Share Tech Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:#a19eb2}' +
      '.ad-f{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;align-items:center;padding:9px 10px;margin:0 0 6px;border-radius:9px;background:#141418;border:1px solid #000;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}' +
      '.ad-f.yo{background:#1c1626;box-shadow:inset 0 0 0 1px var(--c),0 0 14px -6px var(--c)}' +
      '.ad-n{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;min-width:0}.ad-n a{font:800 .95rem/1.2 Inter,system-ui,sans-serif;letter-spacing:.02em;color:var(--c);text-decoration:none}.ad-n a:hover{text-decoration:underline}' +
      '.ad-n small{font-size:.8em;color:#9a97ab}.ad-n em{font:600 .68rem/1 "Share Tech Mono",monospace;font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:#14101c;background:var(--c);padding:3px 6px;border-radius:4px}' +
      '.ad-u{grid-column:1;font:500 .84rem/1.3 "Share Tech Mono",monospace;color:#e9ecf1;overflow-wrap:anywhere;user-select:all;-webkit-user-select:all}' +
      '.ad-c{grid-column:2;grid-row:1/span 2;min-width:6.4em;padding:9px 10px;border-radius:8px;border:1px solid #000;font:800 .72rem/1 Inter,system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;color:#e9ecf1;background:linear-gradient(180deg,#4a4c54,#2e3036);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 0 #000}.ad-c.ok{color:#0b1a00;background:linear-gradient(180deg,#b6ff3a,#6fd400)}' +
      '.ad-x{display:block;margin:8px 0 0 auto;padding:10px 18px;border-radius:9px;border:1px solid #000;font:800 .8rem/1 Inter,system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;color:#e9ecf1;background:linear-gradient(180deg,#4a4c54,#2e3036);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 0 #000}' +
      '.ad-win button:focus-visible,.ad-win a:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
      '@media (max-width:420px){.ad-win{padding:14px 12px 12px}.ad-f{gap:2px 8px;padding:8px 9px;margin-bottom:5px}.ad-u{font-size:.76rem}.ad-n small{font-size:.74em}.ad-c{min-width:0;padding:8px 9px;font-size:.66rem}}';
      document.head.appendChild(st); }
    var t = T[lang()], antes = document.activeElement, ov = document.createElement('div'); ov.className = 'ad-ov';
    ov.innerHTML = '<div class="ad-win" role="dialog" aria-modal="true" aria-label="' + esc(t[0]) + '"><h3>' + esc(t[0]) + '</h3>' + A.map(function (a, i) {
      return '<div class="ad-f' + (i ? '' : ' yo') + '" style="--c:' + a[3] + '"><span class="ad-n"><a href="' + a[1] + '"' + (i ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + a[0] + '</a><small>' + esc(t[a[2]]) + '</small>' + (i ? '' : '<em>' + esc(t[1]) + '</em>') + '</span><span class="ad-u">' + a[1] + '</span><button type="button" class="ad-c" data-u="' + a[1] + '">' + esc(t[2]) + '</button></div>';
    }).join('') + '<button type="button" class="ad-x">' + esc(t[4]) + '</button></div>';
    var cerrar = function () { document.removeEventListener('keydown', tecla, true); ov.remove(); try { if (location.hash === '#accesos') history.replaceState(null, '', location.pathname + location.search); } catch (e) {} try { if (antes && antes.focus) antes.focus(); } catch (e) {} }, tecla = function (e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cerrar(); } };
    ov.addEventListener('click', function (e) { var c = e.target.closest('.ad-c'); if (c) { copia(c.getAttribute('data-u'), c, t); return; } if (e.target.closest('.ad-x')) cerrar(); });
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) cerrar(); });
    document.addEventListener('keydown', tecla, true); document.body.appendChild(ov); try { ov.querySelector('.ad-c').focus({ preventScroll: true }); } catch (e) {}
  }
  document.addEventListener('click', function (e) { var a = e.target && e.target.closest ? e.target.closest('.acc-dir') : null; if (!a) return; e.preventDefault(); e.stopPropagation(); abrir(); }, true);
  try { if (location.hash === '#accesos') setTimeout(abrir, 700); } catch (e) {}
})();
