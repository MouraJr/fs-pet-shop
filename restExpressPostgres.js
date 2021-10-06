const express = require('express');
const app = express();
const pool = require('./db');

// Get body
app.use(express.json())

const badRequest = (res) => res.status(400).set('Content-Type', 'text/plain').end('Bad Request');

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
    // const { name, age, kind } = req.body
    const pet = {
        name: req.body.name,
        age: req.body.age,
        kind: req.body.kind
    }
    console.log(pet)

    const createPet = {
        text: 'INSERT INTO pet(name, age, kind) VALUES ($1, $2, $3)',
        values: [pet.name, pet.age, pet.kind]
    }

    pool
        .query(createPet)
        .then(result => result.rows)
        .then(pet ? badRequest(res) : res.status(200).json(pet))
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
        .then(rows => rows ? badRequest(res) : res.status(200).json(rows[0]))
        .catch(e => console.error(e.stack))
});


// Variable for PORT 8000 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));