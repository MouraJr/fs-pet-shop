const express = require('express')
const morgan = require('morgan')
const { writeFile } = require('fs/promises')
const readFunction = require('./readJson')

var app = express()

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
        name: req.body.name,
        age: req.body.age,
        kind: req.body.kind
    }

    if (!newPet.name || !newPet.age || !newPet.kind) {
        return res.status(400).end('Please include a name, age, and kind to create!')
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
        data.forEach(pet => {
            if (data.indexOf(pet) === parseInt(req.params.index)) {
                data.name = patchPet.name ? patchPet.name : data.name;
                data.age = patchPet.age ? patchPet.age : data.age;
                data.kind = patchPet.kind ? patchPet.kind : data.kind;
            }
            console.log(data)
        })
        // Writing data to pets.json
        await writeFile('pets.json', JSON.stringify(data))
        await readFunction()
        res.set('Content-Type', 'application/json')
        res.json(data[req.params.index])
    } else if (!found) {
        res.set('Content-Type', 'text/plain')
        res.status(404);
        res.end('Not Found');
    }
});

// Variable for PORT 500 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));