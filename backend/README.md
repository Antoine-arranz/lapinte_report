# Backend - API d'Analyse de Commentaires Restaurant

Cette API Node.js/Express permet d'analyser les commentaires clients sur un restaurant en utilisant l'API Ollama (modèle mistral) pour extraire le ressenti sur différents critères (nourriture, service, ambiance, rapport qualité/prix).

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Ollama en cours d'exécution sur http://localhost:11434 avec le modèle mistral

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```

## Démarrage

Pour lancer l'API en mode développement :

```bash
npm run dev
```

L'API sera accessible à l'adresse [http://localhost:3001](http://localhost:3001).

## Build

Pour créer une version de production :

```bash
npm run build
```

Pour démarrer la version de production :

```bash
npm start
```

## Structure du Projet

- `src/server.ts` : Point d'entrée de l'API avec l'endpoint `/api/analyze`
- `package.json` : Configuration du projet et des dépendances
- `tsconfig.json` : Configuration TypeScript

## Endpoints

### POST /api/analyze

Analyse un commentaire client et retourne le ressenti sur différents critères.

#### Requête

```json
{
  "comment": "Votre commentaire ici"
}
```

#### Réponse

```json
{
  "response": "Résultat de l'analyse par Ollama"
}
```

## Fonctionnalités

- Validation des entrées avec Zod
- Appel à l'API Ollama pour l'analyse de sentiment
- Gestion des erreurs
- CORS activé pour le frontend
