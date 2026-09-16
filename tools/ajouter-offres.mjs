#!/usr/bin/env node
// Ajoute des offres au site sans éditer index.html à la main.
// Usage : node tools/ajouter-offres.mjs nouvelles-offres.json [index.html]
// Le fichier JSON contient un tableau d'offres (même schéma que le bloc state-data).
// Les doublons (id, url, ou couple entreprise+intitulé déjà présent) sont ignorés.
import { readFileSync } from "node:fs";
import { lireState, ecrireState, cle, urlNormalisee } from "./offres.mjs";

const [fichierOffres, fichierHtml = "index.html"] = process.argv.slice(2);
if (!fichierOffres) {
  console.error("Usage : node tools/ajouter-offres.mjs nouvelles-offres.json [index.html]");
  process.exit(2);
}

const nouvelles = JSON.parse(readFileSync(fichierOffres, "utf8"));
if (!Array.isArray(nouvelles)) {
  console.error("Le fichier doit contenir un tableau JSON d'offres.");
  process.exit(2);
}

const ctx = lireState(fichierHtml);
const state = ctx.state;
const ids = new Set(state.offers.map((o) => o.id));
const urls = new Set(state.offers.map(urlNormalisee));
const cles = new Set(state.offers.map(cle));

const ajoutees = [];
const ignorees = [];
for (const o of nouvelles) {
  if (ids.has(o.id) || urls.has(urlNormalisee(o)) || cles.has(cle(o))) {
    ignorees.push(`${o.company} — ${o.title}`);
    continue;
  }
  ids.add(o.id); urls.add(urlNormalisee(o)); cles.add(cle(o));
  state.offers.push({ applied: false, salaryWarn: false, ...o });
  ajoutees.push(`${o.company} — ${o.title}`);
}

state.lastUpdated = new Date().toISOString().slice(0, 10);
ecrireState(fichierHtml, ctx, state);

console.log(`Ajoutées : ${ajoutees.length}`);
for (const a of ajoutees) console.log("  + " + a);
if (ignorees.length) {
  console.log(`Ignorées (déjà présentes) : ${ignorees.length}`);
  for (const i of ignorees) console.log("  = " + i);
}
console.log(`lastUpdated → ${state.lastUpdated}`);
