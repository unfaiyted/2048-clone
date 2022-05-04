import React from "react";
import PropTypes from 'prop-types';
import {useState} from "react";
import {COLORS} from "../utils/constants";
import { animated } from '@react-spring/web';



export const GridItem = ({  homeLocation: { x  , y }, value}) => {

    const [location] = useState({x, y})

    const customStyle = {
        backgroundColor: COLORS.get((value) ? value : null)
    }

    // tell this piece to move at the app coordinate

    return (
        <animated.div>
            <div className="grid-item"
                 style={customStyle}
                 data-value={value}
                 data-x={location.x}
                 data-y={location.y}
            >
                {(value) ? value : " "}

                <div className="debug-grid-locations">{location.x},{location.y}</div>
            </div>
        </animated.div>
        )
}

GridItem.propTypes = {
    homeLocation: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    value: PropTypes.number
}


export default GridItem;