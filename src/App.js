import React from "react";
import "./App.css";

// Import Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Components
import TextArea from "./components/textArea/TextArea";
import LoginForm from "./components/loginForm/LoginForm";

function App() {
  return (
    <Router>
      <h1>Header her</h1>
      <Switch>
        <Route path="/" exact component={TextArea} />
        <Route path="/login" exact component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
