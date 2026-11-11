/* mediaservi.com · aviso legal: la ventana que abre el enlace del pie de todas las páginas (español e inglés).
   El texto completo está en LEGAL.md, DISCLAIMER.md, PRIVACY.md y COOKIES.md del repositorio. */
(function () {
  'use strict'; if (window.MSAVISO) return;
  var REPO = 'https://github.com/mediaservi/MEDIASERVI/blob/main/';
  var TX = {
    es: { t: 'AVISO LEGAL', c: 'Cerrar', p: [
      '<b>Quién está detrás.</b> mediaservi.com es la web personal de un particular, hecha por afición. No es una empresa ni ofrece servicios; no tiene publicidad, afiliación ni ingresos de ningún tipo.',
      '<b>Tal cual.</b> La web se ofrece sin garantías. La información que muestra es orientativa y puede no estar al día: confírmala antes de tomar una decisión basada en ella.',
      '<b>Responsabilidad.</b> Hasta donde lo permita la ley, el autor no responde de los daños derivados de su uso. Nada de esto excluye lo que la ley no permite excluir ni los derechos irrenunciables de los consumidores.',
      '<b>Marcas de terceros.</b> Las marcas, nombres y productos citados pertenecen a sus titulares y se mencionan solo como referencia, sin patrocinio, certificación ni respaldo.',
      '<b>Privacidad.</b> No hay cookies propias, analítica ni seguimiento. Los vídeos y el mapa incrustados son de terceros y aplican sus propias políticas cuando los abres.',
      '<b>Proyecto personal.</b> Es una iniciativa del autor, ajena a su empleador, que no la encarga, financia ni respalda.',
      '<b>Ley aplicable y contacto.</b> Legislación española. Contacto: <a href="mailto:mediaservibcn@gmail.com">mediaservibcn@gmail.com</a>' ],
      d: ['Aviso legal completo', 'Garantías y responsabilidad', 'Privacidad', 'Cookies'] },
    en: { t: 'LEGAL NOTICE', c: 'Close', p: [
      '<b>Who is behind it.</b> mediaservi.com is a private individual’s personal website, made as a hobby. It is not a company and offers no services; it has no advertising, affiliation or income of any kind.',
      '<b>As is.</b> The site is provided without warranties. The information it shows is for guidance only and may be out of date: check it before making any decision based on it.',
      '<b>Liability.</b> To the extent permitted by law, the author is not liable for damage arising from its use. Nothing here excludes what the law does not allow to be excluded, nor consumers’ statutory rights.',
      '<b>Third-party trademarks.</b> The trademarks, names and products mentioned belong to their owners and are cited for reference only, with no sponsorship, certification or endorsement.',
      '<b>Privacy.</b> There are no first-party cookies, analytics or tracking. The embedded videos and map belong to third parties and apply their own policies when you open them.',
      '<b>Personal project.</b> It is the author’s own initiative, unrelated to his employer, which does not commission, fund or endorse it.',
      '<b>Governing law and contact.</b> Spanish law. Contact: <a href="mailto:mediaservibcn@gmail.com">mediaservibcn@gmail.com</a>' ],
      d: ['Full legal notice', 'Warranties and liability', 'Privacy', 'Cookies'] }
  };
  var DOCS = ['LEGAL.md', 'DISCLAIMER.md', 'PRIVACY.md', 'COOKIES.md'], ov = null, antes = null;
  var CSS = '.msav{position:fixed;inset:0;z-index:400;display:flex;align-items:center;justify-content:center;padding:max(14px,env(safe-area-inset-top,0px)) 14px max(14px,env(safe-area-inset-bottom,0px));background:rgba(4,3,8,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
    '.msav-w{position:relative;width:min(640px,100%);max-height:100%;overflow-y:auto;box-sizing:border-box;padding:22px 22px 18px;border-radius:10px;background:linear-gradient(180deg,#17151f,#0d0c12);border:1px solid rgba(0,255,4,.35);box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 26px rgba(0,255,4,.12);color:#d8d6e2;font:400 14px/1.5 Inter,system-ui,Arial,sans-serif;text-align:left}' +
    '.msav-w h2{margin:0 40px 12px 0;font:400 16px/1.2 "Share Tech Mono",monospace;letter-spacing:.2em;color:#00ff04;text-shadow:0 0 10px rgba(0,255,4,.5)}' +
    '.msav-w p{margin:0 0 9px}.msav-w b{color:#fff;font-weight:600}.msav-w a{color:#7fd7ff}' +
    '.msav-d{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);font:400 12px/1.4 "Share Tech Mono",monospace;letter-spacing:.06em}' +
    '.msav-x{position:absolute;right:12px;top:12px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font:400 18px/1 Arial,sans-serif;cursor:pointer}' +
    '.msav-x:hover,.msav-x:focus-visible{border-color:#00ff04;color:#00ff04;outline:none}' +
    '@media (max-width:520px){.msav-w{padding:18px 16px 14px;font-size:13px}}';
  function cierra() { if (!ov) return; ov.remove(); ov = null; try { antes && antes.focus(); } catch (e) {} }
  function abrir(l) {
    if (ov) return; var x = TX[l === 'es' ? 'es' : 'en']; antes = document.activeElement;
    if (!document.getElementById('msav-css')) { var st = document.createElement('style'); st.id = 'msav-css'; st.textContent = CSS; document.head.appendChild(st); }
    ov = document.createElement('div'); ov.className = 'msav'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', x.t);
    ov.innerHTML = '<div class="msav-w"><button type="button" class="msav-x" aria-label="' + x.c + '">✕</button><h2>' + x.t + '</h2>' + x.p.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      '<div class="msav-d">' + DOCS.map(function (d, i) { return '<a href="' + REPO + d + '" target="_blank" rel="noopener">' + x.d[i] + '</a>'; }).join('') + '</div></div>';
    /* la web escucha teclas, rueda y gestos en toda la ventana para cambiar de sección: mientras el aviso está abierto no deben llegarle */
    ['keydown', 'keyup', 'wheel', 'touchstart', 'touchmove', 'touchend', 'pointerdown', 'pointerup', 'click'].forEach(function (ev) { ov.addEventListener(ev, function (e) { if (ev === 'keydown' && e.key === 'Escape') cierra(); else if (ev === 'click' && (e.target === ov || e.target.closest('.msav-x'))) cierra(); e.stopPropagation(); }); });
    document.body.appendChild(ov); ov.querySelector('.msav-x').focus();
  }
  window.MSAVISO = { abrir: abrir, cierra: cierra };
  /* cualquier enlace con data-aviso abre la ventana en vez de irse a GitHub */
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('[data-aviso]'); if (!a) return; e.preventDefault(); e.stopPropagation(); var l = a.getAttribute('data-aviso') || document.documentElement.lang || navigator.language || 'es'; abrir(/^(es|ca|gl|eu)/i.test(l) ? 'es' : 'en'); }, true);
})();
