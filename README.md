# EventHub Frontend

Application frontend pour EventHub, développée avec React, TypeScript et Vite.

## Architecture modulaire

Chaque module suit la même structure :

```
module/
├── __tests__/       # Tests unitaires du module
├── components/
│   ├── pages/       # Pages complètes (routes)
│   └── sections/    # Composants de sections (formulaires, listes...)
├── core/
│   ├── slice/       # État Redux (actions, reducers)
│   └── usecases/    # Logique métier (appels API, workflows)
├── hooks/           # Hooks React personnalisés
└── utils/           # Fonctions utilitaires
```

## Architecture du projet

```
src/
├── App.tsx                     # Routes principales
├── main.tsx                    # Point d'entrée
├── index.css                   # Styles globaux
│
└── modules/
    ├── app/                    # Module application
    │   ├── main.ts             # Initialisation (store, dependencies)
    │   └── components/
    │       ├── AppWrapper.tsx  # Provider Redux
    │       └── Layout.tsx      # Layout commun (header, container)
    │
    ├── store/                  # Configuration Redux
    │   ├── store.ts            # Configuration du store
    │   └── dependencies.ts     # Injection de dépendances
    │
    ├── auth/                   # Module authentification
    │   ├── __tests__/
    │   │   └── auth.test.ts
    │   └── core/
    │       └── slice/
    │           └── auth.slice.ts
    │
    ├── login/                  # Module connexion
    │   ├── __tests__/
    │   │   └── loginUI.test.ts
    │   ├── components/
    │   │   ├── pages/
    │   │   │   └── Login.tsx
    │   │   └── sections/
    │   │       └── LoginForm.tsx
    │   ├── core/
    │   │   ├── slice/
    │   │   │   └── loginUI.slice.ts
    │   │   └── usecases/
    │   │       └── login.usecase.ts
    │   └── hooks/
    │       └── useLoginForm.ts
    │
    ├── register/               # Module inscription
    │   ├── __tests__/
    │   │   └── registerUI.test.ts
    │   ├── components/
    │   │   ├── pages/
    │   │   │   └── Register.tsx
    │   │   └── sections/
    │   │       └── RegisterForm.tsx
    │   ├── core/
    │   │   ├── slice/
    │   │   │   └── registerUI.slice.ts
    │   │   └── usecases/
    │   │       └── register.usecase.ts
    │   ├── hooks/
    │   │   └── useRegisterForm.ts
    │   └── utils/
    │       └── passwordValidation.ts
    │
    ├── profile/                # Module profil
    │   ├── __tests__/
    │   │   └── profileUI.test.ts
    │   ├── components/
    │   │   ├── pages/
    │   │   │   └── Profile.tsx
    │   │   └── sections/
    │   │       └── ProfileForm.tsx
    │   ├── core/
    │   │   ├── slice/
    │   │   │   └── profileUI.slice.ts
    │   │   └── usecases/
    │   │       └── updateProfile.usecase.ts
    │   └── hooks/
    │       └── useProfileForm.ts
    │
    └── testing/                # Utilitaires de test
        └── test-environements.ts
```

## Installation

```bash
npm install
```

## Développement

Lancer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

## Tests

Lancer les tests :

```bash
npm test
```

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
