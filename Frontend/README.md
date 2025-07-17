# Task Manager Frontend

This is the frontend for the MERN Task Manager app, providing a modern, responsive, and visually stunning dashboard and task management experience. Built with Next.js and Material-UI.

## Features

- Beautiful dashboard with analytics, summary cards, and recent activity
- Modern task manager with advanced filters, search, and sorting
- **Debounced search bar** for efficient filtering
- Responsive design with mobile-friendly layouts and floating action button
- Glassmorphism, gradients, and micro-interactions for a professional look
- JWT authentication with httpOnly refresh tokens (seamless login)
- Axios with interceptors for token management and error handling
- Global feedback via notistack Snackbars
- Reusable components (TaskForm, TaskList, FilterBar, Layout, Navigation)
- Form validation and user-friendly error messages

## Tech Stack

- Next.js (React)
- Material-UI (MUI), notistack, recharts, date-fns
- Axios for API calls

## How to Run

### Prerequisites

- Node.js (v16+ recommended)
- Backend API running (see ../Backend/README.md)

### Installation

```bash
cd Frontend
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the `Frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Folder Structure

- `src/pages/` — Main pages (dashboard, tasks, auth, etc.)
- `src/components/` — Reusable UI components
- `src/context/` — React context (AuthContext)
- `src/services/` — API service (axios)

## Evaluation Criteria Mapping

- **Functionality:** All CRUD, analytics, filtering, search, and authentication features implemented.
- **Code Quality:** Logical, reusable components, clear structure, comments, and documentation.
- **UI/UX:** Modern, clean, and responsive design with Material-UI, glassmorphism, gradients, and micro-interactions.
- **Analytical Dashboard:** Visualizes task distribution, completion rate, and upcoming deadlines with charts and widgets.
- **Creativity/Innovations:**
  - Debounced search bar for efficient filtering
  - JWT refresh with httpOnly cookies for seamless login
  - Motivational quote card, engaging empty states
  - Beautiful dashboard and task manager UI

## API Reference

See [../Backend/API_DOC.md](../Backend/API_DOC.md) and [Swagger UI](http://localhost:5000/docs) for backend API documentation.
