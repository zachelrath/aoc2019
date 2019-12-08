const fs = require("fs");
const path = require("path");
const assert = require("assert");
const Point = require("./Point");
const filePath = path.resolve(__dirname, process.argv.slice(2)[0] || "input.txt");

const moveOnGrid = (allPoints, currPath) => allPoints.concat(allPoints.pop().moveAlong(currPath));
const getCoordsVisited = paths => paths.reduce(moveOnGrid, [new Point(0,0)]);

(async () => {
    const rawInput = await fs.readFileSync(filePath, "utf8");
    const [
        wire1In,
        wire2In,
    ] = rawInput.toString("ascii").split("\n");

    //
    // PART 1
    const wire1CoordsVisited = getCoordsVisited(wire1In.split(","));
    const wire2CoordsVisited = getCoordsVisited(wire2In.split(","));
    const wire2Strs = wire2CoordsVisited.map(c => c.toString());
    const wire1StrsSet = new Set();
    wire1CoordsVisited.forEach(c => wire1StrsSet.add(c.toString()));
    const intersectionPoints = wire2CoordsVisited.filter(p => wire1StrsSet.has(p.toString()));
    const closestIntersection = intersectionPoints.sort((a,b) => a.dist() - b.dist())[0];
    console.log("PART 1: Closest intersection: %s, distance: %d", closestIntersection.toString(), closestIntersection.dist());
})();