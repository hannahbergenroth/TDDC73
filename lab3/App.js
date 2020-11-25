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

//import gql from 'graphql-tag';

import Picker from './components/PickLanguage';
import Display from './components/Display';

import { GET_GITHUB } from './graphql/Queries';
import { GITHUBB } from './graphql/Queries';

//import { 'GITHUB_PERSONAL_KEY' } from 'react-native-dotenv'


const initialState = {
  language: "Top Overall",
};


const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;


const App = () => {
  const [state, setState] = useState(initialState);

  const setLanguage = (language) => {
    setState({ language: language });
  };

  return(
    <ScrollView>
      <GetGitHub/>
    </ScrollView>
  )
};

const GetExchangeRate = () => {
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

const GetGitHub = () => {
  const { loading, data, error } = useQuery(GITHUBB);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const renderData = data.search.edges;


  return renderData.map(function(name)  {
    return (
      <View><Text>{name.node.stargazers.totalCount}:{name.node.name}</Text></View>
    )
})
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darker,
  },
});

export default App;
