const {Engine} = require("json-rules-engine");
const DRINK_TYPES = require("./drinks");

function initEngine() {
    const engine = new Engine();
    const rules = [{
        conditions: {
            all: [
                {
                    fact: 'bottlesCount',
                    operator: 'greaterThanInclusive',
                    value: 2
                },
                {
                    fact: 'bottlesType',
                    operator: 'equal',
                    value: DRINK_TYPES.SODA,
                },
                {
                    fact: 'availableSodaBottlesCount',
                    operator: 'greaterThanInclusive',
                    value: 1,
                },
            ]
        },
        event: {
            type: 'exchange',
            params: {
                message: 'Empty bottles can be exchanged for new soda bottles!'
            }
        }
    }, {
        conditions: {
            all: [{
                fact: 'bottlesCount',
                operator: 'lessThan',
                value: 2,
            }]
        },
        event: {
            type: 'notEnoughBottles',
            params: {
                message: "You don't have enough empty bottles for an exchange!",
            }
        }
    }, {
        conditions: {
            all: [{
                fact: 'bottlesType',
                operator: 'notEqual',
                value: DRINK_TYPES.SODA,
            }]
        },
        event: {
            type: 'wrongType',
            params: {
                message: "Only soda bottles can be exchanged!",
            }
        }
    }, {
        conditions: {
            all: [{
                fact: 'availableSodaBottlesCount',
                operator: 'lessThan',
                value: 1,
            },]
        },
        event: {
            type: 'outOfStock',
            params: {
                message: "The shop doesn't have any more soda bottles to exchange!",
            }
        }
    }];
    rules.forEach((rule) => engine.addRule(rule));
    return engine;
}

module.exports = initEngine;