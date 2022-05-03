import GridItem from "../components/grid-item";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { gridState, keypressState } from "../utils/atoms";
import { createGrid } from '../utils/arrays'
import {useEffect} from "react";
import KeypressHandler from "../components/keypress"



const GridContainer = ({gridHeight = 4, gridWidth = 4, initialBlocks = 2}) => {

    const totalItems = gridHeight * gridWidth;
    let grid = useRecoilValue(gridState)[0];
    const setGrid = useSetRecoilState(gridState);
    const presses = useRecoilValue(keypressState);


    // On initial mount
    useEffect(() => {

        // initial grid setup
        //setGrid((old) => [createGrid(gridWidth, gridHeight)]);

        // console.log("gridItems.length:", gridItems.length)
        //
        //
        //
        // for(let i = 0; i < totalItems; i++) {
        //
        //     // Sets the starting value if the initialBlocks > 0 and if the random change is true too
        //     const setStartingValue = (initialBlocks > 0 && percentChanceBoolean(0.2 + (i/totalItems)));
        //     // starts at 20% chance and goes up each item until its 100%
        //
        //
        //     // console.log("setStartingValue:", setStartingValue)
        //
        //     // Finds the Y axis grid position
        //     const initY = Math.floor((i / gridWidth));
        //
        //     //(16) % 4
        //     // finds the x position initally on the grid.
        //     const initX = (i % gridHeight)
        //
        //     // console.log("initX, initY :", initX, initY);
        //     const initialValue = (!!(setStartingValue)) ? 2 : 0;
        //
        //     const gridItem = {
        //         initialValue,
        //         key: i,
        //         x: initX,
        //         y: initY
        //     };
        //
        //
        //     console.log("add counter", i)
        //         console.log("gridItem.length:", gridItems.length)
        //         setGridItems( (old) => [...old, gridItem ])
        //
        //     if(initialValue) {
        //         console.log("gridItemsHolder:", gridItems)
        //         console.log("initialBlocks:", initialBlocks)
        //         console.log("setStartingValue, initialValue:", setStartingValue, initialValue)
        //         console.log("(setStartingValue && initialBlocks > 0), i, initX, initY :", !!(setStartingValue), i, initX, initY);
        //      }
        //
        //     if(setStartingValue) initialBlocks--;
        // }

    },[])

    useEffect(() => {

        if(presses.length > 0) {
            console.log("presses has changed");

            const lastPress = presses[presses.length - 1]

            console.log("lastPress :", lastPress);


            for (let h = 0; h < gridHeight; h++) { // y
                for (let w = 0; w < gridWidth; w++) { // x

                    // w = x, y = h ?
                    const totalMoves = canMove(lastPress, w, w)

                    if(totalMoves > 0) {
                        console.log("x,y :", h,w);
                        console.log("totalMoves:", totalMoves)
                        console.log("grid[0][h,w]:", grid[h][w])


                        let tempGrid = JSON.parse(JSON.stringify(grid));

                        console.log("tempGrid:", tempGrid)

                        tempGrid[h][w+totalMoves] = grid[h][w];

                        console.log("tempGridNeW:", tempGrid);


                        setGrid((old) => [tempGrid, ...old])


                         // grid[0][0,0] = 1;
                        // setGrid((old) => [, old]);

                        }

                }

            }

        }


        
    },[presses.length])


    /**
     *
     * @param direction
     * @param x
     * @param y
     * @returns {number}
     */
    const canMove = (direction, x, y) => {

        if(grid[x][y] === 0) return 0;
        // 1. get surrounding boxes
        // 2. up, left, right, down
        // 3. find out intended movement direction

        const totalSpace = (dir, x,y) => {
            let moves = 0;
            let movingAxis = y;


            if(dir === "left" || dir == "right") {
                movingAxis = x;
            }

            if(dir === "left" || dir === "up") {
                movingAxis--;

                while(movingAxis >= 0) {

                    const getX = (dir === "left") ? movingAxis : x;
                    const getY = (dir === "up") ? movingAxis : y;

                       if(grid[getX][getY] === 0) moves++;
                       if(grid[getX][getY] !== 0) break;

                    movingAxis--;
                }

            }

            if(dir === "right" || dir === "down") {

                console.log("dir :", dir);
                movingAxis++; // grab next y or x axis.

                console.log("movingAxis (y) >= gridWidth :", movingAxis, gridWidth);

                while(movingAxis > gridWidth) {

                    const getX = (dir === "right") ? movingAxis : x;
                    const getY = (dir === "down") ? movingAxis : y;

                    console.log("getX:", getX, "getY: ",getY)

                    if(grid[getX][getY] === 0) moves++;
                    if(grid[getX][getY] !== 0) break;

                    movingAxis++;
                }

            }

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
                if(x === 0) return 0;
                return totalSpace(direction, x,y)
                break;
            case "right":
                //one right
                if(x === (gridWidth-1)) return 0;

                return totalSpace(direction, x,y)

                break;
            case "up":
                if(y === 0) return 0;
                // one above
                return totalSpace(direction, x,y)

                break;
            case "down":
                //one below
                if(y === (gridHeight-1)) return 0;
                return totalSpace(direction, x,y)
                break;
            default:
                console.log("bad direction mapped")
        }

        return 0;
    }

    const addNewBlock = () => {

    }

    // console.log(gridItems)

    // console.log(grid, grid[grid.length-1])

    return (

    <div className="container">

        { grid.map((row, rowIndex) => {

            console.log("row:", row)


            
            return row.map((item, colIndex) => {
                console.log("item :", item);
                return <GridItem
                    key={(rowIndex*colIndex)}
                    initialValue={item}
                    initialLocation={{rowIndex, colIndex}}
                />
            });

        })}
    </div>)
}


export default GridContainer;