const { argv, exit } = require('process');
const { readFile, writeFile } = require('fs/promises');


async function main() {
    // Reading pets.json file and parsing to JSON format
    const string = await readFile('./pets.json', 'utf8');
    const data = JSON.parse(string);

    // Writing data to pets.json
    // const writingOnFile = (toInsert, file) => await writeFile(toInsert, file);

    // Reading commands from terminal
    const command = argv[2];
    const indexRead = argv[3];

    if (command === undefined) {
        console.error('Usage: node pets.js [read | create | update | destroy]')
        return exit(1)
    }

    // const readingFile = (action, i) => {
    //     return (action === 'read' && indexRead) === undefined ? console.log(data)
    //         : (indexRead !== undefined)
    // }

    if (command === 'read' && indexRead === undefined) {
        console.log(data)
        return exit(1)
    } else if (command === 'read' && indexRead) {
        if (data[indexRead] === undefined) {
            console.error('Usage: node pets.js read INDEX')
            return exit(1)
        } else {
            console.log(data[indexRead])
        }
    }

    if (command === 'create') {
        let age = argv[3];
        let kind = argv[4];
        let name = argv[5];
        let newObj = { age: age, kind: kind, name: name };

        let newData = { ...data, ...newObj }

        console.log(newData)
    }

}

// const command = argv[2]
// console.log(command)
// exit(1);

main();