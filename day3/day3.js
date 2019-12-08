const fs = require("fs");
const Point = require("./Point");
const filePath = require("path").resolve(__dirname, process.argv.slice(2)[0] || "input.txt");
const moveOnGrid = (allPoints, currPath) => allPoints.concat(allPoints.pop().moveAlong(currPath));
const numSort = (a,b) => a - b;
const getCoordsVisited = paths => {
    Point.ResetStepsCounter();
    return paths.reduce(moveOnGrid, [new Point(0,0)]);
};
const getMinStepsForWireAtCrossing = (wiresMap, pointString) => wiresMap.get(pointString).map(c => c.getSteps()).sort(numSort)[0];
const buildMapOfVisitedCoords = (coordsArray) => {
    const m = new Map();
    coordsArray.forEach(c => {
        let cString = c.toString(),
            match = m.get(cString);
        if (!match) m.set(c.toString(), [c]);
        else match.push(c);
    });
    return m;
};

(async () => {
    const rawInput = await fs.readFileSync(filePath, "utf8");
    const [ wire1In, wire2In ] = rawInput.toString("ascii").split("\n");
    const wire1CoordsVisited = getCoordsVisited(wire1In.split(","));
    const wire2CoordsVisited = getCoordsVisited(wire2In.split(","));
    const wire1StrsMap = buildMapOfVisitedCoords(wire1CoordsVisited);
    const wire2StrsMap = buildMapOfVisitedCoords(wire2CoordsVisited);
    const intersectionPoints = wire2CoordsVisited.filter(p => wire1StrsMap.has(p.toString()));
    const closestIntersection = intersectionPoints.sort((a,b) => a.dist() - b.dist())[0];
    console.log("PART 1: Closest intersection: %s, Manhattan distance: %d", closestIntersection.toString(), closestIntersection.dist());
    let smallestCombinedSteps = 0;
    intersectionPoints.map(p => p.toString()).forEach(pString => {
        const totalSteps = getMinStepsForWireAtCrossing(wire1StrsMap, pString) + getMinStepsForWireAtCrossing(wire2StrsMap, pString);
        if ((smallestCombinedSteps === 0) || (totalSteps < smallestCombinedSteps)) smallestCombinedSteps = totalSteps;
    })
    console.log("PART 2: Min # of combined steps: %d", smallestCombinedSteps);
})();