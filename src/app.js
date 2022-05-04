import './css/App.css';
import {RecoilRoot} from "recoil";
import KeypressHandler from "./components/keypress";
import GridContainer from "./containers/grid-container";
import GameContainer from "./containers/game-container";
import ShadowContainer from "./containers/shadow-container";
import UserInterfaceContainer from "./containers/user-interface-container";

function App() {
    return (
        <RecoilRoot>
            <GameContainer>
                        <ShadowContainer gridHeight={4} gridWidth={4}/>
                        <GridContainer gridHeight={4} gridWidth={4} />
            </GameContainer>
            <UserInterfaceContainer>

            </UserInterfaceContainer>

            <KeypressHandler />
        </RecoilRoot>
    );
}

export default App;
