# TheLootStop - Final Project 1

A full-stack game top-up and digital item shop built with Django (backend) and React (frontend).

## Tech Stack

- Backend: Django, Django REST Framework, SQLite
- Frontend: React, React Router, React Bootstrap
- Auth: Token-based authentication
- Extras: 2FA support, profile image upload, admin dashboard

## Project Structure

```
Final-Project-1/
├── backend/                 # Django project
│   ├── manage.py
│   ├── backend/             # Django settings/urls/wsgi
│   └── products/            # App models, views, serializers, routes
├── frontend/                # React app
│   ├── src/
│   └── package.json
├── requirements.txt
└── package.json             # Root convenience scripts
```

## Prerequisites

- Python 3.11+ (recommended)
- Node.js 18+ and npm

## Setup

### 1) Clone and enter project

```bash
git clone <your-repo-url>
cd Final-Project-1
```

### 2) Backend setup (Django)

```bash
python -m venv .venv
```

Activate virtual environment:

- Windows (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

- Windows (CMD):

```cmd
.venv\Scripts\activate.bat
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
py backend/manage.py migrate
```

Optional: create admin user

```bash
py backend/manage.py createsuperuser
```

### 3) Frontend setup (React)

From the project root:

```bash
npm run install:frontend
```

## Running the App

### Option A: Run both from root (recommended)

```bash
npm run dev
```

### Option B: Run separately

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

## Default URLs

- Frontend: http://localhost:3000
- Backend API: http://127.0.0.1:8000
- Django Admin: http://127.0.0.1:8000/admin

## Main Features

- User signup/login/logout
- Profile page with avatar upload
- Product browsing and purchase flow
- Inventory and transaction history
- Time-based filtering for transactions
- 2FA setup and quick verification screens
- Admin dashboard with order/revenue stats

## Common Issues

### PowerShell blocks npm scripts

If you get execution policy errors (for `npm`), use `npm.cmd` in tasks/terminal or run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### `react-scripts` is not recognized

Install frontend dependencies first:

```bash
npm --prefix frontend install
```

## Useful Commands

- Django tests:

```bash
py backend/manage.py test
```

- React tests:

```bash
npm --prefix frontend test
```

- React production build:

```bash
npm --prefix frontend run build
```

## Notes

- Development currently uses SQLite (`backend/db.sqlite3`).
- Local storage is also used in parts of the frontend for temporary state.


