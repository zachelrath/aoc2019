const fs = require("fs");
const path = require("path");
const assert = require("assert");
const Computer = require("./Computer");
const filePath = path.resolve(__dirname, process.argv.slice(2)[0] || "input.txt");

const part1Tests = [
    [
        "1,0,0,0,99",
        "2,0,0,0,99",
    ],
    [
        "2,3,0,3,99",
        "2,3,0,6,99",
    ],
    [
        "2,4,4,5,99,0",
        "2,4,4,5,99,9801",
    ],
    [
        "1,1,1,4,99,5,6,0,99",
        "30,1,1,4,2,5,6,0,99",
    ],
];
part1Tests.forEach(([
    initialState,
    expectedState,
]) => {
    const c = new Computer(initialState),
        outputState = c.run().serialize();
    assert.equal(expectedState, outputState, `In: ${initialState}, got: ${outputState}`);
});

(async () => {
    const rawInput = await fs.readFileSync(filePath, "utf8");
    const inputState = rawInput.toString("ascii");
    let c = new Computer(inputState, 12, 2);

    // Part 1: Initialize the program with given noun and verb, then run the program and get the output
    console.log("Part ONE Answer: " + c.run().get(0));

    // Part 2: Find input noun and verb that result in desired output
    const TARGET_OUTPUT = 19690720;
    const MIN = 0, MAX = 99;
    let noun = MIN,
        verb = MIN;
    let foundSolution = false;
    outer: {
        while (noun <= MAX) {
            while (verb <= MAX) {
                c = new Computer(inputState, noun, verb);
                c.run();
                if (c.get(0) === TARGET_OUTPUT) {
                    foundSolution = true;
                    break outer;
                }
                verb++;
            }
            noun++;
            verb = MIN;
        }
    }

    if (foundSolution) {
        console.log("Noun: ", noun);
        console.log("Verb: ", verb);
        assert.equal(TARGET_OUTPUT, new Computer(inputState, noun, verb).run().get(0), "double check failed");

        console.log("Part TWO Answer: " + ((100 * noun) + verb));   
    }

})();