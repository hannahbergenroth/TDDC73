import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
  ActivityIndicator,
  Button,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { StackNavigator } from 'react-navigation';

import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

import PickLanguage from './components/PickLanguage';

import Display from './components/Display';

import { GET_GITHUB } from './graphql/Queries';
import { GITHUB_DATA } from './graphql/Queries';

const ScreenHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const initialState = {
  language: 'All',
};

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top 20 Trending last week" component={GetGitHub} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
};

const GetGitHub = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const updateState = (keyName, value) => {
    setState({
      ...state,
      [keyName]: value || initialState[keyName],
    });
  };
  const { loading, data, error } = useQuery(GITHUB_DATA, {
    variables: {
      query: `language:${state.language} created:>2020-11-20 sort:stars-desc`,
      pollInterval: 500,
    }
  });

  if (loading) return <ActivityIndicator size="large" color="#fff" />;
  if (error) return <Text>Error :(</Text>;

  const renderData = data.search.edges;

  return (
    <SafeAreaView >


      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {renderData.map(function (name) {
            return (
              <View onStartShouldSetResponder={() => navigation.navigate('Details', { name: name })} style={styles.row} key={name.node.name}><Text>{name.node.name}</Text><Text>{name.node.owner.login}/{name.node.name}</Text><Text>{name.node.description}</Text><Text>stars:{name.node.stargazers.totalCount}, forks:{name.node.forks.totalCount}</Text></View>
            )
          }
          )}
        </View>

      </ScrollView>
      <View>
        <PickLanguage state={state} onUpdateState={updateState} />
      </View>

    </SafeAreaView>
  )
};

const DetailScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This is {route.params.name.node.name}'s profile , alias: {route.params.name.node.owner.login}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#74BEA7',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: ScreenHeight - 124,
  },
  container: {

  },
  row: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 4,
    padding: 10,
  }
});

export default App;
