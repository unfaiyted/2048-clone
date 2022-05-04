import GridItem from "../components/grid-item";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { gridState, keypressState } from "../utils/atoms";
import {useEffect, useState} from "react";
import {createNewBlock, performValidMove} from "../utils/game-logic";




const GridContainer = ({gridHeight = 4, gridWidth = 4, initialBlocks = 2}) => {

    let grid = useRecoilValue(gridState)[0];
    const setGrid = useSetRecoilState(gridState);
    const presses = useRecoilValue(keypressState);

    const [moveCount, setMoveCount] = useState(0);


    // User presses Key
    useEffect( () => {
        const lastPress = presses[presses.length - 1]

        if(presses.length > 0 && lastPress !== "undo") {
            // working grid for operations
            let tempGrid = JSON.parse(JSON.stringify(grid));
            const moveList = []


            // what button was pressed
            switch (lastPress) {
                case "left":
                    // go left
                    // go from (x,y)
                    // start 0,0 ... 0,3 then 1,0
                    for (let x = 0; x < gridWidth; x++) { // x  0->3
                        for (let y = 0; y < gridHeight; y++) {
                            console.log("left => x, y :", x, y);
                            moveList.push(performValidMove(tempGrid, lastPress, x, y));
                        }
                    }
                    break;
                case "right":
                    // move right -> means start at right most elements
                    // go from (x,y)
                    // see of 0,3 can move then 1,3, then 2,3 then  3,3
                    for(let y=3; y >= 0; y--) {
                        for(let x=0; x < gridWidth; x++) {
                            console.log("right => x, y :", x, y);
                            moveList.push(performValidMove(tempGrid, lastPress, x, y));
                        }
                    }
                    break;
                case "up":
                    //go up
                    // 0,0 -> 3,0 // 0,1 => 3,1
                    for(let y=0; y < gridHeight; y++) {
                        for(let x=0; x < gridWidth; x++) {
                            console.log("up => x, y :", x, y);
                            moveList.push(performValidMove(tempGrid, lastPress, x, y));
                        }
                    }

                    break;
                case "down":
                    //go down
                    // 3,0 3,1 3,2 3,3
                    // 2,0 2,1 2,2 2,3
                    // 1,0 1,1 1,2 1,3
                    // 0,1 0,1 0,2 0,3
                    for(let x=3; x >= 0; x--) {
                        for(let y=0; y < gridHeight; y++) {
                            console.log("down => x, y :", x, y);
                            moveList.push(performValidMove(tempGrid, lastPress, x, y));
                        }
                    }
                    break;
            }


            console.log("moveList:", moveList)

            tempGrid = createNewBlock(tempGrid);

            setTimeout(() =>  {
                setGrid((old) => [tempGrid, ...old])
            });

            setMoveCount(moveCount+1);

            console.log(`Complete Moving (${lastPress})`);

            // go back to previous states
        } else if (lastPress === "undo") {
            setGrid( (old) => {
                console.log("old grids:", old)
                return [...old.filter((i,index) => index !== 0)]
            })
        }

    },[presses.length])


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