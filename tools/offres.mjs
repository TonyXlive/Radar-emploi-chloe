// Lecture / écriture du bloc <script type="application/json" id="state-data"> d'index.html.
// Utilisé par verifier-offres.mjs et ajouter-offres.mjs pour ne jamais éditer à la main
// un fichier de 400 ko et risquer de casser le site.
import { readFileSync, writeFileSync } from "node:fs";

export const CATEGORIES = ["proche", "remote", "verify", "weak"];
export const CHAMPS_REQUIS = [
  "id", "category", "title", "company", "city", "contract",
  "salary", "salaryWarn", "reason", "dateAdded", "applied", "url"
];

const OUVERTURE = '<script type="application/json" id="state-data">';
const FERMETURE = "</scr" + "ipt>";

export function lireState(fichier) {
  const html = readFileSync(fichier, "utf8");
  const debut = html.indexOf(OUVERTURE);
  if (debut === -1) throw new Error("Bloc state-data introuvable dans " + fichier);
  const debutJson = debut + OUVERTURE.length;
  const fin = html.indexOf(FERMETURE, debutJson);
  if (fin === -1) throw new Error("Fin du bloc state-data introuvable dans " + fichier);
  return { html, debutJson, fin, state: JSON.parse(html.slice(debutJson, fin)) };
}

export function ecrireState(fichier, ctx, state) {
  const json = JSON.stringify(state, null, 2).replace(/</g, "\\u003c");
  writeFileSync(fichier, ctx.html.slice(0, ctx.debutJson) + json + ctx.html.slice(ctx.fin), "utf8");
}

// Deux offres sont considérées identiques si elles partagent l'id, l'URL,
// ou le couple (entreprise, intitulé) normalisé.
export function cle(offre) {
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  return norm(offre.company) + " | " + norm(offre.title);
}

export function urlNormalisee(offre) {
  return String(offre.url || "").replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase();
}
