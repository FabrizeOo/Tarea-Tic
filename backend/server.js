require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/db');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.initializeDatabase();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/todos', todoRoutes);

    app.get('/health', async (req, res) => {
      try {
        await db.query('SELECT 1');
        res.status(200).json({ status: 'ok', message: 'Backend funcionando correctamente' });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'No se pudo conectar a la base de datos' });
      }
    });

    const staticPath = path.join(__dirname, '..', 'frontend');
    app.use(express.static(staticPath));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }

      res.sendFile(path.join(staticPath, 'index.html'));
    });

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1);
  }
}

startServer();
