const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json())

// Prepared Statement to avoid vulnerabilities
const selectAllPets = {
    text: 'SELECT * FROM pet',
}

/* ROUTES */

// Get all Pets from db
app.get('/pets', async (req, res) => {
    const result = await pool.query(selectAllPets, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        return res.rows
    });

    console.log(result)
    res.set('Content-Type', 'application/json')
    res.end()
    await pool.end()
})

// POST the data
app.post('/pets', async (req, res) => {
    const { name, age, kind } = req.body

    if (!name || !age || !kind) {
        return res.status(400).set('Content-Type', 'text/plain').end('Bad Request');
    }

    const result = await pool.query(
        'INSERT INTO pet(name, age, kind) VALUES ($1, $2, $3)',
        [name, age, kind]
    );

    res.set('Content-Type', 'application/json')
    res.json({ name, age, kind })
})

// Get pet by index
app.get('/pets/:index', async (req, res) => {

    const result = await pool.query(
        'SELECT * FROM pet WHERE $2 = $3',
        [parseInt(req.params.index),]
    );

    // Check if :index exist in data[index] 
    const found = data.some(pet => data.indexOf(pet) === parseInt(req.params.index));

    // Conditional if exist
    if (found) {
        res.set('Content-Type', 'application/json')
        res.json(data.find(pet => data.indexOf(pet) === parseInt(req.params.index)));
        res.end();
    } else if (!found) {
        res.set('Content-Type', 'text/plain')
        res.status(404);
        res.end('Not Found');
    }
});


// Variable for PORT 8000 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));