import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const base = new URL(".", import.meta.url).pathname;
const nm = base + "node_modules/";

const icons = [
  "shield", "stethoscope", "apple", "id-card", "house", "heart-handshake", "book-open",
  "volleyball", "megaphone", "vote", "scale", "eye-off", "shield-check", "triangle-alert",
  "backpack", "school", "trees", "smartphone", "play", "arrow-left", "arrow-right", "check",
  "x", "lightbulb", "message-circle-question", "notebook-pen", "projector", "lock",
  "graduation-cap", "sparkles", "scan-line", "search", "handshake", "users-round", "sticker",
  "circle-check", "circle-x", "pencil", "info", "rotate-ccw", "minus", "plus", "chevron-right",
  "clipboard-check", "quote", "list-checks", "key-round", "heart", "heart-crack", "party-popper", "zoom-in", "wind", "hourglass", "ear", "message-circle", "hand-helping", "zap", "door-open", "laugh", "flame", "log-out", "trophy", "layers", "eye", "file-text", "volume-2", "pause", "shuffle", "timer", "clipboard-list", "chart-column", "download", "copy", "trash-2", "shield-alert", "alarm-clock"
];

const map = {};
for (const name of icons) {
  const svg = readFileSync(`${nm}lucide-static/icons/${name}.svg`, "utf8");
  const inner = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>"));
  map[name] = inner.replace(/\s*\n\s*/g, "").trim();
}

const font = (p) => readFileSync(nm + p).toString("base64");

let html = readFileSync(base + "src.html", "utf8");
html = html
  .replace("__FONT_LILITA__", font("@fontsource/lilita-one/files/lilita-one-latin-400-normal.woff2"))
  .replace("__FONT_ATK400__", font("@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2"))
  .replace("__FONT_ATK700__", font("@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2"))
  .replace("__ICONS_JSON__", () => JSON.stringify(map))
  .replace("__NIVEL2__", () => readFileSync(base + "nivel2.js", "utf8"))
  .replace("__NIVEL3__", () => readFileSync(base + "nivel3.js", "utf8"))
  .replace("__NIVEL4__", () => readFileSync(base + "nivel4.js", "utf8"))
  .replace("__DOCENTE__", () => readFileSync(base + "docente.js", "utf8"))
  .replace("__CASO__", () => readFileSync(base + "caso.js", "utf8"));

mkdirSync(base + "dist", { recursive: true });
writeFileSync(base + "dist/juego-limpio.html", html);
console.log("ok", (html.length / 1024).toFixed(0) + " KB");
