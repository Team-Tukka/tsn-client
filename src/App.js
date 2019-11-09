import React from "react";
import "./App.css";

// Import Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Components
import TextArea from "./components/textArea/TextArea";

function App() {
  return (
    <Router>
      <h1>Header her</h1>
      <Switch>
        <Route path="/" exact component={TextArea} />
      </Switch>
    </Router>
  );
}

export default App;
