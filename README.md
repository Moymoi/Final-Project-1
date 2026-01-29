# TheLootStop

Django REST project for TheLootStop. Use this guide to set up, run, and collaborate as a team.

## Prerequisites
- Python 3.10+ (Django 5.2.x compatible)
- pip
- (Optional) Git for collaboration
- (Optional) SQLite installed by default; update DB settings if switching engines.

## Initial Setup
1. Clone the repo and move into the root (where `manage.py` and `requirements.txt` live).
2. Create and activate a virtual environment:
   - Windows: `python -m venv .venv && .\.venv\Scripts\activate`
   - macOS/Linux: `python -m venv .venv && source .venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`

## Environment Variables
Create a `.env` in the project root (same level as `manage.py`) and include at minimum:
```
DEBUG=True
SECRET_KEY=replace-me
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```
Add any additional keys for email, storage, or external APIs as needed.


## Database & Migrations
- Apply migrations: `python manage.py migrate`
- If you add models, create migrations before pushing: `python manage.py makemigrations` then `python manage.py migrate`

## Running the Project
- Start the dev server: `python manage.py runserver`
- Access locally at: http://127.0.0.1:8000/

- Start the frontend server: `npm start`

## If error " 'react-scripts' is not recognized " shows up
- If react-scripts is present in package.json, then just type this command: `npm install`
- If react-scripts is not present in package.json, then you probably haven't installed it. To do that, run: `npm install react-scripts --save`

## Admin Access
- Create a superuser for admin UI: `python manage.py createsuperuser`
- Log in at: http://127.0.0.1:8000/admin/

## Testing
- Run the test suite: `python manage.py test`
- For targeted apps/tests: `python manage.py test <app_label>`

## Static/Media (local)
- Collect static (if needed): `python manage.py collectstatic`
- Ensure media/static dirs are writable and configured in settings.

## Collaboration Guidelines
- Use feature branches: `feature/<issue-or-feature-name>`
- Pull latest main before branching: `git pull origin main`
- Run tests and migrations locally before opening a PR.
- If a migration is added, include the migration file in the PR and note schema changes in the PR description.
- Keep `.env` out of version control; share required keys via secure channels.
- Resolve merge conflicts in `requirements.txt` and migrations promptly; prefer regenerating the lockstep migrations if needed.

## Troubleshooting
- If dependencies fail, upgrade pip: `python -m pip install --upgrade pip`
- If migrations break, try: delete the local `db.sqlite3` (if safe) and rerun `migrate`.
- Verify the virtual environment is active when running any Django command.
- Git commit checklist:
  - Run `git status` to ensure files are tracked and staged.
  - Stage changes with `git add <files>` before `git commit`.
  - Set your identity if missing: `git config user.name "Your Name"` and `git config user.email "you@example.com"`.
  - Check for pre-commit hook failures; run linters/tests locally, fix, then retry.
  - If line-ending issues appear, set `git config core.autocrlf true` (Windows) or `input` (macOS/Linux) and restage.
  - Resolve merge conflicts before committing: `git status` will highlight conflicted files.
