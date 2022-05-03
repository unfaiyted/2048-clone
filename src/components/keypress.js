import React,{useEffect, memo} from "react";
import {keypressState} from "../utils/atoms"
import {useRecoilValue, useSetRecoilState} from "recoil";


const KeypressHandler = React.memo(({ children }) => {
    const presses = useRecoilValue(keypressState);
    const setKeypress = useSetRecoilState(keypressState);


    const buttonHandler = (e) => {
        // if (e.defaultPrevented) {
        //     return; // Do nothing if the event was already processed
        // }

        //ignored holding down the keys
        if(!e.repeat) {

            switch (e.key) {
                case "a":
                case "ArrowLeft":
                    setKeypress((old) => [...old, "left"]);
                    break;
                case "d":
                case "ArrowRight":
                    setKeypress((old) => [...old, "right"]);
                    break;
                case "w":
                case "ArrowUp":
                    setKeypress((old) => [...old, "up"])
                    break;
                case "s":
                case "ArrowDown":
                    setKeypress((old) => [...old, "down"])
                    break;
                default:
                     console.log("lastPress:", presses[presses.length - 1])
                    break;
            }
        }


    }


    // Makes sure to remove the handler and add a new one on remounts
    useEffect(() => {
        window.addEventListener('keydown', buttonHandler);
        return () => {
            window.removeEventListener('keydown', buttonHandler);

        }
    } )


    // On button press, move in the buttons indicated directions
    // inputs value should be up and down left right and WASD game keys
    // Objects should move from current position to the furthest position to the
    // direction that they pressed
    // Objects are combined when the match in value.
    // Combined object will set the moving item to null value
    // the other one will double its value






    return <React.Fragment>
        {children}
    </React.Fragment>
});

export default KeypressHandler;