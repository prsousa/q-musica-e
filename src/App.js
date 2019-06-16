import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameApp from "./game/GameApp";

function WelcomePage() {
  return (
    <div>
      <img src="/logo.png" className="App-logo" alt="logo" />
      <p>Q-Música é?</p>
      <Link to="/games/">Jogar</Link>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/games" component={GameApp} />
        </Router>
      </header>
    </div>
  );
}

export default App;
