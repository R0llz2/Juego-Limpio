/* ===== Voz, descargas, panel docente, herramientas de aula, registro y resultados ===== */

/* ---- Lectura en voz alta ---- */
let vozClaude = null, turnoVoz = 0;
const enVisor = !!(window.claude && typeof window.claude.use === 'function');
try { if (enVisor) window.claude.use('tts').then(t => { if (t) { vozClaude = t; render(); } }).catch(() => {}); } catch (e) {}
function vozDisponible(){ return !!vozClaude || ('speechSynthesis' in window); }
function detenerVoz(){
  turnoVoz++;
  try { if (vozClaude) vozClaude.stop(); } catch (e) {}
  try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
}
function hablarNavegador(t){
  try {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'es-CO'; u.rate = 0.95;
    const voces = window.speechSynthesis.getVoices();
    const v = voces.find(x => /^es[-_](CO|MX|US|419)/i.test(x.lang)) || voces.find(x => /^es/i.test(x.lang));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}
function hablar(t){
  detenerVoz();
  const mio = ++turnoVoz;
  if (vozClaude) {
    vozClaude.speak(t).catch(err => {
      if (mio !== turnoVoz) return;
      if (err && err.code === 'not_granted') vozClaude = null;
      if (!err || err.code !== 'viewer_stopped') hablarNavegador(t);
    });
  } else hablarNavegador(t);
}
function escuchar(texto, grande, variante){
  if (!vozDisponible()) return '';
  return `<button type="button" class="btn-escuchar${grande ? ' grande' : ''}${variante === 'claro' ? ' claro' : ''}" data-accion="escuchar" data-valor="${esc(texto)}" aria-label="Escuchar en voz alta">${ic('volume-2')}${grande ? '<span>Escuchar</span>' : ''}</button>`;
}

/* ---- Copiar y descargar ---- */
let descargasClaude = null;
try { if (enVisor) window.claude.use('downloads').then(d => { descargasClaude = d; }).catch(() => {}); } catch (e) {}
function descargar(nombre, texto, listo){
  if (descargasClaude) {
    descargasClaude.save({filename:nombre, data:'﻿' + texto}).then(() => listo('ok')).catch(e => listo(e && e.code === 'declined' ? 'cancelado' : 'error'));
    return;
  }
  if (enVisor) { listo('error'); return; }
  try {
    const url = URL.createObjectURL(new Blob(['﻿' + texto], {type:'text/csv;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
    listo('ok');
  } catch (e) { listo('error'); }
}
function copiar(texto, listo){
  try { navigator.clipboard.writeText(texto).then(() => listo('ok')).catch(() => listo('error')); }
  catch (e) { listo('error'); }
}
const MENSAJES_EXPORTAR = {ok:'Listo.', cancelado:'Descarga cancelada.', error:'No se pudo en esta vista. Usa «Copiar» y pega en Excel o en Google Sheets.'};

/* ---- Datos del docente (solo en este navegador) ---- */
const CLAVE_DOCENTE = 'juego-limpio-docente';
let datosDocente = {resultados:{}, partidas:{n1:0, n2:0, n3:0, n4:0}, estudiantes:[], marcas:{}};
try {
  const g = JSON.parse(localStorage.getItem(CLAVE_DOCENTE) || 'null');
  if (g) datosDocente = Object.assign(datosDocente, g);
} catch (e) {}
function guardarDocente(){ try { localStorage.setItem(CLAVE_DOCENTE, JSON.stringify(datosDocente)); } catch (e) {} }
function registrar(clave, ok){
  const r = datosDocente.resultados[clave] || (datosDocente.resultados[clave] = {n:0, ok:0});
  r.n++; if (ok) r.ok++;
  guardarDocente();
}
function contarPartida(nivel){ datosDocente.partidas[nivel] = (datosDocente.partidas[nivel] || 0) + 1; guardarDocente(); }

const INDICADORES = {
  n1:[
    {c:'Identifica el derecho', l:'Identifica el derecho que está en juego en una situación cotidiana.'},
    {c:'Cuidado o en riesgo', l:'Distingue situaciones en las que un derecho se cuida de aquellas en las que se pone en riesgo.'},
    {c:'Explica el daño', l:'Explica con sus palabras por qué una situación afecta a otra persona.'},
    {c:'Propone una acción', l:'Propone al menos una acción para cuidar un derecho en riesgo.'},
    {c:'Derechos sin condición', l:'Reconoce que los derechos no dependen del comportamiento.'}],
  n2:[
    {c:'Identifica la exclusión', l:'Identifica situaciones de exclusión o burla en un espacio cotidiano.'},
    {c:'Reconoce emociones', l:'Reconoce cómo se siente la persona afectada.'},
    {c:'Ayuda sin agredir', l:'Propone acciones que ayudan sin agredir: incluir, acompañar, frenar con palabras o pedir ayuda.'},
    {c:'Valora la diferencia', l:'Explica por qué una diferencia no hace que alguien valga menos.'},
    {c:'Frases que cuidan', l:'Distingue frases que cuidan de frases que hieren y propone otra forma de decirlas.'}],
  n3:[
    {c:'Conflicto o agresión', l:'Distingue un conflicto de una agresión.'},
    {c:'Puntos de vista', l:'Identifica lo que quiere cada parte en un conflicto.'},
    {c:'Anticipa consecuencias', l:'Anticipa las consecuencias de una jugada para las dos personas.'},
    {c:'Elige la paz', l:'Elige alternativas pacíficas y justifica por qué funcionan.'},
    {c:'Disculpa y ayuda', l:'Reconoce cuándo pedir disculpas o pedir ayuda a un adulto.'}],
  n4:[
    {c:'Para qué sirven las normas', l:'Explica para qué sirven las normas en distintos contextos.'},
    {c:'Impuesta o acordada', l:'Diferencia una norma impuesta, un acuerdo construido entre todos y una norma de autoridad.'},
    {c:'Mejora reglas', l:'Evalúa una regla con criterios de justicia y propone cómo mejorarla.'},
    {c:'Participa y respeta', l:'Participa en la votación y en la construcción de acuerdos, y respeta las opiniones de los demás.'},
    {c:'Propone reparar', l:'Propone formas de reparar cuando un acuerdo no se cumple.'}]
};
const ESCALA = [{c:'—', l:'Sin observar'}, {c:'EP', l:'En proceso'}, {c:'L', l:'Logrado'}, {c:'D', l:'Destacado'}];
const NOMBRE_NIVEL = {n1:'Nivel 1 · Escáner de derechos', n2:'Nivel 2 · Detective del recreo', n3:'Nivel 3 · Duelo de jugadas', n4:'Nivel 4 · Asamblea final'};

function itemsNivel(nv){
  if (nv === 'n1') return SITUACIONES.map(s => ({clave:'n1:' + s.id, et:'Situación: ' + s.texto}))
    .concat(SITUACIONES.filter(s => s.acciones).map(s => ({clave:'n1a:' + s.id, et:'Qué hacer: ' + s.texto})))
    .concat(MITOS.map((m, k) => ({clave:'n1m:' + k, et:'Mito o verdad: ' + m.texto})));
  if (nv === 'n2') return PROBLEMAS2.map(id => ({clave:'n2:' + id, et:'Patio: ' + CASOS2[id].titulo + ' (primera acción elegida)'}))
    .concat(FRASES2.map((f, k) => ({clave:'n2f:' + k, et:'Frase: ' + f.t})));
  if (nv === 'n3') return CALENTAMIENTO3.map((c, k) => ({clave:'n3c:' + k, et:'Calentamiento: ' + c.t}))
    .concat(DUELOS3.map(d => ({clave:'n3d:' + d.id, et:'Duelo: ' + d.titulo + ' (gana-gana al primer intento)'})));
  return IMPUESTA4.map((c, k) => ({clave:'n4i:' + k, et:'¿Cómo nació?: ' + c.t}))
    .concat(REGLAS4.map(r => ({clave:'n4r:' + r.id, et:'Inspector: ' + r.t})));
}
function filasResultados(nv){
  return itemsNivel(nv).map(it => ({...it, r:datosDocente.resultados[it.clave]})).filter(x => x.r && x.r.n)
    .map(x => ({...x, pct:Math.round(100 * x.r.ok / x.r.n)})).sort((a, b) => a.pct - b.pct);
}

/* ---- Herramientas de aula ---- */
const reloj = {total:60, restante:60, corriendo:false};
let relojIntervalo = null, relojFin = 0, audio = null;
function relojPintar(){
  const seg = Math.ceil(reloj.restante), mm = Math.floor(seg / 60), ss = String(seg % 60).padStart(2, '0');
  document.querySelectorAll('.reloj-num').forEach(el => { el.textContent = `${mm}:${ss}`; el.classList.toggle('fin', reloj.restante <= 0); });
  document.querySelectorAll('.reloj-barra').forEach(el => { el.style.width = (reloj.total ? 100 * reloj.restante / reloj.total : 0) + '%'; });
}
function sonar(){
  try {
    if (!audio) return;
    [0, 0.35, 0.7].forEach(t => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(audio.destination);
      g.gain.setValueAtTime(0.0001, audio.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.3, audio.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + t + 0.25);
      o.start(audio.currentTime + t); o.stop(audio.currentTime + t + 0.3);
    });
  } catch (e) {}
}
function relojTic(){
  reloj.restante = Math.max(0, (relojFin - Date.now()) / 1000);
  relojPintar();
  if (reloj.restante <= 0) { clearInterval(relojIntervalo); relojIntervalo = null; reloj.corriendo = false; sonar(); render(); }
}
function relojHTML(){
  const seg = Math.ceil(reloj.restante), mm = Math.floor(seg / 60), ss = String(seg % 60).padStart(2, '0');
  return `<div class="reloj">
    <div class="reloj-num${reloj.restante <= 0 ? ' fin' : ''}" aria-live="off">${mm}:${ss}</div>
    <div class="reloj-pista"><span class="reloj-barra" style="width:${reloj.total ? 100 * reloj.restante / reloj.total : 0}%"></span></div>
    <div class="fila" style="justify-content:center">${[30, 60, 120, 180].map(t => `<button class="pildora" data-accion="reloj-tiempo" data-valor="${t}" aria-pressed="${reloj.total === t}">${t < 60 ? t + ' s' : t / 60 + ' min'}</button>`).join('')}</div>
    <div class="fila" style="justify-content:center">
      <button class="btn btn-cancha btn-chico" data-accion="reloj-iniciar">${ic(reloj.corriendo ? 'pause' : 'play')} ${reloj.corriendo ? 'Pausar' : (reloj.restante < reloj.total && reloj.restante > 0 ? 'Seguir' : 'Iniciar')}</button>
      <button class="btn btn-chico" data-accion="reloj-reiniciar">${ic('rotate-ccw')} Reiniciar</button>
    </div>
    ${reloj.restante <= 0 ? `<p class="hecho" style="justify-content:center">${ic('alarm-clock')} ¡Tiempo! Cada equipo comparte su respuesta.</p>` : ''}
  </div>`;
}
const sorteo = {equipos:4, bolsa:[], ultimo:null, giro:0};
function sorteoHTML(){
  return `<div class="sorteo">
    <div class="fila" style="justify-content:center;gap:10px"><span style="font-weight:700">Número de equipos</span>
      <button class="btn-icono" data-accion="sorteo-cambiar" data-valor="-1" aria-label="Menos equipos">${ic('minus')}</button>
      <output class="sorteo-n">${sorteo.equipos}</output>
      <button class="btn-icono" data-accion="sorteo-cambiar" data-valor="1" aria-label="Más equipos">${ic('plus')}</button></div>
    <div class="sorteo-res${sorteo.ultimo ? ' entra' : ''}" aria-live="polite" data-giro="${sorteo.giro}">${sorteo.ultimo ? `Equipo ${sorteo.ultimo}` : '¿Quién responde?'}</div>
    <p class="sorteo-nota">${sorteo.ultimo ? (sorteo.bolsa.length ? `Faltan por pasar: equipos ${sorteo.bolsa.slice().sort((a, b) => a - b).join(', ')}` : 'Ya pasaron todos. El próximo sorteo empieza una ronda nueva.') : 'Cada equipo pasa una vez antes de repetir.'}</p>
    <div class="fila" style="justify-content:center"><button class="btn btn-principal btn-chico" data-accion="sortear">${ic('shuffle')} Sortear equipo</button></div>
  </div>`;
}

/* ---- Guía docente dentro de los niveles ---- */
const esNivel = sc => /^(n[1-4]|caso)-/.test(sc);
const DONDE2 = {p1:'en la cancha', p2:'abajo, en el centro', p3:'junto al escalador, abajo a la derecha', p4:'frente a la tienda escolar', p5:'abajo a la izquierda', b1:'en la banca del árbol', b2:'en el centro, a la derecha', b3:'frente al edificio (la cuerda)'};
const GUIA = {
  n1:{proposito:'Reconocer los derechos fundamentales de niñas y niños e identificar cuándo se cuidan y cuándo se ponen en riesgo.',
      preguntas:['¿Cómo nos damos cuenta de que este derecho está en riesgo?', '¿Quién resulta afectado y cómo se siente?', '¿Este derecho depende de cómo se porte el niño o la niña?']},
  n2:{proposito:'Reconocer la exclusión y la burla, ponerse en el lugar de quien las vive y proponer formas de ayudar sin agredir.',
      preguntas:['¿Qué diferencia se está usando para excluir o burlarse?', '¿Esa diferencia hace que alguien valga menos? ¿Por qué no?', '¿Cómo frenamos la situación sin responder con otra agresión?']},
  n3:{proposito:'Distinguir conflicto y agresión y buscar soluciones en las que las dos partes queden bien.',
      preguntas:['¿Qué quiere cada persona y por qué?', '¿Qué pasa con la otra persona si solo gano yo?', '¿Por qué calmarse primero ayuda a resolver mejor?']},
  ca:{proposito:'Abrir y cerrar la secuencia con un dilema sin respuesta única: registrar la postura inicial del curso sobre una regla que excluye y revisarla al final con información nueva.',
      preguntas:['¿Qué razones da cada equipo para su postura? ¿Alguna razón piensa en Luisa y en Kevin?', '¿Una mayoría puede decidir que alguien no juegue?', '¿Hay una regla que cuide el balón de Nicolás sin dejar a nadie por fuera?']},
  n4:{proposito:'Comprender para qué sirven las normas, diferenciar normas impuestas, acuerdos y normas de autoridad, y construir el pacto del curso.',
      preguntas:['¿Qué diferencia hay entre imponer una regla y construir un acuerdo?', '¿Esta regla trata igual a todos y se puede cumplir?', '¿Qué hacemos cuando un acuerdo no se cumple, sin humillar a nadie?']}
};
function respuestaActual(){
  const sc = state.screen;
  if (sc === 'n1-escaner' && state.n1) {
    const s = S[state.n1.orden[state.n1.i]], buena = s.acciones ? s.acciones.find(a => a.ok) : null;
    return {clave:sc + s.id, html:`<strong>${s.estado === 'cuidado' ? 'Derecho cuidado' : 'Derecho en riesgo'}.</strong> Derecho: ${D[s.derecho].nombre}${s.tambien.length ? ` (también vale: ${s.tambien.map(t => D[t].nombre).join(', ')})` : ''}.${buena ? ` Acción que cuida: ${buena.t}` : ''} <br><span class="ley">Sustento: ${s.norma}</span>`};
  }
  if (sc === 'n1-mitos' && state.n1) {
    const m = MITOS[state.n1.mi];
    return {clave:sc + state.n1.mi, html:`<strong>${m.resp === 'mito' ? 'Mito' : 'Verdad'}.</strong> Mejor razón: ${m.porque.find(x => x.ok).t} <br><span class="ley">Sustento: ${m.norma}</span>`};
  }
  if (sc === 'n2-buscar' && state.n2) {
    const n = state.n2;
    if (n.activo && CASOS2[n.activo]) { const c = CASOS2[n.activo]; return {clave:sc + n.activo, html:`<strong>Acciones que cuidan:</strong> ${c.acciones.filter(a => a.ok).map(a => a.t).join(' · ')} <br><span class="ley">Sustento: ${c.norma}</span>`}; }
    return {clave:sc, html:`<strong>Dónde están las situaciones:</strong> ${PROBLEMAS2.map(id => `${CASOS2[id].titulo} (${DONDE2[id]})`).join('; ')}. <strong>Buenos ejemplos:</strong> ${Object.keys(BUENOS2).map(id => `${BUENOS2[id].titulo} (${DONDE2[id]})`).join('; ')}.`};
  }
  if (sc === 'n2-frases' && state.n2) {
    const f = FRASES2[state.n2.fi];
    return {clave:sc + state.n2.fi, html:`<strong>${f.r === 'cuida' ? 'Cuida' : 'Hiere'}.</strong> Paso 2: ${f.paso2.ops.find(x => x.ok).t}`};
  }
  if (sc === 'n3-calentamiento' && state.n3) {
    const c = CALENTAMIENTO3[state.n3.ci];
    return {clave:sc + state.n3.ci, html:`<strong>${OPCIONES3.find(o => o.id === c.r).t}.</strong> ${EXPLICA3[c.r]}`};
  }
  if (sc === 'n3-duelo' && state.n3) {
    const d = DUELOS3[state.n3.di], orden = ['calma', 'disculpa', 'escucha', 'expresa', 'propone'];
    const ruta = orden.map(t => d.cartas.find(c => c.tipo === t)).filter(Boolean);
    return {clave:sc + d.id, html:`<strong>Una ruta gana-gana:</strong> ${ruta.map(c => c.titulo).join(' → ')}. <br>Cartas que no ayudan: ${d.cartas.filter(c => c.tipo === 'mala' || c.tipo === 'cede').map(c => c.titulo).join(' · ')}.`};
  }
  if (sc === 'n4-impuesta' && state.n4) {
    const c = IMPUESTA4[state.n4.ii];
    return {clave:sc + state.n4.ii, html:`<strong>${TIPOS4.find(t => t.id === c.r).t}.</strong> ${c.e}`};
  }
  if (sc === 'n4-inspector' && state.n4) {
    const r = REGLAS4[state.n4.ri];
    return {clave:sc + r.id, html:r.falla.length ? `<strong>Le falta:</strong> ${r.falla.map(f => CRITERIOS4.find(c => c.id === f).falta).join(' / ')}. <strong>Versión mejorada:</strong> ${r.opciones.find(o => o.ok).t}` : '<strong>Está lista:</strong> cumple los cuatro criterios.'};
  }
  if (sc.startsWith('caso-')) return {clave:sc, sinRespuesta:true, html:'<strong>Este momento no tiene una respuesta correcta.</strong> Pida a equipos con posturas distintas que expliquen sus razones antes de votar. No corrija posturas: pregunte por las razones, por las personas afectadas y por las consecuencias. Al final, valore que el curso pueda explicar por qué cambió o mantuvo su postura.'};
  if (sc === 'n4-pacto' || sc === 'n4-cartel') return {clave:sc, html:'Lean cada acuerdo en voz alta y voten a mano alzada. Si hay empate, abran un minuto de diálogo y voten de nuevo. Cuide que todos los equipos puedan proponer.'};
  return null;
}
function guiaBoton(){
  if (!esNivel(state.screen)) return '';
  return `<button class="interruptor" data-accion="guia" data-valor="guia" aria-pressed="${!!state.guia}">${ic('graduation-cap')}<span class="txt">Guía docente</span></button>`;
}
function guiaPanel(){
  if (!state.guia || !esNivel(state.screen)) return '';
  if (!state.docenteOk) {
    return `<section class="guia-panel entra" aria-label="Guía docente">
      <form class="fila" id="form-guia" novalidate style="gap:10px;align-items:flex-end">
        <div class="pila" style="gap:4px;flex:1;min-width:200px"><label for="clave-guia" style="font-weight:700">${ic('lock')} Clave docente</label>
          <input class="campo-texto" id="clave-guia" type="password" inputmode="numeric" autocomplete="off"></div>
        <button class="btn btn-cancha btn-chico" type="submit">Entrar</button>
        <button class="btn btn-chico" type="button" data-accion="guia" data-valor="cerrar">${ic('x')} Cerrar</button>
      </form>
      <p class="error" role="alert">${state.errorGuia || ''}</p>
    </section>`;
  }
  const nv = state.screen.slice(0, 2), g = GUIA[nv], resp = respuestaActual();
  if (resp && state.guiaClave !== resp.clave) { state.guiaClave = resp.clave; state.guiaResp = false; }
  const pestana = state.guia === true ? 'guia' : state.guia;
  let cuerpo = '';
  if (pestana === 'reloj') cuerpo = relojHTML();
  else if (pestana === 'sorteo') cuerpo = sorteoHTML();
  else cuerpo = `<p><strong>Propósito:</strong> ${g.proposito}</p>
      <p style="font-weight:700;margin-top:6px">Preguntas para mediar</p>
      <ul class="lista-guia">${g.preguntas.map(q => `<li>${q}</li>`).join('')}</ul>
      ${resp && resp.sinRespuesta ? `<div class="respuesta-guia"><p>${resp.html}</p></div>` : resp ? `<div class="respuesta-guia">${state.guiaResp ? `<p>${resp.html}</p><button class="btn btn-chico" data-accion="guia-respuesta">${ic('eye-off')} Ocultar respuesta</button>` : `<button class="btn btn-chico" data-accion="guia-respuesta">${ic('eye')} Mostrar respuesta de este momento</button><span class="sorteo-nota">Ocúltela antes de proyectar.</span>`}</div>` : ''}`;
  return `<section class="guia-panel entra" aria-label="Guía docente">
    <div class="fila" style="justify-content:space-between">
      <div class="pestanas-mini" role="tablist">
        ${[['guia', 'Guía', 'graduation-cap'], ['reloj', 'Cronómetro', 'timer'], ['sorteo', 'Sorteo', 'shuffle']].map(([id, t, i]) => `<button role="tab" aria-selected="${pestana === id}" data-accion="guia" data-valor="${id}">${ic(i)} ${t}</button>`).join('')}
      </div>
      <button class="btn-icono" data-accion="guia" data-valor="cerrar" aria-label="Cerrar la guía docente">${ic('x')}</button>
    </div>
    ${cuerpo}
  </section>`;
}

/* ---- Panel docente con pestañas ---- */
const PESTANAS = [['inicio', 'Inicio', 'house'], ['n1', 'Nivel 1', 'scan-line'], ['n2', 'Nivel 2', 'search'], ['n3', 'Nivel 3', 'handshake'], ['n4', 'Nivel 4', 'users-round'],
  ['aula', 'Herramientas de aula', 'timer'], ['registro', 'Registro', 'clipboard-list'], ['resultados', 'Resultados del curso', 'chart-column'], ['cuidado', 'Cuidado y referentes', 'shield-alert']];
const tabla = (cab, filas) => `<div class="tabla-envoltura"><table><thead><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const lista = (items, ord) => `<${ord ? 'ol' : 'ul'}>${items.map(i => `<li>${i}</li>`).join('')}</${ord ? 'ol' : 'ul'}>`;
const signo = v => (v > 0 ? '+' : '') + v;

const DOC = {
  n1:{titulo:'Nivel 1 · Escáner de derechos', momento:'Momento 1: Reconozco mis derechos',
    proposito:'Que los estudiantes reconozcan los derechos fundamentales de niñas y niños e identifiquen situaciones cotidianas en las que esos derechos se cuidan o se ponen en riesgo, y propongan cómo cuidarlos.',
    estandares:['Conocer los derechos fundamentales de los niños y las niñas (Convivencia y paz).', 'Reconocer cuándo se vulneran los derechos de otras personas y por qué esas acciones son dañinas (Convivencia y paz).', 'Reconocer el derecho a la privacidad y la intimidad (Convivencia y paz).', 'Reconocer que todos los niños y las niñas tienen el mismo valor y los mismos derechos (Pluralidad, identidad y valoración de las diferencias).'],
    mecanica:'12 situaciones de la casa, el colegio, el barrio e internet, en orden aleatorio. Paso 1: ¿el derecho está cuidado o en riesgo? Paso 2: ¿cuál de los 12 derechos está en juego? (acepta derechos relacionados y, tras dos intentos, muestra la respuesta). Paso 3, solo en las 6 situaciones de riesgo: ¿qué se podría hacer? (3 opciones; las que no ayudan muestran su consecuencia). Después, Mito o verdad: 8 frases y, en cada una, «¿Por qué?» con 3 razones para escoger la mejor.',
    secuencia:['<strong>Inicio, 10 min.</strong> Abra la Mochila de derechos y lean juntos los 12 derechos (pueden usar «Escuchar»). Pregunte: ¿alguno se puede perder? Idea clave: no se ganan ni se pierden.', '<strong>Desarrollo, 25 min.</strong> Escáner por equipos: leer, votar, argumentar, elegir el derecho y decidir qué hacer. Use el cronómetro para la deliberación y el sorteo para escoger quién argumenta.', '<strong>Mito o verdad, 10 min.</strong> Antes de responder «¿Por qué?», pida a un equipo que diga su razón con sus palabras.', '<strong>Cierre, 5 a 10 min.</strong> Autoevaluación y actividad del cuaderno.'],
    preguntas:['¿Cómo nos damos cuenta de que este derecho está en riesgo?', '¿Quién resulta afectado y cómo se siente?', '¿Qué podría hacer cada persona para cuidar ese derecho?', '¿Este derecho depende de cómo se porte el niño o la niña?', '¿A quién podemos acudir si un derecho está en riesgo? (familia, docentes, orientación escolar, ICBF)'],
    tablas:() => `<h4>Respuestas: situaciones</h4>${tabla(['#', 'Situación', 'Estado', 'Derecho', 'Acción que cuida', 'Sustento'], SITUACIONES.map((s, k) => [k + 1, s.texto, s.estado === 'cuidado' ? 'Cuidado' : 'En riesgo', D[s.derecho].nombre + (s.tambien.length ? `<br><span class="suave">También vale: ${s.tambien.map(t => D[t].nombre).join(', ')}</span>` : ''), s.acciones ? s.acciones.find(a => a.ok).t : '—', s.norma]))}
      <h4>Respuestas: Mito o verdad</h4>${tabla(['#', 'Frase', 'Respuesta', 'Mejor razón', 'Sustento'], MITOS.map((m, k) => [k + 1, m.texto, m.resp === 'mito' ? 'Mito' : 'Verdad', m.porque.find(x => x.ok).t, m.norma]))}`},
  n2:{titulo:'Nivel 2 · Detective del recreo', momento:'Momento 2: Comprendo la importancia de respetar a los demás',
    proposito:'Que los estudiantes reconozcan situaciones de exclusión, burla y discriminación en espacios cotidianos, identifiquen cómo se sienten las personas afectadas y propongan acciones respetuosas para aliviar su malestar y frenar la situación sin agredir.',
    estandares:['Reconocer y rechazar las situaciones de exclusión o discriminación en el medio escolar (Pluralidad).', 'Reconocer que todos los niños y las niñas tienen el mismo valor y los mismos derechos (Pluralidad).', 'Reconocer que las diferencias son oportunidades para aprender y relacionarse (Pluralidad).', 'Reconocer el malestar de quienes son agredidos o excluidos y contribuir a aliviarlo (Convivencia y paz).', 'Actuar de forma asertiva para frenar situaciones de abuso en el colegio, sin agredir (Convivencia y paz).'],
    mecanica:'Búsqueda en una ilustración del patio: 5 situaciones de exclusión o burla (género, apariencia, discapacidad, origen y costumbres, un momento difícil grabado con celular) y 3 buenos ejemplos. En cada situación: cómo se siente la persona (6 caras: triste, con rabia, con vergüenza, con miedo, solo o sola, feliz) y qué harías (5 acciones en orden aleatorio, varias válidas; las que no ayudan muestran su consecuencia). Botón de pista. Después, Frases que cuidan: 8 frases (cuida o hiere) con un paso 2: «¿Por qué cuida?» o «¿Cómo se podría decir para cuidar?», con 3 opciones.',
    secuencia:['<strong>Inicio, 5 min.</strong> Pregunte: ¿qué significa excluir a alguien? ¿Cómo se nota en el recreo? Recoja ideas sin pedir ejemplos personales.', '<strong>Desarrollo, 25 min.</strong> Use el sorteo para elegir qué equipo propone dónde buscar. Al encontrar una situación, el curso delibera y justifica antes de tocar la pantalla.', '<strong>Frases que cuidan, 10 min.</strong> Para cada frase que hiere, pida al curso otra forma de decirla antes de ver las opciones.', '<strong>Cierre, 10 min.</strong> Autoevaluación y actividad del cuaderno (se puede escribir o dibujar).'],
    preguntas:['¿Qué diferencia de esta persona se está usando para excluirla o burlarse?', '¿Esa diferencia la hace valer menos? ¿Por qué no?', '¿Qué pasa con la persona cuando los demás se ríen o se quedan callados?', '¿Cómo podemos frenar la situación sin responder con otra agresión?', '¿Cuándo es importante pedir ayuda a un adulto?'],
    tablas:() => `<h4>Respuestas: situaciones del patio</h4>${tabla(['Situación', 'Dónde está', 'Diferencia', 'Acciones que cuidan', 'Idea clave', 'Sustento'], PROBLEMAS2.map(id => { const c = CASOS2[id]; return [c.texto, DONDE2[id], c.diferencia, c.acciones.filter(a => a.ok).map(a => a.t).join('<br>'), c.idea, c.norma]; }))}
      <h4>Respuestas: Frases que cuidan</h4>${tabla(['#', 'Frase', 'Respuesta', 'Paso 2', 'Opción correcta'], FRASES2.map((f, k) => [k + 1, f.t, f.r === 'cuida' ? 'Cuida' : 'Hiere', f.paso2.q, f.paso2.ops.find(x => x.ok).t]))}`},
  n3:{titulo:'Nivel 3 · Duelo de jugadas', momento:'Momento 4: Aprendo a solucionar los conflictos',
    proposito:'Que los estudiantes distingan el conflicto de la agresión, reconozcan los puntos de vista de las dos partes y prueben alternativas pacíficas para que ambas queden bien (gana-gana).',
    estandares:['Entender que los conflictos son normales en las relaciones (Convivencia y paz).', 'Diferenciar el conflicto de la agresión y reconocer que la agresión es lo que daña las relaciones.', 'Identificar los puntos de vista de las personas con quienes se tiene un conflicto.', 'Expresar la propia posición y escuchar la de los demás en situaciones de conflicto.', 'Reconocer varias opciones para manejar un conflicto y sus posibles consecuencias.', 'Usar estrategias para manejar la rabia, como respirar o tomar distancia.', 'Pedir disculpas por el daño causado, aunque no haya sido intencional.'],
    mecanica:'Calentamiento de 8 casos con 3 opciones: conflicto, agresión, o conflicto que se volvió agresión. Luego 4 duelos (colegio, casa, colegio, internet) con 7 cartas cada uno. Dos medidores muestran cómo queda cada persona; la meta es llevar ambos a la zona verde (75 o más) en máximo 4 jugadas. Las cartas agresivas o de ceder siempre bajan los medidores y desbloquean «Pedir disculpas». Se puede reintentar y consultar la jugada maestra: calma, escucha, di lo que quieres y propón.',
    secuencia:['<strong>Calentamiento, 10 min.</strong> Pida que expliquen la diferencia entre no estar de acuerdo, hacer daño y un desacuerdo que termina en daño.', '<strong>Duelos, 30 min.</strong> Antes de cada carta, los equipos predicen qué pasará con cada medidor (use el cronómetro de 1 minuto). Comparen la predicción con el resultado.', '<strong>Cierre, 10 min.</strong> Repasen la jugada maestra, hagan la autoevaluación y la actividad del cuaderno.'],
    preguntas:['¿Qué quiere cada persona? ¿Por qué lo quiere?', '¿Esta situación es un conflicto o ya hay una agresión?', '¿Qué pasa con la otra persona si solo gano yo? ¿Y conmigo si siempre cedo?', '¿Por qué calmarse primero ayuda a resolver mejor?', '¿Qué solución creativa podría servirles a los dos?'],
    tablas:() => `<h4>Respuestas: calentamiento</h4>${tabla(['#', 'Caso', 'Respuesta'], CALENTAMIENTO3.map((c, k) => [k + 1, c.t, OPCIONES3.find(o => o.id === c.r).t]))}
      <h4>Duelos: cartas y efectos (tú / otro)</h4>${tabla(['Duelo', 'Cartas que ayudan', 'Cartas que no ayudan', 'Acuerdo posible'], DUELOS3.map(d => [`<strong>${d.titulo}</strong><br>${d.texto}<br><span class="suave">Inicio: ${d.inicio[0]} / ${d.inicio[1]}</span>`, d.cartas.filter(c => c.tipo !== 'mala' && c.tipo !== 'cede').map(c => `${c.titulo} (${signo(c.dTu)} / ${signo(c.dOtro)})`).join('<br>'), d.cartas.filter(c => c.tipo === 'mala' || c.tipo === 'cede').map(c => `${c.titulo} (${signo(c.dTu)} / ${signo(c.dOtro)})`).join('<br>'), (d.cartas.find(c => c.acuerdo) || {}).acuerdo || '']))}
      <p class="suave" style="margin-top:8px">«Pedir disculpas» (${signo(PERDON3.dTu)} / ${signo(PERDON3.dOtro)}) aparece después de una carta agresiva en los duelos que no la traen desde el inicio.</p>`},
  n4:{titulo:'Nivel 4 · Asamblea final', momento:'Momentos 3 y 5: Normas y acuerdos; construimos acuerdos para convivir mejor',
    proposito:'Que los estudiantes comprendan para qué sirven las normas en la familia, el colegio, el barrio e internet, diferencien normas impuestas, acuerdos construidos entre todos y normas de autoridad, evalúen y mejoren reglas con criterios de justicia, y construyan y firmen el pacto de convivencia del curso.',
    estandares:['Reconocer el valor de las normas y los acuerdos para la convivencia en la familia, en el medio escolar y en otras situaciones (Convivencia y paz).', 'Participar constructivamente en procesos democráticos en el salón y en el medio escolar (Participación y responsabilidad democrática).', 'Identificar y expresar con las propias palabras las ideas y los deseos de quienes participan en la toma de decisiones (Participación).', 'Expresar de forma asertiva los propios puntos de vista e intereses en las discusiones grupales (Participación).'],
    mecanica:'¿Cómo nació esta regla?: 7 casos con 3 opciones (impuesta, acordada, de autoridad para protegernos) y tres ideas clave. Inspector de reglas: 6 reglas; el curso identifica qué criterio del medidor no se cumple (igual para todos, cuida los derechos, es clara, se puede cumplir) o si está lista, y elige la mejor de 4 versiones mejoradas. Nuestro pacto: votación Sí/No, hasta 3 acuerdos propios revisados con el medidor, decisión sobre la reparación (4 opciones) y nombre del curso. Cartel final para proyectar y copiar.',
    secuencia:['<strong>¿Cómo nació esta regla? e ideas clave, 10 min.</strong> Pregunte: ¿qué regla es más fácil de cumplir, una que nos imponen o una que construimos? ¿Por qué algunas normas de autoridad son necesarias?', '<strong>Inspector de reglas, 20 min.</strong> Use el sorteo para asignar una regla a cada equipo; el equipo argumenta su diagnóstico ante el curso.', '<strong>Pacto, 20 min.</strong> Votación a mano alzada, propuesta de acuerdos propios y decisión sobre la reparación.', '<strong>Cierre, 5 a 10 min.</strong> Lectura del cartel en voz alta, autoevaluación y actividad del cuaderno.'],
    preguntas:['¿Qué diferencia hay entre imponer una regla y construir un acuerdo?', '¿Para qué sirve esta norma? ¿Qué derecho cuida?', '¿Esta regla trata igual a todos? ¿Se puede cumplir de verdad?', '¿Por qué debemos cumplir los acuerdos que construimos entre todos?', '¿Qué hacemos cuando un acuerdo no se cumple, sin humillar a nadie?'],
    tablas:() => `<h4>Respuestas: ¿cómo nació esta regla?</h4>${tabla(['#', 'Caso', 'Respuesta'], IMPUESTA4.map((c, k) => [k + 1, c.t, TIPOS4.find(t => t.id === c.r).t]))}
      <h4>Respuestas: inspector de reglas</h4>${tabla(['Regla propuesta', 'Criterio que falla', 'Versión mejorada'], REGLAS4.map(r => [r.t, r.falla.length ? r.falla.map(f => CRITERIOS4.find(c => c.id === f).falta).join(' / ') : 'Ninguno: está lista', r.falla.length ? r.opciones.find(o => o.ok).t : '—']))}
      <h4>Uso del pacto en el aula</h4>${lista(['Copie el pacto (botón «Copiar el pacto») en una cartelera visible del salón o en el cuaderno de cada estudiante.', 'Revíselo con el curso cada cierto tiempo: ¿lo estamos cumpliendo? ¿Hay que ajustar algún acuerdo?', 'El pacto del aula complementa el manual de convivencia del colegio (Ley 115 de 1994, art. 87; Ley 1620 de 2013); no lo reemplaza.'])}`}
};

function seccionNivel(nv){
  const d = DOC[nv];
  return `<section class="tarjeta"><h3>${d.titulo}</h3><p class="suave">${d.momento}</p>
      <p style="margin-top:8px"><strong>Propósito:</strong> ${d.proposito}</p>
      <h4>Estándares relacionados (Competencias Ciudadanas, 4.° a 5.°, redacción resumida)</h4>${lista(d.estandares)}
      <h4>Mecánica</h4><p>${d.mecanica}</p>
      <h4>Secuencia sugerida</h4>${lista(d.secuencia, true)}
      <h4>Preguntas para mediar</h4>${lista(d.preguntas)}
    </section>
    <section class="tarjeta">${d.tablas()}</section>
    <section class="tarjeta"><h3>Evaluación formativa</h3><p>Indicadores para la lista de cotejo (escala: en proceso, logrado, destacado). Se marcan en la pestaña «Registro».</p>${lista(INDICADORES[nv].map(i => i.l), true)}
      <p style="margin-top:8px"><button class="btn btn-chico" data-accion="doc-tab" data-valor="registro">${ic('clipboard-list')} Ir al registro</button></p></section>`;
}

function seccionInicio(){
  return `<section class="tarjeta">
      <h3>Cómo usar Juego Limpio</h3>
      <p>Material didáctico digital para grado 4.° centrado en la ética y las competencias ciudadanas: reconocer los derechos fundamentales de niñas y niños y valorar las normas y acuerdos de convivencia en la familia, el colegio, el barrio y los entornos digitales.</p>
      <h4>Modos de uso</h4>
      ${lista(['<strong>Todo el curso con video beam:</strong> active el modo proyector y organice equipos de 4 o 5. Los equipos deliberan, votan y argumentan antes de tocar la pantalla.', '<strong>Individual o en parejas:</strong> en computadores o tablets, cada estudiante juega a su ritmo.', '<strong>Guía docente dentro de cada nivel:</strong> el botón «Guía docente» de la barra superior abre el propósito, las preguntas para mediar, la respuesta del momento, el cronómetro y el sorteo de equipos, sin salir del juego.', '<strong>Escuchar:</strong> el botón con el parlante lee en voz alta las situaciones y las explicaciones, para quienes leen más despacio.'])}
      <h4>El caso del balón</h4>
      <p>Es el hilo de toda la secuencia. Plantea un problema concreto: <strong>el grupo que tiene el único balón decide que «las niñas y los nuevos» no juegan.</strong> Al empezar, el curso registra su primera postura y su razón; no hay respuesta correcta. Al terminar el nivel 4 vuelve al caso, recibe tres datos nuevos («¿Y si…?»), revisa su postura y propone una regla para el balón. En «Resultados del curso» verá cómo se movieron las posturas.</p>
      <h4>Ruta sugerida</h4>${lista(['Sesión 1: El caso del balón, primera postura (10 min), y Nivel 1, Escáner de derechos (40 min).', 'Sesión 2: Nivel 2, Detective del recreo (50 min).', 'Sesión 3: Nivel 3, Duelo de jugadas (50 min).', 'Sesión 4: Nivel 4, Asamblea final y pacto del curso (55 a 60 min).', 'Cierre (al final de la sesión 4 o en una sesión corta de 20 min): revisión del caso del balón.'], true)}
      <h4>Créditos</h4>
      <p>Diseño pedagógico y dirección del material: <strong>Andrés Stiven Rodríguez Puentes</strong>, Licenciatura en Electrónica, Universidad Pedagógica Nacional (trabajo final de Ética Profesional, 2026-2).</p>
      <p><strong>Uso de inteligencia artificial:</strong> la programación, parte de la redacción y la búsqueda documental se hicieron con apoyo de Claude (Anthropic), bajo la dirección y revisión del autor, quien tomó las decisiones pedagógicas y responde por el contenido.</p>
      <p class="suave">Tipografías Lilita One y Atkinson Hyperlegible (licencia SIL Open Font License). Íconos Lucide (licencia ISC). Ilustraciones propias en SVG.</p>
    </section>
    <section class="pila" style="gap:10px">
      <h3>Matriz curricular</h3>
      ${tabla(['Nivel', 'Momento', 'Grupo de estándares', 'Indicadores', 'Evidencias'], [
        ['El caso del balón', 'Sensibilización y revisión de la postura', 'Convivencia y paz; Participación; Pluralidad', 'Expresa una postura con razones<br>Revisa su postura ante información nueva', 'Primera y última postura del curso, propuesta de regla, cuaderno'],
        ['1 · Escáner de derechos', 'Reconozco mis derechos', 'Convivencia y paz; Pluralidad', INDICADORES.n1.map(i => i.c).join('<br>'), 'Deliberación por equipos, autoevaluación, cuaderno'],
        ['2 · Detective del recreo', 'Respeto a los demás', 'Pluralidad; Convivencia y paz', INDICADORES.n2.map(i => i.c).join('<br>'), 'Argumentación de acciones, frases reformuladas, cuaderno (escrito o dibujo)'],
        ['3 · Duelo de jugadas', 'Resuelvo conflictos', 'Convivencia y paz', INDICADORES.n3.map(i => i.c).join('<br>'), 'Predicción y justificación de jugadas, cuaderno'],
        ['4 · Asamblea final', 'Normas y acuerdos; construimos acuerdos', 'Convivencia y paz; Participación', INDICADORES.n4.map(i => i.c).join('<br>'), 'Votación, acuerdos propios, Pacto de Juego Limpio firmado']])}
    </section>`;
}

function seccionAula(){
  return `<div class="aviso">${ic('info')}<p>Use estas herramientas en modo proyector. También están dentro de cada nivel, en el botón «Guía docente».</p></div>
    <div class="herramientas">
      <section class="tarjeta"><h3>${ic('timer')} Cronómetro de deliberación</h3>${relojHTML()}</section>
      <section class="tarjeta"><h3>${ic('shuffle')} ¿Qué equipo responde?</h3>${sorteoHTML()}</section>
    </div>`;
}

function seccionRegistro(){
  const est = datosDocente.estudiantes, nv = state.regNivel || 'n1', marcas = (datosDocente.marcas[nv] || {});
  const editar = state.editLista || !est.length;
  let html = `<section class="tarjeta pila" style="gap:12px">
    <h3>${ic('clipboard-list')} Lista de cotejo del curso</h3>
    <p>Marque lo que observe en cada estudiante. Toque una casilla para cambiarla: sin observar, en proceso, logrado, destacado.</p>`;
  if (editar) {
    html += `<label for="lista-estudiantes" style="font-weight:700">Lista de estudiantes (un nombre por línea)</label>
      <textarea class="campo-texto area" id="lista-estudiantes" rows="8" placeholder="Ana María Gómez&#10;Juan Pablo Ríos&#10;…">${esc(state.borradorLista !== undefined && state.borradorLista !== null ? state.borradorLista : est.join('\n'))}</textarea>
      <p class="error" role="alert">${state.errorLista || ''}</p>
      <div class="fila"><button class="btn btn-cancha btn-chico" data-accion="lista-guardar">${ic('check')} Guardar lista</button>${est.length ? `<button class="btn btn-chico" data-accion="lista-cancelar">Cancelar</button>` : ''}</div>`;
  } else {
    html += `<div class="fila" style="justify-content:space-between"><div class="pestanas-mini" role="tablist">${['n1', 'n2', 'n3', 'n4'].map(k => `<button role="tab" aria-selected="${nv === k}" data-accion="reg-nivel" data-valor="${k}">Nivel ${k[1]}</button>`).join('')}</div>
      <button class="btn btn-chico" data-accion="lista-editar">${ic('pencil')} Editar lista (${est.length})</button></div>
      <p class="suave">${NOMBRE_NIVEL[nv]}. ${INDICADORES[nv].map((i, k) => `<strong>${k + 1}.</strong> ${i.l}`).join(' ')}</p>
      <div class="tabla-envoltura"><table class="registro-tabla"><thead><tr><th>Estudiante</th>${INDICADORES[nv].map((i, k) => `<th title="${esc(i.l)}">${k + 1}. ${i.c}</th>`).join('')}</tr></thead><tbody>
        ${est.map((nombre, e) => `<tr><td>${esc(nombre)}</td>${INDICADORES[nv].map((_, k) => { const v = (marcas[nombre] || [])[k] || 0; return `<td><button class="celda v${v}" data-accion="marca" data-valor="${nv}|${e}|${k}" aria-label="${esc(nombre)}, indicador ${k + 1}: ${ESCALA[v].l}">${ESCALA[v].c}</button></td>`; }).join('')}</tr>`).join('')}
      </tbody></table></div>
      <p class="suave">Escala: ${ESCALA.map(x => `<strong>${x.c}</strong> ${x.l.toLowerCase()}`).join(' · ')}</p>
      <div class="fila">
        <button class="btn btn-chico" data-accion="reg-copiar">${ic('copy')} Copiar todo (para Excel o Sheets)</button>
        <button class="btn btn-chico" data-accion="reg-descargar">${ic('download')} Descargar CSV</button>
        <button class="btn btn-chico" data-accion="reg-borrar">${ic('trash-2')} ${state.confirmarBorrarReg ? 'Toca otra vez para borrar todo' : 'Borrar registro'}</button>
      </div>
      ${state.msgReg ? `<p role="status" class="hecho">${state.msgReg}</p>` : ''}`;
  }
  html += `<p class="suave">${ic('info')} El registro se guarda solo en este navegador. Descárguelo o cópielo al terminar cada sesión.</p></section>`;
  return html;
}

function seccionResultados(){
  const bloques = ['n1', 'n2', 'n3', 'n4'].map(nv => {
    const filas = filasResultados(nv), partidas = datosDocente.partidas[nv] || 0;
    if (!filas.length) return `<section class="tarjeta"><h3>${NOMBRE_NIVEL[nv]}</h3><p class="suave">Aún no hay datos de este nivel en este dispositivo.</p></section>`;
    const dificiles = filas.filter(f => f.pct < 70).slice(0, 3);
    return `<section class="tarjeta pila" style="gap:10px"><h3>${NOMBRE_NIVEL[nv]}</h3>
      <p class="suave">Partidas terminadas en este dispositivo: ${partidas}. Porcentaje de respuestas correctas a la primera.</p>
      ${dificiles.length ? `<div class="pista">${ic('lightbulb')}<p><strong>Lo que más le costó al curso:</strong> ${dificiles.map(f => `${f.et} (${f.pct} %)`).join('; ')}. Retome estos casos en la próxima clase.</p></div>` : `<p class="hecho">${ic('circle-check')} Todas las respuestas tienen 70 % o más de acierto a la primera.</p>`}
      <div class="tabla-envoltura"><table class="tabla-res"><thead><tr><th>Pregunta</th><th>Veces</th><th>A la primera</th></tr></thead><tbody>
        ${filas.map(f => `<tr><td>${f.et}</td><td>${f.r.n}</td><td><div class="mini-barra"><span style="width:${f.pct}%" class="${f.pct < 50 ? 'baja' : f.pct < 70 ? 'media' : ''}"></span></div> ${f.pct} %</td></tr>`).join('')}
      </tbody></table></div></section>`;
  }).join('');
  return `<div class="aviso">${ic('info')}<p>La app registra automáticamente qué tan bien respondió el curso cada pregunta en este dispositivo. Si juegan con video beam, cada partida corresponde a la respuesta del curso.</p></div>
    ${bloqueCaso()}
    ${bloques}
    <div class="fila">
      <button class="btn btn-chico" data-accion="res-copiar">${ic('copy')} Copiar resultados</button>
      <button class="btn btn-chico" data-accion="res-descargar">${ic('download')} Descargar CSV</button>
      <button class="btn btn-chico" data-accion="res-borrar">${ic('trash-2')} ${state.confirmarBorrarRes ? 'Toca otra vez para borrar' : 'Borrar resultados'}</button>
    </div>
    ${state.msgRes ? `<p role="status" class="hecho">${state.msgRes}</p>` : ''}`;
}

function bloqueCaso(){
  const c = datosDocente.caso;
  const hay = c && (Object.values(c.inicial).some(Boolean) || c.revisiones);
  if (!hay) return `<section class="tarjeta"><h3>El caso del balón</h3><p class="suave">Aún no hay posturas registradas en este dispositivo.</p></section>`;
  const filasP = [['si', 'Sí es justa'], ['no', 'No es justa'], ['duda', 'No estoy seguro']].map(([k, t]) => `<tr><td>${t}</td><td>${c.inicial[k] || 0}</td><td>${c.final[k] || 0}</td></tr>`).join('');
  const ysi = ['La tristeza de Luisa', 'La votación del grupo', 'El balón es de Nicolás'].map((t, k) => { const y = c.ysi[k] || {}; return `<tr><td>${t}</td><td>${y.cambio || 0}</td><td>${y.duda || 0}</td><td>${y.igual || 0}</td></tr>`; }).join('');
  const prop = {turnos:'Turnos', mezcla:'Equipos mezclados', cuidado:'Prestar y cuidar el balón', colegio:'Balones del colegio', otra:'Otra propuesta'};
  return `<section class="tarjeta pila" style="gap:10px"><h3>El caso del balón (posturas del curso)</h3>
    <p class="suave">Aquí no hay aciertos: las cifras muestran cómo se movieron las posturas. Revisiones completas: ${c.revisiones}. Cambios de postura: ${c.cambios}.</p>
    <div class="tabla-envoltura"><table class="tabla-res"><thead><tr><th>Postura</th><th>Al empezar</th><th>Al final</th></tr></thead><tbody>${filasP}</tbody></table></div>
    <div class="tabla-envoltura"><table class="tabla-res"><thead><tr><th>¿Y si…?</th><th>Cambió</th><th>Dudó</th><th>Mantuvo</th></tr></thead><tbody>${ysi}</tbody></table></div>
    <p><strong>Propuestas elegidas:</strong> ${Object.keys(c.propuestas).length ? Object.entries(c.propuestas).map(([k, n]) => `${prop[k]} (${n})`).join('; ') : 'ninguna todavía'}.</p>
  </section>`;
}

function seccionCuidado(){
  return `<section class="tarjeta"><h3>Cuidado y protección</h3>${lista([
      'Todas las situaciones son ficticias. No pida a los estudiantes contar experiencias personales de vulneración de derechos.',
      'Si un estudiante revela una situación de riesgo: escúchelo con calma y sin juzgar, no prometa guardar el secreto, no indague detalles y reporte de inmediato a orientación escolar o coordinación para activar la Ruta de Atención Integral para la Convivencia Escolar del manual de convivencia (Ley 1620 de 2013). Línea gratuita del ICBF: 141.',
      'La situación de Juan (trabajo infantil) debe abordarse sin juzgar a las familias, con énfasis en la corresponsabilidad de familia, sociedad y Estado.',
      'En el nivel 2, si un estudiante comparte una característica con algún personaje (usa gafas o silla de ruedas, viene de otra región, etc.), no lo ponga como ejemplo ni le pida hablar de su experiencia.',
      'El registro y los resultados se guardan solo en el navegador de este equipo. No incluya información sensible de los estudiantes en la lista.'])}</section>
    <section class="tarjeta"><h3>Referentes</h3>${lista([
      'Constitución Política de Colombia de 1991, arts. 7, 13, 15, 20, 44 y 67.',
      'Ley 1098 de 2006, Código de la Infancia y la Adolescencia.',
      'Ley 1620 de 2013, Sistema Nacional de Convivencia Escolar.',
      'Ley 115 de 1994, Ley General de Educación (art. 23, art. 87: manual de convivencia).',
      'Ministerio de Educación Nacional (2004). Estándares Básicos de Competencias Ciudadanas. Guía n.° 6.',
      'Ministerio de Educación Nacional (1998). Lineamientos curriculares de Educación Ética y Valores Humanos.'])}</section>`;
}

pantallas.docente = function(){
  const tab = state.docTab || 'inicio';
  let cuerpo = '';
  if (tab === 'inicio') cuerpo = seccionInicio();
  else if (/^n[1-4]$/.test(tab)) cuerpo = seccionNivel(tab);
  else if (tab === 'aula') cuerpo = seccionAula();
  else if (tab === 'registro') cuerpo = seccionRegistro();
  else if (tab === 'resultados') cuerpo = seccionResultados();
  else cuerpo = seccionCuidado();
  return `<div class="app docente">${barra('Panel docente', 'inicio')}
    <nav class="pestanas" role="tablist" aria-label="Secciones del panel docente">
      ${PESTANAS.map(([id, t, i]) => `<button role="tab" aria-selected="${tab === id}" data-accion="doc-tab" data-valor="${id}">${ic(i)} ${t}</button>`).join('')}
    </nav>
    <div class="pila">${cuerpo}</div>
  </div>`;
};

/* ---- Exportar ---- */
function textoRegistro(sep){
  const cab = ['Estudiante'].concat(...['n1', 'n2', 'n3', 'n4'].map(nv => INDICADORES[nv].map((i, k) => `N${nv[1]}.${k + 1} ${i.c}`)));
  const filas = datosDocente.estudiantes.map(nombre => [nombre].concat(...['n1', 'n2', 'n3', 'n4'].map(nv => INDICADORES[nv].map((_, k) => ESCALA[((datosDocente.marcas[nv] || {})[nombre] || [])[k] || 0].l))));
  return [cab].concat(filas).map(f => f.map(c => sep === ';' ? `"${String(c).replace(/"/g, '""')}"` : c).join(sep)).join('\n');
}
function textoResultados(sep){
  const filas = [['Nivel', 'Pregunta', 'Veces', 'Acierto a la primera (%)']];
  ['n1', 'n2', 'n3', 'n4'].forEach(nv => filasResultados(nv).forEach(f => filas.push([NOMBRE_NIVEL[nv], f.et, f.r.n, f.pct])));
  const c = datosDocente.caso;
  if (c) [['si', 'Sí es justa'], ['no', 'No es justa'], ['duda', 'No estoy seguro']].forEach(([k, t]) => {
    filas.push(['El caso del balón', 'Postura al empezar: ' + t, c.inicial[k] || 0, '—']);
    filas.push(['El caso del balón', 'Postura al final: ' + t, c.final[k] || 0, '—']);
  });
  return filas.map(f => f.map(c => sep === ';' ? `"${String(c).replace(/"/g, '""')}"` : c).join(sep)).join('\n');
}

Object.assign(acciones, {
  escuchar(v){ hablar(v); },
  'doc-tab'(v){ state.docTab = v; state.msgReg = ''; state.msgRes = ''; state.confirmarBorrarReg = false; state.confirmarBorrarRes = false; },
  guia(v){
    if (v === 'cerrar') { state.guia = null; return; }
    if (v === 'guia' && state.guia && (state.guia === 'guia' || state.guia === true) ) { state.guia = null; return; }
    state.guia = v; state.errorGuia = '';
  },
  'guia-respuesta'(){ state.guiaResp = !state.guiaResp; },
  'reloj-tiempo'(v){ clearInterval(relojIntervalo); relojIntervalo = null; reloj.total = Number(v); reloj.restante = reloj.total; reloj.corriendo = false; },
  'reloj-iniciar'(){
    try { if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended') audio.resume(); } catch (e) {}
    if (reloj.corriendo) { clearInterval(relojIntervalo); relojIntervalo = null; reloj.corriendo = false; return; }
    if (reloj.restante <= 0) reloj.restante = reloj.total;
    relojFin = Date.now() + reloj.restante * 1000; reloj.corriendo = true;
    clearInterval(relojIntervalo); relojIntervalo = setInterval(relojTic, 200);
  },
  'reloj-reiniciar'(){ clearInterval(relojIntervalo); relojIntervalo = null; reloj.corriendo = false; reloj.restante = reloj.total; },
  'sorteo-cambiar'(v){ sorteo.equipos = Math.max(2, Math.min(10, sorteo.equipos + Number(v))); sorteo.bolsa = []; sorteo.ultimo = null; },
  sortear(){
    if (!sorteo.bolsa.length) sorteo.bolsa = mezclar(Array.from({length:sorteo.equipos}, (_, k) => k + 1));
    sorteo.ultimo = sorteo.bolsa.pop(); sorteo.giro++;
  },
  'lista-editar'(){ state.editLista = true; state.borradorLista = datosDocente.estudiantes.join('\n'); state.errorLista = ''; },
  'lista-cancelar'(){ state.editLista = false; state.borradorLista = null; state.errorLista = ''; },
  'lista-guardar'(){
    const texto = state.borradorLista !== undefined && state.borradorLista !== null ? state.borradorLista : datosDocente.estudiantes.join('\n');
    const nombres = [...new Set(texto.split('\n').map(x => x.trim()).filter(Boolean))].slice(0, 60);
    if (!nombres.length) { state.errorLista = 'Escribe al menos un nombre, uno por línea.'; return; }
    datosDocente.estudiantes = nombres; guardarDocente();
    state.editLista = false; state.borradorLista = null; state.errorLista = '';
  },
  'reg-nivel'(v){ state.regNivel = v; state.msgReg = ''; },
  marca(v){
    const [nv, e, k] = v.split('|'), nombre = datosDocente.estudiantes[Number(e)];
    if (!nombre) return;
    const m = datosDocente.marcas[nv] || (datosDocente.marcas[nv] = {});
    const fila = m[nombre] || (m[nombre] = [0, 0, 0, 0, 0]);
    fila[Number(k)] = ((fila[Number(k)] || 0) + 1) % ESCALA.length;
    guardarDocente(); state.msgReg = ''; state.confirmarBorrarReg = false;
  },
  'reg-copiar'(){ copiar(textoRegistro('\t'), r => { state.msgReg = r === 'ok' ? 'Copiado. Pégalo en Excel o en Google Sheets.' : MENSAJES_EXPORTAR.error; render(); }); },
  'reg-descargar'(){ descargar('registro-juego-limpio.csv', textoRegistro(';'), r => { state.msgReg = r === 'ok' ? 'Descarga lista.' : MENSAJES_EXPORTAR[r]; render(); }); },
  'reg-borrar'(){
    if (!state.confirmarBorrarReg) { state.confirmarBorrarReg = true; return; }
    datosDocente.estudiantes = []; datosDocente.marcas = {}; guardarDocente(); state.confirmarBorrarReg = false; state.msgReg = 'Registro borrado.';
  },
  'res-copiar'(){ copiar(textoResultados('\t'), r => { state.msgRes = r === 'ok' ? 'Copiado. Pégalo en Excel o en Google Sheets.' : MENSAJES_EXPORTAR.error; render(); }); },
  'res-descargar'(){ descargar('resultados-juego-limpio.csv', textoResultados(';'), r => { state.msgRes = r === 'ok' ? 'Descarga lista.' : MENSAJES_EXPORTAR[r]; render(); }); },
  'res-borrar'(){
    if (!state.confirmarBorrarRes) { state.confirmarBorrarRes = true; return; }
    datosDocente.resultados = {}; datosDocente.partidas = {n1:0, n2:0, n3:0, n4:0}; datosDocente.caso = null; guardarDocente(); state.confirmarBorrarRes = false; state.msgRes = 'Resultados borrados.';
  }
});

document.addEventListener('input', e => {
  if (e.target.id === 'lista-estudiantes') state.borradorLista = e.target.value;
});
document.addEventListener('submit', e => {
  if (e.target.id !== 'form-guia') return;
  e.preventDefault();
  const val = (document.getElementById('clave-guia').value || '').trim();
  if (val === CLAVE) { state.docenteOk = true; state.errorGuia = ''; state.guia = 'guia'; }
  else state.errorGuia = val ? 'Clave incorrecta.' : 'Escribe la clave.';
  render();
});
