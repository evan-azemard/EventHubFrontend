# Structure du Projet EventHub Frontend

## 📋 Vue d'ensemble
Ce document décrit l'architecture du projet EventHub Frontend, une application React + TypeScript + Vite avec une architecture modulaire.

## 🏗️ Architecture Générale

```
eventhub_frontend/
├── public/                    # Assets publics statiques
├── src/                       # Code source principal
│   ├── App.css
│   ├── App.tsx               # Composant racine de l'application
│   ├── index.css             # Styles globaux
│   ├── main.tsx              # Point d'entrée de l'application
│   ├── assets/               # Assets (images, fonts, etc.)
│   └── modules/              # Modules fonctionnels de l'application
│       ├── app/              # Module principal de l'application
│       ├── login/            # Module d'authentification
│       ├── profile/          # Module de gestion du profil utilisateur
│       ├── register/         # Module d'inscription
│       ├── store/            # Configuration Redux et state management
│       └── testing/          # Configuration des tests
├── eslint.config.js          # Configuration ESLint
├── index.html                # Template HTML principal
├── package.json              # Dépendances et scripts npm
├── pnpm-lock.yaml           # Lock file pnpm
├── README.md                # Documentation du projet
├── tsconfig.app.json        # Configuration TypeScript pour l'app
├── tsconfig.json            # Configuration TypeScript de base
├── tsconfig.node.json       # Configuration TypeScript pour Node
└── vite.config.ts           # Configuration Vite
```

## 📦 Architecture Modulaire

Chaque module suit une structure cohérente basée sur les principes de séparation des préoccupations:

### Module Login (Authentification)
```
src/modules/login/
├── __tests__/                # Tests unitaires du module
│   ├── login.slice.test.ts  # Tests du slice Redux
│   └── login.test.tsx       # Tests des composants
├── components/               # Composants React
│   ├── pages/
│   │   └── Login.tsx        # Page de connexion
│   └── sections/
│       └── LoginForm.tsx    # Formulaire de connexion
├── core/                     # Logique métier et state management
│   └── auth.slice.ts        # Redux slice pour l'authentification
├── hooks/                    # Custom React hooks
│   └── useLoginForm.ts      # Hook pour la gestion du formulaire
└── utils/                    # Utilitaires spécifiques au module
```

### Module Profile (Gestion du profil)
```
src/modules/profile/
├── __tests__/                # Tests unitaires du module
│   ├── profile.slice.test.ts # Tests du slice Redux (à renommer)
│   └── profile.test.tsx      # Tests des composants (à renommer)
├── components/               # Composants React
│   ├── pages/
│   │   └── Profile.tsx       # Page du profil (à renommer depuis Login.tsx)
│   └── sections/
│       └── ProfileForm.tsx   # Formulaire du profil (à renommer depuis LoginForm.tsx)
├── core/                     # Logique métier et state management
│   └── profile.slice.ts      # Redux slice pour le profil (à renommer depuis auth.slice.ts)
├── hooks/                    # Custom React hooks
│   └── useProfileForm.ts     # Hook pour la gestion du formulaire (à renommer depuis useLoginForm.ts)
└── utils/                    # Utilitaires spécifiques au module
```

### Module Register (Inscription)
```
src/modules/register/
├── __tests__/                # Tests unitaires du module
│   ├── register.slice.test.ts # Tests du slice Redux (à renommer)
│   └── register.test.tsx      # Tests des composants (à renommer)
├── components/               # Composants React
│   ├── pages/
│   │   └── Register.tsx       # Page d'inscription (à renommer depuis Login.tsx)
│   └── sections/
│       └── RegisterForm.tsx   # Formulaire d'inscription (à renommer depuis LoginForm.tsx)
├── core/                     # Logique métier et state management
│   └── register.slice.ts      # Redux slice pour l'inscription (à renommer depuis auth.slice.ts)
├── hooks/                    # Custom React hooks
│   └── useRegisterForm.ts     # Hook pour la gestion du formulaire (à renommer depuis useLoginForm.ts)
└── utils/                    # Utilitaires spécifiques au module
```

### Module App (Application principale)
```
src/modules/app/
├── main.ts                   # Point d'entrée du module app
└── components/
    ├── AppWrapper.tsx        # Wrapper principal de l'application
    └── Layout.tsx            # Layout de base de l'application
```

### Module Store (State Management)
```
src/modules/store/
├── dependencies.ts           # Gestion des dépendances Redux
└── store.ts                  # Configuration du store Redux
```

### Module Testing (Configuration des tests)
```
src/modules/testing/
└── test-environements.ts    # Configuration de l'environnement de test
```

## 🎯 Conventions de Nommage

### Fichiers de Composants
- **Pages**: `NomDuModule.tsx` (ex: `Login.tsx`, `Profile.tsx`, `Register.tsx`)
- **Sections**: `NomDuModuleForm.tsx` (ex: `LoginForm.tsx`, `ProfileForm.tsx`, `RegisterForm.tsx`)

### Fichiers de Logique
- **Redux Slices**: `nomDuModule.slice.ts` (ex: `auth.slice.ts`, `profile.slice.ts`, `register.slice.ts`)
- **Hooks**: `useNomDuModuleForm.ts` (ex: `useLoginForm.ts`, `useProfileForm.ts`, `useRegisterForm.ts`)

### Fichiers de Tests
- **Tests de Slices**: `nomDuModule.slice.test.ts`
- **Tests de Composants**: `nomDuModule.test.tsx`

## 🔄 Actions de Refactoring Nécessaires

### Fichiers à Renommer dans le Module Profile
- ❌ `__tests__/login.slice.test.ts` → ✅ `__tests__/profile.slice.test.ts`
- ❌ `__tests__/login.test.tsx` → ✅ `__tests__/profile.test.tsx`
- ❌ `components/pages/Login.tsx` → ✅ `components/pages/Profile.tsx`
- ❌ `components/sections/LoginForm.tsx` → ✅ `components/sections/ProfileForm.tsx`
- ❌ `core/auth.slice.ts` → ✅ `core/profile.slice.ts`
- ❌ `hooks/useLoginForm.ts` → ✅ `hooks/useProfileForm.ts`

### Fichiers à Renommer dans le Module Register
- ❌ `__tests__/login.slice.test.ts` → ✅ `__tests__/register.slice.test.ts`
- ❌ `__tests__/login.test.tsx` → ✅ `__tests__/register.test.tsx`
- ❌ `components/pages/Login.tsx` → ✅ `components/pages/Register.tsx`
- ❌ `components/sections/LoginForm.tsx` → ✅ `components/sections/RegisterForm.tsx`
- ❌ `core/auth.slice.ts` → ✅ `core/register.slice.ts`
- ❌ `hooks/useLoginForm.ts` → ✅ `hooks/useRegisterForm.ts`

## 🛠️ Stack Technique

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Testing**: Jest / Vitest (à confirmer)

## 📝 Notes

- Les modules `profile` et `register` contiennent actuellement des fichiers dupliqués du module `login` suite à une duplication historique du module `auth`
- Un refactoring est nécessaire pour renommer ces fichiers selon les conventions du projet
- Chaque module maintient son propre slice Redux pour une séparation claire des préoccupations

---

*Document généré le 19 décembre 2025*
