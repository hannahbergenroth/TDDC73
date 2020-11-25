import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import Appen from './App';

import {name as appName} from './app.json';


// create an apollo link instance, a network interface for apollo client
const link = new HttpLink({
  uri: `https://api.github.com/graphql`,
  headers: {
    Authorization: `Bearer `
  }
});

const client2 = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

client2
  .query({
    query: gql`
      query FindIssueID {
        repository(owner:"octocat", name:"Hello-World"){
          issue(number:349) {
            id
          }
        }
      }
      `
})
 .then(result => console.log(result));

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});





const App = () => (
  <ApolloProvider client={client2}>
    <Appen />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
