/* ---- El caso del balón: postura inicial (sensibilización) y revisión de la postura ---- */
const CASO = {
  texto: 'En el recreo, el grupo de Nicolás tiene el único balón de fútbol del curso. Nicolás anuncia: «El balón es nuestro, así que las reglas las ponemos nosotros: aquí solo juegan los que escojamos. Las niñas y los nuevos, no». Luisa, y Kevin, que llegó este año de otra ciudad, quieren jugar.',
  pregunta: '¿Es justa la regla de Nicolás?',
  posturas: [
    {id:'si', t:'Sí es justa', icono:'circle-check'},
    {id:'no', t:'No es justa', icono:'circle-x'},
    {id:'duda', t:'No estoy seguro', icono:'message-circle-question'}
  ],
  razones: {
    si: ['El balón es de ellos y pueden decidir con quién juegan.', 'Si juegan muchos, el partido se desordena.', 'Ellos llegaron primero a la cancha.'],
    no: ['Deja por fuera a Luisa y a Kevin solo por ser niña y por ser nuevo.', 'Todos los niños y las niñas tienen derecho a jugar.', 'La decidió un grupo sin preguntarles a los demás.'],
    duda: ['El balón es de ellos, pero no me gusta que dejen a otros por fuera.', 'Necesito saber qué piensan Luisa y Kevin.', 'Depende de si hay otros balones o juegos para todos.']
  },
  ysi: [
    {t:'Luisa cuenta que todos los recreos se queda mirando desde la banca y que ya no le dan ganas de salir al patio.',
     pensar:'Una regla también se mide por cómo hace sentir a quienes deja por fuera. Jugar y ser tratado con igualdad son derechos de todos los niños y las niñas.',
     ley:'Constitución, arts. 13 y 44 · Ley 1098 de 2006, art. 30'},
    {t:'El grupo de Nicolás votó y la mayoría estuvo de acuerdo con la regla.',
     pensar:'Votar sirve para decidir muchas cosas. Pero en esa votación no participaron Luisa ni Kevin, que son los afectados. Un acuerdo justo escucha a todos los que tienen que cumplirlo, y una mayoría no puede quitarle derechos a nadie.',
     ley:'Ley 1098 de 2006, art. 31 (participación)'},
    {t:'El balón sí es de Nicolás: lo trajo de su casa y le preocupa que se lo dañen.',
     pensar:'Cuidar lo propio es razonable, y Nicolás también merece ser escuchado. La pregunta ahora es otra: ¿se puede cuidar el balón sin dejar a nadie por fuera?',
     ley:null}
  ],
  cambia: [
    {id:'cambio', t:'Sí, cambio de postura', icono:'rotate-ccw'},
    {id:'duda', t:'Me hace dudar', icono:'message-circle-question'},
    {id:'igual', t:'No, mantengo mi postura', icono:'circle-check'}
  ],
  propuestas: [
    {id:'turnos', t:'Turnos: cada recreo juega con el balón un grupo distinto.'},
    {id:'mezcla', t:'Equipos mezclados que se arman al empezar cada recreo, con quien quiera jugar.'},
    {id:'cuidado', t:'Nicolás presta el balón y entre todos acuerdan cómo cuidarlo.'},
    {id:'colegio', t:'Pedirle al colegio balones para todos los cursos.'},
    {id:'otra', t:'Otra propuesta: la escribimos en el cuaderno.'}
  ]
};
const POSTURA = Object.fromEntries(CASO.posturas.map(p => [p.id, p]));
function textoRazon(postura, k){ return k === 'otra' ? 'Otra razón, dicha en voz alta.' : CASO.razones[postura][Number(k)]; }

function datosCaso(){
  if (!datosDocente.caso) datosDocente.caso = {inicial:{si:0, no:0, duda:0}, final:{si:0, no:0, duda:0}, revisiones:0, cambios:0, ysi:[{}, {}, {}], propuestas:{}};
  return datosDocente.caso;
}
function sumar(obj, clave){ obj[clave] = (obj[clave] || 0) + 1; }

function botonesPostura(accion){
  return `<div class="acciones2">${CASO.posturas.map(p => `<button class="accion2" data-accion="${accion}" data-valor="${p.id}">${ic(p.icono)}<span>${p.t}</span></button>`).join('')}</div>`;
}
function botonesRazon(postura, accion){
  return `<div class="acciones2">${CASO.razones[postura].map((r, k) => `<button class="accion2" data-accion="${accion}" data-valor="${k}"><span>${r}</span></button>`).join('')}
    <button class="accion2" data-accion="${accion}" data-valor="otra">${ic('message-circle')}<span>Tenemos otra razón: la decimos en voz alta.</span></button></div>`;
}
function tarjetaCaso(){
  return `<div class="afirmacion">${ic('quote', 'comillas')}<p>${CASO.texto}</p>${escuchar(CASO.texto, true, 'claro')}</div>`;
}
function resumenPostura(p){
  if (!p) return '<p class="suave">No se registró.</p>';
  return `<p class="sello derecho" style="align-self:flex-start">${ic(POSTURA[p.postura].icono)} ${POSTURA[p.postura].t}</p>
    <p><strong>Razón:</strong> ${textoRazon(p.postura, p.razon)}</p>`;
}

Object.assign(pantallas, {
  'caso-intro'(){
    const c = state.caso, t = state.casoTmp || {};
    let cuerpo;
    if (c.inicial && !t.rehacer) {
      cuerpo = `<div class="resultado entra" role="status">
          <h3>${ic('circle-check')} Tu primera postura quedó guardada</h3>
          ${resumenPostura(c.inicial)}
          <p>Al terminar el nivel 4 volverás a este caso para ver si cambias o mantienes tu postura.</p>
        </div>
        <div class="fila">
          <button class="btn btn-principal" data-accion="ir" data-valor="n1-intro">${ic('play')} Ir al nivel 1</button>
          <button class="btn" data-accion="ir" data-valor="vestuario">${ic('house')} Volver al vestuario</button>
          <button class="btn btn-chico" data-accion="caso-rehacer">${ic('rotate-ccw')} Responder de nuevo</button>
        </div>`;
    } else if (!t.postura) {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 1</span> ${CASO.pregunta}</p>${botonesPostura('caso-postura')}`;
    } else {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 2</span> ¿Cuál es tu razón principal?</p>
        <p class="sello derecho" style="align-self:flex-start">${ic(POSTURA[t.postura].icono)} ${POSTURA[t.postura].t}</p>
        ${botonesRazon(t.postura, 'caso-razon')}`;
    }
    return `<div class="app">${barra('El caso del balón', 'vestuario')}
      <div class="pila">
        <p class="etiqueta" style="align-self:flex-start">${ic('volleyball')} Antes de empezar · Tu primera postura</p>
        ${tarjetaCaso()}
        <div class="aviso">${ic('info')}<p><strong>Aquí no hay una respuesta correcta.</strong> Queremos saber qué piensas ahora y por qué. Si juegan con todo el curso, cada equipo explica su postura antes de votar.</p></div>
        ${cuerpo}
      </div>
    </div>`;
  },

  'caso-revision'(){
    const c = state.caso, r = state.casoRev || (state.casoRev = {paso:0, resp:[], final:null, razonFinal:null, propuesta:null});
    const y = CASO.ysi[r.paso], resp = r.resp[r.paso];
    const ultimo = r.paso === CASO.ysi.length - 1;
    return `<div class="app">${barra('Vuelve el caso del balón', 'vestuario')}
      <div class="pips" aria-hidden="true">${CASO.ysi.map((_, k) => `<span class="${k < r.paso ? 'ok' : k === r.paso ? 'ahora' : ''}"></span>`).join('')}<span></span></div>
      <div class="pila">
        <details class="tarjeta"><summary><strong>Recuerda el caso y tu primera postura</strong></summary>
          <div class="pila" style="margin-top:10px">${tarjetaCaso()}${resumenPostura(c.inicial)}</div>
        </details>
        <p class="etiqueta" style="align-self:flex-start">${ic('lightbulb')} ¿Y si…? ${r.paso + 1} de ${CASO.ysi.length}</p>
        <div class="afirmacion">${ic('message-circle-question', 'comillas')}<p>${y.t}</p>${escuchar(y.t, true, 'claro')}</div>
        ${!resp ? `<p class="pregunta">¿Esto cambia lo que piensas sobre la regla de Nicolás?</p>
          <div class="acciones2">${CASO.cambia.map(o => `<button class="accion2" data-accion="caso-ysi" data-valor="${o.id}">${ic(o.icono)}<span>${o.t}</span></button>`).join('')}</div>`
        : `<div class="resultado entra" role="status">
            <p class="sello derecho" style="align-self:flex-start">${ic(CASO.cambia.find(o => o.id === resp).icono)} ${CASO.cambia.find(o => o.id === resp).t}</p>
            <h3>${ic('lightbulb')} Para pensar</h3>
            <p style="font-size:1.08rem">${y.pensar} ${escuchar(y.pensar)}</p>
            ${y.ley ? `<p class="ley">${ic('book-open')} Lo dice: ${y.ley}</p>` : ''}
          </div>
          <div class="derecha"><button class="btn btn-cancha" data-accion="caso-ysi-siguiente">${ultimo ? 'Tu postura final' : 'Siguiente'} ${ic('arrow-right')}</button></div>`}
      </div>
    </div>`;
  },

  'caso-final'(){
    const c = state.caso, r = state.casoRev || (state.casoRev = {paso:0, resp:[], final:null, razonFinal:null, propuesta:null});
    let cuerpo;
    if (!r.final) {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 1</span> Después de pensar en todo esto, ¿es justa la regla de Nicolás?</p>${botonesPostura('caso-final')}`;
    } else if (r.razonFinal === null) {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 2</span> ¿Cuál es ahora tu razón principal?</p>
        <p class="sello derecho" style="align-self:flex-start">${ic(POSTURA[r.final].icono)} ${POSTURA[r.final].t}</p>
        ${botonesRazon(r.final, 'caso-razon-final')}`;
    } else if (!r.propuesta) {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 3</span> ¿Qué regla propondrían para el balón?</p>
        <div class="aviso">${ic('scale')}<p>Antes de elegir, revisen la propuesta con el <strong>medidor de regla justa</strong>: ¿es igual para todos?, ¿cuida los derechos de todos?, ¿es clara?, ¿se puede cumplir?</p></div>
        <div class="acciones2">${CASO.propuestas.map(p => `<button class="accion2" data-accion="caso-propuesta" data-valor="${p.id}"><span>${p.t}</span></button>`).join('')}</div>`;
    } else {
      const cambio = c.inicial && c.inicial.postura !== r.final;
      cuerpo = `<div class="comparar">
          <section class="tarjeta pila" style="gap:8px"><h3>Al empezar</h3>${resumenPostura(c.inicial)}</section>
          <section class="tarjeta pila" style="gap:8px"><h3>Ahora</h3>${resumenPostura({postura:r.final, razon:r.razonFinal})}
            <p><strong>Propuesta:</strong> ${CASO.propuestas.find(p => p.id === r.propuesta).t}</p></section>
        </div>
        <div class="resultado entra" role="status">
          <h3>${ic(cambio ? 'rotate-ccw' : 'circle-check')} ${!c.inicial ? 'Tu postura quedó registrada' : cambio ? 'Cambiaste de postura' : 'Mantuviste tu postura'}</h3>
          <p style="font-size:1.08rem">${!c.inicial ? 'Ahora puedes explicar tu postura con razones.' : cambio ? 'Cambiar de opinión cuando aparecen buenas razones es parte de pensar éticamente.' : 'Mantener una postura también vale, si ahora puedes explicarla mejor y tener en cuenta a los demás.'}</p>
        </div>
        <div class="pista">${ic('notebook-pen')}<p><strong>Para tu cuaderno:</strong> escribe qué te hizo cambiar o mantener tu postura y qué regla propones para el balón. Revísala con las cuatro preguntas del medidor.</p></div>
        <div class="fila"><button class="btn btn-cancha" data-accion="ir" data-valor="vestuario">${ic('house')} Volver al vestuario</button></div>`;
    }
    return `<div class="app">${barra('Tu postura final', 'vestuario')}
      <div class="pila">
        ${tarjetaCaso()}
        ${cuerpo}
      </div>
    </div>`;
  }
});

Object.assign(acciones, {
  'caso-empezar'(){ state.casoTmp = {}; state.screen = 'caso-intro'; },
  'caso-rehacer'(){ state.casoTmp = {rehacer:true}; },
  'caso-postura'(v){ state.casoTmp = Object.assign(state.casoTmp || {}, {postura:v}); },
  'caso-razon'(v){
    const t = state.casoTmp, d = datosCaso(), antes = state.caso.inicial;
    if (antes && d.inicial[antes.postura] > 0) d.inicial[antes.postura]--;
    state.caso.inicial = {postura:t.postura, razon:v};
    sumar(d.inicial, t.postura); guardarDocente();
    state.casoTmp = {}; guardar();
  },
  'caso-revisar'(){ state.casoRev = {paso:0, resp:[], final:null, razonFinal:null, propuesta:null}; state.screen = 'caso-revision'; },
  'caso-ysi'(v){ const r = state.casoRev; r.resp[r.paso] = v; sumar(datosCaso().ysi[r.paso], v); guardarDocente(); },
  'caso-ysi-siguiente'(){ const r = state.casoRev; if (r.paso < CASO.ysi.length - 1) r.paso++; else state.screen = 'caso-final'; },
  'caso-final'(v){ state.casoRev.final = v; },
  'caso-razon-final'(v){ state.casoRev.razonFinal = v; },
  'caso-propuesta'(v){
    const r = state.casoRev, c = state.caso, d = datosCaso();
    r.propuesta = v;
    sumar(d.final, r.final); sumar(d.propuestas, v); d.revisiones++;
    if (c.inicial && c.inicial.postura !== r.final) d.cambios++;
    guardarDocente();
    c.final = {postura:r.final, razon:r.razonFinal, propuesta:v}; guardar();
  }
});
