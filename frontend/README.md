# weeb

Application front-end en React + Vite, avec TailwindCSS et React Router.  
Le projet propose une navigation simple (Accueil, Contact, Connexion) et un design modernisé grâce à Tailwind et des couleurs personnalisées.

## Stack technique

- **React 19**
- **Vite 7**
- **React Router 7** (navigation entre pages)
- **TailwindCSS 4** (thème customisé avec variables CSS)
- **Framer Motion** (animations)
- **ESLint** (linting et qualité du code)

## Structure actuelle

- **`App.jsx`** : point d’entrée avec le layout global (`Nav`, `Footer`, et routes).
- **`Nav.jsx`** : barre de navigation responsive, fixe en haut de la page.
- **Pages** :
  - `/` → **Home**
  - `/blog` → **Blog**
  - `/signup` → **Inscription**
  - `/contact` → **Contact**
  - `/login` → **Login**
- **`Footer.jsx`** : pied de page générique.

## Thème & design

Les couleurs et ombres sont définies via des variables CSS (`@theme`) :

- `--color-primary`: bleu nuit (`rgb(15, 25, 43)`)
- `--color-secondary`: violet (`rgb(192, 132, 252)`)
- `--color-secondaryFlashy`: violet flashy (`rgba(147, 51, 234, 1)`)
- Ombres personnalisées (`--shadow-custom-*`) pour ajouter de la profondeur aux composants.

La police est basée sur `system-ui, Avenir, Helvetica, Arial, sans-serif`.

## Fonctionnalités actuelles

- **Navbar fixe** avec menu burger responsive.
- **Formulaire de contact** avec champs Nom, Prénom, Email, Sujet, Message.
- **Page de connexion** avec champ mot de passe masqué/affiché (icône d’œil).
- **Routing** simple entre Home, Contact et Login.

## À faire

- Ajouter des **regex de validation** pour email et mot de passe.
- Mettre en place des règles de **sécurité sur les formulaires** (mot de passe fort, vérification côté client + côté serveur).

## Scripts

- `npm run dev` → lancer le serveur de dev
- `npm run build` → build de production
- `npm run preview` → aperçu du build

---

## Installation & démarrage

```bash
git clone <repo-url>
cd weeb
npm install
npm run dev
```

## Note de suivie :

https://docs.google.com/document/d/1CREQaJUHFudPGUSXa_jzw9DctSSE5YwpmFalti0hIx8/edit?usp=sharing
