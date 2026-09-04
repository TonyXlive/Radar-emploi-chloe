# Radar Emploi — R&D Pharma (Chloé)

Ce dépôt contient le site "Radar Emploi R&D Pharma" : une page qui liste des offres d'emploi présélectionnées (R&D pharma, PMO, LCM, missions de conseil...) avec génération automatique de CV et lettre de motivation en PDF adaptés à chaque offre.

## Voir le site

Une fois GitHub Pages activé sur ce dépôt (voir plus bas), le site est accessible à une adresse du type :

`https://<ton-nom-utilisateur-github>.github.io/<nom-du-depot>/`

## Mettre à jour les offres

Le contenu (liste des offres) est stocké dans le fichier `index.html`, dans un bloc `<script type="application/json" id="state-data">`. Pour ajouter/modifier une offre, il suffit d'éditer ce bloc JSON puis de pousser (commit + push) la nouvelle version — GitHub Pages se met à jour automatiquement en 1-2 minutes.

## Important

- Ce site ne se met PAS à jour tout seul (pas de recherche automatique d'offres pour l'instant). Il faut republier une nouvelle version d'`index.html` à chaque fois qu'on veut ajouter des offres.
- Aucune donnée n'est envoyée nulle part : tout tourne dans le navigateur de la personne qui consulte la page.
