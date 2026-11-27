/* ===== Nivel 2: Detective del recreo ===== */
const TINTA = '#15233c';

function persona(o){
  const {x, y, s = 1, flip = false, piel = '#c98e62', pelo = '#1f1a17', peinado = 'corto', camisa = '#22579a', pantalon = '#15233c',
    pose = 'normal', boca = 'feliz', ojos = 'abiertos', gafas = false, falda = false, sentado = false, silla = false, caido = false, lagrima = false} = o;
  const brazo = (x1, y1, x2, y2, r = 5.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${camisa}" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="${r}" fill="${piel}"/>`;
  let brazos = '', objeto = '';
  switch (pose) {
    case 'alto': brazos = brazo(-14, -72, -21, -44) + brazo(14, -72, 38, -94, 7); break;
    case 'senala': brazos = brazo(-14, -72, -21, -44) + brazo(14, -72, 46, -76); break;
    case 'rie': brazos = brazo(-14, -72, -5, -52) + brazo(14, -72, 6, -50); break;
    case 'celular': objeto = `<rect x="22" y="-100" width="13" height="21" rx="3" fill="${TINTA}" transform="rotate(12 28 -90)"/><rect x="24" y="-97" width="9" height="14" rx="1.5" fill="#8fd3ff" transform="rotate(12 28 -90)"/>`; brazos = brazo(-14, -72, 22, -84) + brazo(14, -72, 30, -80); break;
    case 'lonchera': objeto = `<rect x="-19" y="-62" width="38" height="24" rx="5" fill="#ffb703" stroke="${TINTA}" stroke-width="2"/><circle cx="-6" cy="-56" r="6" fill="#f4e3b1" stroke="#c9a24a" stroke-width="2"/><circle cx="7" cy="-55" r="5" fill="#9c4706"/>`; brazos = brazo(-14, -72, -14, -50) + brazo(14, -72, 14, -50); break;
    case 'saltar': brazos = brazo(-14, -72, -30, -102) + brazo(14, -72, 30, -102); break;
    case 'ayuda': brazos = brazo(-14, -72, 12, -34) + brazo(14, -72, 30, -32); break;
    case 'cuerda': brazos = brazo(-14, -72, -21, -44) + brazo(14, -72, 40, -60); break;
    case 'libro': objeto = `<rect x="-15" y="-74" width="30" height="24" rx="3" fill="#c2362f" stroke="${TINTA}" stroke-width="2"/><line x1="0" y1="-74" x2="0" y2="-50" stroke="${TINTA}" stroke-width="2"/>`; brazos = brazo(-14, -72, -9, -56) + brazo(14, -72, 9, -56); break;
    case 'invita': brazos = brazo(-14, -72, -18, -46) + brazo(14, -72, 44, -64); break;
    case 'brazos': brazos = brazo(-14, -72, -10, -50) + brazo(14, -72, 10, -50); break;
    default: brazos = brazo(-14, -72, -21, -44) + brazo(14, -72, 21, -44);
  }
  let piernas = '', silleta = '';
  if (sentado || silla) {
    piernas = `<path d="M-8 -36 L15 -36 L16 -5" fill="none" stroke="${pantalon}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 -33 L24 -33 L25 -5" fill="none" stroke="${pantalon}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="20" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/><ellipse cx="29" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/>`;
  } else if (falda) {
    piernas = `<line x1="-7" y1="-30" x2="-8" y2="-5" stroke="#f7f7f7" stroke-width="8" stroke-linecap="round"/><line x1="7" y1="-30" x2="8" y2="-5" stroke="#f7f7f7" stroke-width="8" stroke-linecap="round"/><path d="M-17 -42 L17 -42 L23 -22 L-23 -22 Z" fill="${pantalon}"/><ellipse cx="-10" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/><ellipse cx="10" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/>`;
  } else {
    piernas = `<line x1="-8" y1="-34" x2="-9" y2="-6" stroke="${pantalon}" stroke-width="11" stroke-linecap="round"/><line x1="8" y1="-34" x2="9" y2="-6" stroke="${pantalon}" stroke-width="11" stroke-linecap="round"/><ellipse cx="-11" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/><ellipse cx="11" cy="-2" rx="8" ry="4.5" fill="${TINTA}"/>`;
  }
  if (silla) {
    silleta = `<g stroke="#4a5873" stroke-width="4" fill="none" stroke-linecap="round"><path d="M-18 -84 L-16 -36 L22 -36"/><path d="M-18 -84 L-26 -86"/><path d="M22 -36 L30 -8"/></g><circle cx="-8" cy="-24" r="23" fill="none" stroke="#4a5873" stroke-width="4"/><circle cx="-8" cy="-24" r="4" fill="#4a5873"/><circle cx="30" cy="-6" r="6" fill="none" stroke="#4a5873" stroke-width="3"/>`;
  }
  let atras = '', pelo1 = '';
  const gorro = `<path d="M-16 -100 C-16 -114 -8 -119 0 -119 C10 -119 17 -113 16 -100 C11 -107 6 -109 0 -109 C-7 -109 -12 -106 -16 -100 Z" fill="${pelo}"/>`;
  switch (peinado) {
    case 'largo': atras = `<rect x="-19" y="-112" width="38" height="44" rx="15" fill="${pelo}"/>`; pelo1 = gorro; break;
    case 'coletas': atras = `<circle cx="-20" cy="-104" r="8" fill="${pelo}"/><circle cx="20" cy="-104" r="8" fill="${pelo}"/>`; pelo1 = gorro; break;
    case 'rizos': pelo1 = [[-14,-106],[-8,-113],[1,-116],[10,-113],[15,-106]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7.5" fill="${pelo}"/>`).join(''); break;
    case 'rapado': pelo1 = `<g opacity=".5">${gorro}</g>`; break;
    default: pelo1 = gorro;
  }
  const ojosSVG = ojos === 'cerrados'
    ? `<path d="M-9 -98 q3 -3 6 0 M3 -98 q3 -3 6 0" fill="none" stroke="${TINTA}" stroke-width="2" stroke-linecap="round"/>`
    : `<circle cx="-6" cy="-98" r="2.2" fill="${TINTA}"/><circle cx="6" cy="-98" r="2.2" fill="${TINTA}"/>`;
  const bocas = {
    feliz:`<path d="M-6 -91 Q0 -85 6 -91" fill="none" stroke="${TINTA}" stroke-width="2" stroke-linecap="round"/>`,
    triste:`<path d="M-6 -87 Q0 -92 6 -87" fill="none" stroke="${TINTA}" stroke-width="2" stroke-linecap="round"/>`,
    rie:`<path d="M-7 -92 Q0 -81 7 -92 Z" fill="#7a2a1a"/>`,
    abierta:`<ellipse cx="0" cy="-89" rx="3.5" ry="4" fill="#7a2a1a"/>`,
    asco:`<path d="M-7 -89 l3.5 -2 l3.5 2 l3.5 -2 l3.5 2" fill="none" stroke="${TINTA}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    serio:`<line x1="-5" y1="-89" x2="5" y2="-89" stroke="${TINTA}" stroke-width="2" stroke-linecap="round"/>`
  };
  const gafasSVG = gafas ? `<g fill="none" stroke="${TINTA}" stroke-width="1.8"><circle cx="-6" cy="-98" r="5"/><circle cx="6" cy="-98" r="5"/><line x1="-1" y1="-98" x2="1" y2="-98"/></g>` : '';
  const lagrimaSVG = lagrima ? `<path d="M10 -94 q2 4 0 6 q-2 -2 0 -6 Z" fill="#5fb3e8"/>` : '';
  const giro = caido ? ' rotate(-80)' : '';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})${giro}">
    ${silleta}${piernas}
    <rect x="-16" y="-80" width="32" height="48" rx="12" fill="${camisa}"/>
    ${brazos}${objeto}
    ${atras}
    <rect x="-5" y="-86" width="10" height="9" fill="${piel}"/>
    <circle cx="-16" cy="-97" r="4" fill="${piel}"/><circle cx="16" cy="-97" r="4" fill="${piel}"/>
    <circle cx="0" cy="-98" r="16" fill="${piel}"/>
    ${pelo1}${ojosSVG}${bocas[boca] || bocas.feliz}${gafasSVG}${lagrimaSVG}
  </g>`;
}

function burbuja(x, y, texto, cola = 'izq'){
  const w = Math.round(texto.length * 8.6 + 30), h = 38, bx = x - w / 2, base = y + h / 2;
  const tx = cola === 'izq' ? bx + 26 : cola === 'der' ? bx + w - 26 : x;
  const punta = cola === 'izq' ? tx - 10 : cola === 'der' ? tx + 10 : tx;
  return `<g class="burbuja">
    <rect x="${bx}" y="${y - h / 2}" width="${w}" height="${h}" rx="19" fill="#fff" stroke="${TINTA}" stroke-width="2.2"/>
    <path d="M${tx - 9} ${base - 2} L${punta} ${base + 18} L${tx + 9} ${base - 2} Z" fill="#fff" stroke="${TINTA}" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="${tx - 7.5}" y1="${base - 1.2}" x2="${tx + 7.5}" y2="${base - 1.2}" stroke="#fff" stroke-width="4"/>
    <text x="${x}" y="${y + 6}" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-weight="700" font-size="17" fill="${TINTA}">${texto}</text>
  </g>`;
}

const P = {piel:['#f6d3b3','#e8b48c','#c98e62','#a86b43','#7c4a2b','#553220'], pelo:['#1f1a17','#5a3a22','#c9a24a','#8e3b1f']};

const ESCENAS2 = {
  p1:{caja:[150, 232, 340, 232], marca:[478, 246], dibujo:() =>
      `<circle cx="372" cy="452" r="11" fill="#fff" stroke="${TINTA}" stroke-width="2"/><path d="M368 446 l4 -2 l4 3 l-1 5 l-5 1 l-3 -4 Z" fill="${TINTA}"/>` +
      persona({x:200, y:462, piel:P.piel[1], pelo:P.pelo[1], peinado:'coletas', camisa:'#c2362f', pantalon:'#22579a', boca:'triste', lagrima:true}) +
      persona({x:320, y:462, flip:true, piel:P.piel[3], pelo:P.pelo[0], peinado:'corto', camisa:'#ffb703', pantalon:'#15233c', pose:'alto', boca:'abierta'}) +
      persona({x:430, y:440, flip:true, piel:P.piel[4], pelo:P.pelo[0], peinado:'rizos', camisa:'#ffb703', pantalon:'#15233c', pose:'brazos', boca:'serio'}) +
      burbuja(330, 300, '¡Las niñas no juegan!', 'izq')},
  p2:{caja:[380, 548, 270, 166], marca:[640, 562], dibujo:() =>
      persona({x:430, y:700, piel:P.piel[0], pelo:P.pelo[2], peinado:'corto', camisa:'#6b3fa0', pantalon:'#15233c', pose:'libro', boca:'triste', gafas:true}) +
      persona({x:535, y:700, flip:true, piel:P.piel[2], pelo:P.pelo[0], peinado:'rapado', camisa:'#1d7a4e', pantalon:'#15233c', pose:'senala', boca:'rie', ojos:'cerrados'}) +
      persona({x:605, y:700, flip:true, piel:P.piel[5], pelo:P.pelo[0], peinado:'largo', camisa:'#22579a', pantalon:'#15233c', pose:'rie', boca:'rie', ojos:'cerrados', falda:true}) +
      burbuja(560, 578, '¡Ja, ja, ja!', 'izq')},
  p3:{caja:[882, 470, 300, 244], marca:[1170, 486], dibujo:() =>
      persona({x:935, y:702, piel:P.piel[2], pelo:P.pelo[1], peinado:'corto', camisa:'#c2362f', pantalon:'#22579a', silla:true, boca:'triste'}) +
      persona({x:1060, y:702, flip:true, piel:P.piel[1], pelo:P.pelo[0], peinado:'coletas', camisa:'#1d7a4e', pantalon:'#15233c', pose:'alto', boca:'abierta', falda:true}) +
      persona({x:1125, y:620, piel:P.piel[3], pelo:P.pelo[3], peinado:'corto', camisa:'#ffb703', pantalon:'#15233c', pose:'saltar', boca:'feliz'}) +
      burbuja(1040, 520, 'Tú no puedes jugar', 'izq')},
  p4:{caja:[936, 300, 248, 150], marca:[1172, 316], dibujo:() =>
      persona({x:985, y:440, piel:P.piel[4], pelo:P.pelo[0], peinado:'largo', camisa:'#22579a', pantalon:'#15233c', pose:'lonchera', boca:'triste', falda:true}) +
      persona({x:1085, y:440, flip:true, piel:P.piel[0], pelo:P.pelo[2], peinado:'coletas', camisa:'#c2362f', pantalon:'#15233c', pose:'senala', boca:'asco', falda:true}) +
      burbuja(1060, 318, '¡Guácala! ¿Qué es eso?', 'izq')},
  p5:{caja:[56, 548, 300, 166], marca:[346, 562], dibujo:() =>
      `<g stroke="${TINTA}" stroke-width="2.5" stroke-linecap="round"><line x1="66" y1="660" x2="56" y2="648"/><line x1="80" y1="656" x2="78" y2="642"/><line x1="56" y1="674" x2="44" y2="670"/></g>` +
      persona({x:172, y:704, piel:P.piel[1], pelo:P.pelo[1], peinado:'corto', camisa:'#ffb703', pantalon:'#22579a', caido:true, boca:'abierta'}) +
      persona({x:270, y:704, flip:true, piel:P.piel[3], pelo:P.pelo[0], peinado:'rapado', camisa:'#6b3fa0', pantalon:'#15233c', pose:'celular', boca:'rie'}) +
      burbuja(235, 578, '¡Lo subo al grupo!', 'izq')},
  b1:{caja:[690, 262, 210, 150], marca:[892, 278], dibujo:() =>
      persona({x:712, y:398, piel:P.piel[5], pelo:P.pelo[0], peinado:'rizos', camisa:'#1d7a4e', pantalon:'#15233c', sentado:true, boca:'feliz'}) +
      persona({x:800, y:398, piel:P.piel[2], pelo:P.pelo[1], peinado:'corto', camisa:'#ffb703', pantalon:'#15233c', sentado:true, pose:'invita', boca:'feliz'}) +
      persona({x:880, y:406, flip:true, piel:P.piel[1], pelo:P.pelo[3], peinado:'largo', camisa:'#6b3fa0', pantalon:'#15233c', boca:'feliz', falda:true}) +
      burbuja(805, 262, '¿Te sientas con nosotros?', 'der')},
  b2:{caja:[668, 470, 196, 170], marca:[856, 486], dibujo:() =>
      `<rect x="752" y="616" width="24" height="16" rx="2" fill="#22579a" transform="rotate(-18 764 624)"/><rect x="780" y="622" width="22" height="14" rx="2" fill="#c2362f" transform="rotate(14 791 629)"/>` +
      persona({x:720, y:632, piel:P.piel[3], pelo:P.pelo[0], peinado:'coletas', camisa:'#c2362f', pantalon:'#15233c', pose:'ayuda', boca:'feliz', falda:true}) +
      persona({x:830, y:632, flip:true, piel:P.piel[0], pelo:P.pelo[2], peinado:'corto', camisa:'#1d7a4e', pantalon:'#15233c', pose:'brazos', boca:'feliz'}) +
      burbuja(735, 508, 'Te ayudo', 'izq')},
  b3:{caja:[548, 176, 186, 160], marca:[724, 192], dibujo:() =>
      persona({x:580, y:322, piel:P.piel[4], pelo:P.pelo[0], peinado:'corto', camisa:'#22579a', pantalon:'#15233c', pose:'cuerda', boca:'feliz'}) +
      persona({x:700, y:322, flip:true, piel:P.piel[1], pelo:P.pelo[1], peinado:'largo', camisa:'#ffb703', pantalon:'#15233c', pose:'cuerda', boca:'feliz', falda:true}) +
      `<path d="M620 262 Q640 338 660 262" fill="none" stroke="#9c4706" stroke-width="3"/>` +
      persona({x:640, y:300, s:.9, piel:P.piel[2], pelo:P.pelo[0], peinado:'rizos', camisa:'#1d7a4e', pantalon:'#15233c', pose:'saltar', boca:'rie'}) +
      burbuja(600, 160, '¡Ahora te toca a ti!', 'izq')}
};

function fondoPatio(){
  const ventanas = [80, 210, 470, 600, 730, 860, 990, 1110].map(x => `<rect x="${x - 45}" y="40" width="90" height="60" rx="6" fill="#bfe1f4" stroke="#fff" stroke-width="5"/><line x1="${x}" y1="40" x2="${x}" y2="100" stroke="#fff" stroke-width="4"/>`).join('');
  const toldo = Array.from({length:11}, (_, i) => `<path d="M${940 + i * 20} 214 h20 v22 q-10 9 -20 0 Z" fill="${i % 2 ? '#fff' : '#c2362f'}"/>`).join('');
  return `
    <rect width="1200" height="720" fill="#eadfca"/>
    <g stroke="#dccfb6" stroke-width="2">${Array.from({length:9}, (_, i) => `<line x1="0" y1="${230 + i * 60}" x2="1200" y2="${230 + i * 60}"/>`).join('')}</g>
    <rect width="1200" height="178" fill="#f6e8d3"/>
    <rect width="1200" height="16" fill="#c8643b"/>
    <rect y="150" width="1200" height="28" fill="#1d7a4e"/>
    ${ventanas}
    <rect x="300" y="64" width="80" height="114" rx="4" fill="#8a5a3c"/><circle cx="366" cy="124" r="4" fill="#ffb703"/>
    <rect x="250" y="24" width="180" height="30" rx="6" fill="${TINTA}"/>
    <text x="340" y="45" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="17" fill="#ffb703">I. E. La Esperanza</text>
    <rect x="40" y="214" width="474" height="300" rx="10" fill="#2f8f5b"/>
    <g fill="none" stroke="#fff" stroke-width="4" stroke-opacity=".85">
      <rect x="54" y="228" width="446" height="272" rx="4"/><line x1="277" y1="228" x2="277" y2="500"/><circle cx="277" cy="364" r="42"/>
      <rect x="54" y="314" width="44" height="100"/><rect x="456" y="314" width="44" height="100"/>
    </g>
    <rect x="66" y="330" width="14" height="70" fill="none" stroke="#fff" stroke-width="5"/>
    <rect x="757" y="236" width="28" height="130" fill="#7a5230"/>
    <circle cx="772" cy="196" r="78" fill="#2f874a"/><circle cx="716" cy="226" r="52" fill="#3a9a57"/><circle cx="830" cy="224" r="54" fill="#3a9a57"/><circle cx="772" cy="168" r="50" fill="#3a9a57"/>
    <rect x="684" y="318" width="186" height="10" rx="4" fill="#8a5a3c"/>
    <rect x="684" y="350" width="186" height="13" rx="4" fill="#a86b43"/>
    <rect x="694" y="362" width="8" height="34" fill="#8a5a3c"/><rect x="852" y="362" width="8" height="34" fill="#8a5a3c"/>
    <rect x="940" y="232" width="220" height="96" rx="6" fill="#fff7e6" stroke="#d8bf8e" stroke-width="3"/>
    <rect x="940" y="290" width="220" height="12" fill="#d8bf8e"/>
    <circle cx="975" cy="282" r="8" fill="#c2362f"/><circle cx="1000" cy="282" r="8" fill="#ffb703"/><rect x="1120" y="268" width="16" height="22" rx="3" fill="#22579a"/>
    ${toldo}
    <rect x="985" y="186" width="130" height="28" rx="6" fill="${TINTA}"/>
    <text x="1050" y="206" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="17" fill="#ffb703">Tienda escolar</text>
    <g stroke="#22579a" stroke-width="7" stroke-linecap="round" fill="none">
      <line x1="960" y1="500" x2="960" y2="660"/><line x1="1050" y1="500" x2="1050" y2="660"/><line x1="1150" y1="500" x2="1150" y2="660"/>
      <line x1="955" y1="500" x2="1155" y2="500"/><line x1="1050" y1="560" x2="1150" y2="560"/><line x1="1050" y1="610" x2="1150" y2="610"/>
    </g>`;
}

function patioSVG(){
  const n = state.n2;
  const orden = ['b3','p1','b1','p4','b2','p2','p5','p3'];
  const escenas = orden.map(id => {
    const e = ESCENAS2[id], [cx, cy, cw, ch] = e.caja;
    const activo = n.activo === id;
    return `<g class="escena" data-accion="escena" data-valor="${id}" tabindex="0" role="button" aria-label="Revisar esta parte del patio">
      ${e.dibujo()}
      <rect class="zona${activo ? ' activa' : ''}" x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="16" fill="#fff" fill-opacity="0"/>
    </g>`;
  }).join('');
  const marcas = Object.entries(ESCENAS2).map(([id, e]) => {
    const [mx, my] = e.marca;
    if (n.encontrados.includes(id)) return `<g transform="translate(${mx} ${my})"><circle r="20" fill="#ffb703" stroke="${TINTA}" stroke-width="3"/><path d="M-8 0 l5 5 l10 -11" fill="none" stroke="${TINTA}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    if (n.buenos.includes(id)) return `<g transform="translate(${mx} ${my})"><circle r="20" fill="#1d7a4e" stroke="#fff" stroke-width="3"/><path d="M0 8 C-12 0 -10 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C10 -10 12 0 0 8 Z" fill="#fff"/></g>`;
    if (n.pistaEscena === id) return `<circle class="anillo" cx="${e.caja[0] + e.caja[2] / 2}" cy="${e.caja[1] + e.caja[3] / 2}" r="${Math.max(e.caja[2], e.caja[3]) / 2}" fill="none" stroke="#ffb703" stroke-width="6"/>`;
    return '';
  }).join('');
  return `<svg class="patio" viewBox="0 0 1200 720" role="group" aria-label="Ilustración del patio del colegio durante el recreo">${fondoPatio()}${escenas}${marcas}</svg>`;
}

const SENTIMIENTOS = [
  {id:'triste', nombre:'Triste', cara:`<circle cx="24" cy="24" r="21" fill="#ffd166"/><circle cx="17" cy="21" r="2.6" fill="${TINTA}"/><circle cx="31" cy="21" r="2.6" fill="${TINTA}"/><path d="M16 35 Q24 28 32 35" fill="none" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/><path d="M33 26 q3 5 0 8 q-3 -3 0 -8Z" fill="#5fb3e8"/>`},
  {id:'rabia', nombre:'Con rabia', cara:`<circle cx="24" cy="24" r="21" fill="#f4845f"/><path d="M12 15 L21 19 M36 15 L27 19" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/><circle cx="17" cy="23" r="2.6" fill="${TINTA}"/><circle cx="31" cy="23" r="2.6" fill="${TINTA}"/><path d="M16 35 Q24 30 32 35" fill="none" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/>`},
  {id:'verguenza', nombre:'Con vergüenza', cara:`<circle cx="24" cy="24" r="21" fill="#ffd166"/><circle cx="13" cy="29" r="4.5" fill="#f28482" opacity=".7"/><circle cx="35" cy="29" r="4.5" fill="#f28482" opacity=".7"/><path d="M14 21 q3 3 6 0 M28 21 q3 3 6 0" fill="none" stroke="${TINTA}" stroke-width="2.4" stroke-linecap="round"/><path d="M19 34 q5 -3 10 0" fill="none" stroke="${TINTA}" stroke-width="2.4" stroke-linecap="round"/>`},
  {id:'miedo', nombre:'Con miedo', cara:`<circle cx="24" cy="24" r="21" fill="#cfe3f5"/><circle cx="17" cy="21" r="4" fill="#fff" stroke="${TINTA}" stroke-width="1.6"/><circle cx="31" cy="21" r="4" fill="#fff" stroke="${TINTA}" stroke-width="1.6"/><circle cx="17" cy="21" r="1.8" fill="${TINTA}"/><circle cx="31" cy="21" r="1.8" fill="${TINTA}"/><ellipse cx="24" cy="34" rx="4" ry="5" fill="#7a2a1a"/><path d="M37 11 q3 5 0 8 q-3 -3 0 -8Z" fill="#5fb3e8"/>`},
  {id:'solo', nombre:'Solo o sola', cara:`<circle cx="24" cy="24" r="21" fill="#d9d4ea"/><path d="M13 22 h8 M27 22 h8" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/><path d="M18 34 h12" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/>`},
  {id:'feliz', nombre:'Feliz', cara:`<circle cx="24" cy="24" r="21" fill="#ffd166"/><circle cx="17" cy="21" r="2.6" fill="${TINTA}"/><circle cx="31" cy="21" r="2.6" fill="${TINTA}"/><path d="M15 29 Q24 38 33 29" fill="none" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"/>`}
];

const CASOS2 = {
  p1:{nombre:'Valentina', titulo:'No la dejan jugar fútbol', diferencia:'Género',
    texto:'Valentina quiere jugar fútbol, pero un compañero le dice que las niñas no juegan.',
    acciones:[
      {t:'Proponer equipos mixtos para que todos jueguen.', ok:true, c:'Así todos participan y el partido es de todos.'},
      {t:'Decir con calma: «Todos podemos jugar, ella también».', ok:true, c:'Cuando alguien habla con respeto, el grupo puede cambiar de idea y nadie queda por fuera.'},
      {t:'Invitar a Valentina a jugar en tu equipo.', ok:true, c:'Valentina juega y el grupo descubre que todos pueden aportar al partido.'},
      {t:'No decir nada; no es tu problema.', ok:false, c:'Si nadie dice nada, Valentina se queda por fuera y la exclusión se repite.'},
      {t:'Decirle al compañero que es un tonto.', ok:false, c:'Responder con un insulto crea otra pelea y no ayuda a Valentina.'}],
    idea:'Jugar fútbol no es cosa de niños o de niñas. Todos tenemos el mismo derecho a jugar y a participar.',
    norma:'Constitución, art. 13 · Ley 1098, art. 30'},
  p2:{nombre:'Samuel', titulo:'Se burlan de sus gafas', diferencia:'Apariencia',
    texto:'Dos compañeros se ríen de Samuel y le ponen apodos por usar gafas.',
    acciones:[
      {t:'Decirle a Samuel que se quite las gafas.', ok:false, c:'El problema no son sus gafas: es la burla.'},
      {t:'Acercarte a Samuel y acompañarlo.', ok:true, c:'Samuel no se siente solo, y quienes se burlaban ven que el grupo no apoya la burla.'},
      {t:'Reírte también para no quedar mal.', ok:false, c:'La burla crece cuando otros se ríen. Samuel se siente peor.'},
      {t:'Decir con firmeza: «Burlarse no es chistoso, paren».', ok:true, c:'Frenar la burla sin insultar protege a Samuel y le muestra al grupo otra forma de actuar.'},
      {t:'Contarle a un docente si la burla se repite.', ok:true, c:'Pedir ayuda a un adulto no es ser sapo: es cuidar a un compañero.'}],
    idea:'Nadie debe ser humillado por cómo se ve. Todas las personas tenemos la misma dignidad.',
    norma:'Constitución, art. 13 · Ley 1098, art. 43'},
  p3:{nombre:'Martín', titulo:'No lo dejan jugar por su silla de ruedas', diferencia:'Discapacidad',
    texto:'Martín usa silla de ruedas. Sus compañeros le dicen que no puede jugar con ellos.',
    acciones:[
      {t:'Pedirle al profesor ideas de juegos para todos.', ok:true, c:'Los adultos pueden ayudar a adaptar los juegos para que nadie quede por fuera.'},
      {t:'Proponer un juego en el que todos puedan participar.', ok:true, c:'Cuando ajustamos un poco las reglas del juego, todos pueden jugar.'},
      {t:'Decirle a Martín que mejor se quede mirando.', ok:false, c:'Mirar desde afuera no es jugar. Martín tiene el mismo derecho a la recreación.'},
      {t:'Preguntarle a Martín a qué le gustaría jugar.', ok:true, c:'Escuchar a Martín es reconocer que él también decide.'},
      {t:'Decirle que juegue otro día.', ok:false, c:'Aplazarlo también es dejarlo por fuera.'}],
    idea:'Las diferencias no son un obstáculo: cuando adaptamos el juego, todos pueden participar.',
    norma:'Constitución, art. 13 · Ley 1098, art. 36'},
  p4:{nombre:'Yuliana', titulo:'Se burlan de su comida', diferencia:'Origen y costumbres',
    texto:'Yuliana trajo un plato típico de su región y una compañera le dice: «¡Guácala! ¿Qué es eso?».',
    acciones:[
      {t:'Probar un poquito, si Yuliana quiere compartir.', ok:true, c:'Conocer la comida de otras regiones es una forma de respeto y de amistad.'},
      {t:'Preguntarle a Yuliana qué es y de dónde viene.', ok:true, c:'Preguntar con curiosidad convierte la diferencia en algo para aprender.'},
      {t:'Hacer cara de asco tú también.', ok:false, c:'Eso hace que Yuliana sienta vergüenza de su familia y de su región.'},
      {t:'Decir: «Cada familia come cosas distintas, y eso está bien».', ok:true, c:'Defender la diversidad ayuda a que todos se sientan bienvenidos.'},
      {t:'Decirle a Yuliana que mejor no traiga esa comida.', ok:false, c:'El problema no es su comida: es la burla.'}],
    idea:'Las costumbres de cada familia y de cada región son parte de quiénes somos. Conocerlas nos enriquece.',
    norma:'Constitución, arts. 7 y 13'},
  p5:{nombre:'Felipe', titulo:'Lo graban cuando se cae', diferencia:'Momento difícil',
    texto:'Felipe se tropezó y se cayó. Un compañero lo graba con el celular y dice que lo va a subir al grupo del curso.',
    acciones:[
      {t:'Reírte y comentar el video.', ok:false, c:'Comentar hace que más gente lo vea y se burle de Felipe.'},
      {t:'Ayudar a Felipe a levantarse.', ok:true, c:'Ayudar primero muestra que te importa cómo está.'},
      {t:'Pedir que te pasen el video para verlo.', ok:false, c:'Mientras más personas lo ven y lo comparten, más daño se hace.'},
      {t:'Decir: «No lo subas, a ti tampoco te gustaría».', ok:true, c:'Ponerse en el lugar del otro ayuda a frenar el daño.'},
      {t:'Avisarle a un docente si el video ya se publicó.', ok:true, c:'Un adulto puede ayudar a que el video se borre y a reparar el daño.'}],
    idea:'Grabar o publicar a alguien en un momento difícil, sin su permiso, afecta su dignidad y su intimidad.',
    norma:'Constitución, art. 15 · Ley 1098, art. 33'}
};
const BUENOS2 = {
  b1:{titulo:'La invitan a sentarse', texto:'Laura estaba sola y el grupo de la banca la invita a sentarse con ellos.', valor:'Inclusión', idea:'Nadie se queda solo cuando alguien da el primer paso.'},
  b2:{titulo:'Le ayudan a recoger sus cuadernos', texto:'A un compañero se le cayeron los cuadernos y una niña se agacha a ayudarle.', valor:'Solidaridad', idea:'Ayudar cuando alguien lo necesita hace más fácil la convivencia.'},
  b3:{titulo:'Juegan por turnos', texto:'En el juego de la cuerda, cada uno espera su turno para saltar.', valor:'Respeto por los acuerdos', idea:'Los turnos son un acuerdo sencillo que permite que todos jueguen.'}
};
const PROBLEMAS2 = Object.keys(CASOS2);

const FRASES2 = [
  {t:'¿Quieres jugar con nosotros?', r:'cuida', e:'Invitar a alguien hace que se sienta parte del grupo.', paso2:{q:'¿Por qué cuida esta frase?', ops:[{t:'Porque incluye a alguien en el grupo.', ok:true},{t:'Porque obliga a la otra persona a jugar.', ok:false},{t:'Porque así el grupo gana más partidos.', ok:false}]}},
  {t:'Tú no sabes, mejor quédate callado.', r:'hiere', e:'Callar a alguien le quita su voz.', mejor:'Dime tu idea, te escucho.', paso2:{q:'¿Cómo se podría decir para cuidar?', ops:[{t:'Habla, pero rápido, que no hay tiempo.', ok:false},{t:'Dime tu idea, te escucho.', ok:true},{t:'Mejor que hable otro.', ok:false}]}},
  {t:'¡Qué bonito tu acento! ¿De dónde eres?', r:'cuida', e:'Mostrar interés por las diferencias es una forma de respeto.', paso2:{q:'¿Por qué cuida esta frase?', ops:[{t:'Porque se burla del acento de forma amable.', ok:false},{t:'Porque así la persona deja de hablar con acento.', ok:false},{t:'Porque muestra interés y respeto por las diferencias.', ok:true}]}},
  {t:'Con esa ropa no puedes estar en nuestro grupo.', r:'hiere', e:'Excluir a alguien por su apariencia lo hace sentir que vale menos.', mejor:'Ven, únete al grupo.', paso2:{q:'¿Cómo se podría decir para cuidar?', ops:[{t:'Ven, únete al grupo.', ok:true},{t:'Puedes estar, pero lejos de nosotros.', ok:false},{t:'Cámbiate de ropa y vuelves.', ok:false}]}},
  {t:'Perdón, no quise hacerte sentir mal.', r:'cuida', e:'Pedir disculpas repara la relación, aunque el daño no haya sido a propósito.', paso2:{q:'¿Por qué cuida esta frase?', ops:[{t:'Porque así ya no hay que cambiar nada.', ok:false},{t:'Porque reconoce el daño y ayuda a repararlo.', ok:true},{t:'Porque pedir perdón es solo para quedar bien.', ok:false}]}},
  {t:'Eso es de niñas, tú no puedes.', r:'hiere', e:'Los juegos y los gustos no son de niños ni de niñas.', mejor:'Todos podemos hacerlo.', paso2:{q:'¿Cómo se podría decir para cuidar?', ops:[{t:'Puedes, pero vas a quedar mal.', ok:false},{t:'Hazlo cuando nadie te vea.', ok:false},{t:'Todos podemos hacerlo.', ok:true}]}},
  {t:'No me gustó lo que dijiste. Por favor, no lo repitas.', r:'cuida', e:'Decir lo que sientes con calma y sin insultos te cuida a ti y cuida la convivencia.', paso2:{q:'¿Por qué cuida esta frase?', ops:[{t:'Porque dice lo que siente con calma y sin insultar.', ok:true},{t:'Porque es una forma de vengarse.', ok:false},{t:'Porque deja mal a la otra persona frente a todos.', ok:false}]}},
  {t:'Si no me das tu turno, ya no soy tu amigo.', r:'hiere', e:'Presionar con la amistad es una forma de chantaje.', mejor:'¿Nos turnamos?', paso2:{q:'¿Cómo se podría decir para cuidar?', ops:[{t:'Dame tu turno o le digo a todos que eres egoísta.', ok:false},{t:'¿Nos turnamos?', ok:true},{t:'Dame tu turno porque yo llegué primero a jugar.', ok:false}]}}
];

function nuevoN2(){
  return {encontrados:[], buenos:[], activo:null, fase:null, sentimiento:null, accionesVistas:[], aciertoAccion:false, pista:'', pistaEscena:null,
    fi:0, frResp:null, frasesOk:0, autoeval:null, laminaVista:false, sentirPista:''};
}

Object.assign(pantallas, {
  'n2-intro'(){
    return `<div class="app">${barra('Nivel 2 · Detective del recreo', 'vestuario')}
      <div class="pila">
        <div class="tarjeta"><p style="font-size:1.15rem">En el patio del colegio hay <strong>5 situaciones</strong> en las que alguien está siendo excluido o irrespetado. También hay <strong>3 buenos ejemplos</strong> escondidos. ¿Los encuentras todos?</p></div>
        <ol class="pasos">
          <li><span class="n">1</span><p>Busca en el patio y toca lo que te llame la atención.</p></li>
          <li><span class="n">2</span><p>Piensa cómo se siente la persona afectada.</p></li>
          <li><span class="n">3</span><p>Decide qué harías tú para ayudar.</p></li>
        </ol>
        <div class="aviso">${ic('users-round')}<p>Si juegan con todo el curso, cada equipo propone dónde buscar y explica su respuesta antes de tocar la pantalla.</p></div>
        <div><button class="btn btn-principal" data-accion="empezar-n2">${ic('search')} Empezar a buscar</button></div>
      </div>
    </div>`;
  },

  'n2-buscar'(){
    const n = state.n2;
    const listos = n.encontrados.length;
    let panel = '';
    if (n.activo && CASOS2[n.activo]) {
      const c = CASOS2[n.activo];
      let paso = '';
      if (n.fase === 'sentir') {
        paso = `<p class="pregunta"><span class="paso-n">Paso 1</span> ¿Cómo crees que se siente ${c.nombre}?</p>
          <div class="caras caras6${n.sacudir === 'sentir' ? ' sacude' : ''}">${SENTIMIENTOS.map(s => `<button class="cara" data-accion="sentir" data-valor="${s.id}"><svg viewBox="0 0 48 48" aria-hidden="true">${s.cara}</svg><span>${s.nombre}</span></button>`).join('')}</div>`;
      } else {
        const sen = SENTIMIENTOS.find(s => s.id === n.sentimiento);
        paso = `<div class="fila"><span class="sello derecho"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true">${sen.cara}</svg> ${c.nombre} se siente: ${sen.nombre.toLowerCase()}</span></div>
          <p class="pregunta"><span class="paso-n">Paso 2</span> Si estuvieras ahí, ¿qué harías?</p>
          <div class="acciones2">${(n.ordenAcc || c.acciones.map((_, k) => k)).map(k => { const a = c.acciones[k];
            const vista = n.accionesVistas.includes(k);
            return `<button class="accion2${vista ? (a.ok ? ' buena' : ' mala') : ''}" data-accion="actuar" data-valor="${k}" aria-pressed="${vista}">
              <span>${a.t}</span>${vista ? `<small>${ic(a.ok ? 'circle-check' : 'circle-x')} ${a.c}</small>` : ''}</button>`;
          }).join('')}</div>`;
        if (n.fase === 'cierre') {
          paso += `<div class="conversar entra">${ic('lightbulb')}<div><strong>Lo que aprendimos</strong>${c.idea}<p class="ley" style="margin-top:6px">${ic('book-open')} Lo dice: ${c.norma}</p></div></div>
            <div class="derecha"><button class="btn btn-cancha" data-accion="cerrar-caso">${listos === PROBLEMAS2.length ? 'Ver el resultado' : 'Seguir buscando'} ${ic('arrow-right')}</button></div>`;
        }
      }
      panel = `<section class="resultado entra" id="panel-caso">
        <div class="fila" style="justify-content:space-between"><span class="sello riesgo">${ic('search')} Situación ${listos} de ${PROBLEMAS2.length}</span><span class="etiqueta">${c.diferencia}</span></div>
        <h3 style="color:var(--tinta)">${c.titulo}</h3>
        <p style="font-size:1.08rem">${c.texto} ${escuchar(c.texto)}</p>
        ${paso}
      </section>`;
    } else if (n.activo && BUENOS2[n.activo]) {
      const b = BUENOS2[n.activo];
      panel = `<section class="resultado entra" id="panel-caso">
        <div class="fila"><span class="sello cuidado">${ic('heart')} Buen ejemplo: ${b.valor}</span></div>
        <h3>${b.titulo}</h3>
        <p style="font-size:1.08rem">${b.texto} ${b.idea}</p>
        <p style="color:var(--tinta-2)">Este no es un problema, pero vale la pena notarlo. Sigue buscando las situaciones de exclusión.</p>
        <div class="derecha"><button class="btn btn-cancha" data-accion="cerrar-caso">Seguir buscando ${ic('arrow-right')}</button></div>
      </section>`;
    } else if (listos === PROBLEMAS2.length) {
      panel = `<section class="resultado entra" id="panel-caso">
        <h3>${ic('party-popper')} ¡Encontraste las 5 situaciones!</h3>
        <p>Ahora viene el último reto: <strong>Frases que cuidan</strong>. Vas a decidir qué frases cuidan la convivencia y cuáles hieren.</p>
        <div class="derecha"><button class="btn btn-cancha" data-accion="ir-frases">Ir a Frases que cuidan ${ic('arrow-right')}</button></div>
      </section>`;
    } else {
      panel = `<div class="aviso">${ic('zoom-in')}<p>Toca las partes del patio donde alguien está siendo excluido o irrespetado. Si te cuesta encontrarlas, usa el botón de pista.</p></div>`;
    }
    const puntos = (lista, total, clase) => Array.from({length:total}, (_, k) => `<span class="punto${k < lista.length ? ' ' + clase : ''}"></span>`).join('');
    return `<div class="app">${barra('Detective del recreo', 'vestuario')}
      <div class="pila">
        <div class="marcador2">
          <div><span class="rotulo">Situaciones</span><span class="puntos">${puntos(n.encontrados, 5, 'p')}</span><b>${listos} de 5</b></div>
          <div><span class="rotulo">Buenos ejemplos</span><span class="puntos">${puntos(n.buenos, 3, 'b')}</span><b>${n.buenos.length} de 3</b></div>
          <button class="btn btn-chico" data-accion="pista2">${ic('lightbulb')} Pista</button>
        </div>
        <p class="solo-movil">${ic('arrow-right')} Desliza el patio hacia los lados para verlo completo.</p>
        <div class="patio-marco" id="patio-marco">${patioSVG()}</div>
        ${n.pista ? `<div class="pista" role="status">${ic('lightbulb')}<p>${n.pista}</p></div>` : ''}
        ${panel}
      </div>
    </div>`;
  },

  'n2-frases'(){
    const n = state.n2, f = FRASES2[n.fi];
    let cuerpo;
    if (!n.frResp) {
      cuerpo = `<p class="pregunta">¿Esta frase cuida o hiere?</p>
        <div class="mv">
          <button class="estado verdad" data-accion="frase" data-valor="cuida">${ic('heart')} Cuida</button>
          <button class="estado mito" data-accion="frase" data-valor="hiere">${ic('heart-crack')} Hiere</button>
        </div>`;
    } else {
      const bien = n.frResp === f.r;
      const ultimo = n.fi === FRASES2.length - 1;
      const veredicto = `${ic(bien ? 'circle-check' : 'lightbulb')} ${bien ? '¡Correcto!' : 'Mira de nuevo.'} Esta frase ${f.r === 'cuida' ? 'cuida' : 'hiere'}.`;
      if (n.fr2 === null || n.fr2 === undefined) {
        cuerpo = `<div class="resultado entra" role="status"><h3>${veredicto}</h3></div>
          <p class="pregunta"><span class="paso-n">Paso 2</span> ${f.paso2.q}</p>
          <div class="acciones2">${(n.ordenFr2 || []).map(k => `<button class="accion2" data-accion="frase2" data-valor="${k}"><span>${f.paso2.ops[k].t}</span></button>`).join('')}</div>`;
      } else {
        const op = f.paso2.ops[n.fr2], correcta = f.paso2.ops.find(x => x.ok);
        cuerpo = `<div class="resultado entra" role="status">
          <h3>${veredicto}</h3>
          <p class="sello ${op.ok ? 'cuidado' : 'riesgo'}" style="align-self:flex-start">${ic(op.ok ? 'circle-check' : 'circle-x')} ${op.ok ? 'Buena elección' : 'Esa no es la mejor opción'}</p>
          ${op.ok ? '' : `<p><strong>La mejor opción:</strong> ${correcta.t}</p>`}
          <p style="font-size:1.08rem">${f.e} ${escuchar(f.e)}</p>
        </div>
        <div class="derecha"><button class="btn btn-cancha" data-accion="siguiente-frase">${ultimo ? 'Ver mi lámina' : 'Siguiente'} ${ic('arrow-right')}</button></div>`;
      }
    }
    return `<div class="app">${barra('Frases que cuidan', 'vestuario')}
      <div class="pips" aria-hidden="true">${FRASES2.map((_, k) => `<span class="${k < n.fi ? 'ok' : k === n.fi ? 'ahora' : ''}"></span>`).join('')}</div>
      <div class="pila">
        <div class="afirmacion">${ic('quote', 'comillas')}<p>${f.t}</p>${escuchar(f.t, true, 'claro')}</div>
        <p class="etiqueta" style="align-self:flex-start">Frase ${n.fi + 1} de ${FRASES2.length}</p>
        ${cuerpo}
      </div>
    </div>`;
  },

  'n2-cierre'(){
    const n = state.n2;
    return `<div class="app">${barra('¡Nivel 2 completo!', 'vestuario')}
      <div class="pila">
        <div class="cierre">
          <div class="lamina${n.laminaVista ? ' quieta' : ''}" role="img" aria-label="Lámina 2: Detective del recreo">
            <span class="numl">LÁMINA 02</span>
            <span class="icono-l">${ic('search')}</span>
            <h3>Detective del recreo</h3>
            <p>Reconozco y rechazo la exclusión. Ayudo a quien la vive.</p>
          </div>
          <div class="pila">
            <p style="font-size:1.15rem">Ganaste tu segunda lámina. Quedó pegada en tu álbum del vestuario.</p>
            <div class="datos">
              <div class="dato"><b>5 de 5</b><span>situaciones resueltas</span></div>
              <div class="dato"><b>${n.buenos.length} de 3</b><span>buenos ejemplos encontrados</span></div>
              <div class="dato"><b>${n.frasesOk} de ${FRASES2.length}</b><span>frases que cuidan</span></div>
            </div>
          </div>
        </div>
        <section class="tarjeta pila" style="gap:12px">
          <h3 style="font-size:1.25rem">¿Cómo te fue reconociendo cuando alguien es excluido?</h3>
          <div class="autoeval">${Object.entries(AUTOEVAL2).map(([k, v]) => `<button data-accion="autoeval2" data-valor="${k}" aria-pressed="${n.autoeval === k}">${v.txt}</button>`).join('')}</div>
          ${n.autoeval ? `<p role="status" class="entra">${AUTOEVAL2[n.autoeval].msg}</p>` : ''}
        </section>
        <div class="cuaderno">${ic('notebook-pen')}<p><strong>Para tu cuaderno:</strong> escribe o dibuja una forma de incluir a alguien en el recreo y una frase que cuide que puedas decir mañana.</p></div>
        <div class="fila">
          <button class="btn btn-cancha" data-accion="ir" data-valor="vestuario">${ic('house')} Volver al vestuario</button>
          <button class="btn" data-accion="empezar-n2">${ic('rotate-ccw')} Jugar de nuevo</button>
        </div>
      </div>
    </div>`;
  }
});

const AUTOEVAL2 = {
  ayuda:{txt:'Necesito ayuda', msg:'Gracias por decirlo. Repasen juntos con tu profesor una de las situaciones del patio.'},
  cuesta:{txt:'Todavía me cuesta', msg:'Está bien: fijarse en cómo se sienten los demás se aprende practicando. Mañana en el recreo, mira a tu alrededor.'},
  bien:{txt:'Voy bien', msg:'¡Vas muy bien! Recuerda que ayudar puede ser algo pequeño: invitar, acompañar o pedir ayuda.'},
  explicar:{txt:'Se lo puedo explicar a otros', msg:'¡Genial! Cuéntale a un compañero qué harías tú en una de las situaciones.'}
};

let temporizadorPista = null;
Object.assign(acciones, {
  'empezar-n2'(){ state.n2 = nuevoN2(); state.screen = 'n2-buscar'; },
  escena(id){
    const n = state.n2;
    if (n.activo && CASOS2[n.activo] && n.fase !== 'cierre') { n.pista = 'Termina primero el caso que tienes abierto.'; return; }
    n.pista = ''; n.pistaEscena = null;
    if (CASOS2[id]) {
      if (n.encontrados.includes(id)) { n.activo = null; n.pista = 'Esta situación ya la resolviste. Busca otra.'; return; }
      n.encontrados.push(id); n.activo = id; n.fase = 'sentir'; n.sentimiento = null; n.accionesVistas = []; n.aciertoAccion = false; n.ordenAcc = mezclar(CASOS2[id].acciones.map((_, k) => k));
    } else if (BUENOS2[id]) {
      if (!n.buenos.includes(id)) n.buenos.push(id);
      n.activo = id; n.fase = null;
    }
    state.desplazar = 'panel-caso';
  },
  sentir(v){
    const n = state.n2;
    if (n.fase !== 'sentir') return;
    if (v === 'feliz') { n.pista = `Mira su cara y lo que le están diciendo. ¿Alguien se sentiría feliz en esa situación?`; n.sacudir = 'sentir'; return; }
    n.pista = ''; n.sentimiento = v; n.fase = 'actuar';
  },
  actuar(v){
    const n = state.n2, c = CASOS2[n.activo], k = Number(v);
    if (!c || (n.fase !== 'actuar' && n.fase !== 'cierre')) return;
    if (!n.accionesVistas.includes(k)) n.accionesVistas.push(k);
    if (c.acciones[k].ok) { if (n.fase !== 'cierre') registrar('n2:' + n.activo, n.accionesVistas.length === 1); n.fase = 'cierre'; n.pista = ''; }
    else if (n.fase !== 'cierre') { n.pista = 'Esa opción no ayuda. Mira lo que pasaría y elige otra.'; }
  },
  'cerrar-caso'(){ const n = state.n2; n.activo = null; n.fase = null; n.pista = ''; state.desplazar = 'patio-marco'; },
  pista2(){
    const n = state.n2;
    const faltan = PROBLEMAS2.filter(id => !n.encontrados.includes(id));
    if (!faltan.length) { n.pista = 'Ya encontraste todas las situaciones.'; return; }
    n.pistaEscena = faltan[0]; n.pista = 'Mira donde brilla el círculo amarillo.';
    clearTimeout(temporizadorPista);
    temporizadorPista = setTimeout(() => { if (state.n2) { state.n2.pistaEscena = null; if (state.screen === 'n2-buscar') render(); } }, 3500);
  },
  'ir-frases'(){ state.screen = 'n2-frases'; },
  frase(v){ const n = state.n2; if (n.frResp) return; n.frResp = v; n.fr2 = null; n.ordenFr2 = mezclar(FRASES2[n.fi].paso2.ops.map((_, k) => k)); if (v === FRASES2[n.fi].r) n.frasesOk++; registrar('n2f:' + n.fi, v === FRASES2[n.fi].r); },
  frase2(v){ const n = state.n2; if (!n.frResp || (n.fr2 !== null && n.fr2 !== undefined)) return; n.fr2 = Number(v); if (FRASES2[n.fi].paso2.ops[n.fr2].ok) n.frases2Ok = (n.frases2Ok || 0) + 1; },
  'siguiente-frase'(){
    const n = state.n2;
    if (n.fi >= FRASES2.length - 1) { state.progreso.n2 = true; guardar(); contarPartida('n2'); state.screen = 'n2-cierre'; return; }
    n.fi++; n.frResp = null; n.fr2 = null;
  },
  autoeval2(v){ state.n2.autoeval = v; }
});
