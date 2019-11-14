import React from 'react';
import './App.css';

// Importér Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importér Apollo Client og Apollo Provider
import client from './config/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Importér komponenter
import Header from './components/header/Header';
import AdminNav from './components/adminNav/AdminNav';
import Textarea from './components/textArea/Textarea';
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <AdminNav />
        <Switch>
          <Route path="/" exact component={Textarea} />
          <Route path="/login" exact component={LoginForm} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
