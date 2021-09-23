const { argv, exit } = require('process');
const { readFile, writeFile } = require('fs/promises');

// Reading pets.json file and parsing to JSON format
const readFunction = async () => {
    const string = await readFile('./pets.json', 'utf8');
    return data = JSON.parse(string);
}


async function main() {
    const age = Number(argv[3]);
    const kind = argv[4];
    const name = argv[5];
    await readFunction();

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
            let newObj = { age: age, kind: kind, name: name };

            if (name) {
                data.push(newObj)
                // Writing data to pets.json
                await writeFile('pets.json', JSON.stringify(data));
            } else {
                console.error('Usage: node pets.js create AGE KIND NAME')
            }

            // const getData = (objToPush) => argv[5] ? data.push(objToPush) : console.error('Usage: node pets.js create AGE KIND NAME')
            // getData(newObj);
            break;
        case 'update':
            // get the dog object in data
            let dogToUpdate = data[indexRead]
            if (name) {
                dogToUpdate[age] = age;
                dogToUpdate[kind] = kind;
                dogToUpdate[name] = name;
                console.log(data)
            } else {
                console.error('Usage: node pets.js update INDEX AGE KIND NAME')
                exit(1)
            }
            // console.log(dogToUpdate.name)

            break;
        default:
            console.error('Usage: node pets.js [read | create | update | destroy]')
            return exit(1)
    }
}

main();
module.exports = readFunction;