import PropTypes from "prop-types";

const UserInterfaceContainer = ({children}) =>  {
    return (

        <div className="ui-container">
            {children}
        </div>

    )
}

UserInterfaceContainer.propTypes = {
    children: PropTypes.node
}

export default UserInterfaceContainer;