const initEngine = require("./engine");
const DRINK_TYPES = require("./drinks");

const engine = initEngine();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter count and bottle type. E.g. 5 SODA:\n', (inputStr) => {
    const regex = /(\d+) ([A-Z]+)/g;
    const match = regex.exec(inputStr);
    if (!match) {
        console.error("invalid input!");
        process.exit(1);
    }

    const numBottles = Number(match[1]);
    const bottleType = DRINK_TYPES[match[2]];

    if (Number.isNaN(numBottles)) {
        console.error("invalid input!");
        process.exit(1);
    }

    if (!bottleType) {
        console.error(`Invalid bottle type: select ${Object.keys(DRINK_TYPES).join(", ")}`);
        process.exit(1);
    }

    const facts = {
        bottlesCount: numBottles,
        bottlesType: bottleType,
        availableSodaBottlesCount: 50,
    };

    engine
        .run(facts)
        .then(({events}) => {
            events.map(event => console.log(event.params.message))
        });

    readline.close();
});