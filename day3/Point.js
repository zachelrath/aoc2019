
let stepsCounter = 0;

class Point {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.steps = stepsCounter++;
    }
    dist() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    getSteps() {
        return this.steps;
    }
    /**
     * Return a list of all points between us along the given path,
     * inclusive of the final point on the path
     * @param {String} path - a path demarcator, e.g. "R14", "U12"
     * @returns {Point[]} Array of points along that path
     */
    moveAlong(path) {
        let { x, y } = this;
        const dir = path.substring(0,1),
            scalar = parseInt(path.substring(1),10),
            points = [],
            moveX = getMoveX(dir),
            moveY = getMoveY(dir);
        let i = 0;
        for (; i < scalar; i++) {
            points.push(new Point(x = moveX(x), y = moveY(y)));
        }
        return points;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
    toStringWithSteps() {
        return `(${this.x},${this.y} [${this.steps}])`;
    }
    static fromString(str) {
        // trim off parentheses
        str = str.substring(1,str.length - 1);
        const [x,y] = str.split(",");
        return new Point(x,y);
    }
    static resetCounter() {
        stepsCounter = 0;
    }
}

const getMoveX = direction => x => {
    if (direction === "R") return x+1;
    else if (direction === "L") return x - 1;
    else return x;
};
const getMoveY = direction => y => {
    if (direction === "U") return y+1;
    else if (direction === "D") return y - 1;
    else return y;
};

module.exports = Point;