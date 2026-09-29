# Radar Emploi — R&D Pharma (Chloé)

Ce dépôt contient le site "Radar Emploi R&D Pharma" : une page qui liste des offres d'emploi présélectionnées (R&D pharma, PMO, LCM, missions de conseil...) avec génération automatique de CV et lettre de motivation en PDF adaptés à chaque offre.

## Voir le site

Une fois GitHub Pages activé sur ce dépôt (voir plus bas), le site est accessible à une adresse du type :

`https://<ton-nom-utilisateur-github>.github.io/<nom-du-depot>/`

## Recherche automatique

Une recherche d'offres tourne **tous les jours à 2h du matin (heure de Paris)**. Elle balaie Indeed puis les autres sites d'emploi et portails carrières en rotation, vérifie que chaque annonce est encore ouverte, ne garde que ce qui correspond au profil, publie les nouvelles offres sur l'Artifact claude.ai que Chloé utilise au quotidien, et lui envoie un e-mail récapitulatif.

**Le site de ce dépôt n'est plus mis à jour par la veille.** La liste vivante est celle de l'Artifact, seule version où les cases « candidature envoyée » sont conservées. Ce dépôt garde le protocole et les scripts ; son `index.html` est un instantané.

Le protocole complet — profil visé, sources, règles de sélection, format des offres — est dans [`RECHERCHE-AUTO.md`](RECHERCHE-AUTO.md). C'est ce fichier qu'il faut modifier pour changer les critères de recherche (nouvelle ville, nouveau type de poste, source à ajouter).

Une nuit sans nouvelle offre est normale : rien n'est commité ce jour-là, et l'e-mail le dit.

## Mettre à jour les offres à la main

Le contenu (liste des offres) est stocké dans `index.html`, dans un bloc `<script type="application/json" id="state-data">`. Ce fichier fait plus de 400 ko : mieux vaut ne pas l'éditer à la main mais passer par les scripts fournis.

```bash
# ajouter une ou plusieurs offres décrites dans un tableau JSON
node tools/ajouter-offres.mjs mes-offres.json

# vérifier que tout est valide (schéma, catégories, doublons) avant de commiter
node tools/verifier-offres.mjs
```

Les scripts fonctionnent aussi bien sur le `index.html` du dépôt que sur le HTML téléchargé de l'Artifact : `node tools/ajouter-offres.mjs mes-offres.json /chemin/vers/artifact.html`.

## Important

- Aucune donnée n'est envoyée nulle part depuis la page : tout tourne dans le navigateur de la personne qui la consulte.
- Les cases « candidature envoyée » ne sont enregistrées que sur l'Artifact. Sur une copie servie en statique, elles sont perdues au rechargement.
