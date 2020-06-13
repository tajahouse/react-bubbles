import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage"
import PrivateRoute from "./components/PrivateRoute";

import "./styles.scss";


function App() {
  return (
    <Router>
      <div className="App">
        <Link className="link" to="/">Home</Link>
        <Route exact path="/" component={Login} />

        <PrivateRoute path="/protected" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
