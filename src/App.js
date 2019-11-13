import React from "react";
import "./App.css";

// Importér Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Importér Apollo Client og Apollo Provider
import client from "./config/apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

// Importér komponenter
import TextArea from "./components/textArea/TextArea";
import LoginForm from "./components/loginForm/LoginForm";

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <h1>Header her</h1>
        <Switch>
          <Route path="/" exact component={TextArea} />
          <Route path="/login" exact component={LoginForm} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
