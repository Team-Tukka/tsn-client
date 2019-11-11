import React from 'react';
import './App.css';

// Import Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Apollo Imports
import client from './config/ApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Import Components
import TextArea from './components/textArea/TextArea';
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <h1>Header her</h1>
        <Switch>
          <Route path='/' exact component={TextArea} />
          <Route path='/login' exact component={LoginForm} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
