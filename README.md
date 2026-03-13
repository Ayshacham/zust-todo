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
