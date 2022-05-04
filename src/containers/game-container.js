import PropTypes from "prop-types";

const GameContainer = ({children}) =>  {
    return (

        <div className="game-container">
            {children}
        </div>

    )
}

GameContainer.propTypes = {
    children: PropTypes.node
}

export default GameContainer;