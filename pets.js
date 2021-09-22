const { argv, exit } = require('process');
const { readFile } = require('fs/promises');


async function main() {
    // Reading pets.json file and parsing to JSON format
    const string = await readFile('./pets.json', 'utf8');
    const data = JSON.parse(string);

    // Reading commands from terminal
    const command = argv[2]
    const indexRead = argv[3]

    if (command === undefined) {
        console.error('Usage: node pets.js [read | create | update | destroy]')
    }

    // const readingFile = (action, i) => {
    //     return action === 'read' ? 
    // }

    if (command === 'read' && indexRead === undefined) {
        console.log(data)
    } else if (indexRead !== undefined) {
        console.log(data[indexRead])
    }
}

// const command = argv[2]
// console.log(command)
// exit(1);

main();