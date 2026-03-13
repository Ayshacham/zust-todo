# Zust Todo App

Full-stack todo app with **Next.js** (frontend), **Django REST API** (backend), and **Supabase** (auth + PostgreSQL).

## Tech Stack

| Layer | Stack |
|-------|--------|
| Frontend | Next.js 16, React 19, Tailwind CSS, Supabase Auth |
| Backend | Django 5, Django REST Framework |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase JWT (validated by Django) |

## Project Structure

```
├── backend/           # Django REST API
│   ├── manage.py
│   ├── todo/          # Project config
│   ├── tasks/         # Todo app (models, viewsets, auth)
│   └── run.sh
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/
└── supabase/          # DB migrations, local config
```

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** (pnpm recommended)
- **Supabase CLI** (for local dev)
- **Docker** (for local Supabase)

## Quick Start

### 1. Supabase (local)

```bash
supabase start
```

Note the output: `API URL`, `anon key`, `service_role key`, and `DB` connection string.

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` (or `.env.local`):

```env
# Supabase (from `supabase status`)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SECRET_KEY=<service_role key>

# PostgreSQL (from `supabase status` DB URL)
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=54322
```

Run migrations (Django creates its own tables; app schema comes from Supabase):

```bash
python manage.py migrate
python manage.py runserver
```

API: **http://127.0.0.1:8000**

### 3. Frontend

```bash
cd frontend
pnpm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_...
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

```bash
pnpm dev
```

App: **http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/lists/` | List / create todo lists |
| GET/PUT/PATCH/DELETE | `/api/lists/{id}/` | Single list |
| GET/POST | `/api/todos/` | List / create todos (`?list={id}`) |
| GET/PUT/PATCH/DELETE | `/api/todos/{id}/` | Single todo |

All endpoints require `Authorization: Bearer <supabase_jwt>`.

## Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `./run.sh` | `backend/` | Run Django server (uses venv) |
| `pnpm dev` | `frontend/` | Next.js dev server |
| `pnpm build` | `frontend/` | Production build |
| `supabase start` | root | Start local Supabase |
| `supabase stop` | root | Stop local Supabase |

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Supabase API URL |
| `SUPABASE_SECRET_KEY` | Yes | Service role key (for JWT validation) |
| `DB_NAME` | Yes | PostgreSQL database name |
| `DB_USER` | Yes | PostgreSQL user |
| `DB_PASSWORD` | Yes | PostgreSQL password |
| `DB_HOST` | Yes | PostgreSQL host |
| `DB_PORT` | Yes | PostgreSQL port |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `NEXT_PUBLIC_API_URL` | No | Backend API URL (default: `http://127.0.0.1:8000`) |

## Development

**Run both servers** (two terminals):

```bash
# Terminal 1: Backend
cd backend && ./run.sh

# Terminal 2: Frontend
cd frontend && pnpm dev
```

**Linting**

- Frontend: `pnpm lint` (ESLint)
- Backend: no lint config by default; consider adding `ruff` or `black`

**Create a user**  
Register via the frontend at `/register`, or use Supabase Auth UI. The backend validates JWTs from Supabase.

## Troubleshooting

**"Could not reach auth server"**  
- Ensure Supabase is running (`supabase start`)
- Check `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in backend `.env`

**Database connection errors**  
- Run `supabase start` and use the DB URL from `supabase status`
- Ensure `DB_PORT` is `54322` for local Supabase

**"table already exists" during migrate**  
- Schema is managed by Supabase migrations. Run `python manage.py migrate --fake-initial`

**CORS errors**  
- Backend allows `localhost:3000` and `127.0.0.1:3000` by default
- For other origins, add to `CORS_ALLOWED_ORIGINS` in `backend/todo/settings.py`

**Frontend can't reach API**  
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Restart the Next.js dev server after changing env vars
