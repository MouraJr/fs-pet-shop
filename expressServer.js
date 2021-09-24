const express = require('express');
const path = require('path');
const { readFile } = require('fs');
// const readData = require('./readJson');

// Initialize express and store to app
const app = express();


// Gets all pets
app.get('/pets', (req, res) => {

    readFile('./pets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.set('Content-Type', 'application/json')
        res.send(data)
    })
});

// Get pet by index
app.get('/pets/:index', (req, res) => {

    readFile('./pets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // Check if :index exist in data[index] 
        const dataJson = JSON.parse(data)
        const found = dataJson.some(pet => dataJson.indexOf(pet) === parseInt(req.params.index));

        // Conditional if exist
        if (found) {
            res.set('Content-Type', 'application/json')
            res.json(dataJson.find(pet => dataJson.indexOf(pet) === parseInt(req.params.index)));
            res.end();
        } else if (!found) {
            res.set('Content-Type', 'text/plain')
            res.status(404);
            res.end('Not Found');
        }
    })
});

// POST new pets to data
app.post(`/pets age=3 kind=parakeet name=Cornflake`, (req, res) => {
    const gettingAge = () => {
        const petAgeRegExp = /^\/pets\%\d{2}\w{3}\=/;
        const matches = req.url.match(petAgeRegExp);
        return age = Number(matches[1]);
    };

    // const newPet = {
    //     "age": age,
    //     "kind": kind,
    //     "name": name
    // }

    // if (!newPet.age || !newPet.kind || !newPet.name) {
    //     return res.status(400).set('Content-Type', 'text/plain');
    // }

    // data.push(newPet);
    res.end(age)
})

// Variable for PORT 500 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

module.exports = app;