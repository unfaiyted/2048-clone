import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {useState} from "react";
import {COLORS} from "../utils/constants";
import {animated, useSpring} from '@react-spring/web';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {gridItemManagerState} from "../utils/atoms";


export const GridItem = ({homeLocation: {x, y}, value, latestMoves, key}) => {

    const ref = useRef(null);
    const [location] = useState({x, y})
    const [displayValue, setDisplayValue] = useState(value);
    const [willBlockMove, setBlockWillMove] = useState(false);
    const actionState = useRecoilValue(gridItemManagerState);
    const setActionState = useSetRecoilState(gridItemManagerState)

    const addMoving = () => setActionState((old) => { return {...old, started: true, moving: old.moving+1}});
    const subtractMoving = () => setActionState((old) => { return {...old, moving: old.moving-1}});
    const addResting = () => setActionState((old) => { return {...old, resting: old.resting+1}});
    const subtractResting = () => setActionState((old) => { return {...old, resting: old.resting-1}});
    const setStartedTrue = () => setActionState((old) => { return {...old, started: true}})
    const setMoveComplete = (val = true) => setActionState((old) => { return {...old, moveAnimationCompleted: val}})

    const [styles, api] = useSpring(()=> ({
        from: { x: 0, y: 0, zIndex: 1, position: "relative"},
        config: {
            duration: 250,
        },
        onRest:  () => { subtractMoving(); addResting(); },
        onStart: () => { setMoveComplete(false); addMoving(); subtractResting(); setStartedTrue(); setBlockWillMove(true) },
    }));

    // Picks the color based on the current display value.
    const customStyle = {
        backgroundColor: COLORS.get((displayValue) ? displayValue : null),
    }

    // 1. Get the moves into the program
    // 2. Move to the locations that they need to be.
    // 3. Set combined value of the two blocks.
    // 4. Change values to zero if combined with another block
    useEffect(() => {
        // console.log("width",  typeof ref.current, ref.current.offsetWidth)
        // console.log("height", typeof ref.current, ref.current.offsetHeight)

        let {offsetWidth: width, offsetHeight: height} = ref.current;

        // filter the moves to only return the one that is associated with this block
        const moveTo = latestMoves.filter(
            (move) =>
                move !== false
                && move.from.x === location.x
                && move.from.y === location.y
        )[0]

        if (moveTo === undefined) {
            setBlockWillMove(false) // this block isnt moving
        } else {
            setBlockWillMove(true);

            const isNegativeDirection = (moveTo.direction === "left" || moveTo.direction === "up") ? -1: 1;

            if (moveTo.direction === "left" || moveTo.direction === "right") {
                api.start({to: { opacity: 1, x: isNegativeDirection * ((height+12) * moveTo.moves ), zIndex: 500 },
                    config: {
                        duration: 150
                    }
                });
            }

            if (moveTo.direction === "up" || moveTo.direction === "down") {
                api.start({to: { opacity: 1, y: isNegativeDirection * ((width+12) * moveTo.moves), zIndex: 500 },
                    config: {
                        duration: 150
                    }})
            }
        }

    }, [latestMoves])

    const displayBlock = () => {
        api.start({to: [{ x:0,y:0, zIndex: 100},{opacity: 1}], config:{ duration: 1}})
    }

    useEffect(() => {
        if(actionState.resting===0 && actionState.started && willBlockMove ) {
            //console.log("stopping animation")
            api.start({to: [{ opacity: 0}], delay: 100, config: {
                duration: 1
                }, onRest: () => {
                    setMoveComplete();
                   // console.log("display value change", value)
                    setDisplayValue(value);
                    setBlockWillMove(false);
                    displayBlock();
                }});

            // start acccepting keypresses now.
        }

        if (!willBlockMove ) {

            console.log("non moving block")
            // setDisplayValue(value);

            setTimeout(() => {
                setDisplayValue(value)
            },250)

            // api.start({to: { opacity: 1, x:0,y:0, zIndex: 100}, delay: 0, config: {
            //         duration: 30
            //     },
            //     onRest: () => {
            //         setBlockWillMove(false);
            //         displayBlock();
            //     }});


        }

    }, [actionState])


    // tell this piece to move at the app coordinate

    // 1. Triggers animation on receipt of a new moveList
    // 2. Moves to new Location
    // 3. Sets Value to Zero
    // 4. Sets value of new locations block to its value
    // 5. Silently, and immediately (invisible) moves back to its location

    return (<animated.div style={styles}>
        <div className="grid-item"
             style={customStyle}
             data-value={displayValue}
             data-x={location.x}
             data-y={location.y}
             key={key}
             ref={ref}
        >
            {(displayValue) ? displayValue : " "}

            <div className="debug-grid-locations">{location.x},{location.y}</div>
        </div>
    </animated.div>)
}


GridItem.propTypes = {
    homeLocation: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    value: PropTypes.number,
    resetIsComplete: PropTypes.func,
    isAllComplete: PropTypes.bool,
    setComplete: PropTypes.func,
    key: PropTypes.number,
    latestMoves: PropTypes.arrayOf(PropTypes.object, PropTypes.bool)
}


export default GridItem;