import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            {/*Router transition link*/}
            <Link to="/">Landing</Link>
            <Link to="/library">Library</Link>
          </nav>
          <h1>Bloc Jams</h1>
        </header>
        <main>
          {" "}
          {/*Router transition link*/}
          <Route exact path="/" component={Landing} />
          <Route exact path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
