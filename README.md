# MERN Task Manager

A full-stack task management application with advanced analytics, JWT authentication, and a modern, responsive UI. Built with **MongoDB, Express.js, React/Next.js, and Node.js**.

---

## Project Structure

```
ddregg/
  Backend/   # Node.js, Express, MongoDB REST API
  frontend/  # Next.js, Material-UI, modern dashboard UI
```

---

## Features

### Backend (Node.js, Express, MongoDB)

- **JWT authentication** with httpOnly refresh tokens
- User registration, login, and secure session management
- Task CRUD (Create, Read, Update, Delete)
- **Analytics:** priority distribution, completion rate, upcoming deadlines
- Filtering, sorting, pagination, and search for tasks
- **Swagger UI** for live API docs at `/docs`
- MVC architecture, input validation, error handling, password hashing
- MongoDB aggregation for analytics

### Frontend (Next.js, Material-UI)

- Beautiful dashboard: analytics, summary cards, recent activity
- Task manager: advanced filters, debounced search, sorting
- Responsive, mobile-friendly design with glassmorphism and gradients
- JWT authentication, seamless login with httpOnly refresh tokens
- Axios with interceptors for token refresh and error handling
- Global feedback via notistack Snackbars
- Reusable components and modern UI/UX

---

## Quick Start

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud)

---

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=5000
```

Start the backend server:

```bash
npm start
# or
node server.js
```

- API base URL: `http://localhost:5000/api`
- **Swagger UI:** [http://localhost:5000/docs](http://localhost:5000/docs)

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend app:

```bash
npm run dev
```

- App URL: [http://localhost:3000](http://localhost:3000)

---

## API Documentation

- **Interactive API docs:** [http://localhost:5000/docs](http://localhost:5000/docs) (Swagger UI)
- **Markdown reference:** [`Backend/API_DOC.md`](Backend/API_DOC.md)
- **OpenAPI spec:** [`Backend/swagger.yaml`](Backend/swagger.yaml)

---

## Folder Structure

- `Backend/` — Express app, routes, controllers, models, middleware, config, docs
- `frontend/` — Next.js app, pages, components, context, services

---

## Evaluation Criteria Mapping

- **Functionality:** All CRUD, analytics, filtering, search, and authentication features implemented
- **Code Quality:** MVC structure, reusable components, clear separation, documentation
- **UI/UX:** Modern, responsive, visually appealing dashboard and task manager
- **Backend:** Secure JWT, bcrypt, Helmet, CORS, express-validator, error handling
- **Analytics:** Real-time dashboard via MongoDB aggregation
- **API Docs:** Swagger UI and Markdown docs
- **Creativity:** Debounced search, JWT refresh, motivational/empty states, beautiful UI

---

## How to View API Docs

- **Swagger UI:** [http://localhost:5000/docs](http://localhost:5000/docs)
- **Swagger Editor:** Import `Backend/swagger.yaml` at [https://editor.swagger.io/](https://editor.swagger.io/)

---

## License

MIT
