import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Carousel from './components/Carousel';
const data = require('./data.json');

// json file
// 
// {
//    "posterurl": "link here"
// }
//

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Carousel data={data} split={3}/>
      </SafeAreaView>
    </>
  );
};

export default App;
