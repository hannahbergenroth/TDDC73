import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Appen from './App';

import {name as appName} from './app.json';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Appen />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
