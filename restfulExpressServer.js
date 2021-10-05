const express = require('express')
const morgan = require('morgan')
const { writeFile } = require('fs/promises')
const readFunction = require('./readJson')

var app = express();

// Logger Middleware
app.use(morgan('combined'))

// Body Parser Middleware
app.use(express.json());

// Get the data
app.get('/pets', async (req, res) => {
    await readFunction();
    res.set('Content-Type', 'application/json')
    res.send(data)
})

// Get pet by index
app.get('/pets/:index', async (req, res) => {
    await readFunction();
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

// POST the data
app.post('/pets', async (req, res) => {
    await readFunction();
    const newPet = {
        age: req.body.age,
        kind: req.body.kind,
        name: req.body.name
    }

    if (!newPet.name || !newPet.age || !newPet.kind) {
        return res.status(400).set('Content-Type', 'text/plain').end('Bad Request');
    }

    data.push(newPet)
    // Writing data to pets.json
    await writeFile('pets.json', JSON.stringify(data));
    res.json(newPet)
})

// PATCH data
app.patch('/pets/:index', async (req, res) => {
    await readFunction();
    // Check if :index exist in data[index] 
    const found = data.some(pet => data.indexOf(pet) === parseInt(req.params.index));


    // Conditional if exist
    if (found) {
        const patchPet = req.body;
        const petToUpdate = data[req.params.index];
        const updatedPet = { ...petToUpdate, ...patchPet };

        // Writing data to pets.json
        data[req.params.index] = updatedPet;
        await writeFile('pets.json', JSON.stringify(data))

        res.set('Content-Type', 'application/json')
        res.status(200);
        res.send(updatedPet);

    } else if (!found) {
        res.set('Content-Type', 'text/plain')
        res.status(404);
        res.end('Not Found');
    }
});

// DELETE the data request
app.delete('/pets/:index', async (req, res) => {
    await readFunction();
    // Check if :index exist in data[index] 
    const found = data.some(pet => data.indexOf(pet) === parseInt(req.params.index));

    // Conditional if exist
    if (found) {
        // Delete element from data
        const deletedPet = data.splice(parseInt(req.params.index), 1)
        // Writing data to pets.json
        await writeFile('pets.json', JSON.stringify(data))

        res.set('Content-Type', 'application/json')
        res.status(200);
        res.send(deletedPet);

    } else if (!found) {
        res.set('Content-Type', 'text/plain')
        res.status(404);
        res.end('Not Found');
    }
});

// 404 Middleware error handler
app.use((req, res, next) => {
    res.status(404).set('Content-Type', 'text/plain').end('Not Found')
})

// Variable for PORT 8000 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

module.exports = app;