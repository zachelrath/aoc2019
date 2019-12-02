
const MEMORY = Symbol("memory");

const TYPE_ADD = 1,
    TYPE_MULTIPLY = 2,
    TYPE_DIE = 99;

class Computer {
    constructor(programCsv, noun, verb) {
        this[MEMORY] = Computer.parse(programCsv);
        if (typeof noun !== "undefined" && typeof verb !== "undefined") {
            this[MEMORY][1] = noun;
            this[MEMORY][2] = verb;
        }
    }

    static parse(programCsv) {
        return programCsv.split(",").map(x => parseInt(x, 10));
    }
    
    /**
     * Sets value of a memory address
     * @param {Integer} address 
     * @param {Integer} value
     * @returns {Computer}
     */
    set(address, value) {
        this[MEMORY][address] = value;
        return this;
    }

    /**
     * Returns the value at a given address
     * @param {Integer} address
     * @returns {Integer}
     */
        get(address) {
            return this[MEMORY][address];
        }

    /**
     * Runs the instruction set against the current memory
     * @returns {Computer}
     */
    run() {
        const state = this[MEMORY],
            length = state.length;

        let address = 0,
            paramA,
            paramB,
            targetAddress;

        for (; address < length; address += 4) {

            let opCode = state[address];

            if (opCode === TYPE_DIE) break;

            let paramA = state[state[address + 1]],
                paramB = state[state[address + 2]],
                targetAddress = state[address + 3],
                newValue;
            
            if (opCode === TYPE_ADD) {
                // add parameters
                newValue = paramA + paramB;
            } else if (opCode ===TYPE_MULTIPLY) {
                // multiply parameters
                newValue = paramA * paramB;
            }
            // Store result at target address
            state[targetAddress] = newValue;
        }
        return this;
    }
    /**
     * Return the program state as a CSV string
     * @returns {String}
     */
    serialize() {
        return this[MEMORY].join(",");
    }

}

module.exports = Computer;