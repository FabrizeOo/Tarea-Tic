# ToDo App

Aplicación web simple de tareas hecha en JavaScript vanilla, sin backend ni base de datos. Las tareas se guardan en `localStorage` del navegador para que sea fácil de desplegar y usar.

## Estructura

```text
TAREA/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── README.md
└── .gitignore
```

## Características

- Crear tareas
- Marcar como completadas
- Eliminar tareas
- Persistencia en el navegador usando `localStorage`
- Fácil despliegue estático

## Ejecutar el proyecto

Solo abre el archivo `frontend/index.html` en el navegador, o usa un servidor estático simple como:

```bash
cd frontend
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## CI/CD

El archivo `.github/workflows/ci-cd.yml` está preparado para validaciones del repositorio y despliegue sencillo.
