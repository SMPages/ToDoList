const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Configuración básica
app.use(cors());
app.use(bodyParser.json());

// Inicializa la base de datos y crea la tabla si no existe
const db = new sqlite3.Database('./todos.db', (err) => {
    if (err) {
        console.error('No se pudo conectar a la base de datos:', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Obtener todas las tareas
app.get('/api/todos', (req, res) => {
    db.all('SELECT * FROM todos ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Crear una nueva tarea
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: 'El título es requerido' });
        return;
    }

    db.run('INSERT INTO todos (title) VALUES (?)', [title], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            title,
            completed: false,
            created_at: new Date().toISOString()
        });
    });
});

// Marcar como completada o no una tarea
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarea actualizada' });
    });
});

// Eliminar una tarea
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarea eliminada' });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}); 