# Rendu Fullstack - Weeb

Application fullstack avec:
- un frontend React + Vite
- un backend Django + Django REST Framework
- une authentification JWT hybride (access token en memoire, refresh token en cookie HttpOnly)

## Sommaire
- [Architecture globale](#architecture-globale)
- [Architecture frontend](#architecture-frontend)
- [Architecture backend](#architecture-backend)
- [Flux d'authentification](#flux-dauthentification)
- [Installation et lancement](#installation-et-lancement)
- [Endpoints API principaux](#endpoints-api-principaux)
- [Notes de securite](#notes-de-securite)

## Architecture globale

Le projet est separe en deux dossiers:

- `frontend/`: SPA React (routage client, UI, appels API)
- `backend/`: API REST Django (users, blog, auth JWT, permissions)

Communication:
- Frontend -> Backend via HTTP (`/api/...`)
- CORS autorise pour `http://localhost:5173` et `http://127.0.0.1:5173`
- Envoi des cookies active (`withCredentials: true`) pour gerer le refresh token HttpOnly

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
- `pages/`: pages (`Home`, `Blog`, `Login`, `Signup`, etc.)
- `components/`: composants UI reutilisables
- `api/axios.js`: client HTTP central + interceptors auth

### Responsabilites cle frontend

- `api/axios.js`
  - conserve l'access token en memoire (`setAccessToken`, `clearAccessToken`)
  - ajoute `Authorization: Bearer ...` si token disponible
  - en cas de `401`, tente automatiquement `POST /api/token/refresh/`
  - si refresh echoue: purge l'access token et emet `auth-change`

- `pages/Login.jsx`
  - login via `POST /api/token/` (recoit `access`)
  - stocke l'access token en memoire
  - tente une restauration de session via refresh cookie au montage

- `components/Nav.jsx`
  - valide l'etat de session via `token/refresh` puis `users/me`
  - affiche `Connexion/Inscription` ou `Deconnexion`
  - logout via `POST /api/token/logout/`

## Architecture backend

Stack:
- Django 5
- Django REST Framework
- SimpleJWT
- django-cors-headers
- SQLite (dev)

Structure principale (`backend`):
- `config/`: settings, urls, asgi/wsgi
- `users/`: inscription + endpoint `me` + vues auth cookie
- `blog/`: CRUD posts via ViewSet DRF + permissions

### Apps

- `users`
  - `RegisterView`: inscription
  - `MeView`: utilisateur courant (`IsAuthenticated`)
  - `CookieTokenObtainPairView`: login (set refresh cookie + retourne access)
  - `CookieTokenRefreshView`: refresh depuis cookie HttpOnly
  - `LogoutView`: suppression cookie refresh

- `blog`
  - `PostViewSet` (ModelViewSet)
  - permissions: lecture publique, ecriture reservee aux utilisateurs auth,
    edition/suppression reservees a l'auteur

## Flux d'authentification

Strategie retenue: **hybride**
- Access token: memoire frontend uniquement
- Refresh token: cookie HttpOnly backend

Cycle:
1. Login `POST /api/token/`
2. Backend renvoie `access` + pose cookie `refresh_token` HttpOnly
3. Front utilise `access` pour les routes protegees
4. A expiration access: interceptor Axios appelle `POST /api/token/refresh/`
5. Backend lit le cookie refresh et renvoie un nouvel access
6. Logout `POST /api/token/logout/` supprime le cookie refresh

## Installation et lancement

## Prerequis
- Node.js / npm
- Python 3

## Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver
```

Backend disponible sur `http://127.0.0.1:8000`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible sur `http://localhost:5173`.

## Endpoints API principaux

Auth:
- `POST /api/token/` -> login (retourne `access`, set cookie refresh)
- `POST /api/token/refresh/` -> nouveau `access` via cookie refresh
- `POST /api/token/logout/` -> supprime cookie refresh

Users:
- `POST /api/users/register/` -> inscription
- `GET /api/users/me/` -> utilisateur connecte

Blog:
- `GET /api/blog/posts/` -> liste posts (public)
- `POST /api/blog/posts/` -> creation (auth requise)
- `PUT/PATCH/DELETE /api/blog/posts/<id>/` -> auteur uniquement

## Notes de securite

- Le refresh token est protege par `HttpOnly` (non accessible en JS)
- Le frontend n'utilise plus `localStorage` pour les tokens
- `CORS_ALLOW_CREDENTIALS = True` est requis pour le cookie cross-origin
- En production:
  - activer HTTPS
  - garder `JWT_REFRESH_COOKIE_SECURE = True`
  - durcir `ALLOWED_HOSTS`, CORS et CSRF
