import GridItem from "../components/grid-item";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { gridState, keypressState } from "../utils/atoms";
import { createGrid } from '../utils/arrays'
import {useEffect, useState} from "react";
import KeypressHandler from "../components/keypress"
import {percentChanceBoolean} from "../utils/numbers";



const GridContainer = ({gridHeight = 4, gridWidth = 4, initialBlocks = 2}) => {

    const totalItems = gridHeight * gridWidth;
    let grid = useRecoilValue(gridState)[0];
    const setGrid = useSetRecoilState(gridState);
    const presses = useRecoilValue(keypressState);

    const [moveCount, setMoveCount] = useState(0);



    // User presses Key
    useEffect( () => {

        const lastPress = presses[presses.length - 1]

        if(presses.length > 0 && lastPress != "undo") {

            console.log("lastPress :", lastPress);

            let tempGrid = JSON.parse(JSON.stringify(grid));


            // move right -> means start at right most elements
            // go from (x,y) 0,3 -> 0,0

            // go left ->
            // go from 0,0 -> 0,3

            //go up
            // 0,0 -> 3,0 // 0,1 => 3,1


            //go down
            // 3,0 => 0,0

            for (let x = 0; x < gridWidth; x++) { // y  0->3
                for (let y = 0; y < gridHeight; y++) { // x 0->3

                    const totalMoves = canMove(tempGrid, lastPress, x, y);

                    if(totalMoves > 0) {

                        console.log("totalMoves, x, y :", totalMoves, x, y);

                        console.log("tempGrid:", tempGrid)

                        const isNegative = (lastPress === "down" || lastPress === "right") ? -1 : 1;

                        let getX = (lastPress === "down" || lastPress === "up")    ? x - (totalMoves * isNegative) : x;
                        let getY = (lastPress === "left" || lastPress === "right") ? y - (totalMoves * isNegative) : y;

                        console.log("isNegative :", isNegative);
                        console.log("getX, getY :", getX, getY);


                        if(tempGrid[getX][getY] === tempGrid[x][y]) {
                            tempGrid[getX][getY] = tempGrid[getX][getY] + tempGrid[x][y];
                        } else {
                            console.log("tempGrid[getX][getY], grid[x][y] :", tempGrid[getX][getY], tempGrid[x][y]);
                            tempGrid[getX][getY] = tempGrid[x][y];
                        }

                        tempGrid[x][y] = 0;

                        console.log("tempGridNeW:", tempGrid);



                        }

                }
            }

            tempGrid = createNewBlock(tempGrid);

            setGrid((old) => [tempGrid, ...old])
            setMoveCount(moveCount+1);


            console.log("Complete Moving");

           // createNewBlock();

        }

        if (lastPress === "undo") {
            setGrid( (old) => {
                console.log("old:", old)
                return [...old.filter((i,index) => index !== 0)]
            })
        }

    },[presses.length])


    // useEffect(() => {
    //     setTimeout(()=> {
    //         createNewBlock();
    //         console.log("is complete?")
    //     }, 250)
    //
    //
    // },[moveCount])



    const createNewBlock = (tempGrid, maxValue = 4) => {

        //1. get grid, check for empty spot in grid
        //2. create a new block in empty spot.

        const totalSize = gridHeight*gridWidth;

        let setBlock = false;

        for (let y = 0; y < gridHeight; y++) { // y
            for (let x = 0; x < gridWidth; x++) { // x

                const current = (x+1)*(y+1);

                if(tempGrid[x][y] === 0 && percentChanceBoolean(0.2 + (current/totalSize))) {
                    // starts at 20% chance and goes up each item until its 100%

                    // console.log("initX, initY :", initX, initY);
                    const initialValue = (percentChanceBoolean(0.5)) ? 2 : maxValue;

                    tempGrid[x][y] = initialValue;
                    setBlock = true;
                    break;

                }
            }

            if(setBlock === true) break;
        }
        return tempGrid;
    }

    /**
     *
     * @param direction
     * @param x
     * @param y
     * @returns {number}
     */
    const canMove = (tempGrid, direction, x, y) => {
        console.log("direction, x, y :", direction, x, y);
        
        if(grid[x][y] === 0) return 0;
        // 1. get surrounding boxes
        // 2. up, left, right, down
        // 3. find out intended movement direction

        const totalSpace = (dir, x,y) => {

            let moves = 0;
            let movingAxis = (dir === "left" || dir === "right") ? "y" : "x";
            let isNegativeDirection = (dir === "left" || dir === "up") ? 1 : -1;


            console.log("isNegativeDirection :", isNegativeDirection);
                // left means we change the x value down
                // up means we change the y value down

                console.log("movingAxis:", movingAxis)

                let offset = 1;

                while(offset >= 1 && offset <= (gridWidth-1)) {

                    let getX = (movingAxis === "x") ? x - (offset*isNegativeDirection) : x;
                    let getY = (movingAxis === "y") ? y - (offset*isNegativeDirection) : y;

                    console.log("getX, getY, gridXY :", getX, getY, tempGrid?.[getX]?.[getY]);

                    if(tempGrid?.[getX]?.[getY] === undefined) break;

                    if(tempGrid[getX][getY] === 0) moves++;
                    if(tempGrid[getX][getY] === tempGrid[x][y]) {
                        moves++;
                        break;
                    }
                    // if(grid[x][y] !== grid[getX][getY]) break;

                    offset++;
                }

                console.log("moves, x,y :", moves, x,y);


            return moves;
        }

        // 4. check block to the left if left,

        //current grid item
        // const gridValue = grid?.[x]?.[y] ;
        //
        // console.log("gridValue:", gridValue)

        switch (direction) {
            case "left":
                //one to left
                if(y === 0) return 0;
                return totalSpace(direction, x,y)
                break;
            case "right":
                //one right
                if(y === (gridWidth-1)) return 0;

                return totalSpace(direction, x,y)

                break;
            case "up":
                if(x === 0) return 0;
                // one above
                return totalSpace(direction, x,y)

                break;
            case "down":
                //one below
                if(x === (gridHeight-1)) return 0;
                return totalSpace(direction, x,y)
                break;
            default:
                console.log("bad direction mapped")
        }

        return 0;
    }


    return (

    <div className="container">

        { grid.map((row, rowIndex) => {
            return row.map((item, colIndex) => {
                let key = (rowIndex + 1) * (colIndex + 1);
                return <GridItem
                    key={(key)}
                    initialValue={item}
                    initialLocation={{rowIndex, colIndex}}
                />
            });

        })}
    </div>)
}


export default GridContainer;