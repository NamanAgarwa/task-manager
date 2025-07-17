# Task Manager API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

All protected endpoints require a valid JWT access token in the `Authorization: Bearer <token>` header. Refresh tokens are managed via httpOnly cookies.

### Signup

- **POST** `/auth/signup`
- **Body:**
  ```json
  { "name": "string", "email": "string", "password": "string (min 6)" }
  ```
- **Response:**
  ```json
  { "user": { "id": "...", "name": "...", "email": "..." }, "token": "<JWT>" }
  ```
- **Notes:** Sets a `refreshToken` httpOnly cookie.

### Login

- **POST** `/auth/login`
- **Body:**
  ```json
  { "email": "string", "password": "string" }
  ```
- **Response:**
  ```json
  { "user": { "id": "...", "name": "...", "email": "..." }, "token": "<JWT>" }
  ```
- **Notes:** Sets a `refreshToken` httpOnly cookie.

### Refresh Token

- **POST** `/auth/refresh`
- **Cookie:** `refreshToken`
- **Response:**
  ```json
  { "token": "<new JWT>" }
  ```

---

## Tasks

All endpoints below require authentication.

### Create Task

- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "dueDate": "YYYY-MM-DD",
    "priority": "High|Medium|Low"
  }
  ```
- **Response:** Task object

### Get All Tasks

- **GET** `/tasks`
- **Query Params:**
  - `status` ("completed"|"pending")
  - `search` (string)
  - `sortBy` (e.g. "dueDate", "priority")
  - `sortOrder` ("asc"|"desc")
  - `page` (number)
  - `limit` (number)
- **Response:**
  ```json
  { "tasks": [ ... ], "total": 42, "page": 1, "limit": 10 }
  ```

### Get Task by ID

- **GET** `/tasks/:id`
- **Response:** Task object

### Update Task

- **PUT** `/tasks/:id`
- **Body:** Any updatable fields (title, description, dueDate, priority, completed)
- **Response:** Updated task object

### Delete Task

- **DELETE** `/tasks/:id`
- **Response:** `{ "msg": "Task deleted" }`

### Analytics Dashboard

- **GET** `/tasks/analytics/dashboard`
- **Response:**
  ```json
  {
    "priorityDist": [ { "_id": "High", "count": 2 }, ... ],
    "completionRate": 75,
    "upcoming": [ { ...task }, ... ],
    "total": 10,
    "completed": 7
  }
  ```

---

## Error Handling

- Validation errors: `{ "errors": [ { "msg": "..." } ] }`
- Auth errors: `{ "msg": "..." }`
- Server errors: `{ "errors": [ { "msg": "Server error" } ] }`

---

## Models

### User

- `id`, `name`, `email`, `password (hashed)`, timestamps

### Task

- `id`, `title`, `description`, `dueDate`, `priority`, `completed`, `user`, timestamps

---

## **How to View Your API Doc in the Browser**

### **Option 1: Use [Swagger Editor Online](https://editor.swagger.io/)**

1. Open [https://editor.swagger.io/](https://editor.swagger.io/)
2. Click **File → Import File** and select your `Backend/swagger.yaml`
3. You’ll see a live, interactive API doc and can try out endpoints!

---

### **Option 2: Serve Swagger UI Locally**

You can add Swagger UI to your backend for a `/docs` route:

1. **Install Swagger UI Express:**

   ```bash
   cd Backend
   npm install swagger-ui-express yamljs
   ```

2. **Add to your `app.js`:**

   ```js
   const swaggerUi = require("swagger-ui-express");
   const YAML = require("yamljs");
   const swaggerDocument = YAML.load("./swagger.yaml");
   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   ```

3. **Restart your backend server.**
4. Open [http://localhost:5000/docs](http://localhost:5000/docs) in your browser.

---

**Let me know if you want me to add the Swagger UI integration code for you!**  
You can now have a beautiful, interactive API doc in your browser.
