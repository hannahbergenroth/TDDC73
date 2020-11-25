import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import { useQuery } from '@apollo/react-hooks';
//import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
//import gql from 'graphql-tag';

import Picker from './components/PickLanguage';
import Display from './components/Display';

import { GET_GITHUB } from './graphql/Queries';

const initialState = {
  language: "Top Overall",
};

// create an apollo link instance, a network interface for apollo client
const link = new HttpLink({
  uri: `https://api.github.com/graphql`,
  headers: {
    Authorization: 'b0235cb5044d4e17f51896038956504c8d32659a'
    //`Bearer GITHUB_TOKEN`
  }
});

const client2 = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

client2
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const VARIABLES = {
  "number_of_repos": 3,
}

const App = () => {
  const [state, setState] = useState(initialState);

  const setLanguage = (language) => {
    setState({ language: language });
  };

  const { loading, data, error } = useQuery(EXCHANGE_RATES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const renderData = data.rates;

  return renderData.map(({currency, rate}) => {
    return (
      <View><Text>{currency}:{rate}</Text></View>
    )
  })      
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darker,
  },
});

export default App;
