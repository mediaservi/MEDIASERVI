/* MEVI 3D · mascota animada de mediaservi.com
   Un solo modelo (assets/3d/mevi.glb: malla con esqueleto y 7 animaciones: reposo, andar, senala, invita, saluda, feliz, salta)
   repartido en tres escenarios:
   · INICIO  → pequeña, paseando por la franja de la cuenta atrás y haciendo gestitos (pasa por detrás de los números)
   · CONECTA → en lugar de la imagen fija: señala las opciones y saluda de vez en cuando
   · MUSEO   → esquina inferior izquierda, contenta y saludando para que pulses (al tocarla abre el terminal)
   Cada escenario solo se dibuja mientras su sección está en pantalla. Si WebGL falla, se queda la imagen fija. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (a, b) => a + Math.random() * (b - a);
const ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

let base = null;
const cargar = () => base || (base = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync('assets/3d/mevi.glb?v=3').then(g => {
  // «vuelo»: el tramo en el aire del salto (piernas recogidas), sin el desplazamiento de cadera; la parábola la pone el guion
  const sl = g.animations.find(c => c.name === 'salta');
  if (sl) { const v = THREE.AnimationUtils.subclip(sl, 'vuelo', 23, 35, 30), an = g.animations.find(c => c.name === 'andar');
    const ref = an && an.tracks.find(t => /Hips\.position/.test(t.name));
    for (const t of v.tracks) if (/Hips\.position/.test(t.name) && ref) for (let i = 0; i < t.values.length; i += 3) t.values.set(ref.values.subarray(0, 3), i);   // cadera a su altura de andar
    g.animations.push(v); }
  g.scene.traverse(o => { if (o.isMesh) { o.frustumCulled = false; const m = o.material.map;
    // la textura viene en trocitos: sin mipmaps no se mezclan los colores vecinos (evita las rayitas)
    if (m) { m.generateMipmaps = false; m.minFilter = THREE.LinearFilter; m.anisotropy = 4; m.needsUpdate = true; } } });
  return g;
}));

/* ---------- un escenario: canvas propio, Mevi clonada, mezclador y guion ---------- */
class Escena {
  constructor(el, { orto = false, activo, guion, giro = 0 }) {
    this.el = el; this.orto = orto; this.activo = activo; this.guion = guion;
    const r = this.r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); r.setClearColor(0, 0);
    r.domElement.className = 'mevi3d'; el.appendChild(r.domElement);
    const s = this.s = new THREE.Scene();
    s.add(new THREE.HemisphereLight(0xffffff, 0x6a4a8a, 2.1));
    const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(1.5, 3, 4); s.add(d);
    const t = new THREE.DirectionalLight(0xc89bff, 1.1); t.position.set(-2, 2, -3); s.add(t);
    this.cam = orto ? new THREE.OrthographicCamera(0, 1, 1, 0, -50, 50) : new THREE.PerspectiveCamera(26, 1, .1, 50);
    this.reloj = 0; this.tareas = []; this.x = 0; this.giro = giro; this.giroObj = giro; this.listo = false;
  }
  async monta(g) {
    const m = this.m = clone(g.scene);
    const piv = this.piv = new THREE.Group(); piv.add(m); this.s.add(piv);
    const mx = this.mx = new THREE.AnimationMixer(m);
    this.acc = {}; for (const c of g.animations) this.acc[c.name] = mx.clipAction(c);
    // altura real en reposo: pies en y=0 y Mevi de 1 de alto
    this.acc.reposo.play(); mx.update(0); m.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(m), h = b.max.y - b.min.y;
    m.scale.setScalar(1 / h); m.position.set(-(b.min.x + b.max.x) / 2 / h, -b.min.y / h, -(b.min.z + b.max.z) / 2 / h);
    this.act = this.acc.reposo; this.listo = true; this.mide();
    this.el.classList.add('m3d-on');
    if (!REDUCE) this.guion(this).catch(() => {});
  }
  mide() {
    const w = this.el.clientWidth, h = this.el.clientHeight; if (!w || !h) return;
    this.w = w; this.h = h; this.r.setSize(w, h, false);
    if (this.orto) { Object.assign(this.cam, { left: 0, right: w, top: h, bottom: 0 }); this.cam.updateProjectionMatrix(); }
    else { this.cam.aspect = w / h; const alto = 1.18, dist = alto / 2 / Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)) / Math.min(1, this.cam.aspect * 1.3);
      this.cam.position.set(0, .56, dist); this.cam.lookAt(0, .53, 0); this.cam.updateProjectionMatrix(); }
    this.al?.();
  }
  /* --- herramientas del guion (van con el reloj del escenario: si no se ve, se para) --- */
  espera(seg) { return new Promise(res => this.tareas.push({ fin: this.reloj + seg, res })); }
  pon(n, { fade = .3, veces = 1, ritmo = 1, max = 99 } = {}) {
    const a = this.acc[n]; if (!a) return this.espera(0);
    a.reset(); a.timeScale = ritmo; a.setEffectiveWeight(1);
    if (n === 'reposo' || n === 'andar' || n === 'vuelo') a.setLoop(THREE.LoopRepeat, Infinity); else { a.setLoop(THREE.LoopRepeat, veces); a.clampWhenFinished = true; }
    a.play(); if (this.act && this.act !== a) this.act.crossFadeTo(a, fade, false); this.act = a;
    return this.espera(n === 'reposo' || n === 'andar' || n === 'vuelo' ? 0 : Math.max(0, Math.min(max, a.getClip().duration * veces / ritmo) - fade));
  }
  gira(ang, seg = .4) { this.g0 = this.giro; this.giroObj = ang; this.gT = 0; this.gD = seg; return this.espera(seg); }
  paso(dt) {
    this.reloj += dt;
    for (let i = this.tareas.length; i--;) if (this.reloj >= this.tareas[i].fin) this.tareas.splice(i, 1)[0].res();
    if (this.gD) { this.gT += dt; const k = Math.min(1, this.gT / this.gD); this.giro = this.g0 + (this.giroObj - this.g0) * ease(k); if (k >= 1) this.gD = 0; }
    this.piv.rotation.y = this.giro; this.mx.update(dt); this.mueve?.(dt);
    this.r.render(this.s, this.cam);
  }
}

/* ---------- guiones ---------- */
// INICIO: pasea a lo largo de la franja; se para, mira al público y hace un gesto
const capa = (e, delante) => e.el.classList.toggle('delante', delante);
async function anda(e, obj) {
  const dir = Math.sign(obj - e.x) || 1;
  e.pon('andar', { fade: .25 }); await e.gira(dir * Math.PI / 2, .35);
  e.vel = dir * e.alto * .62; e.meta = obj; await new Promise(res => e.llega = res); e.vel = 0;
}
// salto por encima de un obstáculo (el cartel de WhatsApp): impulso, vuelo en parábola y aterrizaje andando
async function salta(e, obj) {
  const dir = Math.sign(obj - e.x) || 1, L = Math.abs(obj - e.x), D = Math.max(.75, Math.min(1.3, L / (e.alto * 3.6)));
  e.pon('vuelo', { fade: .12 });
  e.salto = { x0: e.x, x1: obj, t: 0, D, h: e.altoSalto };
  await new Promise(res => e.salto.fin = res);
  e.pon('andar', { fade: .15 });
}
async function gesto(e) {
  e.pon('reposo', { fade: .3 }); await e.gira(0, .45);
  const r = Math.random();
  if (r < .4) await e.pon('saluda', { veces: 3, fade: .2 });
  else if (r < .6) await e.pon('feliz', { fade: .3, max: 4.5 });
  else if (r < .8) await e.pon('senala', { fade: .3 });
  e.pon('reposo', { fade: .35 }); await e.espera(rnd(.8, 1.8));
}
async function paseo(e) {
  e.pon('reposo'); await e.espera(rnd(.6, 1.4));
  for (;;) {
    if (e.linea) {
      // ida (izquierda → derecha) por delante del contador y de WhatsApp; vuelta por detrás
      const ida = e.x < (e.seg[0] + e.seg[1]) / 2, fin = ida ? e.seg[1] : e.seg[0];
      const wa = e.wa, dentro = x => wa && x > wa[0] - e.alto && x < wa[1] + e.alto;
      // a la vuelta, si está junto al cartel de WhatsApp (o delante de él), lo salta por encima y sigue por detrás
      if (!ida && wa && e.x > wa[0] - e.alto * .55) {
        if (e.x > wa[1] + e.alto * .6) { capa(e, false); await anda(e, wa[1] + e.alto * .55); if (!e.linea) continue; }
        await salta(e, Math.max(fin, wa[0] - e.alto * .55)); if (!e.linea) continue;
      }
      capa(e, ida);
      if (Math.random() < .5) { const p = ida ? e.x + rnd(.3, .6) * (fin - e.x) : e.x - rnd(.3, .6) * (e.x - fin);
        if (!dentro(p)) { await anda(e, p); if (!e.linea) continue; await gesto(e); } }
      await anda(e, fin); if (!e.linea) continue; await gesto(e); continue;
    }
    capa(e, false);
    const [a, b] = e.seg, H = e.alto, L = b - a;
    let obj = rnd(a, b); if (Math.abs(obj - e.x) < L * .3) obj = e.x < a + L / 2 ? rnd(a + L * .6, b) : rnd(a, a + L * .4);
    const dir = Math.sign(obj - e.x) || 1;
    e.pon('andar', { fade: .25 }); await e.gira(dir * Math.PI / 2, .35);
    e.vel = dir * H * .62; e.meta = obj;
    await new Promise(res => e.llega = res);
    e.vel = 0; e.pon('reposo', { fade: .3 }); await e.gira(0, .45);
    const r = Math.random();
    if (r < .4) await e.pon('saluda', { veces: 3, fade: .2 });
    else if (r < .6) await e.pon('invita', { fade: .3 });
    else if (r < .75) await e.pon('senala', { fade: .3 });
    e.pon('reposo', { fade: .35 }); await e.espera(rnd(1.2, 3));
  }
}
// CONECTA: mira hacia las redes y las señala; de vez en cuando saluda de frente
async function conecta(e) {
  e.pon('reposo'); let n = 0;
  for (;;) {
    await e.espera(rnd(1.8, 3.2));
    if (++n % 3 === 0) { await e.gira(0, .45); await e.pon('saluda', { veces: 4, fade: .2 }); e.pon('reposo', { fade: .35 }); await e.espera(.6); await e.gira(e.giroBase, .5); }
    else { await e.pon('senala', { fade: .3 }); e.pon('reposo', { fade: .4 }); }
  }
}
// MUSEO: baila contenta («happy») para llamar la atención; alguna vez saluda
async function museo(e) {
  e.pon('reposo'); let n = 0;
  for (;;) {
    await e.espera(rnd(1, 2.2));
    if (++n % 4 === 0) { await e.gira(0, .4); await e.pon('saluda', { veces: 3, fade: .2 }); e.pon('reposo', { fade: .3 }); await e.gira(e.giroBase, .45); }
    else { await e.pon('feliz', { fade: .35, max: 5 }); e.pon('reposo', { fade: .45 }); await e.espera(rnd(.8, 1.6)); }
  }
}

/* ---------- arranque ---------- */
const escenas = [];
export function inicia({ abrirTerminal } = {}) {
  let gl; try { gl = !!document.createElement('canvas').getContext('webgl2'); } catch (e) { gl = false; }
  if (!gl) return;
  const sInicio = document.getElementById('inicio'), sConecta = document.getElementById('conecta'), sMuseo = document.getElementById('museo');
  const museumEl = document.getElementById('museum');

  // INICIO: franja a todo lo ancho a la altura de la cuenta atrás
  const fr = document.createElement('div'); fr.className = 'mevi-franja'; fr.setAttribute('aria-hidden', 'true'); document.body.appendChild(fr);
  const eI = new Escena(fr, { orto: true, activo: () => sInicio.classList.contains('on') && !eI.nada, guion: paseo });
  // busca dónde pasear: a los lados de la cuenta atrás (sin taparla ni pasar por detrás) o, si no cabe, justo debajo
  eI.al = () => { const cd = document.getElementById('avcd'); if (!cd) return;
    // ordenador y tablet: anda sobre la línea de las pestañas, de punta a punta (ida por delante, vuelta por detrás)
    const pr = document.querySelector('.nav .prog'), rp = pr && pr.getBoundingClientRect();
    if (rp && rp.width > 0 && innerWidth > 760 && innerWidth > innerHeight) {
      const A = Math.round(Math.max(56, Math.min(100, innerHeight * .095)));
      eI.linea = true; eI.nada = false; fr.style.display = '';
      fr.style.left = Math.round(rp.left) + 'px'; fr.style.width = Math.round(rp.width) + 'px';
      const wa = document.getElementById('wa'), rw = wa && !wa.classList.contains('hide') ? wa.getBoundingClientRect() : null;
      eI.wa = rw && rw.width ? [rw.left - rp.left, rw.right - rp.left] : null;
      eI.altoSalto = rw ? Math.max(A * .6, rp.top - rw.top + 12) : A * .6;
      const HC = Math.ceil(A + eI.altoSalto + 14);
      fr.style.top = Math.round(rp.top + 1 - HC) + 'px'; fr.style.height = HC + 'px';
      eI.seg = [A * .4, rp.width - A * .4]; eI.alto = A;
      if (eI.piv) { eI.piv.scale.setScalar(A); eI.piv.position.y = 0;
        if (!eI.x0 || eI.x < eI.seg[0] || eI.x > eI.seg[1]) { eI.x0 = 1; eI.x = eI.seg[0]; } }
      return; }
    eI.linea = false; eI.wa = null;
    const rs = sInicio.getBoundingClientRect(), rc = cd.getBoundingClientRect(), wa = document.getElementById('wa');
    const rw = wa && !wa.classList.contains('hide') ? wa.getBoundingClientRect() : null;
    const W = rs.width, alto = Math.round(Math.max(52, Math.min(104, innerHeight * .1))), g = alto * .35;
    const tramos = (top, bot, quita) => { let seg = [[0, W]];
      for (const [l, r] of quita) seg = seg.flatMap(([a, b]) => r <= a || l >= b ? [[a, b]] : [[a, l], [r, b]].filter(([x, y]) => y - x > 0));
      return seg.sort((p, q) => (q[1] - q[0]) - (p[1] - p[0]))[0] || [0, 0]; };
    const cruza = (r, top, bot) => r && r.bottom - rs.top > top && r.top - rs.top < bot;
    const opc = [];
    { const bot = rc.bottom - rs.top + 4, top = bot - alto - 8; const q = [[rc.left - rs.left - g, rc.right - rs.left + g]];
      if (cruza(rw, top, bot)) q.push([rw.left - rs.left - g, rw.right - rs.left + g]);
      for (const sel of ['.home .face', '.home .mlogo']) { const r = sInicio.querySelector(sel)?.getBoundingClientRect(); if (cruza(r, top, bot)) q.push([r.left - rs.left - g, r.right - rs.left + g]); }
      opc.push({ top, seg: tramos(top, bot, q) }); }
    { const top = rc.bottom - rs.top + 6; let lim = rs.height - 2;
      if (rw && rw.right > rc.left && rw.left < rc.right && rw.top - rs.top > top) lim = Math.min(lim, rw.top - rs.top - 4);
      const a2 = Math.min(alto, Math.floor(lim - top - 8)), bot = top + a2 + 8; const q = [];
      if (cruza(rw, top, bot)) q.push([rw.left - rs.left - g, rw.right - rs.left + g]);
      if (a2 >= 44) opc.push({ top, seg: tramos(top, bot, q), alto: a2 }); }
    opc[0].alto = alto;
    const ancho = o => o.seg[1] - o.seg[0];
    const el = ancho(opc[0]) >= alto * 4 || !opc[1] || ancho(opc[0]) >= ancho(opc[1]) ? opc[0] : opc[1];
    const A = el.alto;
    eI.nada = ancho(el) < A * 2.2; fr.style.display = eI.nada ? 'none' : '';
    fr.style.left = Math.round(rs.left) + 'px'; fr.style.width = Math.round(W) + 'px';
    fr.style.top = Math.round(rs.top + el.top) + 'px'; fr.style.height = (A + 8) + 'px';
    eI.seg = [el.seg[0] + A * .45, el.seg[1] - A * .45]; eI.alto = A;
    if (eI.piv) { eI.piv.scale.setScalar(A); eI.piv.position.y = 3;
      if (!eI.x0 || eI.x < eI.seg[0] || eI.x > eI.seg[1]) { eI.x0 = 1; eI.x = rnd(eI.seg[0], eI.seg[1]); if (eI.meta != null) eI.meta = Math.min(eI.seg[1], Math.max(eI.seg[0], eI.meta)); } } };
  eI.mueve = () => { eI.piv.position.x = eI.x; };
  const origPaso = eI.paso.bind(eI);
  eI.paso = dt => { const S = eI.salto; if (S) { S.t += dt; const k = Math.min(1, S.t / S.D); eI.x = S.x0 + (S.x1 - S.x0) * k; eI.piv.position.y = 4 * S.h * k * (1 - k);
      if (k >= 1) { eI.piv.position.y = 0; eI.salto = null; S.fin(); } } else if (eI.vel) { eI.x += eI.vel * dt; if ((eI.vel > 0 && eI.x >= eI.meta) || (eI.vel < 0 && eI.x <= eI.meta)) { eI.x = eI.meta; const f = eI.llega; eI.llega = null; f && f(); } } origPaso(dt); };
  escenas.push(eI);

  // CONECTA: en la caja de la imagen fija
  const caja = sConecta.querySelector('.mevi');
  if (caja) { const eC = new Escena(caja, { activo: () => sConecta.classList.contains('on'), guion: conecta });
    eC.al = () => { const lado = getComputedStyle(caja.parentElement).flexDirection === 'row'; eC.giroBase = lado ? .55 : 0; if (!eC.gD) eC.giro = eC.giroObj = eC.giroBase; };
    escenas.push(eC); }

  // MUSEO: esquina inferior izquierda, encima de la sala 3D
  const esq = document.createElement('div'); esq.className = 'mevi-museo'; esq.setAttribute('role', 'button'); esq.tabIndex = 0;
  esq.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open the terminal' : 'Abrir el terminal'); sMuseo.appendChild(esq);
  const eM = new Escena(esq, { activo: () => sMuseo.classList.contains('on') && museumEl && museumEl.classList.contains('on'), guion: museo, giro: .45 });
  eM.giroBase = .45; esq.addEventListener('click', () => abrirTerminal && abrirTerminal());
  esq.addEventListener('keydown', ev => { if (ev.key === 'Enter') abrirTerminal && abrirTerminal(); });
  escenas.push(eM);

  addEventListener('resize', () => escenas.forEach(e => e.mide()));
  if (/[?&]mevitest\b/.test(location.search)) window.__mevi = escenas;   // solo para pruebas
  cargar().then(g => { escenas.forEach(e => e.monta(g)); bucle(); }).catch(err => { console.warn('mevi3d', err); escenas.forEach(e => e.el.classList.remove('m3d-on')); });
}

let ult = 0;
function bucle(t = 0) {
  requestAnimationFrame(bucle);
  const dt = Math.min(.05, ult ? (t - ult) / 1000 : 0); ult = t;
  if (document.hidden) return;
  for (const e of escenas) {
    const on = e.listo && e.activo();
    e.el.classList.toggle('m3d-vis', on);
    if (!on) continue;
    if (!e.w || e.w !== e.el.clientWidth || e.h !== e.el.clientHeight) e.mide();
    e.paso(dt);
  }
}
