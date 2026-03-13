# Django Todo

## Structure

All backend code lives in `/backend`:

```
backend/
├── manage.py
├── todo/          # Django project config
├── tasks/         # Todo app
├── db.sqlite3
└── venv/
```

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # or `venv\Scripts\activate` on Windows
pip install django
python manage.py migrate
python manage.py runserver
```

## Run (after setup)

**Option 1 – use the run script (no activation needed):**
```bash
cd backend
./run.sh
```

**Option 2 – activate venv, then use `python` (not `python3`):**
```bash
cd backend
source venv/bin/activate   # macOS/Linux
python manage.py runserver   # use `python`, not `python3`
```
