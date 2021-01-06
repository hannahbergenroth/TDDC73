import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  TouchableOpacity,
  View
} from 'react-native';

import Carousel from './components/Carousel';
import Calender from './components/Calender';
const data = require('./data.json');

const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

// json file
// 
// {
//    "title": "TITLE",
//    "url": "LINK",
// }
//

const App = () => {
const [items, setItems] = useState(data);
const [showCalender, setShowCalender] = useState(false);

// Carousel: 
// required: data
// optional: split, onPress
// 
// Calender:
// required: -
// optional : date (in format YYYY-MM-DD), getDate

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Carousel data={items} split={3} onPress={(item) => Alert.alert(`${item.title}`)}/>
       
        <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
          <Text>x</Text>
        </TouchableOpacity>
        <View>
          {showCalender ? <Calender getDate={(day) => Alert.alert(day.toString())} date={'2021-01-17'}/> : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
