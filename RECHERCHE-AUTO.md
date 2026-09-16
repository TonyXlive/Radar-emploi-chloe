# Recherche d'offres automatique — protocole quotidien

Ce document est le mode d'emploi de la recherche nocturne. Il est destiné à l'agent
(Claude) qui tourne chaque nuit à **2h du matin (heure de Paris)** via une Routine
programmée, mais il sert aussi de référence si la recherche doit être relancée à la main.

## Objectif

Trouver chaque nuit les **nouvelles** offres d'emploi correspondant au profil de
Chloé Pellat-Finet, les ajouter au site (`index.html`), pousser sur `main` — GitHub Pages
republie tout seul — puis envoyer un e-mail récapitulatif à **plltchloe@gmail.com**.

## Profil recherché

- **Poste visé** : chef / cheffe de projet R&D en industrie pharmaceutique.
  Ouverte aussi au **marketing** (chef de produit, marketing produit santé),
  aux **affaires médicales**, aux **études cliniques** et aux **missions de conseil**
  pour l'industrie pharma / biotech / dispositif médical / diagnostic in vitro.
- **Expérience** : ~2 ans en poste (Capgemini Engineering depuis 10/2024, mission
  Servier comme Global R&D Project Manager) + stages Sanofi Pasteur, bioMérieux,
  ThermoFisher. Master Management des Industries Pharmaceutiques (IAE Lyon) +
  Licence Microbiologie (Lyon 1). Anglais courant.
- **Zone** : région lyonnaise, région grenobloise, ou entre les deux
  (Bourgoin-Jallieu, Villefranche, Vienne, Chambéry…). Le **full télétravail** est
  accepté quelle que soit la localisation du siège.
- **Contrat** : CDI en priorité ; CDD long et mission de conseil acceptés.
- Le détail complet du parcours est dans le bloc `<script type="application/json" id="cv-data">`
  d'`index.html` — le lire avant de juger la pertinence d'une offre.

## Sources à balayer

Indeed (outil MCP `search_jobs` quand il est disponible), HelloWork, Welcome to the
Jungle, APEC, LinkedIn Jobs, Jobijoba, Wizbii, Glassdoor, et les portails carrières
des employeurs de la région : Sanofi, bioMérieux, Boehringer Ingelheim, Servier,
Merck, Becton Dickinson, Groupe Lépine, genOway, Viatris, Alcimed, Delpharm,
Fareva, Aguettant, Adocia, Theradiag, Biomérieux, ThermoFisher, Capgemini
Engineering, Alten, Akkodis…

Mots-clés utiles : « chef de projet R&D pharma », « project manager pharmaceutique »,
« chargé d'études cliniques », « chef de produit santé », « affaires médicales »,
« consultant industrie pharmaceutique », « PMO pharma », « LCM ».

## Règles de sélection

1. **Une offre par nuit n'est pas un objectif.** Zéro offre est un résultat valide et
   normal : mieux vaut ne rien ajouter que de remplir le site de bruit.
2. **Jamais de doublon** : une offre déjà présente dans `index.html` (même id, même URL,
   ou même couple entreprise + intitulé) ne doit pas être réajoutée, même si elle a été
   republiée ailleurs. Le script d'ajout filtre ces cas, mais il faut aussi éviter de
   perdre du temps à les analyser.
3. **Jamais d'offre inventée.** Chaque offre doit avoir une URL réelle, ouverte et
   vérifiée pendant la recherche. Si la page n'a pas pu être lue (portail en JavaScript,
   page expirée), c'est possible de la garder mais **obligatoirement** en catégorie
   `verify`, avec dans `reason` la mention explicite de ce qui n'a pas pu être vérifié.
4. **Pas d'enjolivement** : le champ `reason` dit honnêtement pourquoi l'offre
   correspond *et* ce qui cloche (expérience demandée trop élevée, métier à côté,
   déplacements, secteur limitrophe…). C'est ce qui rend le site utile.
5. Écarter les offres qui demandent plus de ~5 ans d'expérience, les postes très
   éloignés géographiquement sans télétravail total, et les annonces d'agences
   d'intérim sans employeur identifiable.

## Catégories (champ `category`)

| Valeur   | Signification                                                        |
|----------|----------------------------------------------------------------------|
| `proche` | Lyon, Grenoble ou entre les deux, et bon match métier.               |
| `remote` | Full télétravail (peu importe où est le siège).                      |
| `verify` | Offre plausible mais non vérifiable directement — à confirmer.       |
| `weak`   | Match partiel : bon secteur ou bonne ville, mais métier/séniorité à côté. |

## Schéma d'une offre

```json
{
  "id": "entreprise-intitule-court-AAAAMMJJ",
  "category": "proche",
  "title": "Intitulé exact de l'annonce",
  "company": "Nom de l'entreprise",
  "city": "Ville (département)",
  "contract": "CDI",
  "salary": "45 000 - 55 000 € / an",
  "salaryWarn": false,
  "reason": "Pourquoi ça colle, et ce qui cloche.",
  "dateAdded": "AAAA-MM-JJ",
  "applied": false,
  "url": "https://…"
}
```

- `salary` : « Non communiqué » si l'annonce ne le dit pas.
- `salaryWarn` : `true` uniquement si le salaire affiché est nettement sous le marché.
- `applied` : toujours `false` à l'ajout (c'est Chloé qui coche sur le site).

## Déroulé d'une exécution

```bash
git pull origin main                          # toujours repartir du site à jour
node tools/verifier-offres.mjs                # état de départ + liste des offres existantes
# … recherche web / Indeed, rédaction des offres retenues dans /tmp/nouvelles-offres.json …
node tools/ajouter-offres.mjs /tmp/nouvelles-offres.json
node tools/verifier-offres.mjs                # doit afficher ✓ avant tout commit
git add index.html && git commit -m "Recherche du AAAA-MM-JJ : N nouvelle(s) offre(s)"
git push -u origin main
```

`index.html` fait plus de 400 ko (la bibliothèque PDF y est embarquée) : **ne jamais
l'éditer à la main**, toujours passer par `tools/ajouter-offres.mjs`, qui met aussi
`lastUpdated` à jour.

Si aucune offre n'est retenue : ne rien commiter (pas de commit vide, pas de bump de
`lastUpdated` pour faire joli) et l'indiquer dans l'e-mail.

## E-mail récapitulatif

Envoyé à **plltchloe@gmail.com** à la fin de chaque recherche, en français :

- objet : `Radar Emploi — recherche du JJ/MM : N nouvelle(s) offre(s)`
- une ligne par offre ajoutée : intitulé, entreprise, ville, catégorie, lien ;
- la raison courte du match ;
- le lien vers le site ;
- si rien n'a été trouvé : le dire en une phrase, avec les sources balayées.
