import {percentChanceBoolean} from "./numbers";

export const createNewBlock = (tempGrid, maxValue = 4,) => {

    //1. get grid, check for empty spot in grid
    //2. create a new block in empty spot.
    const gridWidth = tempGrid.length;
    const gridHeight = tempGrid[0].length

    const totalSize = tempGrid.length * tempGrid[0].length;

    let setBlock = false;

    for (let y = 0; y < gridHeight; y++) { // y
        for (let x = 0; x < gridWidth; x++) { // x

            const current = (x+1)*(y+1);

            if(tempGrid[x][y] === 0 && percentChanceBoolean(0.2 + (current/totalSize))) {
                // starts at 20% chance and goes up each item until its 100%

                // console.log("initX, initY :", initX, initY);
                const initialValue = (percentChanceBoolean(0.5)) ? 2 : maxValue;

                console.log(`Create block:  x:${x} y:${y}, val:${initialValue}`)

                tempGrid[x][y] = initialValue;
                setBlock = true;
                break;

            }
        }

        // Ends when a new block is added
        if(setBlock === true) break;
    }
    return tempGrid;
}

const getTotalMoves = (tempGrid, dir, x,y) => {

    const gridWidth = tempGrid.length;
    const movementData = {
        from: {
            x: x,
            y: y
        },
        to: {
            x: null,
            y: null
        },
        moves: 0,
        direction: dir
    }

    let moves = 0;
    let movingAxis = (dir === "left" || dir === "right") ? "y" : "x";
    let isNegativeDirection = (dir === "left" || dir === "up") ? 1 : -1;

    // console.log("isNegativeDirection :", isNegativeDirection);
    // left means we change the x value down
    // up means we change the y value down

    let offset = 1;

    while(offset >= 1 && offset <= (gridWidth-1)) {

        let getX = (movingAxis === "x") ? x - (offset*isNegativeDirection) : x;
        let getY = (movingAxis === "y") ? y - (offset*isNegativeDirection) : y;

        // out of  bounds?!
        if(tempGrid?.[getX]?.[getY] === undefined) break;

        console.log(
            `tempGrid[${getX}][${getY}](${tempGrid[getX][getY]}) === tempGrid[${x}][${y}](${tempGrid[x][y]})
              `)

        if(tempGrid[x][y] !== tempGrid[getX][getY] && tempGrid[getX][getY] !== 0) {
            console.log("End moves: Hit another block")
            break;
        } else if(tempGrid[getX][getY] === 0) {
            console.log("Add move: Grid value == 0");
            moves++;
        } else if(tempGrid[getX][getY] === tempGrid[x][y]) {
            console.log("Add move: Grid matches");
            moves++;
            break;
        }

        offset++;
    }

    movementData.moves = moves;
    // movementData.to.x = '';
    // movementData.to.y = '';

    return calculateMoveCoordinates(movementData);
}

export const canBlockMove = (tempGrid, direction, x, y) => {
    // console.log("direction, x, y :", direction, x, y);

    if(tempGrid[x][y] === 0) return false;
    // 1. get surrounding boxes
    // 2. up, left, right, down
    // 3. find out intended movement direction

    switch (direction) {
        case "left":
            //one to left
            if(y === 0) return false;
            return getTotalMoves(tempGrid, direction, x,y);
        case "right":
            //one right
            if(y === (tempGrid.length-1)) return false;
            return getTotalMoves(tempGrid, direction, x,y);
        case "up":
            // one above
            if(x === 0) return false;
            return getTotalMoves(tempGrid, direction, x,y);
        case "down":
            if(x === (tempGrid.length-1)) return false;
            return getTotalMoves(tempGrid, direction, x,y);
        default:
            console.log("bad direction mapped")
    }

    return false;
}


const calculateMoveCoordinates = ({from, to, moves, direction}) => {

    console.log("Block", from.x, from.y ," (can move) :", moves);

    const isNegative = (direction === "down" || direction === "right") ? -1 : 1;

    to = {
        x: (direction === "up" || direction === "down") ? from.x - (moves * isNegative) : from.x,
        y: (direction === "left" || direction === "right") ? from.y - (moves * isNegative) : from.y
    }

    console.log("from, to, moves, direction :", from, to, moves, direction);
    
    
    return {
        from,
        to,
        moves,
        direction
    };

}


export const performValidMove = (tempGrid, direction, x, y ) => {
    const  movementData = canBlockMove(tempGrid, direction, x, y);

    if(movementData.moves === 0 || movementData === false) return false;

        const {from, to} = movementData;

        if(tempGrid[to.x][to.y] === tempGrid[from.x][from.y]) {
            tempGrid[to.x][to.y] = tempGrid[to.x][to.y] + tempGrid[from.x][from.y];
        } else if(tempGrid[to.x][to.y] === 0) {
            tempGrid[to.x][to.y] = tempGrid[from.x][from.y];
        } else {
            console.log("Attempted to move to block that is not empty or zero");
            console.log("tempGrid[getX][getY] \"=\" tempGrid[x][y] :", tempGrid[to.x][to.y],"=",tempGrid[from.x][from.y]);
        }

        tempGrid[from.x][from.y] = 0;

        // prevents from updating with json parse, of original object
        console.log("tempGridNeW:", JSON.parse(JSON.stringify(tempGrid)));

    return movementData;
}
