# Rendu Fullstack - Weeb

Application fullstack avec:
- frontend React + Vite
- backend Django + Django REST Framework
- authentification JWT hybride (access token en memoire, refresh token en cookie HttpOnly)

## Sommaire
- [Architecture globale](#architecture-globale)
- [Architecture frontend](#architecture-frontend)
- [Architecture backend](#architecture-backend)
- [Flux dauthentification](#flux-dauthentification)
- [Installation et lancement](#installation-et-lancement)
- [Endpoints API](#endpoints-api)
- [Routes frontend](#routes-frontend)
- [Configuration utile](#configuration-utile)
- [Notes de securite](#notes-de-securite)

## Architecture globale

Le projet est separe en deux dossiers:
- `frontend/`: SPA React (routing, UI, appels API)
- `backend/`: API REST Django (users, blog, auth JWT, permissions)

Communication:
- Frontend -> Backend via HTTP (`/api/...`)
- CORS autorise pour `http://localhost:5173` et `http://127.0.0.1:5173`
- Cookies actives (`withCredentials: true`) pour gerer le refresh token HttpOnly

## Architecture frontend

Stack:
- React 19
- React Router
- Axios
- Tailwind CSS
- Vite

Structure principale (`frontend/src`):
- `main.jsx`: bootstrap React + `BrowserRouter`
- `App.jsx`: layout global (`Nav`, routes pages, `Footer`)
- `pages/`: pages (`Home`, `Blog`, `Login`, `Signup`, `PasswordReset...`)
- `components/`: composants UI reutilisables + route guard
- `api/axios.js`: client HTTP central + interceptors auth

Responsabilites cle:
- `api/axios.js`
  - conserve laccess token en memoire (`setAccessToken`, `clearAccessToken`)
  - ajoute `Authorization: Bearer ...` hors endpoints auth
  - sur `401`, tente `POST /api/token/refresh/`, rejoue la requete en succes
  - si refresh echoue: purge le token et emet `auth-logout`
- `components/Nav.jsx`
  - synchronise letat auth via `users/me/`
  - ecoute les evenements `auth-change` et `auth-logout`
  - logout via `POST /api/token/logout/`
- `components/ProtectedRoute.jsx`
  - protege les routes privees via verification `GET /api/users/me/`

## Architecture backend

Stack:
- Django 5
- Django REST Framework
- SimpleJWT
- django-cors-headers
- SQLite (dev)

Structure principale (`backend`):
- `config/`: settings, urls
- `users/`: inscription, profil courant, auth JWT cookie, reset password
- `blog/`: CRUD posts via ViewSet DRF + endpoint dedition

Comportement important:
- inscription via `users/register/` cree un utilisateur `is_active=False`
- API reset password basee sur email + lien frontend
- endpoint custom `POST /api/blog/posts/<id>/edit/` pour edition partielle

## Flux dauthentification

Strategie:
- access token: memoire frontend uniquement
- refresh token: cookie HttpOnly backend (`refresh_token`)

Cycle:
1. login `POST /api/token/`
2. backend renvoie `access` + pose le cookie refresh
3. front utilise `access` pour les routes protegees
4. a expiration access: interceptor Axios appelle `POST /api/token/refresh/`
5. backend lit le cookie refresh et renvoie un nouvel access
6. logout `POST /api/token/logout/` supprime le cookie refresh

## Installation et lancement

Prerequis:
- Node.js / npm
- Python 3

Backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Adresses:
- backend: `http://127.0.0.1:8000`
- frontend: `http://localhost:5173`

## Endpoints API

### Auth

- `POST /api/token/`
  - body: `{ "email": "...", "password": "..." }`
  - reponse 200: `{ "access": "<jwt>" }` + cookie HttpOnly `refresh_token`
- `POST /api/token/refresh/`
  - body: vide
  - lit le cookie refresh et renvoie un nouvel access
  - reponse 200: `{ "access": "<jwt>" }`
- `POST /api/token/logout/`
  - supprime le cookie refresh
  - reponse 204

### Users

- `POST /api/users/register/`
  - body: `{ "first_name", "last_name", "email", "password" }`
  - cree un compte inactif (`is_active=False`)
- `GET /api/users/me/`
  - auth requise
  - reponse: `{ "id", "first_name", "last_name", "email" }`
- `POST /api/users/password-reset/`
  - body: `{ "email": "..." }`
  - envoie un lien de reset vers `${FRONTEND_BASE_URL}/reset-password/<uid>/<token>`
- `POST /api/users/password-reset/confirm/`
  - body: `{ "uid": "...", "token": "...", "password": "..." }`
  - met a jour le mot de passe si le token est valide

### Blog

- `GET /api/blog/posts/`: liste des articles (public)
- `POST /api/blog/posts/`: creation dun article (auth requise)
- `GET /api/blog/posts/<id>/`: detail article (public)
- `PUT /api/blog/posts/<id>/`: edition complete (auteur uniquement)
- `PATCH /api/blog/posts/<id>/`: edition partielle (auteur uniquement)
- `DELETE /api/blog/posts/<id>/`: suppression (auteur uniquement)
- `POST /api/blog/posts/<id>/edit/`: edition partielle utilisee par le frontend (auteur uniquement)

Format article:
`{ "id", "author", "author_name", "title", "content", "created_at", "updated_at" }`

## Routes frontend

- `/`: accueil
- `/blog`: liste des articles
- `/blog/:id`: detail article + edition auteur
- `/add-article`: creation article (protege)
- `/login`: connexion
- `/signup`: inscription
- `/reset-password`: demande de reset
- `/reset-password/:uid/:token`: confirmation du nouveau mot de passe
- `/about`, `/contact`

## Configuration utile

Parametres backend actuels:
- `FRONTEND_BASE_URL = "http://localhost:5173"`
- `EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"` (dev)
- `DEFAULT_FROM_EMAIL = "no-reply@weeb.local"`
- `SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = 2 minutes`
- `SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"] = 5 minutes`
- `JWT_REFRESH_COOKIE_PATH = "/api/token/"`
- `JWT_REFRESH_COOKIE_SAMESITE = "Lax"`
- `JWT_REFRESH_COOKIE_SECURE = not DEBUG`

## Notes de securite

- le refresh token est HttpOnly (non accessible en JS)
- aucun token stocke dans `localStorage`
- `CORS_ALLOW_CREDENTIALS = True` est requis pour les cookies cross-origin
- en production:
  - activer HTTPS
  - conserver `JWT_REFRESH_COOKIE_SECURE = True`
  - durcir `ALLOWED_HOSTS`, CORS et CSRF
  - remplacer le backend email console par un provider SMTP/API
