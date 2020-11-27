import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import PickLanguage from './components/PickLanguage';
import DetailScreen from './components/DetailScreen';

import { GITHUB_DATA } from './graphql/Queries';

const ScreenHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const date = moment().subtract(7, 'days').format('YYYY-MM-DD')

const initialState = {
  language: 'All',
};

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top 20 This Week" component={HomePage} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
};

const HomePage = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const updateState = (keyName, value) => {
    setState({
      ...state,
      [keyName]: value || initialState[keyName],
    });
  };
  const { loading, data, error } = useQuery(GITHUB_DATA, {
    variables: {
      query: `language:${state.language} created:>${date} sort:stars-desc`,
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
              <TouchableOpacity onPress={() => navigation.navigate('Details', { name: name })} style={styles.row} key={name.node.name}>
                <Text style={styles.heading}>{name.node.name}</Text>
                <Text style={styles.subheading}>{`${(name.node.owner.login) ? name.node.owner.login + '/' : ''}`}{name.node.name}</Text>
                <Text style={styles.description}>{name.node.description}</Text>
                <Text style={styles.text_stars}>stars:{name.node.stargazers.totalCount} forks:{name.node.forks.totalCount}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      <View>
        <PickLanguage state={state} onUpdateState={updateState} />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EAF2F8',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: ScreenHeight - 128,
  },
  heading: {
    fontSize: 18,
  },
  subheading: {
    color: 'gray',
  },
  description: {
    marginBottom: 10,
    marginTop: 10,
  },
  text_stars: {
    textAlign: 'right',
    color: 'gray',
  },
  row: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 4,
    padding: 10,
  }
});
export default App;