const { readFile } = require('fs/promises');

const readData = async () => {
    try {
        const data = await readFile('./pets.json', 'utf8');
        return data
    } catch (error) {
        console.log((error.message))
    }
}

module.exports = readData;