import logo from './logo.svg';
import './App.css';
import GridItem from "./components/grid-item";
import {RecoilRoot} from "recoil";
import KeypressHandler from "./components/keypress";
import GridContainer from "./containers/grid-container";
import GameContainer from "./containers/game-container";
import ShadowContainer from "./containers/shadow-container";

function App() {
    return (
        <RecoilRoot>
            <GameContainer>
                        <ShadowContainer gridHeight={4} gridWidth={4}/>
                        <GridContainer gridHeight={4} gridWidth={4} />
            </GameContainer>
            <KeypressHandler />
        </RecoilRoot>
    );
}

export default App;
