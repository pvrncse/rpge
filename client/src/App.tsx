import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Main from './Main/Main';
import './App.css';

// import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:3001/graphql"})
])
const client = new ApolloClient({
  cache: new InMemoryCache,
  link: link
})
function App() {
 
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Main/>
    </div>
    </ApolloProvider>
  );
}

export default App;
