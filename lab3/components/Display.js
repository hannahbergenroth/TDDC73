import React from 'react';
import { Text } from 'react-native';

const Display = ({state}) => {
  return (
    <Text>{state.language}</Text>
  );
}
export default Display;
