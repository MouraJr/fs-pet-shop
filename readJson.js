const { readFile } = require('fs/promises');

// Reading pets.json file and parsing to JSON format
const readFunction = async () => {
    const string = await readFile('./pets.json', 'utf8');
    return data = JSON.parse(string);
}

module.exports = readFunction;