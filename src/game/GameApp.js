import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameList from "./GameList";
import GameDetail from "./GameDetail";
import GameTeamDetail from "./GameTeamDetail";

function GameApp() {
  return (
    <div className="App">
      <Router>
        <Route path="/games/" exact component={GameList} />
        <Route path="/games/:id" exact component={GameDetail} />
        <Route path="/games/:id/teams/:teamId" component={GameTeamDetail} />
      </Router>
    </div>
  );
}

export default GameApp;
