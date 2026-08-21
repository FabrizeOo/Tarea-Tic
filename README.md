# Consulta de DNI con API Peru / RENIEC

Aplicación frontend en JavaScript vanilla para consultar información de una persona por DNI usando la API de ApiPeru.

## Requisitos

- Navegador web moderno
- Token válido de ApiPeru

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

## API usada

La app consume esta URL:

```js
https://api.apiperu.dev/dni
```

Con el header:

```js
Authorization: Bearer TU_TOKEN
```

## Ejecutar localmente

Abre directamente el archivo HTML o usa un servidor estático:

```bash
cd frontend
python -m http.server 8000
```

Luego entra a:

```text
http://localhost:8000
```

## CI/CD

El workflow `.github/workflows/ci-cd.yml` valida el proyecto y publica la app como GitHub Pages.
