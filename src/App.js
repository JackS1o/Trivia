import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/configuracoes" component={ Config } />
        <Route exact path="/play" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
