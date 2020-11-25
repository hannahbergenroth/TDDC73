import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
  ActivityIndicator,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

import PickLanguage from './components/PickLanguage';

import Display from './components/Display';

import { GET_GITHUB } from './graphql/Queries';
import { GITHUB_DATA } from './graphql/Queries';

const initialState = {
  language: 'All',
};

const App = () => {
  const [state, setState] = useState(initialState);

  const updateState = (keyName, value) => {
    setState({
      ...state,
      [keyName]: value || initialState[keyName],
    });
  };

  return(
    <SafeAreaView>
      <PickLanguage state={state} onUpdateState={updateState}/>
      <Text>State:{state.language}</Text>
      <ScrollView>
        <GetGitHub state={state}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const GetGitHub = ({state}) => {
  const { loading, data, error } = useQuery(GITHUB_DATA, {
    variables: {
      query: `language:${state.language} stars:>10000`,
      pollInterval: 500,
    }
  });

  if (loading) return <ActivityIndicator size="small" color="#0000ff" />;
  if (error) return <Text>Error :(</Text>;

  const renderData = data.search.edges;


  return renderData.map(function(name)  {
    return (
      <View key={name.node.name}><Text>{name.node.stargazers.totalCount}:{name.node.name}</Text></View>
    )
})
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darker,
  },
});

export default App;
