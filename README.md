# ToDo App

Aplicación web simple de tareas con:
- Node.js + Express como backend
- JavaScript vanilla para el frontend
- MySQL como base de datos
- Estructura separada por carpetas: backend y frontend
- GitHub Actions para CI/CD

## Estructura

```text
TAREA/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   └── routes/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── README.md
```

## Requisitos

- Node.js 20+
- MySQL 8+
- GitHub repository conectado

## Configuración del backend

1. Entra a la carpeta backend.
2. Copia `.env.example` a `.env`.
3. Ajusta la configuración de MySQL.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=todo_app
```

## Base de datos MySQL

Ejecuta esta sentencia en MySQL:

```sql
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Ejecutar el proyecto

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

Abre `frontend/index.html` directamente en el navegador o usa un servidor estático simple.

## CI/CD

El archivo `.github/workflows/ci-cd.yml` está preparado para subirlo a GitHub y ejecutar validaciones automáticas.
