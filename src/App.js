import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">Bloc Jams</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link to="/" className="p-2 text-dark">
              Landing
            </Link>
            <Link to="/library" className="p-2 text-dark">
              Library
            </Link>
          </nav>
        </div>
        <header className="bloc-jams-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Bloc Jams</h1>
        </header>
        <main className="container">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
