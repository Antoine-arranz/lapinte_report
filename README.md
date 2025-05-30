# Analyse de Commentaires Restaurant

Application web pour analyser les commentaires clients sur un restaurant en utilisant l'API Ollama (modèle mistral) pour extraire le ressenti sur différents critères (nourriture, service, ambiance, rapport qualité/prix).

## Structure du Projet

- `frontend/` : Application React/TypeScript
- `backend/` : API Node.js/Express/TypeScript

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Ollama en cours d'exécution sur http://localhost:11434 avec le modèle mistral

## Installation

1. Cloner le dépôt
2. Installer les dépendances du backend :
   ```bash
   cd backend
   npm install
   ```
3. Installer les dépendances du frontend :
   ```bash
   cd ../frontend
   npm install
   ```

## Démarrage

1. Lancer le backend :

   ```bash
   cd backend
   npm run dev
   ```

   L'API sera accessible à l'adresse [http://localhost:3001](http://localhost:3001).

2. Lancer le frontend :
   ```bash
   cd frontend
   npm start
   ```
   L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnalités

- Formulaire de saisie de commentaires
- Analyse de sentiment avec Ollama (modèle mistral)
- Affichage des résultats d'analyse (ressenti et explication pour chaque critère)
- Interface utilisateur moderne et responsive
- Validation des entrées
- Gestion des erreurs

## Technologies Utilisées

- Frontend :

  - React
  - TypeScript
  - CSS moderne

- Backend :
  - Node.js
  - Express
  - TypeScript
  - Zod (validation)
  - Axios (appels HTTP)

## Architecture

- Clean Architecture
- Séparation claire des responsabilités
- Code modulaire et maintenable
- Validation des données
- Gestion des erreurs
