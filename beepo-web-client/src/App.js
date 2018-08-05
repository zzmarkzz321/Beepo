import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import {MainMenu} from "./Components/Core/main_menu";
import Prizes from './Components/Layout/prizes';
import Hint from './Components/Layout/hint';
import LeaderBoards from './Components/Layout/leader_boards';

import Beepo from './assets/beepo.png';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1 className="beepo-title">Beepo <img className='beepo' src={Beepo}/></h1>
                        <MainMenu/>
                    </header>

                    <div>
                        <Route exact path="/prizes" component={Prizes} />
                        <Route exact path="/hint" component={Hint} />
                        <Route exact path="/leader-boards" component={LeaderBoards} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
