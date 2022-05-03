
import ShadowItem from "../components/shadow-item";


const ShadowContainer = ({gridHeight = 4, gridWidth = 4}) => {

    const totalItems = gridHeight * gridWidth;
    const gridItems = []

    for (let i = 0; i < totalItems; i++) {
        gridItems.push({
            grid: <ShadowItem key={i}/>
            , id: i
        })
    }


return (
    <div className="container shadow">
        {gridItems.map(({grid}) => {
            return grid
        })}

    </div>)
}


export default ShadowContainer;