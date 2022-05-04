import React from "react";
import {useState} from "react";
import {COLORS} from "../utils/constants";


export const GridItem = ({  initialLocation: { x:initX  , y:initY }, initialValue}) => {

    const [location,setLocation] = useState({x:initX, y:initY})

    const customStyle = {
        backgroundColor: COLORS.get((initialValue) ? initialValue : null)
    }

    return (<div className="grid-item"
                 style={customStyle}
                 data-initial={initialValue}
                 data-x={location.x}
                 data-y={location.y}
        >
        {(initialValue) ? initialValue : " "}
    </div>)
}


export default GridItem;