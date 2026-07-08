# EVD File Management

A React + TypeScript admin application for managing documents in the EVD (File Management) module.

## Features

- Document listing
- Search documents
- Filter by category and status
- Server-side pagination
- Create document
- Inline editing
- Delete document
- CSV bulk import (Web Worker)
- Role-based permissions (Admin / Staff)
- Internationalization (i18n)
- Responsive UI with DaisyUI
- Redux Thunk state management
- Mock REST API using json-server

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux
- Redux Thunk
- Axios
- Tailwind CSS v4
- DaisyUI
- i18next
- React i18next
- json-server

---

## Requirements

- Node.js 18+
- npm 9+

---

## Installation

Clone the repository.

```bash
git clone https://github.com/tuanlearningIT/evd-file-management.git

cd evd-file-management
```

Install dependencies.

```bash
npm install
```

---

## Available Scripts

### Start Development

Runs both the React application and the mock REST API.

```bash
npm run start
```

React

```
http://localhost:5173
```

Mock API

```
http://localhost:3001
```

---

### Start React Only

```bash
npm run dev
```

---

### Start Mock API Only

```bash
npm run mock
```

---

### Build

```bash
npm run build
```

---

### Preview Production Build

```bash
npm run preview
```

---

### Lint

```bash
npm run lint
```

---

## Mock API

The project uses **json-server**.

Database file:

```
db.json
```

Base URL

```
http://localhost:3001
```

Example endpoints

```
GET    /documents
POST   /documents
PUT    /documents/:id
DELETE /documents/:id
```

Example request

```
GET /documents?_page=1&perPage=10
```

Search

```
GET /documents?q=react
```

Filter

```
GET /documents?status=ACTIVE
```

```
GET /documents?category=IT
```

---

## CSV Import

Supported format

```csv
code,title,category,status,createdBy
DOC001,React Guide,IT,ACTIVE,ADMIN
DOC002,Employee Policy,HR,ACTIVE,STAFF
DOC003,Financial Report,Finance,INACTIVE,ADMIN
```

Features

- Background parsing using Web Worker
- Import progress indicator
- Invalid row validation
- Skip invalid records

---

## User Roles

### ADMIN

- View documents
- Search documents
- Filter documents
- Create documents
- Update documents
- Delete documents
- Import CSV

### STAFF

- View documents
- Search documents
- Filter documents
- Create documents
- Import CSV

---

## License

This project was developed as part of a Frontend React coding assessment.
