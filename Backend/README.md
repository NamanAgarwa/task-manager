# Task Manager Backend

This is the backend for the MERN Task Manager app, providing a secure RESTful API for user authentication, task management, and analytics. Built with Node.js, Express, and MongoDB.

## Features

- JWT authentication with httpOnly refresh tokens
- User registration and login
- Task CRUD (Create, Read, Update, Delete)
- Task analytics (priority distribution, completion rate, upcoming deadlines)
- Pagination, filtering, sorting, and search for tasks
- Secure CORS, Helmet, and cookie handling
- **Swagger UI** for live API documentation at `/docs`
- MVC architecture (controllers, models, routes, middleware, config)
- Input validation with express-validator
- Error handling middleware
- Password hashing with bcrypt
- MongoDB aggregation for analytics

## Tech Stack

- Node.js, Express.js
- MongoDB & Mongoose
- JWT, bcryptjs
- dotenv, cookie-parser, helmet, cors
- swagger-ui-express, yamljs

## How to Run

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation

```bash
cd Backend
npm install
```

### Environment Variables

Create a `.env` file in the `Backend` directory with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=5000
```

### Running the Server

```bash
npm start
# or
node server.js
```

The server will run on `http://localhost:5000` by default.

### API Documentation (Swagger UI)

- After starting the server, open [http://localhost:5000/docs](http://localhost:5000/docs) in your browser for interactive API docs.

## Folder Structure

- `app.js` — Main Express app setup
- `server.js` — Entry point
- `routes/` — API route definitions
- `controllers/` — Request handlers
- `models/` — Mongoose schemas
- `middleware/` — Auth and other middleware
- `config/` — Database connection

## Evaluation Criteria Mapping

- **Functionality:** All CRUD, analytics, filtering, search, and authentication features implemented.
- **Code Quality:** MVC structure, clear separation of concerns, reusable code, comments, and documentation.
- **Backend Implementation:** MongoDB with Mongoose, JWT security, bcrypt, Helmet, CORS, express-validator, error handling.
- **Analytical Dashboard:** Real-time analytics via MongoDB aggregation, exposed via `/tasks/analytics/dashboard`.
- **API Documentation:** Swagger UI at `/docs` and OpenAPI spec (`swagger.yaml`).
- **Creativity/Innovations:**
  - JWT refresh with httpOnly cookies for seamless login
  - Swagger UI for live, interactive API docs
  - MongoDB aggregation for analytics
  - Secure, modern backend best practices

## API Documentation

See [API_DOC.md](./API_DOC.md) and [Swagger UI](http://localhost:5000/docs) for full endpoint documentation.
