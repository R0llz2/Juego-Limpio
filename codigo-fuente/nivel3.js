/* ===== Nivel 3: Duelo de jugadas ===== */
const META3 = 75;
const MAX_JUGADAS3 = 4;

const CALENTAMIENTO3 = [
  {t:'Ana y Pablo quieren ver películas diferentes en la tarde de cine del curso.', r:'conflicto'},
  {t:'Un compañero empuja a otro para quitarle el puesto en la fila.', r:'agresion'},
  {t:'Dos amigas no se ponen de acuerdo sobre a qué jugar en el recreo.', r:'conflicto'},
  {t:'Alguien le escribe insultos a una niña en el chat del curso.', r:'agresion'},
  {t:'Tu hermano y tú quieren usar el baño al mismo tiempo antes de ir al colegio.', r:'conflicto'},
  {t:'Un grupo amenaza a un niño para que les entregue su refrigerio.', r:'agresion'},
  {t:'Dos amigos discuten por quién ganó el partido y uno termina empujando al otro.', r:'ambas'},
  {t:'Dos compañeras no se ponen de acuerdo en un trabajo y una termina insultando a la otra.', r:'ambas'}
];
const EXPLICA3 = {
  conflicto:'Es un conflicto: dos personas quieren cosas distintas. Los conflictos son normales y se pueden resolver hablando.',
  agresion:'Es una agresión: alguien hace daño a propósito con golpes, insultos o amenazas. Hay que frenarla sin agredir y pedir ayuda a un adulto.',
  ambas:'Empezó como un conflicto (querían cosas distintas), pero se volvió agresión cuando alguien hizo daño. Primero hay que frenar la agresión y después resolver el conflicto.'
};
const OPCIONES3 = [
  {id:'conflicto', t:'Conflicto', icono:'message-circle', cls:'verdad'},
  {id:'agresion', t:'Agresión', icono:'zap', cls:'mito'},
  {id:'ambas', t:'Empezó como conflicto y se volvió agresión', icono:'flame', cls:'ambas'}
];

const PERDON3 = {id:'perdon', titulo:'Pedir disculpas por lo que hiciste', icono:'heart-handshake', tipo:'disculpa', dTu:10, dOtro:20, texto:'Reconocer el error ayuda a reparar la relación.'};

const DUELOS3 = [
  {id:'d1', lugar:'colegio', titulo:'El único balón', otro:'Sara', avatar:{piel:1, pelo:2, colorPelo:3, camiseta:1, numero:''},
    texto:'En el recreo solo hay un balón. Tú quieres jugar fútbol y Sara quiere jugar voleibol.',
    quiereTu:'Quiero jugar fútbol con el balón.', quiereOtro:'Yo quiero practicar voleibol para el torneo.',
    inicio:[45, 45],
    cartas:[
      {id:'ayuda', titulo:'Pedirle al profesor de turno que les ayude a organizarse', icono:'hand-helping', tipo:'ayuda', dTu:10, dOtro:10, texto:'Con ayuda, piensan juntos una forma de compartir el balón.'},
      {id:'calma', titulo:'Respirar antes de hablar', icono:'wind', tipo:'calma', dTu:5, dOtro:5, texto:'Te calmas y puedes pensar mejor qué decir.'},
      {id:'escucha', titulo:'Preguntarle a Sara qué quiere y por qué', icono:'ear', tipo:'escucha', dTu:5, dOtro:20, texto:'Sara siente que la tienes en cuenta. Ahora sabes que está practicando para un torneo.'},
      {id:'expresa', titulo:'Decir lo que quieres sin gritar', icono:'message-circle', tipo:'expresa', dTu:15, dOtro:5, texto:'Sara entiende que para ti el fútbol también es importante.'},
      {id:'propone', titulo:'Proponer turnos: un recreo fútbol y otro voleibol', icono:'handshake', tipo:'propone', dTu:25, dOtro:25, texto:'La propuesta les sirve a los dos.', acuerdo:'Se turnan el balón: hoy fútbol, mañana voleibol.'},
      {id:'mala1', titulo:'Quitarle el balón y salir corriendo', icono:'zap', tipo:'mala', dTu:10, dOtro:-30, texto:'Juegas, pero Sara se siente atropellada y el problema crece.'},
      {id:'mala2', titulo:'Dejarle el balón aunque te quedes con rabia', icono:'door-open', tipo:'cede', dTu:-20, dOtro:10, texto:'Sara juega, pero tú te quedas mal. Ceder siempre tampoco es una solución justa.'}
    ]},
  {id:'d2', lugar:'casa', titulo:'El control del televisor', otro:'Juanpi, tu hermano', avatar:{piel:3, pelo:1, colorPelo:0, camiseta:3, numero:''},
    texto:'A la misma hora, tú quieres ver tu serie y tu hermano menor quiere ver su programa de dibujos animados.',
    quiereTu:'Quiero ver el capítulo nuevo de mi serie.', quiereOtro:'¡Mi programa solo lo dan a esta hora!',
    inicio:[40, 40],
    cartas:[
      {id:'mala2', titulo:'Gritarle a tu hermano hasta que se vaya', icono:'megaphone', tipo:'mala', dTu:0, dOtro:-25, texto:'Tu hermano se va llorando y la pelea sigue en la casa.'},
      {id:'calma', titulo:'Contar hasta diez antes de reclamar', icono:'hourglass', tipo:'calma', dTu:10, dOtro:5, texto:'Te calmas y evitas decir algo que empeore las cosas.'},
      {id:'escucha', titulo:'Preguntarle por qué quiere verlo ya', icono:'ear', tipo:'escucha', dTu:5, dOtro:20, texto:'Juanpi te cuenta que su programa solo lo dan a esta hora.'},
      {id:'expresa', titulo:'Explicar que tu serie también es importante para ti', icono:'message-circle', tipo:'expresa', dTu:15, dOtro:5, texto:'Tu hermano entiende lo que tú quieres.'},
      {id:'propone', titulo:'Proponer que él vea su programa y tú tu serie después', icono:'handshake', tipo:'propone', dTu:25, dOtro:25, texto:'Encuentran un orden que les sirve a los dos.', acuerdo:'Juanpi ve su programa y luego tú ves tu serie. Lo anotan para los otros días.'},
      {id:'ayuda', titulo:'Pedirle a un adulto de la casa que les ayude a organizar horarios', icono:'hand-helping', tipo:'ayuda', dTu:15, dOtro:15, texto:'Con ayuda, arman un horario que les sirve a los dos.'},
      {id:'mala1', titulo:'Esconder el control para que nadie vea nada', icono:'eye-off', tipo:'mala', dTu:-10, dOtro:-25, texto:'Nadie ve nada, los dos se enojan y la pelea crece.'}
    ]},
  {id:'d3', lugar:'colegio', titulo:'El dibujo mojado', otro:'Daniel', avatar:{piel:4, pelo:0, colorPelo:0, camiseta:4, numero:''},
    texto:'Sin querer, derramaste jugo sobre el dibujo de Daniel. Él se pone furioso y te grita.',
    quiereTu:'¡Fue sin querer! No lo hice a propósito.', quiereOtro:'¡Me dañaste el dibujo! Me demoré muchísimo.',
    inicio:[40, 20],
    cartas:[
      {id:'ayuda', titulo:'Pedirle a la profesora materiales para hacer otro dibujo', icono:'hand-helping', tipo:'ayuda', dTu:10, dOtro:15, texto:'La profesora les presta hojas y colores para empezar de nuevo.'},
      {id:'calma', titulo:'Respirar y no responder con gritos', icono:'wind', tipo:'calma', dTu:10, dOtro:5, texto:'Aunque Daniel grita, tú no le respondes igual. La pelea no crece.'},
      {id:'disculpa', titulo:'Pedir perdón, aunque fue sin querer', icono:'heart-handshake', tipo:'disculpa', dTu:10, dOtro:30, texto:'Daniel se calma un poco: siente que reconoces lo que pasó.'},
      {id:'escucha', titulo:'Escuchar cómo se siente Daniel', icono:'ear', tipo:'escucha', dTu:5, dOtro:20, texto:'Daniel te cuenta que le había dedicado mucho tiempo a su dibujo.'},
      {id:'propone', titulo:'Ofrecerte a ayudarle a hacer otro dibujo', icono:'handshake', tipo:'propone', dTu:20, dOtro:25, texto:'Reparar el daño hace que Daniel vuelva a confiar en ti.', acuerdo:'Daniel acepta tus disculpas y en el descanso hacen juntos un dibujo nuevo.'},
      {id:'mala1', titulo:'Gritarle «¡No fue mi culpa!» y darle la espalda', icono:'megaphone', tipo:'mala', dTu:-15, dOtro:-20, texto:'La rabia de los dos aumenta y el dibujo sigue dañado.'},
      {id:'mala2', titulo:'Decirle: «Igual tu dibujo era feo»', icono:'laugh', tipo:'mala', dTu:-5, dOtro:-35, texto:'Eso ya es una agresión: el conflicto se vuelve más grande.'}
    ]},
  {id:'d4', lugar:'internet', titulo:'La pelea en el chat', otro:'Tomás', avatar:{piel:0, pelo:5, colorPelo:1, camiseta:2, numero:''},
    texto:'En el chat del curso, Tomás escribió que tu idea para la salida pedagógica es «aburridísima». Te dio mucha rabia.',
    quiereTu:'Mi idea es ir al parque natural. ¡No es aburrida!', quiereOtro:'Yo prefiero ir al museo de ciencia.',
    inicio:[35, 45],
    cartas:[
      {id:'ayuda', titulo:'Pedirle a la directora de curso que modere el chat', icono:'hand-helping', tipo:'ayuda', dTu:10, dOtro:10, texto:'Con un adulto moderando, todos opinan con respeto.'},
      {id:'calma', titulo:'Respirar y no responder de inmediato', icono:'hourglass', tipo:'calma', dTu:20, dOtro:0, texto:'Esperar unos minutos evita que escribas algo de lo que después te arrepientas.'},
      {id:'expresa', titulo:'Escribir: «No me gustó cómo lo dijiste. ¿Qué propones tú?»', icono:'message-circle', tipo:'expresa', dTu:15, dOtro:15, texto:'Dices lo que sientes sin insultar y abres la conversación.'},
      {id:'escucha', titulo:'Leer con calma la idea de Tomás', icono:'ear', tipo:'escucha', dTu:5, dOtro:15, texto:'Descubres que Tomás quiere ir a un museo de ciencia, que también suena bien.'},
      {id:'propone', titulo:'Proponer que el curso vote entre las dos ideas', icono:'handshake', tipo:'propone', dTu:20, dOtro:20, texto:'Todos pueden opinar y decidir.', acuerdo:'El curso vota entre las dos ideas. Gane la que gane, todos participaron.'},
      {id:'mala1', titulo:'Responderle en mayúsculas con insultos', icono:'flame', tipo:'mala', dTu:-10, dOtro:-30, texto:'El chat se llena de peleas y otros compañeros se meten.'},
      {id:'mala2', titulo:'Salirte del grupo y no volver a hablarle', icono:'log-out', tipo:'cede', dTu:-15, dOtro:-10, texto:'Te alejas, pero el problema sigue ahí y pierdes la oportunidad de opinar.'}
    ]}
];
const NOMBRES_TIPO3 = {calma:'Calma', escucha:'Escucha', expresa:'Di lo que quieres', propone:'Propón', ayuda:'Pide ayuda', disculpa:'Discúlpate'};

function barajar(lista){
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function nuevoDuelo3(n){
  const d = DUELOS3[n.di];
  Object.assign(n, {tu:d.inicio[0], otro:d.inicio[1], prevTu:d.inicio[0], prevOtro:d.inicio[1], jugadas:[], mano:barajar(d.cartas.map(c => c.id)), resultado:null, mostrarMaestra:false});
}
function nuevoN3(){
  return {fase:'calentamiento', ci:0, cResp:null, cOk:0, di:0, ganados:0, primerIntento:0, intentos:0, totalJugadas:0, autoeval:null, laminaVista:false,
    tu:0, otro:0, prevTu:0, prevOtro:0, jugadas:[], mano:[], resultado:null, mostrarMaestra:false};
}
function carta3(d, id){ return id === 'perdon' ? PERDON3 : d.cartas.find(c => c.id === id); }
function animo3(v){ return v >= META3 ? 'feliz' : v >= 45 ? 'serio' : v >= 25 ? 'triste' : 'enojado'; }
function textoAnimo3(v){ return v >= META3 ? 'Bien' : v >= 45 ? 'Más o menos' : v >= 25 ? 'Mal' : 'Muy molesto'; }

function medidor3(nombre, v, prev){
  const zona = v >= META3 ? 'verde' : v >= 45 ? 'ambar' : 'rojo';
  return `<div class="medidor">
    <div class="medidor-fila"><span>${nombre}</span><b>${textoAnimo3(v)}</b></div>
    <div class="medidor-pista" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}" aria-label="Cómo se siente ${nombre}">
      <span class="meta" style="left:${META3}%"></span>
      <span class="medidor-barra ${zona}" style="width:${prev}%" data-anima="${v}"></span>
    </div>
  </div>`;
}

Object.assign(pantallas, {
  'n3-intro'(){
    return `<div class="app">${barra('Nivel 3 · Duelo de jugadas', 'vestuario')}
      <div class="pila">
        <div class="tarjeta"><p style="font-size:1.15rem">En este duelo <strong>no gana uno y pierde el otro</strong>. Ganan los dos cuando encuentran una solución que les sirve a ambos: un <strong>gana-gana</strong>.</p></div>
        <ol class="pasos">
          <li><span class="n">1</span><p>Calentamiento: ¿es un <strong>conflicto</strong>, una <strong>agresión</strong> o un conflicto que se volvió agresión?</p></li>
          <li><span class="n">2</span><p>En cada duelo escoge tus cartas, una por una.</p></li>
          <li><span class="n">3</span><p>Lleva los dos medidores a la zona verde en máximo ${MAX_JUGADAS3} jugadas.</p></li>
        </ol>
        <section class="tarjeta pila" style="gap:10px">
          <h3 style="font-size:1.2rem">${ic('trophy')} La jugada maestra</h3>
          <div class="maestra">${['Calma', 'Escucha', 'Di lo que quieres', 'Propón'].map((t, k) => `<span>${k + 1}. ${t}</span>`).join(ic('chevron-right'))}</div>
        </section>
        <div class="aviso">${ic('users-round')}<p>Si juegan con todo el curso, antes de cada carta los equipos discuten qué pasaría con cada persona.</p></div>
        <div><button class="btn btn-principal" data-accion="empezar-n3">${ic('play')} Empezar</button></div>
      </div>
    </div>`;
  },

  'n3-calentamiento'(){
    const n = state.n3, c = CALENTAMIENTO3[n.ci];
    let cuerpo;
    if (!n.cResp) {
      cuerpo = `<p class="pregunta">¿Qué es esta situación?</p>
        <div class="mv mv3">${OPCIONES3.map(o => `<button class="estado ${o.cls}" data-accion="calentar" data-valor="${o.id}">${ic(o.icono)} ${o.t}</button>`).join('')}</div>`;
    } else {
      const bien = n.cResp === c.r, ultimo = n.ci === CALENTAMIENTO3.length - 1;
      cuerpo = `<div class="resultado entra" role="status">
          <h3>${ic(bien ? 'circle-check' : 'lightbulb')} ${bien ? '¡Correcto!' : 'Mira de nuevo.'}</h3>
          <p style="font-size:1.08rem">${EXPLICA3[c.r]} ${escuchar(EXPLICA3[c.r])}</p>
        </div>
        <div class="derecha"><button class="btn btn-cancha" data-accion="siguiente-calentar">${ultimo ? 'Ir a los duelos' : 'Siguiente'} ${ic('arrow-right')}</button></div>`;
    }
    return `<div class="app">${barra('Calentamiento', 'vestuario')}
      <div class="pips" aria-hidden="true">${CALENTAMIENTO3.map((_, k) => `<span class="${k < n.ci ? 'ok' : k === n.ci ? 'ahora' : ''}"></span>`).join('')}</div>
      <div class="pila">
        <div class="afirmacion">${ic('quote', 'comillas')}<p>${c.t}</p>${escuchar(c.t, true, 'claro')}</div>
        <p class="etiqueta" style="align-self:flex-start">Caso ${n.ci + 1} de ${CALENTAMIENTO3.length}</p>
        ${cuerpo}
      </div>
    </div>`;
  },

  'n3-duelo'(){
    const n = state.n3, d = DUELOS3[n.di], L = LUGARES[d.lugar];
    const quedan = MAX_JUGADAS3 - n.jugadas.length;
    const fin = !!n.resultado;
    const mano = n.mano.map(id => {
      const c = carta3(d, id);
      return `<button class="carta" data-accion="jugar-carta" data-valor="${c.id}"${fin ? ' disabled' : ''}>
        <span class="carta-icono">${ic(c.icono)}</span><span class="carta-titulo">${c.titulo}</span></button>`;
    }).join('');
    const delta = v => `<span class="delta ${v > 0 ? 'mas' : v < 0 ? 'menos' : ''}">${v > 0 ? '+' : ''}${v}</span>`;
    const registro = n.jugadas.map((j, k) => {
      const c = carta3(d, j);
      return `<li class="${k === n.jugadas.length - 1 && !fin ? 'entra' : ''}"><span class="num-j">${k + 1}</span><div><strong>${c.titulo}</strong><p>${c.texto}</p>
        <p class="deltas">Tú ${delta(c.dTu)} · ${d.otro.split(',')[0]} ${delta(c.dOtro)}</p></div></li>`;
    }).join('');
    let resultado = '';
    if (n.resultado === 'gana') {
      const prop = n.jugadas.map(j => carta3(d, j)).find(c => c.acuerdo);
      resultado = `<section class="resultado entra gana" role="status" id="resultado-duelo">
        <h3>${ic('trophy')} ¡Gana-gana!</h3>
        <p style="font-size:1.1rem">${prop ? prop.acuerdo : 'Lograron una solución que les sirve a los dos.'}</p>
        <p style="color:var(--tinta-2)">Los dos quedaron bien. Así se resuelve un conflicto sin que nadie pierda.</p>
        <div class="derecha"><button class="btn btn-cancha" data-accion="siguiente-duelo">${n.di === DUELOS3.length - 1 ? 'Ver mi lámina' : 'Siguiente duelo'} ${ic('arrow-right')}</button></div>
      </section>`;
    } else if (n.resultado === 'agotado') {
      resultado = `<section class="resultado entra" role="status" id="resultado-duelo" style="border-color:var(--riesgo)">
        <h3 style="color:var(--riesgo)">${ic('lightbulb')} Todavía no es un gana-gana</h3>
        <p>Se acabaron las jugadas y alguien quedó mal. Mira cuál carta bajó los medidores y prueba otro camino.</p>
        ${n.mostrarMaestra ? `<div class="maestra">${['Calma', 'Escucha', 'Di lo que quieres', 'Propón'].map((t, k) => `<span>${k + 1}. ${t}</span>`).join(ic('chevron-right'))}</div>` : `<button class="btn btn-chico" data-accion="ver-maestra" style="align-self:flex-start">${ic('trophy')} Ver la jugada maestra</button>`}
        <div class="fila" style="justify-content:flex-end">
          <button class="btn" data-accion="siguiente-duelo">Seguir</button>
          <button class="btn btn-cancha" data-accion="reintentar-duelo">${ic('rotate-ccw')} Intentar de nuevo</button>
        </div>
      </section>`;
    }
    return `<div class="app">${barra('Duelo de jugadas', 'vestuario')}
      <div class="pips" aria-hidden="true">${DUELOS3.map((_, k) => `<span class="${k < n.di ? 'ok' : k === n.di ? 'ahora' : ''}"></span>`).join('')}</div>
      <div class="pila">
        <div class="fila" style="justify-content:space-between">
          <span class="etiqueta lugar-${d.lugar}">${ic(L.icono)} ${L.nombre}</span>
          <span class="etiqueta">Duelo ${n.di + 1} de ${DUELOS3.length}</span>
        </div>
        <h3 style="font-size:1.7rem">${d.titulo}</h3>
        <p style="font-size:1.15rem;max-width:60ch">${d.texto} ${escuchar(d.texto + ' ' + 'Tú dices: ' + d.quiereTu + ' ' + d.otro.split(',')[0] + ' dice: ' + d.quiereOtro)}</p>
        <div class="arena">
          <div class="lado">
            <div class="retrato">${avatarSVG(state.avatar, animo3(n.tu))}</div>
            <p class="quiere">«${d.quiereTu}»</p>
            ${medidor3('Tú', n.tu, n.prevTu)}
          </div>
          <div class="vs">${ic('handshake')}<span>¿Gana-gana?</span></div>
          <div class="lado">
            <div class="retrato">${avatarSVG(d.avatar, animo3(n.otro))}</div>
            <p class="quiere">«${d.quiereOtro}»</p>
            ${medidor3(d.otro.split(',')[0], n.otro, n.prevOtro)}
          </div>
        </div>
        ${resultado}
        ${!fin ? `<div class="fila" style="justify-content:space-between"><p class="pregunta">${ic('layers')} Escoge tu jugada</p><span class="etiqueta">${quedan === 1 ? 'Te queda 1 jugada' : `Te quedan ${quedan} jugadas`}</span></div>
        <div class="mano">${mano}</div>` : ''}
        ${n.jugadas.length ? `<section class="pila" style="gap:8px"><h3 style="font-size:1.15rem">Tus jugadas</h3><ol class="registro">${registro}</ol></section>` : ''}
      </div>
    </div>`;
  },

  'n3-cierre'(){
    const n = state.n3;
    return `<div class="app">${barra('¡Nivel 3 completo!', 'vestuario')}
      <div class="pila">
        <div class="cierre">
          <div class="lamina${n.laminaVista ? ' quieta' : ''}" role="img" aria-label="Lámina 3: Duelo de jugadas">
            <span class="numl">LÁMINA 03</span>
            <span class="icono-l">${ic('handshake')}</span>
            <h3>Duelo de jugadas</h3>
            <p>Resuelvo conflictos sin agredir. Busco que ganemos todos.</p>
          </div>
          <div class="pila">
            <p style="font-size:1.15rem">Ganaste tu tercera lámina. Quedó pegada en tu álbum del vestuario.</p>
            <div class="datos">
              <div class="dato"><b>${n.cOk} de ${CALENTAMIENTO3.length}</b><span>conflicto o agresión</span></div>
              <div class="dato"><b>${n.ganados} de ${DUELOS3.length}</b><span>duelos gana-gana</span></div>
              <div class="dato"><b>${n.primerIntento}</b><span>gana-gana al primer intento</span></div>
            </div>
          </div>
        </div>
        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.25rem">¿Cómo te fue resolviendo conflictos?</h3>
          <div class="autoeval">${Object.entries(AUTOEVAL3).map(([k, v]) => `<button data-accion="autoeval3" data-valor="${k}" aria-pressed="${n.autoeval === k}">${v.txt}</button>`).join('')}</div>
          ${n.autoeval ? `<p role="status" class="entra">${AUTOEVAL3[n.autoeval].msg}</p>` : ''}
        </section>
        <div class="cuaderno">${ic('notebook-pen')}<p><strong>Para tu cuaderno:</strong> inventa un conflicto entre dos personas y escribe o dibuja cómo lo resolverías con la jugada maestra: calma, escucha, di lo que quieres y propón.</p></div>
        <div class="fila">
          <button class="btn btn-cancha" data-accion="ir" data-valor="vestuario">${ic('house')} Volver al vestuario</button>
          <button class="btn" data-accion="empezar-n3">${ic('rotate-ccw')} Jugar de nuevo</button>
        </div>
      </div>
    </div>`;
  }
});

const AUTOEVAL3 = {
  ayuda:{txt:'Necesito ayuda', msg:'Gracias por decirlo. Practica con tu profesor la primera jugada: la calma.'},
  cuesta:{txt:'Todavía me cuesta', msg:'Está bien: cuando tengas un conflicto, empieza por la primera jugada, la calma. Lo demás se vuelve más fácil.'},
  bien:{txt:'Voy bien', msg:'¡Vas muy bien! Recuerda que escuchar al otro cambia mucho el resultado.'},
  explicar:{txt:'Se lo puedo explicar a otros', msg:'¡Genial! Enséñale la jugada maestra a un compañero.'}
};

Object.assign(acciones, {
  'empezar-n3'(){ state.n3 = nuevoN3(); state.screen = 'n3-calentamiento'; },
  calentar(v){ const n = state.n3; if (n.cResp) return; n.cResp = v; if (v === CALENTAMIENTO3[n.ci].r) n.cOk++; registrar('n3c:' + n.ci, v === CALENTAMIENTO3[n.ci].r); },
  'siguiente-calentar'(){
    const n = state.n3;
    if (n.ci >= CALENTAMIENTO3.length - 1) { n.di = 0; n.intentos = 0; n.registrado = false; nuevoDuelo3(n); state.screen = 'n3-duelo'; return; }
    n.ci++; n.cResp = null;
  },
  'jugar-carta'(id){
    const n = state.n3, d = DUELOS3[n.di];
    if (n.resultado || !n.mano.includes(id)) return;
    const c = carta3(d, id);
    n.prevTu = n.tu; n.prevOtro = n.otro;
    n.tu = Math.max(0, Math.min(100, n.tu + c.dTu));
    n.otro = Math.max(0, Math.min(100, n.otro + c.dOtro));
    n.jugadas.push(id); n.totalJugadas++;
    n.mano = n.mano.filter(x => x !== id);
    if (c.tipo === 'mala' && !d.cartas.some(x => x.tipo === 'disculpa') && !n.mano.includes('perdon') && !n.jugadas.includes('perdon')) n.mano.push('perdon');
    if (n.tu >= META3 && n.otro >= META3) {
      n.resultado = 'gana'; n.ganados++;
      if (n.intentos === 0) n.primerIntento++;
      if (!n.registrado) { registrar('n3d:' + d.id, n.intentos === 0); n.registrado = true; }
    } else if (n.jugadas.length >= MAX_JUGADAS3) {
      n.resultado = 'agotado';
      if (!n.registrado) { registrar('n3d:' + d.id, false); n.registrado = true; }
    }
    state.desplazar = n.resultado ? 'resultado-duelo' : null;
  },
  'ver-maestra'(){ state.n3.mostrarMaestra = true; },
  'reintentar-duelo'(){ const n = state.n3; n.intentos++; nuevoDuelo3(n); },
  'siguiente-duelo'(){
    const n = state.n3;
    if (n.di >= DUELOS3.length - 1) { state.progreso.n3 = true; guardar(); contarPartida('n3'); state.screen = 'n3-cierre'; return; }
    n.di++; n.intentos = 0; n.registrado = false; nuevoDuelo3(n);
  },
  autoeval3(v){ state.n3.autoeval = v; }
});
