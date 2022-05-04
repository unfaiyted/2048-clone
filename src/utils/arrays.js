import {percentChanceBoolean} from "./numbers"

let id = 0;
export const getId = ()  => {
    return id++;
};

export const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeItemAtIndex = (arr, index) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export const createGrid = (width, height, startingFilled = 2) => {

    const totalSize = width * height;

    let grid = []

    for(let w = 0; w < width; w++) {
        grid[w] = [];

        for(let h=0; h< height; h++) {

            const current = (w+1)*(h+1);

            const setStartingValue = (startingFilled > 0 && percentChanceBoolean(0.2 + (current/totalSize)));
            // starts at 20% chance and goes up each item until its 100%

            // console.log("initX, initY :", initX, initY);
            const initialValue = ((setStartingValue)) ? 2 : 0;

            grid[w][h] = initialValue;
            if(setStartingValue) startingFilled--;


        }
    }

    console.log("grid:", grid)

    return grid;
}
