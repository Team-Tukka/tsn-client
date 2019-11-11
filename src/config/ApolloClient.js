import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
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
