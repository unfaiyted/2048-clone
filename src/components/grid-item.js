import React from "react";
import {useState} from "react";

const colorsMaps = new Map();

colorsMaps.set(2,"#eee4da")
colorsMaps.set(4,"#eddfc8")
colorsMaps.set(8, "#e4ab76")
colorsMaps.set(16, "#e4ab76")
colorsMaps.set(32, "#e4ab76")
colorsMaps.set(64, "#e4ab76")


export const GridItem = ({  initialLocation: { x:initX  , y:initY }, initialValue}) => {

    //
    // console.log("initialValue:", initialValue)
    // console.log("initY, initX:", initY, initX)

    const [location,setLocation] = useState({x:initX, y:initY})

    // console.log("location:", location.x, location.y)

    const customStyle = {
        backgroundColor: colorsMaps.get((initialValue) ? initialValue : null)
    }


    return (<div className="grid-item" style={customStyle} data-initial={initialValue} data-x={location.x} data-y={location.y}>
        {(initialValue) ? initialValue : " " }
    </div>)
}


export default GridItem;