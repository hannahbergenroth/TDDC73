import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import Appen from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';

import { GITHUB_TOKEN } from "@env";

// create an apollo link instance, a network interface for apollo client
const link = new HttpLink({
  uri: `https://api.github.com/graphql`,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`
  }
});
// Initialize Apollo Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const MyTheme = {
  dark: true,
  colors: {
    background: 'rgb(234, 242, 248)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
  },
};

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer theme={MyTheme}>
      <Appen />
    </NavigationContainer>
  </ApolloProvider>
);
AppRegistry.registerComponent(appName, () => App);