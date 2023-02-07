# Gestion des actions effectuées par les bénévoles au sein d'un refuge de protection animale

## SOMMAIRE

 1. [Description du projet 📖](#-description-du-projet)
 2. [Choix techniques ⚙️](#%EF%B8%8F-les-choix-techniques)
 3. [Design 🎨](#-design)
 4. [Possibilité de déploiement 🏠](#-possibilité-de-déploiement)
 5. [Développement futur ➕](#-développement-futur-et-open-source)
 6. [Installation 🔧](#-installation)
 7. [Crédits 🙋](#crédits)


<details>
  <summary><h1>📖 Tout'O'Poils - Informations générales</h1></summary>
<h2>📖 DESCRIPTION DU PROJET</h2>

Ce projet a été construit autour d'un seul objectif, celui d’œuvrer pour la cause animale et de permettre l'accès du numérique aux associations qui en sont dépourvues, faute de moyens. Nous savons que le rôle du bénévole est primordial à l'existence de l'association mais aussi pour le bien-être de l'animal.

Ainsi, notre application permet d'organiser les missions des bénévoles sur le terrain et d'en avoir une traçabilité. Elle est accessible aux adhérents de l'association sous le statut bénévole ou administrateur. Selon le statut de chacun, l'utilisation des commandes sur le site n'est pas la même. Le site sera donc accessible par un identifiant de connexion.

Pour l'instant, il permet de tracer les promenades du chien et de tracer les visites des chatteries.

Par ailleurs, il est possible d'aller consulter une fiche d'identité du chien ou du chat qui comprend, son nom, son gabarit, son âge, son sexe mais également sa biographie et son emplacement. A chaque action menée, l'intervenant peut commenter la fiche et choisir 3 indications parmi bonne, moyenne et mauvaise, respectivement de couleurs, verte, orange et rouge, pour en indiquer son état.

En effet, le bénévole peut utiliser l'application web sur n'importe quel support car c'est une application Responsive. Dès qu'il a choisi sa mission, l'enregistrement est enclenché. La balade pour le chien ou la visite pour le chat, est datée, et classée de la plus récente à la plus ancienne, en plus d'être commentée. L'action se termine quand le bénévole clique sur le bouton ce qui permet de visualiser les animaux qui n'ont pas été sortis ou visités.

En ce qui concerne l'administrateur, il pourra visualiser tous les animaux et tous les utilisateurs, créer les utilisateurs et créer les fiches de chaque animal.

Enfin, il est possible à chacun de voir sa fiche « profile » avec toutes ses informations personnelles.

 
  <h2>⚙️ LES CHOIX TECHNIQUES</h2>
  
**Developer Experience & Gestionnaire de paquets:**
 - Yarn
 - ESLint
 - Prettier
 
**Front-end:**
 - React
 - Bootrap
 - React Router
 - Redux
 - Sass

**Back-end:**
- Express
- Prisma
- Joi
- Nodemailer
- SendInBlue

**Base de donnée:**
 - PostgreSQL

**Hébergement**
 - Front & back: Heroku
 - Base de données PostgreSQL: Render
 - Images: AWS S3



## 🎨 DESIGN
Le design choisi est attrayant par son côté coloré tablé sur celui de la maison mère en matière de la protection animale : la SPA. L'utilisation de **React Bootstrap** était donc une évidence car il était plus aisé d'utiliser des composants que l'on pouvait manipuler à volonté.

  

  

## 🏠 POSSIBILITÉ DE DÉPLOIEMENT

Pour l'heure, le projet est déployé sur Heroku, mais 2 solutions de déploiements sont possibles pour les associations afin de minimiser les coûts.

1.  Le déploiement en local (par exemple via Docker, etc)
2.  Le déploiement en cloud par l’antenne locale de l'association

  

  

## ➕ DÉVELOPPEMENT FUTUR ET OPEN SOURCE

L'application sera en open source pour que, ceux qui le souhaitent, puissent apporter une pierre à l'édifice.

Elle a été conçue de manière à faciliter des ajouts ou des modifications complémentaires à son utilisation. Des nouvelles missions peuvent être rajouter, des fonctionnalités pourront être installées pour en faciliter son usage et le rendre plus facile à utiliser... Tellement de possibilités... La seule limite à notre application, sera votre implication à faire avancer la cause animale.

Les associations peuvent aussi être pilote du projet en le mettant en application au sein de leur établissement. En le faisant évoluer, il pourrait s'adapter aux besoins spécifiques de chacun.

</details>
 




## 🔧 INSTALLATION
- Procédez à l'installation du back-end
- Clonez ce repo
- Créez et configurez un fichier **.env** à la racine du projet, un example est disponible dans le fichier __.env.exemple__
- Installez les dépendances avec la commande ``yarn``
- Lancez l'application avec la commande ``yarn start``

  

## 🙋CRÉDITS
Ce projet a vu le jour grâce à l'équipe de 5 personnes qui la compose :

-   Angélique PINCHON 
  [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) ](https://www.linkedin.com/in/angelique-pinchon-903641189/)


-   Bernard ARROUES
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ](https://github.com/ElBernie)


-   Luis GONÇALVES 
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ](https://github.com/tfptmaster)

-   Mathilde BORDEAU


-   Denise FONTANIER [![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ](https://github.com/Denden2022)
