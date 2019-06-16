import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameApp from "./game/GameApp";

function WelcomePage() {
  return (
    <header className="App-header">
      <img src="/logo.png" className="App-logo" alt="logo" />
      <p>Q-Música é?</p>
      <Link className="App-link" to="/games/">
        Jogar
      </Link>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/games" component={GameApp} />
      </Router>
    </div>
  );
}

export default App;
