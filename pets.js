const { argv, exit } = require('process');
const { readFile, writeFile } = require('fs/promises');


async function main() {
    // Reading pets.json file and parsing to JSON format
    const string = await readFile('./pets.json', 'utf8');
    const data = JSON.parse(string);

    // Reading commands from terminal
    const command = argv[2];
    const indexRead = argv[3];

    switch (command) {
        case 'read':
            if (command === 'read' && !indexRead) {
                console.log(data)
            } else if (command === 'read' && indexRead) {
                if (data[indexRead] === undefined) {
                    console.error('Usage: node pets.js read INDEX')
                } else {
                    console.log(data[indexRead])
                }
            }
            break;
        case 'create':
            let age = Number(argv[3]);
            let kind = argv[4];
            let name = argv[5];
            let newObj = { age: age, kind: kind, name: name };

            const getData = (objToPush) => argv[5] ? data.push(objToPush) : console.log('Usage: node pets.js create AGE KIND NAME')

            getData(newObj);

            // Writing data to pets.json
            await writeFile('pets.json', JSON.stringify(data));
            break;
        default:
            console.error('Usage: node pets.js [read | create | update | destroy]')
            return exit(1)
    }
}

main();