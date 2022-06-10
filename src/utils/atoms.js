import { atom } from "recoil";
import {createGrid} from "./arrays";

//example:
// export const todoListState = atom({
//     key: 'todoListState',
//     default: [],
// });


// export const gridContainerState = atom({
//     key: 'gridContainerState',
//     default: []
// });

export const gridState = atom({
    key: 'gridState',
    default: [createGrid(4, 4)]

})

export const gridItemManagerState = atom({
    key: 'gridItemManagerState',
    default: {
        moving: 0,
        resting: 0,
        started: false,
        pressIndex:1,
        moveAnimationCompleted: false,
    }
})


export const keypressState = atom({
    key: 'keypressState',
    default: [null]
})