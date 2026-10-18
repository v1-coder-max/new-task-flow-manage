# ✅ TaskFlow

A task manager where every user signs up, signs in and sees **only their own tasks**.

**Stack:** Node.js · Express · Prisma 5.22.0 · MySQL · JWT · bcryptjs · Vanilla HTML/CSS/JS

## Features
- Sign up / sign in with JWT, bcrypt password hashing, brute-force protection
- Create, edit, delete tasks · pending → in progress → done workflow
- Priority, due dates, overdue highlighting
- Search, filter, sort, pagination · personal stats

## Run locally
```bash
# MySQL
CREATE DATABASE taskmanager_auth_db;

cd backend
cp .env.example .env          # Windows: copy .env.example .env  → then add your MySQL password
npm install
npx prisma migrate dev        # Mac error? prefix: NODE_OPTIONS=--no-experimental-fetch
npm run dev
```
Open http://localhost:3000

## Deploy (Render + Aiven MySQL)
| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Start command | `npm start` |
| Health check path | `/api/health` |

Environment variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV=production`, `TRUST_PROXY=1`

`npm start` runs `prisma migrate deploy` (creates/updates tables) and then starts the server.

## API
| Method | URL | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Logged in |
| GET | /api/tasks | Logged in |
| GET | /api/tasks/stats | Logged in |
| GET / PATCH / DELETE | /api/tasks/:id | Owner only |
| POST | /api/tasks | Logged in |
