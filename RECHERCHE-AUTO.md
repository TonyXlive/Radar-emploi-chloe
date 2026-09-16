# Recherche d'offres automatique — protocole quotidien

Mode d'emploi de la veille nocturne. Il est destiné à l'agent (Claude) qui tourne chaque
nuit à **2h du matin (heure de Paris)** via la Routine « Veille emploi Chloé », et sert
aussi de référence si la recherche doit être relancée à la main.

**C'est ce fichier qu'il faut modifier pour changer les critères de recherche.** La
routine le relit à chaque exécution : pas besoin de toucher à la routine elle-même pour
ajouter une ville, un type de poste ou une source.

## Objectif

Trouver chaque nuit les **nouvelles** offres correspondant au profil de Chloé
Pellat-Finet, les publier sur les deux supports (dépôt GitHub + Artifact), puis envoyer
un e-mail récapitulatif à **plltchloe@gmail.com**.

## Budget de temps — règle opérationnelle

Une exécution passée est restée bloquée plus d'une heure en voulant tout vérifier d'un
coup. Pour éviter que ça se reproduise :

- **15 minutes** pour une exécution complète (recherche + vérification + publication).
- **12 à 15 sources maximum** par passage, en **rotation** : changer de cibles chaque
  nuit et indiquer dans le récapitulatif celles couvertes ce jour-là. Il y aura un
  nouveau passage demain — mieux vaut un petit lot bien vérifié qu'un blocage.
- Une page lente, en erreur, ou un portail qui ne répond pas : **abandonner
  immédiatement**, ne jamais réessayer, passer à la source suivante.
- **Ne jamais appeler un outil de connecteur qui demande une autorisation manuelle**
  (`mcp__Indeed__*` notamment) : une exécution précédente est restée bloquée des heures
  en attente d'une validation que personne ne pouvait donner à 2h du matin. La recherche
  se fait avec **WebSearch et WebFetch uniquement**. Seule exception : l'envoi de
  l'e-mail final via Gmail, qui est la dernière étape — s'il bloque, plus rien n'est en
  attente derrière.

## Profil recherché

- **Poste visé** : chef / cheffe de projet R&D en industrie pharmaceutique
  (développement, LCM, affaires médicales). Ouverte aussi au **marketing** (chef de
  produit / product manager santé), aux **études cliniques** et aux **missions de
  conseil** pour l'industrie pharma / biotech / medtech / diagnostic in vitro.
- **Niveau** : Master + ~2 ans d'expérience. Ni junior/stage, ni poste de direction
  demandant 8-10 ans. Au-delà de ~5 ans d'expérience exigée, écarter.
- **Situation** : Chloé est **en poste** (consultante Capgemini Engineering, en mission
  chez Servier à Saclay). Ce n'est pas une recherche d'urgence : elle cherche sa
  prochaine mission, notamment pour se rapprocher de la région lyonnaise. Elle peut donc
  se permettre d'être sélective.
- **Aucun employeur exclu** : Capgemini (son employeur) et Servier (son client actuel)
  peuvent être proposés si un poste dans la zone cible s'ouvre chez eux.
- Le parcours complet est dans le bloc `<script type="application/json" id="cv-data">`
  d'`index.html` — le lire avant de juger la pertinence d'une offre.

## Zone géographique

- **`proche`** : région lyonnaise, région grenobloise, et l'axe entre les deux —
  Bourgoin-Jallieu, La Tour-du-Pin, Les Abrets, Voiron, L'Isle-d'Abeau, Villefontaine,
  Saint-Quentin-Fallavier.
- **`remote`** : télétravail 100 %, n'importe où en France.
- Une offre vraiment intéressante mais hors zone (Paris, autre région) peut être
  signalée en **`verify`**, en précisant clairement la localisation dans `reason`.

## Rémunération

Pas de plancher donné par Chloé. Hypothèse de travail : **38 000 € brut annuel minimum**
(cohérent avec Master + ~2 ans en gestion de projet R&D pharma en Auvergne-Rhône-Alpes).
Une offre en dessous n'est pas exclue si le poste est excellent par ailleurs : dans ce
cas `salaryWarn: true` et le dire dans `reason`. Salaire non communiqué :
`salary: "Non communiqué"`, sans `salaryWarn`.

## Sources

**A) Job boards** : LinkedIn (via WebSearch), Welcome to the Jungle, HelloWork, APEC,
Cadremploi, Indeed (via WebSearch, pas via le connecteur), Jobijoba, Glassdoor, Wizbii.

**B) Entreprises cibles** — liste donnée par Chloé (labos, biotech et medtech ayant des
sites ou filiales en Auvergne-Rhône-Alpes). **En faire tourner 12-15 par nuit**, avec des
requêtes du type `"<entreprise>" recrutement Lyon OR Grenoble 2026` :

Viatris, Charles River, Eurofins, Novo Nordisk, Aguettant, LSI, Patheon/ThermoFisher
Scientific, Arrow, bioMérieux, Boiron, Laboratoire Théa, Boehringer Ingelheim, Delpharm,
Pfizer, Johnson & Johnson, GSK, Novartis, Merck, Roche, AstraZeneca, Sanofi, Bayer,
Sandoz, Ethypharm, Skyepharma, Pierre Fabre, Moderna, UPSA, Lilly, MaaT Pharma, MSD,
Janssen, Servier, Biogaran, LFB, Catalent, Gilead, Netri, Urgo, Ipsen, Abbott, Biocodex,
Cevidra, Myriad Genetics, BMS, Fresenius (Medical Care / Kabi), Amgen, Becton Dickinson,
LEEM, B. Braun, Takeda, Dômes Pharma, Menarini, Seqens, Expanscience, Provepharm,
Stryker, Arthrex, Juvisé, Otsuka, Oséus Médical, Mélisana Pharma, Septodont, NAOS,
OM Pharma, AbbVie, Zentiva, Advanced Accelerator Applications, Kéa Ylios, Recipharm,
SATT Conectus, genOway, Alcimed, Groupe Lépine, Adocia, Fareva, Capgemini Engineering.

> **Portails Workday** (Viatris, Roche, Merck/EMD) : rendus en JavaScript, illisibles par
> WebFetch. Passer par `site:<tenant>.myworkdayjobs.com Lyon` (ou Grenoble) en WebSearch.
> Ne jamais tenter l'API interne `/wday/cxs/...` : elle exige un POST, un GET échoue
> systématiquement et fait perdre du temps.

**C) Cabinets spécialisés** : Fed Pharma, Uptoo, Michael Page (santé/pharma), Hays Life
Sciences, Alten, Akkodis, Adecco Medical & Science.

**Mots-clés** : « chef de projet R&D pharma », « project manager pharmaceutique »,
« chargé d'études cliniques », « chef de produit santé », « affaires médicales »,
« consultant industrie pharmaceutique », « PMO pharma », « LCM ».

## Règles de sélection

1. **Vérification obligatoire mais bornée.** Énormément d'annonces remontent dans les
   moteurs alors qu'elles sont **déjà expirées** (dépubliées, « candidatures plus
   acceptées », 404/410, vieille annonce encore indexée). Pour chaque offre envisagée,
   ouvrir la page avec WebFetch — **une seule tentative** — et confirmer qu'elle est
   encore ouverte. Page morte, douteuse, ou WebFetch qui échoue : ne pas l'ajouter,
   passer à la suivante sans réessayer.
2. **Jamais de doublon** : une offre déjà présente (même id, même URL, ou même couple
   entreprise + intitulé) ne doit pas être réajoutée, même republiée ailleurs. Le script
   d'ajout filtre ces cas, mais autant ne pas perdre de temps à les analyser.
3. **Jamais d'offre inventée.** Chaque offre a une URL réelle et vérifiée. Si le
   descriptif n'a pas pu être lu (portail JavaScript, page expirée), l'offre part
   obligatoirement en catégorie `verify`, avec dans `reason` la mention explicite de ce
   qui n'a pas pu être vérifié.
4. **Ne jamais toucher aux offres déjà présentes**, ni à leur champ `applied` : c'est
   l'historique et les cases cochées par Chloé. Les perdre serait très gênant.
5. **Pas d'enjolivement** : `reason` dit honnêtement pourquoi l'offre correspond *et* ce
   qui cloche (expérience trop élevée, métier à côté, déplacements, secteur limitrophe…).
   C'est ce qui rend le site utile.
6. **Maximum 5 nouvelles offres par nuit.** Zéro est un résultat parfaitement valide :
   mieux vaut ne rien ajouter que de remplir le site de bruit.
7. Écarter les annonces d'agences d'intérim sans employeur identifiable.

## Catégories (champ `category`)

| Valeur   | Signification                                                            |
|----------|--------------------------------------------------------------------------|
| `proche` | Lyon, Grenoble ou l'axe entre les deux, et bon match métier.             |
| `remote` | Full télétravail.                                                        |
| `verify` | Offre plausible mais non vérifiable directement, ou hors zone — à confirmer. |
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

CDI en priorité ; CDD long et missions de conseil acceptés.

## Les deux supports de publication

Les offres vivent dans un bloc `<script type="application/json" id="state-data">` à
l'intérieur d'un `index.html` autonome. Ce fichier existe en **deux exemplaires**, et les
nouvelles offres vont dans les deux :

1. **Le dépôt GitHub** `tonyxlive/radar-emploi-chloe`, branche `main`, publié par GitHub
   Pages sur https://tonyxlive.github.io/Radar-emploi-chloe/ — c'est l'archive durable.
2. **L'Artifact** https://claude.ai/code/artifact/69ec8aa5-b4cd-464a-802e-30ec05150b4f —
   c'est la version que Chloé utilise au quotidien, la seule où ses cases « postulé »
   sont réellement enregistrées.

Les deux exemplaires divergent forcément sur le champ `applied` : c'est normal et sans
importance, tant qu'on n'y touche jamais.

`index.html` fait plus de 400 ko (la bibliothèque PDF y est embarquée, sans elle les
boutons CV cassent) : **ne jamais l'éditer à la main**, toujours passer par
`tools/ajouter-offres.mjs`, qui insère, dédoublonne et met `lastUpdated` à jour sans
toucher au reste du fichier.

## Déroulé d'une exécution

```bash
git pull origin main                          # repartir du site à jour
node tools/verifier-offres.mjs                # état de départ + offres déjà publiées
# … recherche, puis rédaction des offres retenues dans /tmp/nouvelles-offres.json …

# 1. dépôt GitHub
node tools/ajouter-offres.mjs /tmp/nouvelles-offres.json
node tools/verifier-offres.mjs                # doit afficher ✓ avant tout commit
git add index.html && git commit -m "Recherche du AAAA-MM-JJ : N nouvelle(s) offre(s)"
git push -u origin main

# 2. Artifact (le script marche aussi sur le HTML téléchargé de l'artifact)
node tools/ajouter-offres.mjs /tmp/nouvelles-offres.json /chemin/vers/artifact.html
node tools/verifier-offres.mjs /chemin/vers/artifact.html
```

Pour republier l'Artifact : outil `Artifact`, action `publish`, `file_path` vers le HTML
modifié, `url` = l'URL de l'artifact ci-dessus, et **obligatoirement**
`title="Radar Emploi R&D Pharma"` — sans ce paramètre la page est renommée d'après le nom
du fichier local dans la galerie de Chloé. Ne pas passer `capabilities` (déjà déclarées :
artifact, sample, downloads ; les omettre les conserve) ni `favicon`.

Si aucune offre n'est retenue : ne rien commiter et ne rien republier (pas de commit
vide, pas de bump de `lastUpdated` pour faire joli).

## E-mail récapitulatif

Envoyé à **plltchloe@gmail.com** à la fin de chaque recherche, en français, en la
tutoyant, et **dans tous les cas** — même une nuit sans rien :

- objet : `Radar Emploi — recherche du JJ/MM : N nouvelle(s) offre(s)`
- une entrée par offre ajoutée : intitulé, entreprise, ville, contrat, salaire, lien
  cliquable, et une ou deux phrases sur le match et le bémol ;
- **le lien vers l'Artifact** (voir plus haut) — c'est sa version, celle où ses cases
  « postulé » sont enregistrées. Ne pas lui présenter le lien GitHub Pages comme
  l'endroit où son suivi est gardé : sur cette version-là, les cases cochées sont
  perdues au rechargement ;
- les sources/entreprises couvertes cette nuit (pour qu'elle voie la rotation) ;
- si rien n'a été trouvé : une phrase, sans dramatiser — c'est normal, il y a un nouveau
  passage demain.
