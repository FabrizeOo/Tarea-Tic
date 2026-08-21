const db = require('../config/db');

const getAllTodos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO todos (title, completed) VALUES (?, ?)',
      [title.trim(), false]
    );

    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title.trim());
    }

    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(Boolean(completed));
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No se enviaron cambios válidos' });
    }

    values.push(id);
    await db.query(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`, values);

    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
