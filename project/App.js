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

const [placeholder, setPlacholder] = useState("Pick a date");

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
          <Text style={{fontSize: 22, textAlign: 'center'}}>&#128197; {placeholder}</Text>
        </TouchableOpacity>
        <View>
          {showCalender ? <Calender getDate={(day) => setPlacholder(day)} /> : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
