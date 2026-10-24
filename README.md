CrazyGAMES — Tableau de bord des commandes
Description du projet
CrazyGAMES: est une application frontend développée dans le cadre du **TP4**. Réalisée avec HTML, CSS et JavaScript, elle permet de consulter et d’analyser un tableau de bord de commandes de jeux vidéo.

L’application s’appuie sur trois fichiers JSON: customers.json, products.json et orders.json. Ces données sont chargées de manière asynchrone, stockées dans un état central, puis reliées entre elles grâce à leurs identifiants. Au-delà de l’affichage des données brutes, l’application calcule des informations dérivées, applique des filtres et met à jour dynamiquement l’interface grâce à une architecture modulaire.

Structure du projet
Le projet est organisé selon une séparation claire des responsabilités, avec des modules JavaScript utilisant: import et export:

tp4/
│
├── index.html         
├── play.png         
├── header.jpg
├── README.md
│
├── css/
│   └── style.css
│
├── data/
│   ├── customers.json
│   ├── products.json
│   └── orders.json
│
└── js/
    ├── app.js
    ├── state.js
    ├── dataService.js
    ├── selectors.js
    └── view.js
    
Fonctionnalités principales

-Chargement asynchrone des données: les trois fichiers JSON sont récupérés simultanément avec fetch() et Promise.all(). Le statut des réponses est vérifié et les erreurs sont gérées avec try/catch.
-Liaison des entités: les commandes sont associées à leurs clients et produits grâce aux identifiants et à la méthode find().
- Calculs automatiques :
  - montant de chaque ligne de commande : prix unitaire × quantité .
  - montant total de chaque commande : somme des lignes.
-Indicateurs clés: nombre total de commandes, nombre de commandes livrées, nombre de clients uniques et chiffre d’affaires global.
-Recherche et filtres combinables:
  - recherche par nom de client.
  - filtre par statut : "Livrée", "En attente" ou "Annulée".
  - filtre par catégorie de jeu, par exemple "Aventure" ou "Action-RPG".
-Modal de détails : le bouton "Voir" ouvre une fenêtre présentant l’identifiant de la commande, le client, sa ville, la date, le statut, le détail des produits et le montant total.
-Gestion des erreurs : si un fichier JSON ne peut pas être chargé, un message d’erreur clair s’affiche dans l’interface et l’erreur est également consignée dans la console.

Lancement du projet

  Important : 
   Le projet utilise des modules JavaScript ES6 ainsi que la fonction fetch(). Pour éviter les restrictions liées à la politique CORS, il doit être lancé à partir d’un serveur local. Ouvrir directement "index.html" dans le navigateur ne permettra pas de charger correctement les données.

*Option 1 — Live Server dans Visual Studio Code

1. Ouvrir le dossier du projet dans VS Code.  
2. Installer l’extension Live Server.  
3. Faire un clic droit sur "index.html".  
4. Sélectionner "Open with Live Server".

*Option 2 — Serveur Python

Depuis la racine du projet, exécuter :
  bash
python -m http.server 8000
Puis ouvrir l’adresse suivante dans le navigateur :
  text
http://localhost:8000
*Option 3 — Serveur Node.js
Depuis la racine du projet, exécuter :

   bash
npx serve .
Puis ouvrir le lien local affiché dans le terminal.

Technologies et méthodes utilisées
-HTML5 et CSS pour la structure et la mise en page.
- Bootstrap 5.3.8 pour les composants d’interface : tableau, boutons, badges et modal.
- JavaScript:
  - modules avec import et export.
  - programmation asynchrone avec async, await et Promise.all.
  - méthodes de tableau : find(), filter(), map() et forEach().
- JSON pour le stockage et l’échange des données.
- Git et GitHub pour le versionnement du code source.
