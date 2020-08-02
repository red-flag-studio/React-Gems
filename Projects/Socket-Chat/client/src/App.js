import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <Route path="/" exact component="{Join}" />
    <Route path="/chat" exact component="{Chat}" />
  </Router>
);

export default App;
