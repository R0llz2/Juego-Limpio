/* ===== Nivel 4: Asamblea final ===== */
const IMPUESTA4 = [
  {t:'En la casa de Lucía, la familia se reunió y entre todos decidieron quién lava los platos cada día.', r:'acordada',
   e:'Todos participaron en la decisión. Por eso es más fácil que todos la cumplan.'},
  {t:'El dueño del balón dice: «Solo juegan los que yo diga».', r:'impuesta',
   e:'La impuso una sola persona, para su conveniencia y sin escuchar a nadie.'},
  {t:'En el salón, todos propusieron ideas y votaron cómo repartir los turnos del computador.', r:'acordada',
   e:'Hubo propuestas y votación: es un acuerdo construido entre todos.'},
  {t:'Unos estudiantes de quinto les dicen a los de cuarto: «Desde hoy, esta banca es solo nuestra».', r:'impuesta',
   e:'La impuso un grupo para su propio beneficio. Además no es justa: los espacios del colegio son de todos.'},
  {t:'En el chat del curso, todos opinaron y acordaron no compartir fotos de nadie sin permiso.', r:'acordada',
   e:'Todos pudieron opinar y la regla cuida un derecho: la intimidad.'},
  {t:'El manual de convivencia del colegio dice que nadie puede traer objetos que pongan en peligro a otros.', r:'autoridad',
   e:'La pone una autoridad, el colegio, y existe para proteger a todos. Las normas de autoridad también se cumplen, y es importante entender para qué sirven.'},
  {t:'En el bus escolar, todos deben llevar puesto el cinturón de seguridad.', r:'autoridad',
   e:'Es una norma de seguridad que cuida la vida y la integridad de todos los pasajeros.'}
];
const TIPOS4 = [
  {id:'impuesta', t:'Impuesta, sin escuchar a nadie', icono:'megaphone', cls:'mito'},
  {id:'acordada', t:'Acordada entre todos', icono:'users-round', cls:'verdad'},
  {id:'autoridad', t:'De una autoridad, para protegernos', icono:'shield-check', cls:'ambas'}
];
const NOMBRE_TIPO4 = {impuesta:'una regla impuesta', acordada:'un acuerdo', autoridad:'una norma de autoridad que protege a todos'};

const CRITERIOS4 = [
  {id:'igual', nombre:'Igual para todos', falta:'No es igual para todos', pregunta:'¿Es igual para todos?', icono:'scale'},
  {id:'derechos', nombre:'Cuida los derechos', falta:'No cuida los derechos de todos', pregunta:'¿Cuida los derechos de todos?', icono:'shield-check'},
  {id:'clara', nombre:'Es clara', falta:'No es clara', pregunta:'¿Es clara?', icono:'eye'},
  {id:'cumplible', nombre:'Se puede cumplir', falta:'No se puede cumplir', pregunta:'¿Se puede cumplir?', icono:'circle-check'}
];

const REGLAS4 = [
  {id:'r1', propone:'Camilo', t:'Los de cuarto siempre escogen primero el juego del recreo.', falla:['igual'],
   explica:'Si siempre escogen los mismos, los demás nunca deciden. Una regla justa trata igual a todos.',
   opciones:[
     {t:'Que el profesor escoja siempre el juego.', ok:false, por:'Así los estudiantes no participan en la decisión.'},
     {t:'Los de cuarto escogen primero, pero solo los lunes.', ok:false, por:'Sigue dando ventaja a unos sobre otros.'},
     {t:'Nos turnamos para escoger el juego del recreo.', ok:true},
     {t:'Nadie escoge el juego del recreo.', ok:false, por:'Así nadie decide y el problema no se resuelve.'}]},
  {id:'r2', propone:'Valeria', t:'Prohibido hablar en todo el día.', falla:['cumplible', 'derechos'],
   explica:'Nadie puede pasar todo el día sin hablar. Además, todos tenemos derecho a expresarnos.',
   opciones:[
     {t:'Prohibido hablar en la clase de matemáticas.', ok:false, por:'Sigue siendo difícil de cumplir y limita la participación.'},
     {t:'Prohibido hablar, excepto en el recreo.', ok:false, por:'Sigue siendo casi imposible de cumplir y limita la libre expresión.'},
     {t:'Solo habla quien el profesor escoja.', ok:false, por:'Deja por fuera a muchos y no los deja participar.'},
     {t:'En clase pedimos la palabra levantando la mano.', ok:true}]},
  {id:'r3', propone:'Samuel', t:'Portarse bien.', falla:['clara'],
   explica:'«Portarse bien» puede significar cosas distintas para cada persona. Una regla clara dice exactamente qué hacer.',
   opciones:[
     {t:'Ser buenos compañeros.', ok:false, por:'Suena bien, pero no dice qué hay que hacer.'},
     {t:'Escuchamos sin interrumpir cuando alguien habla.', ok:true},
     {t:'Portarse muy, muy bien.', ok:false, por:'Sigue sin decir qué hay que hacer.'},
     {t:'No hacer cosas malas.', ok:false, por:'Tampoco es clara: ¿cuáles cosas?'}]},
  {id:'r4', propone:'Martina', t:'Quien rompa una regla se queda sin recreo toda la semana.', falla:['derechos'], paso3:true,
   explica:'Quitar el recreo toda la semana afecta el derecho a la recreación y no repara el daño. Las consecuencias deben ayudar a reparar, no a humillar.',
   opciones:[
     {t:'Quien rompa una regla se queda sin recreo un día.', ok:false, por:'Sigue quitando un derecho y no repara el daño.'},
     {t:'Quien rompa una regla se queda sin recreo un mes.', ok:false, por:'Es todavía más dura y tampoco repara nada.'},
     {t:'Si alguien no cumple un acuerdo, hablamos y busca cómo reparar el daño.', ok:true},
     {t:'Quien rompa una regla pide perdón frente a todo el colegio.', ok:false, por:'Exponer a alguien frente a todos lo humilla.'}]},
  {id:'r5', propone:'Felipe', t:'No subimos fotos ni videos de nadie sin su permiso.', falla:[],
   explica:'Es igual para todos, cuida la intimidad, es clara y se puede cumplir. ¡Está lista!'},
  {id:'r6', propone:'Yuliana', t:'Invitamos a jugar a quien esté solo en el recreo.', falla:[],
   explica:'Es para todos, cuida la recreación y la igualdad, es clara y se puede cumplir. ¡Está lista!'}
];

const REPARACION4 = [
  {id:'castigo', t:'Castigamos a quien no cumple, sin escucharlo.', ok:false, e:'Castigar sin escuchar no repara el daño ni ayuda a aprender.'},
  {id:'reparar', t:'Hablamos, escuchamos lo que pasó y buscamos cómo reparar el daño.', ok:true, e:'Así el acuerdo sigue vivo y la persona tiene la oportunidad de reparar.'},
  {id:'nada', t:'Hacemos como si nada hubiera pasado.', ok:false, e:'Si nadie dice nada, el acuerdo deja de tener sentido.'},
  {id:'excluir', t:'Lo sacamos del grupo por una semana.', ok:false, e:'Excluir a alguien no repara el daño y lo hace sentir rechazado.'}
];

function nuevoN4(){
  return {ii:0, iResp:null, iOk:0, ri:0, diag:null, diagMal:[], mejora:null, mejoraMal:[], aprobadas:{}, inspectorOk:0,
    incluidos:Object.fromEntries(REGLAS4.map(r => [r.id, true])), propios:[], borrador:'', checks:[false, false, false, false], errorPropio:'',
    reparacion:null, curso:'', copiado:null, autoeval:null, laminaVista:false, errorPacto:''};
}
function textoFinal4(r){ const n = state.n4; return n.aprobadas[r.id] || r.t; }
function acuerdosPacto4(){
  const n = state.n4;
  return REGLAS4.filter(r => !r.paso3 && n.incluidos[r.id] && n.aprobadas[r.id]).map(r => n.aprobadas[r.id]).concat(n.propios.map(p => p.t));
}
function fecha4(){ try { return new Date().toLocaleDateString('es-CO', {day:'numeric', month:'long', year:'numeric'}); } catch(e) { return ''; } }
function textoPacto4(){
  const n = state.n4, rep = REPARACION4.find(r => r.id === 'reparar');
  return `Pacto de Juego Limpio${n.curso ? ' · ' + n.curso : ''}\n\n` + acuerdosPacto4().map((a, k) => `${k + 1}. ${a}`).join('\n') +
    `\n\nSi alguien no cumple un acuerdo: ${rep.t}\n\nLo firmamos todos el ${fecha4()}.`;
}

function luces4(r, estado){
  return `<div class="luces">${CRITERIOS4.map(c => {
    let cls = '', marca = '?';
    if (estado === 'aprobada') { cls = 'verde'; marca = ic('check'); }
    else if (estado === 'diagnosticada') { cls = r.falla.includes(c.id) ? 'roja' : 'verde'; marca = r.falla.includes(c.id) ? ic('x') : ic('check'); }
    return `<div class="luz ${cls}"><span class="bombillo">${marca}</span>${ic(c.icono)}<span>${c.nombre}</span></div>`;
  }).join('')}</div>`;
}

Object.assign(pantallas, {
  'n4-intro'(){
    return `<div class="app">${barra('Nivel 4 · Asamblea final', 'vestuario')}
      <div class="pila">
        <div class="tarjeta"><p style="font-size:1.15rem">Llegó el momento de construir el <strong>Pacto de Juego Limpio</strong> del curso: los acuerdos que todos se comprometen a cumplir.</p></div>
        <ol class="pasos">
          <li><span class="n">1</span><p><strong>¿Cómo nació esta regla?</strong> Descubre si fue impuesta, acordada entre todos o puesta por una autoridad para protegernos.</p></li>
          <li><span class="n">2</span><p><strong>Inspector de reglas:</strong> revisa reglas con el medidor de regla justa y mejora las que fallan.</p></li>
          <li><span class="n">3</span><p><strong>Nuestro pacto:</strong> voten, agreguen sus propios acuerdos y fírmenlo.</p></li>
        </ol>
        <section class="tarjeta pila" style="gap:10px">
          <h3 style="font-size:1.2rem">${ic('scale')} El medidor de regla justa</h3>
          <div class="maestra">${CRITERIOS4.map(c => `<span>${c.pregunta}</span>`).join('')}</div>
        </section>
        <div class="aviso">${ic('users-round')}<p>Este nivel está pensado para jugarlo con todo el curso y el video beam. El docente modera la asamblea y registra las votaciones.</p></div>
        <div><button class="btn btn-principal" data-accion="empezar-n4">${ic('play')} Abrir la asamblea</button></div>
      </div>
    </div>`;
  },

  'n4-impuesta'(){
    const n = state.n4, c = IMPUESTA4[n.ii];
    let cuerpo;
    if (!n.iResp) {
      cuerpo = `<p class="pregunta">¿Cómo nació esta regla?</p>
        <div class="mv mv3">${TIPOS4.map(o => `<button class="estado ${o.cls}" data-accion="impuesta" data-valor="${o.id}">${ic(o.icono)} ${o.t}</button>`).join('')}</div>`;
    } else {
      const bien = n.iResp === c.r, ultimo = n.ii === IMPUESTA4.length - 1;
      cuerpo = `<div class="resultado entra" role="status">
          <h3>${ic(bien ? 'circle-check' : 'lightbulb')} ${bien ? '¡Correcto!' : 'Mira de nuevo.'} Es ${NOMBRE_TIPO4[c.r]}.</h3>
          <p style="font-size:1.08rem">${c.e} ${escuchar(c.e)}</p>
        </div>
        <div class="derecha"><button class="btn btn-cancha" data-accion="siguiente-impuesta">${ultimo ? 'Continuar' : 'Siguiente'} ${ic('arrow-right')}</button></div>`;
    }
    return `<div class="app">${barra('¿Cómo nació esta regla?', 'vestuario')}
      <div class="pips" aria-hidden="true">${IMPUESTA4.map((_, k) => `<span class="${k < n.ii ? 'ok' : k === n.ii ? 'ahora' : ''}"></span>`).join('')}</div>
      <div class="pila">
        <div class="afirmacion">${ic('quote', 'comillas')}<p>${c.t}</p>${escuchar(c.t, true, 'claro')}</div>
        <p class="etiqueta" style="align-self:flex-start">Caso ${n.ii + 1} de ${IMPUESTA4.length}</p>
        <div class="aviso" style="padding:12px 16px">${ic('info')}<p><strong>Impuesta:</strong> la decide una persona o un grupo, sin preguntar a los demás. <strong>Acordada:</strong> la construyen entre todos los que la van a cumplir. <strong>De autoridad:</strong> la pone una autoridad, como el colegio o la ley, para proteger a todos.</p></div>
        ${cuerpo}
      </div>
    </div>`;
  },

  'n4-ideas'(){
    return `<div class="app">${barra('Normas y acuerdos', 'vestuario')}
      <div class="pila">
        <div class="ideas4">
          <div class="tarjeta"><h3>${ic('shield-check')} ¿Para qué sirven las normas?</h3><p>Nos ayudan a convivir y a cuidar los derechos de todos en la familia, el colegio, el barrio e internet.</p></div>
          <div class="tarjeta"><h3>${ic('book-open')} Normas que vienen de la autoridad</h3><p>Algunas normas las ponen las autoridades, como las leyes o el manual de convivencia del colegio. Existen para protegernos a todos.</p></div>
          <div class="tarjeta"><h3>${ic('users-round')} Acuerdos que construimos</h3><p>Otras normas las construimos entre todos: son los acuerdos. Cuando participamos en crearlos, es más fácil cumplirlos.</p></div>
        </div>
        <div class="aviso">${ic('lightbulb')}<p>Ahora serán <strong>inspectores de reglas</strong>. Varios compañeros propusieron reglas para el pacto del curso. Revísenlas con el medidor de regla justa.</p></div>
        <div><button class="btn btn-principal" data-accion="ir" data-valor="n4-inspector">${ic('search')} Empezar a inspeccionar</button></div>
      </div>
    </div>`;
  },

  'n4-inspector'(){
    const n = state.n4, r = REGLAS4[n.ri];
    const ultimo = n.ri === REGLAS4.length - 1;
    const aprobada = !!n.aprobadas[r.id];
    let estado = aprobada ? 'aprobada' : n.diag ? 'diagnosticada' : 'nueva';
    let cuerpo = '';
    if (!n.diag) {
      cuerpo = `<p class="pregunta"><span class="paso-n">Paso 1</span> ¿Qué le falta a esta regla?</p>
        <div class="opciones-diag${n.sacudir === 'diag' ? ' sacude' : ''}">
          ${CRITERIOS4.map(c => `<button class="op-derecho${n.diagMal.includes(c.id) ? ' descartado' : ''}" data-accion="diagnosticar" data-valor="${c.id}">${ic(c.icono)}<span>${c.falta}</span></button>`).join('')}
          <button class="op-derecho lista${n.diagMal.includes('lista') ? ' descartado' : ''}" data-accion="diagnosticar" data-valor="lista">${ic('circle-check')}<span>¡Está lista!</span></button>
        </div>`;
    } else {
      cuerpo = `<div class="resultado entra" role="status">
          <h3>${ic(r.falla.length && !aprobada ? 'lightbulb' : 'circle-check')} ${!r.falla.length ? '¡Esta regla pasa el medidor!' : aprobada ? '¡Regla arreglada! Ahora pasa el medidor' : 'Esta regla necesita arreglo'}</h3>
          <p style="font-size:1.08rem">${r.explica}</p>
        </div>`;
      if (r.falla.length && !aprobada) {
        cuerpo += `<p class="pregunta"><span class="paso-n">Paso 2</span> ¿Cuál versión arregla la regla?</p>
          <div class="acciones2">${(n.ordenMejora || r.opciones.map((_, k) => k)).map(k => { const o = r.opciones[k];
            const mal = n.mejoraMal.includes(k);
            return `<button class="accion2${mal ? ' mala' : ''}" data-accion="mejorar" data-valor="${k}"><span>${o.t}</span>${mal ? `<small>${ic('circle-x')} ${o.por}</small>` : ''}</button>`;
          }).join('')}</div>`;
      }
      if (aprobada) {
        cuerpo += `<div class="derecha"><button class="btn btn-cancha" data-accion="siguiente-regla">${ultimo ? 'Ir a nuestro pacto' : 'Siguiente regla'} ${ic('arrow-right')}</button></div>`;
      }
    }
    return `<div class="app">${barra('Inspector de reglas', 'vestuario')}
      <div class="pips" aria-hidden="true">${REGLAS4.map((_, k) => `<span class="${k < n.ri ? 'ok' : k === n.ri ? 'ahora' : ''}"></span>`).join('')}</div>
      <div class="pila">
        <article class="caso regla${estado === 'nueva' ? ' escanea' : ''}">
          <div class="fila" style="justify-content:space-between">
            <span class="etiqueta">${ic('pencil')} Propuesta de ${r.propone}</span>
            <span class="etiqueta">Regla ${n.ri + 1} de ${REGLAS4.length}</span>
          </div>
          <p class="texto">${aprobada && n.aprobadas[r.id] !== r.t ? `<s class="tachada">${r.t}</s><br>${n.aprobadas[r.id]}` : r.t}</p>
          <div style="margin-top:12px">${escuchar(aprobada ? n.aprobadas[r.id] : r.t, true)}</div>
          ${aprobada ? `<span class="sello-aprobada">APROBADA</span>` : ''}
        </article>
        ${luces4(r, estado)}
        ${cuerpo}
        ${n.pista4 ? `<div class="pista" role="status">${ic('lightbulb')}<p>${n.pista4}</p></div>` : ''}
      </div>
    </div>`;
  },

  'n4-pacto'(){
    const n = state.n4;
    const aprob = REGLAS4.filter(r => !r.paso3 && n.aprobadas[r.id]);
    return `<div class="app">${barra('Nuestro pacto', 'vestuario')}
      <div class="pila">
        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.3rem">${ic('vote')} 1. Votación</h3>
          <p>Lean cada acuerdo en voz alta. Levanten la mano para votar y el docente marca si entra al pacto. La regla sobre qué hacer cuando alguien no cumple un acuerdo se decide en el paso 3.</p>
          <div class="votos">${aprob.map(r => `<div class="acuerdo-item"><p>${n.aprobadas[r.id]}</p>
            <div class="si-no" role="group" aria-label="¿Lo incluimos?">
              <button class="check-btn" data-accion="votar" data-valor="${r.id}:si" aria-pressed="${!!n.incluidos[r.id]}">${ic('check')} Sí</button>
              <button class="check-btn no" data-accion="votar" data-valor="${r.id}:no" aria-pressed="${!n.incluidos[r.id]}">${ic('x')} No</button>
            </div></div>`).join('')}</div>
        </section>

        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.3rem">${ic('pencil')} 2. Nuestros propios acuerdos</h3>
          <p>¿Falta algo importante para su curso? Escriban hasta 3 acuerdos propios. Antes de agregarlos, revísenlos con el medidor.</p>
          ${n.propios.length ? `<div class="votos">${n.propios.map((p, k) => `<div class="acuerdo-item"><p>${esc(p.t)}</p><button class="btn btn-chico" data-accion="quitar-propio" data-valor="${k}">${ic('x')} Quitar</button></div>`).join('')}</div>` : ''}
          ${n.propios.length < 3 ? `
            <label for="propio-texto" style="font-weight:700">Nuevo acuerdo</label>
            <input class="campo-texto" id="propio-texto" maxlength="120" autocomplete="off" placeholder="Ej.: Cuidamos los materiales del salón" value="${esc(n.borrador)}" style="max-width:100%">
            <div class="fila" style="gap:8px">${CRITERIOS4.map((c, k) => `<button class="check-btn" data-accion="check-propio" data-valor="${k}" aria-pressed="${n.checks[k]}">${ic(c.icono)} ${c.pregunta}</button>`).join('')}</div>
            <p class="error" role="alert">${n.errorPropio}</p>
            <div><button class="btn btn-cancha btn-chico" data-accion="agregar-propio">${ic('plus')} Agregar al pacto</button></div>` : `<p style="color:var(--tinta-2)">Ya agregaron 3 acuerdos propios.</p>`}
        </section>

        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.3rem">${ic('heart-handshake')} 3. Si alguien no cumple un acuerdo…</h3>
          <div class="acciones2">${REPARACION4.map(o => {
            const elegido = n.reparacion === o.id;
            return `<button class="accion2${elegido ? (o.ok ? ' buena' : ' mala') : ''}" data-accion="reparacion" data-valor="${o.id}" aria-pressed="${elegido}"><span>${o.t}</span>${elegido ? `<small>${ic(o.ok ? 'circle-check' : 'circle-x')} ${o.e}</small>` : ''}</button>`;
          }).join('')}</div>
        </section>

        <section class="tarjeta pila" style="gap:10px">
          <h3 style="font-size:1.3rem">${ic('school')} 4. ¿Cuál es su curso?</h3>
          <input class="campo-texto" id="curso" maxlength="20" autocomplete="off" placeholder="Ej.: 4.° B" value="${esc(n.curso)}" aria-label="Nombre del curso">
        </section>
        <p class="error" role="alert">${n.errorPacto}</p>
        <div><button class="btn btn-principal" data-accion="firmar">${ic('pencil')} Firmar el pacto</button></div>
      </div>
    </div>`;
  },

  'n4-cartel'(){
    const n = state.n4, rep = REPARACION4.find(r => r.id === 'reparar');
    return `<div class="app">${barra('Pacto de Juego Limpio', 'n4-pacto')}
      <div class="pila">
        <article class="cartel" aria-label="Pacto de Juego Limpio del curso">
          <header class="cartel-cabeza">
            <span class="marcador">${ic('sparkles')} ${n.curso ? esc(n.curso) : 'NUESTRO CURSO'}</span>
            <h2>Pacto de Juego Limpio</h2>
            <p>Acuerdos que construimos entre todos para convivir mejor</p>
          </header>
          <ol>${acuerdosPacto4().map(a => `<li>${esc(a)}</li>`).join('')}</ol>
          <div class="cartel-reparar">${ic('heart-handshake')}<p><strong>Si alguien no cumple un acuerdo:</strong> ${rep.t.charAt(0).toLowerCase() + rep.t.slice(1)}</p></div>
          <footer class="firma">
            <div class="mini">${avatarSVG(state.avatar)}</div>
            <p><strong>Lo firmamos todos</strong><br><span style="color:var(--tinta-2)">${fecha4()}</span></p>
          </footer>
        </article>
        <div class="fila">
          <button class="btn" data-accion="copiar-pacto">${ic('clipboard-check')} Copiar el pacto</button>
          <button class="btn" data-accion="ir" data-valor="n4-pacto">${ic('pencil')} Editar</button>
          <button class="btn btn-cancha" data-accion="terminar-n4">${ic('check')} Terminar el nivel</button>
        </div>
        ${n.copiado === 'ok' ? `<p role="status" class="hecho">${ic('circle-check')} Copiado. Pégalo en un documento o cópialo en una cartelera.</p>` : ''}
        ${n.copiado === 'error' ? `<div class="pila" style="gap:6px"><p role="status">No se pudo copiar automáticamente. Selecciona el texto y cópialo:</p><textarea class="campo-texto" rows="9" readonly style="max-width:100%;padding:12px;height:auto">${esc(textoPacto4())}</textarea></div>` : ''}
      </div>
    </div>`;
  },

  'n4-cierre'(){
    const n = state.n4;
    const completo = [1, 2, 3, 4].every(k => state.progreso['n' + k]);
    return `<div class="app">${barra('¡Nivel 4 completo!', 'vestuario')}
      <div class="pila">
        <div class="cierre">
          <div class="lamina${n.laminaVista ? ' quieta' : ''}" role="img" aria-label="Lámina 4: Asamblea final">
            <span class="numl">LÁMINA 04</span>
            <span class="icono-l">${ic('users-round')}</span>
            <h3>Asamblea final</h3>
            <p>Construimos acuerdos entre todos y los cumplimos.</p>
          </div>
          <div class="pila">
            <p style="font-size:1.15rem">${completo ? '<strong>¡Completaste el álbum de Juego Limpio!</strong> Ya tienes las cuatro láminas.' : 'Ganaste la lámina 04. Quedó pegada en tu álbum del vestuario.'}</p>
            <div class="datos">
              <div class="dato"><b>${n.iOk} de ${IMPUESTA4.length}</b><span>impuesta o acordada</span></div>
              <div class="dato"><b>${n.inspectorOk} de ${REGLAS4.length}</b><span>reglas revisadas a la primera</span></div>
              <div class="dato"><b>${acuerdosPacto4().length}</b><span>acuerdos en el pacto</span></div>
            </div>
          </div>
        </div>
        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.25rem">¿Cómo te fue construyendo acuerdos?</h3>
          <div class="autoeval">${Object.entries(AUTOEVAL4).map(([k, v]) => `<button data-accion="autoeval4" data-valor="${k}" aria-pressed="${n.autoeval === k}">${v.txt}</button>`).join('')}</div>
          ${n.autoeval ? `<p role="status" class="entra">${AUTOEVAL4[n.autoeval].msg}</p>` : ''}
        </section>
        <div class="cuaderno">${ic('notebook-pen')}<p><strong>Para tu cuaderno:</strong> copia el pacto del curso y escribe cuál acuerdo te comprometes a cumplir primero y por qué.</p></div>
        <div class="fila">
          <button class="btn btn-principal" data-accion="caso-revisar">${ic('volleyball')} Volver al caso del balón</button>
          <button class="btn btn-cancha" data-accion="ir" data-valor="vestuario">${ic('house')} Volver al vestuario</button>
          <button class="btn" data-accion="ir" data-valor="n4-cartel">${ic('file-text')} Ver el pacto</button>
        </div>
      </div>
    </div>`;
  }
});

const AUTOEVAL4 = {
  ayuda:{txt:'Necesito ayuda', msg:'Gracias por decirlo. Pídele a tu profesor que te explique de nuevo el medidor de regla justa.'},
  cuesta:{txt:'Todavía me cuesta', msg:'Está bien: opinar y escuchar a todos se aprende participando. En la próxima asamblea, comparte una idea.'},
  bien:{txt:'Voy bien', msg:'¡Vas muy bien! Recuerda revisar cada regla con el medidor antes de proponerla.'},
  explicar:{txt:'Se lo puedo explicar a otros', msg:'¡Genial! Ayuda a tu curso a recordar el pacto durante las próximas semanas.'}
};

Object.assign(acciones, {
  'empezar-n4'(){ state.n4 = nuevoN4(); state.screen = 'n4-impuesta'; },
  impuesta(v){ const n = state.n4; if (n.iResp) return; n.iResp = v; if (v === IMPUESTA4[n.ii].r) n.iOk++; registrar('n4i:' + n.ii, v === IMPUESTA4[n.ii].r); },
  'siguiente-impuesta'(){
    const n = state.n4;
    if (n.ii >= IMPUESTA4.length - 1) { state.screen = 'n4-ideas'; return; }
    n.ii++; n.iResp = null;
  },
  diagnosticar(v){
    const n = state.n4, r = REGLAS4[n.ri];
    if (n.diag) return;
    const bien = r.falla.length ? r.falla.includes(v) : v === 'lista';
    if (bien) {
      n.diag = v; n.pista4 = '';
      if (!n.diagMal.length) n.inspectorOk++;
      registrar('n4r:' + r.id, !n.diagMal.length);
      if (r.opciones) n.ordenMejora = mezclar(r.opciones.map((_, k) => k));
      if (!r.falla.length) n.aprobadas[r.id] = r.t;
    } else {
      if (!n.diagMal.includes(v)) n.diagMal.push(v);
      n.sacudir = 'diag';
      n.pista4 = v === 'lista' ? 'Revisa otra vez con el medidor: ¿es igual para todos, cuida los derechos, es clara y se puede cumplir?' : (r.falla.length ? 'Esa parte sí la cumple. Busca qué otra cosa le falta.' : 'Mírala bien: esta regla sí cumple ese criterio.');
      if (n.diagMal.length >= 2) {
        n.diag = r.falla[0] || 'lista'; n.pista4 = 'Esta es la respuesta. Lean juntos la explicación.';
        registrar('n4r:' + r.id, false);
        if (r.opciones) n.ordenMejora = mezclar(r.opciones.map((_, k) => k));
        if (!r.falla.length) n.aprobadas[r.id] = r.t;
      }
    }
  },
  mejorar(v){
    const n = state.n4, r = REGLAS4[n.ri], k = Number(v), o = r.opciones[k];
    if (n.aprobadas[r.id]) return;
    if (o.ok) { n.aprobadas[r.id] = o.t; n.pista4 = ''; }
    else if (!n.mejoraMal.includes(k)) n.mejoraMal.push(k);
  },
  'siguiente-regla'(){
    const n = state.n4;
    if (n.ri >= REGLAS4.length - 1) { state.screen = 'n4-pacto'; return; }
    Object.assign(n, {ri:n.ri + 1, diag:null, diagMal:[], mejoraMal:[], pista4:'', ordenMejora:null});
  },
  votar(v){ const [id, si] = v.split(':'); state.n4.incluidos[id] = si === 'si'; },
  'check-propio'(v){ const n = state.n4; n.checks[Number(v)] = !n.checks[Number(v)]; n.errorPropio = ''; },
  'agregar-propio'(){
    const n = state.n4, t = (n.borrador || '').trim();
    if (!t) { n.errorPropio = 'Escriban el acuerdo antes de agregarlo.'; return; }
    if (!n.checks.every(Boolean)) { n.errorPropio = 'Revísenlo con el medidor: marquen los 4 criterios cuando el acuerdo los cumpla.'; return; }
    n.propios.push({t}); n.borrador = ''; n.checks = [false, false, false, false]; n.errorPropio = '';
  },
  'quitar-propio'(v){ state.n4.propios.splice(Number(v), 1); },
  reparacion(v){ state.n4.reparacion = v; state.n4.errorPacto = ''; },
  firmar(){
    const n = state.n4;
    if (!acuerdosPacto4().length) { n.errorPacto = 'El pacto necesita al menos un acuerdo. Voten «Sí» en alguno o agreguen uno propio.'; return; }
    if (n.reparacion !== 'reparar') { n.errorPacto = 'Antes de firmar, elijan qué harán si alguien no cumple un acuerdo (paso 3).'; return; }
    n.errorPacto = ''; n.copiado = null; state.screen = 'n4-cartel';
  },
  'copiar-pacto'(){
    const n = state.n4;
    try {
      navigator.clipboard.writeText(textoPacto4()).then(() => { n.copiado = 'ok'; render(); }).catch(() => { n.copiado = 'error'; render(); });
    } catch(e) { n.copiado = 'error'; }
  },
  'terminar-n4'(){ state.progreso.n4 = true; guardar(); contarPartida('n4'); state.screen = 'n4-cierre'; },
  autoeval4(v){ state.n4.autoeval = v; }
});
