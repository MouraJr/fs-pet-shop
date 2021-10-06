const express = require('express');
const app = express();
const pool = require('./db');

// Get body
app.use(express.json())

const badRequest = (res) => res.status(400).set('Content-Type', 'text/plain').end('Not Found');

/* ROUTES */

// Get all Pets from db
app.get('/pets', async (req, res) => {
    // Prepared Statement to avoid vulnerabilities
    const selectAllPets = {
        text: 'SELECT * FROM pet',
    }

    pool
        .query(selectAllPets)
        .then(result => result.rows)
        .then(rows => res.status(200).json(rows))
        .catch(e => console.error(e.stack))
})

// POST the data
app.post('/pets', async (req, res) => {
    const pet = {
        name: req.body.name,
        age: req.body.age,
        kind: req.body.kind
    }

    if (!pet.name || !pet.age || !pet.kind) {
        return res.status(400).set('Content-Type', 'text/plain').end('Bad Request');
    }

    const createPet = {
        text: 'INSERT INTO pet(name, age, kind) VALUES ($1, $2, $3) RETURNING *',
        values: [pet.name, pet.age, pet.kind]
    }

    pool
        .query(createPet)
        .then(result => result.rows)
        .then(rows => res.status(200).json(rows))
        .catch(e => console.error(e.stack))
})

// Get pet by index
app.get('/pets/:index', async (req, res) => {
    const selectIndex = {
        text: 'SELECT * FROM pet WHERE id = $1',
        values: [parseInt(req.params.index)]
    }

    pool
        .query(selectIndex)
        .then(result => result.rows)
        .then(rows => rows.length === 0 ? badRequest(res) : res.status(200).json(rows[0]))
        .catch(e => console.error(e.stack))
});

// PATCH data
app.patch('/pets/:index', async (req, res) => {

    const updatePet = {
        text: "UPDATE pet SET name = COALESCE($1, name), age = COALESCE($2, age), kind = COALESCE($3, kind) WHERE id = $4 RETURNING *",
        values: [req.body.name, req.body.age, req.body.kind, parseInt(req.params.index)]
    }

    pool
        .query(updatePet)
        .then(result => result.rows)
        .then(rows => rows.length === 0 ? badRequest(res) : res.status(200).json(rows[0]))
        .catch(e => console.error(e.stack))
});

// DELETE the data request
app.delete('/pets/:index', async (req, res) => {
    const deletePet = {
        text: 'DELETE FROM pet WHERE id = $1 RETURNING *',
        values: [parseInt(req.params.index)]
    }

    pool
        .query(deletePet)
        .then(result => result.rows)
        .then(rows => rows.length === 0 ? badRequest(res) : res.status(200).json(rows[0]))
        .catch(e => console.error(e.stack))
});

// 404 Middleware error handler
app.use((req, res, next) => {
    res.status(404).set('Content-Type', 'text/plain').end('Not Found')
})


// Variable for PORT 8000 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));