#!/usr/bin/env node
// Vérifie que le bloc d'offres d'index.html est valide avant de commiter.
// Usage : node tools/verifier-offres.mjs [index.html]
import { lireState, cle, urlNormalisee, CATEGORIES, CHAMPS_REQUIS } from "./offres.mjs";

const fichier = process.argv[2] || "index.html";
const erreurs = [];
const { state } = lireState(fichier);

if (!/^\d{4}-\d{2}-\d{2}$/.test(state.lastUpdated || "")) {
  erreurs.push(`lastUpdated invalide : ${JSON.stringify(state.lastUpdated)} (attendu AAAA-MM-JJ)`);
}
if (!Array.isArray(state.offers)) erreurs.push("offers doit être un tableau");

const vus = { id: new Map(), url: new Map(), cle: new Map() };
for (const [i, o] of (state.offers || []).entries()) {
  const ref = `offre #${i + 1} (${o.id || "sans id"})`;
  for (const champ of CHAMPS_REQUIS) {
    if (o[champ] === undefined || o[champ] === null || o[champ] === "") erreurs.push(`${ref} : champ « ${champ} » manquant`);
  }
  if (!CATEGORIES.includes(o.category)) erreurs.push(`${ref} : category « ${o.category} » inconnue (attendu : ${CATEGORIES.join(", ")})`);
  if (typeof o.applied !== "boolean") erreurs.push(`${ref} : applied doit être un booléen`);
  if (typeof o.salaryWarn !== "boolean") erreurs.push(`${ref} : salaryWarn doit être un booléen`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(o.dateAdded || "")) erreurs.push(`${ref} : dateAdded invalide (attendu AAAA-MM-JJ)`);
  if (!/^https?:\/\//.test(o.url || "")) erreurs.push(`${ref} : url doit commencer par http(s)://`);

  for (const [nom, valeur] of [["id", o.id], ["url", urlNormalisee(o)], ["cle", cle(o)]]) {
    if (!valeur) continue;
    if (vus[nom].has(valeur)) erreurs.push(`${ref} : doublon (${nom}) avec l'offre « ${vus[nom].get(valeur)} »`);
    else vus[nom].set(valeur, o.id || ref);
  }
}

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) dans ${fichier} :`);
  for (const e of erreurs) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ ${fichier} : ${state.offers.length} offre(s), dernière recherche ${state.lastUpdated}`);
