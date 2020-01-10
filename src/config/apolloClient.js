import ApolloClient from 'apollo-boost';

// Instantiér Apollo Client
const client = new ApolloClient({
  uri: 'https://hovedopgave.tukka.dk/graphl',
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

export default client;
