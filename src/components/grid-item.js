import React from "react";
import {useState} from "react";

const colorsMaps = new Map();

colorsMaps.set(2,"#eee4da")
colorsMaps.set(4,"#eddfc8")
colorsMaps.set(8, "#e4ab76")
colorsMaps.set(16, "#f59665")
colorsMaps.set(32, "#f67c5f")
colorsMaps.set(64, "#f65d3c")
colorsMaps.set(128, "#edce72")
colorsMaps.set(256, "#edcc64")
colorsMaps.set(512, "#edc851")
colorsMaps.set(1024, "#edc53f")
colorsMaps.set(2048, "#edc22d")


export const GridItem = ({  initialLocation: { x:initX  , y:initY }, initialValue}) => {

    const [location,setLocation] = useState({x:initX, y:initY})

    const customStyle = {
        backgroundColor: colorsMaps.get((initialValue) ? initialValue : null)
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