# Expense Tracker

A polished full-stack expense tracker application built with React 19, Vite, Material UI, Express, and JSON file persistence. This project includes expense management, filtering, charts, CSV export, dark mode, responsive UI, and backend API support.

## Features

- Add, edit, and delete expenses
- Filter by category and date range
- Sort expenses by newest date first
- Dashboard summary of spending
- Bar and pie charts using Recharts
- CSV export endpoint and client export flow
- Dark mode toggle with localStorage persistence
- Responsive Material UI dashboard and list views
- Validation for expense amount, category, and date
- JSON file persistence across server restarts
- Express router, service/controller layers, validation middleware, and error handling

## Architecture

- `client/` - Vite-powered React application
  - `src/components/` - reusable UI components
  - `src/pages/` - page-level views
  - `src/services/` - API integration layer
  - `src/hooks/` - custom React hooks
  - `src/utils/` - helper functions
- `server/` - Express backend API
  - `controllers/` - request handling
  - `routes/` - API routing
  - `services/` - business logic and persistence
  - `middleware/` - validation and error handling
  - `data/expenses.json` - persisted expense data
  - `utils/` - file storage helpers

## Folder Structure

```
expense-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .gitignore
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── data/expenses.json
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## Setup Instructions

### Backend

1. Open a terminal in `expense-tracker/server`.
2. Run `npm install`.
3. Start the server:
   - `npm run dev` for development with `nodemon`
   - `npm start` for production mode

### Frontend

1. Open a terminal in `expense-tracker/client`.
2. Run `npm install`.
3. Start the frontend app:
   - `npm run dev`
4. Open the displayed local URL in your browser.

### Development Workflow

- Backend API: `http://localhost:4000/api`
- Frontend: `http://localhost:5173`

## Environment Variables

The frontend supports an optional API base URL:

- `VITE_API_BASE_URL` - custom backend API base path (default: `http://localhost:4000/api`)

The backend supports runtime configuration for development, CI, and deployment:

- `PORT` - Express port (default: `4000`)
- `CORS_ORIGIN` - comma-separated allowed origins for CORS (default: `*`)
- `DATA_FILE_PATH` - file path for JSON expense persistence (default: `./server/data/expenses.json`)

Example files are provided in the `client/` and `server/` folders.

## Testing

### Backend

From `expense-tracker/server`:

- `npm test` - run the Jest API test suite

## API Documentation

### GET /api/expenses

Return all expenses sorted by newest first.

### GET /api/expenses/:id

Return a single expense by ID.

### POST /api/expenses

Create a new expense.

Request body:

- `amount` (number)
- `category` (string)
- `date` (ISO date string)
- `note` (optional string)

### PUT /api/expenses/:id

Update an existing expense.

### DELETE /api/expenses/:id

Remove an expense by ID.

### GET /api/expenses/summary

Return dashboard totals and category aggregates.

### GET /api/expenses/export/csv

Download all expenses as a CSV file.

## Deployment Instructions

### Frontend: Vercel

1. Connect the `client` directory to Vercel.
2. Set the build command: `npm run build`.
3. Set the output directory: `dist`.
4. If the backend is hosted separately, configure `VITE_API_BASE_URL` in Vercel environment variables.

### Backend: Render

1. Create a new Web Service on Render.
2. Set the root to the `server` directory.
3. Use the build command: `npm install`.
4. Use the start command: `npm start`.
5. Ensure `PORT` is set by Render automatically.

## Future Improvements

- Add budget per category with warnings when exceeded
- Add user authentication and multi-user support
- Replace JSON persistence with a real database
- Add charts for monthly trends and category comparisons
- Improve performance with server-side paging and caching
- Add tests for frontend and backend logic
