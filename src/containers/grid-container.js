import GridItem from "../components/grid-item";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {gridItemManagerState, gridState, keypressState} from "../utils/atoms";
import {useEffect, useState} from "react";
import {createNewBlock, performValidMove} from "../utils/game-logic";
import {KEYPRESS} from "../utils/constants";
import PropTypes from "prop-types";

const GridContainer = ({gridHeight = 4, gridWidth = 4}) => {

    let grid = useRecoilValue(gridState)[0];
    const setGrid = useSetRecoilState(gridState);
    const presses = useRecoilValue(keypressState);

    const actionState = useRecoilValue(gridItemManagerState);
    const setActionState = useSetRecoilState(gridItemManagerState)
    const setMoveComplete = (val = true) => setActionState((old) => { return {...old, moveAnimationCompleted: val}})
    const incrementPressIndex = () => setActionState((old) => ({...old, pressIndex: old.pressIndex+1}));
    const [moveCount, setMoveCount] = useState(0);
    const [moves, setMoveList] = useState([])


    const processNextPress = (pressIndex) => {
        setMoveComplete(false);
        const lastPress = presses[pressIndex];
        console.log("lastPress:", lastPress)
        console.log("pressIndex,presses,pressIndex :", pressIndex,presses,pressIndex);
        // working grid for operations
        let tempGrid = JSON.parse(JSON.stringify(grid));
        const moveList = []

        // what button was pressed
        switch (lastPress) {
            case KEYPRESS.LEFT:
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
            case KEYPRESS.RIGHT:
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
            case KEYPRESS.UP:
                //go up
                // 0,0 -> 3,0 // 0,1 => 3,1
                for(let y=0; y < gridHeight; y++) {
                    for(let x=0; x < gridWidth; x++) {
                        console.log("up => x, y :", x, y);
                        moveList.push(performValidMove(tempGrid, lastPress, x, y));
                    }
                }

                break;
            case KEYPRESS.DOWN:
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
            case KEYPRESS.UNDO:
                // removes the first item from the array
                setGrid( (old) => {
                    console.log("old grids:", old)
                    return [...old.filter((i,index) => index !== 0)]
                })
                break;
            default:
                console.log("No Valid Keypress")
        }

        setMoveList(moveList);

        if(!moveList.every((item) => item === false) ) {

            tempGrid = createNewBlock(tempGrid);


            setGrid((old) => [tempGrid, ...old])

            setMoveCount(moveCount+1);

            console.log(`Complete Moving (${lastPress})`);
        }

        incrementPressIndex();

    }

    // User presses Key
    useEffect( () => {
        console.log("presses.length :", presses.length);
        if(presses.length === 2) {
            processNextPress(actionState.pressIndex);
        }
    },[presses.length])

    useEffect(()=>{
        if(presses.length === 1) return;
        if(actionState.moveAnimationCompleted && actionState.resting ===0) {
            if(presses.length > actionState.pressIndex)  processNextPress(actionState.pressIndex);

        }
    },[actionState, presses])

    let counter = 0;
    return (<div className="container">
        { grid.map((row, rowIndex) => {
            return row.map((item, colIndex) => {
                let key = counter++;
                return <GridItem
                    key={key}
                    value={item}
                    latestMoves={moves}
                    homeLocation={{x: rowIndex,  y: colIndex}}
                />
            });

        })}
    </div>)
}

GridContainer.propTypes = {
    gridHeight: PropTypes.number,
    gridWidth: PropTypes.number
}

export default GridContainer;