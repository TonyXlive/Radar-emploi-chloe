# Radar Emploi — R&D Pharma (Chloé)

Ce dépôt contient le site "Radar Emploi R&D Pharma" : une page qui liste des offres d'emploi présélectionnées (R&D pharma, PMO, LCM, missions de conseil...) avec génération automatique de CV et lettre de motivation en PDF adaptés à chaque offre.

## Voir le site

Une fois GitHub Pages activé sur ce dépôt (voir plus bas), le site est accessible à une adresse du type :

`https://<ton-nom-utilisateur-github>.github.io/<nom-du-depot>/`

## Recherche automatique

Une recherche d'offres tourne **tous les jours à 2h du matin (heure de Paris)**. Elle balaie les sites d'emploi et les portails carrières en rotation, vérifie que chaque annonce est encore ouverte, ne garde que ce qui correspond au profil, puis publie les nouvelles offres sur les **deux** supports — ce dépôt (branche `main`, republiée par GitHub Pages) et l'Artifact claude.ai que Chloé utilise au quotidien — et lui envoie un e-mail récapitulatif.

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

Puis commit + push : GitHub Pages se met à jour en 1-2 minutes.

## Important

- Aucune donnée n'est envoyée nulle part depuis la page : tout tourne dans le navigateur de la personne qui la consulte.
- Les cases « candidature envoyée » cochées sur le site ne sont enregistrées que si la page est ouverte comme Artifact ; sur GitHub Pages, elles sont perdues au rechargement.
