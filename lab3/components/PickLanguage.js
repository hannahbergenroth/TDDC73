import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const PickLanguage = ({ state, onUpdateState }) => {
  return (
    <Picker selectedValue={state.language} onValueChange={(itemValue, itemIndex) => onUpdateState('language', itemValue)}>
      <Picker.Item label='Top Overall' value='All' />
      <Picker.Item label='JavaScript' value='JavaScript' />
      <Picker.Item label='TypeScript' value='TypeScript' />
      <Picker.Item label='Go' value='Go' />
      <Picker.Item label='Rust' value='Rust' />
      <Picker.Item label='Swift' value='Swift' />
      <Picker.Item label='PHP' value='PHP' />
      <Picker.Item label='CSS' value='CSS' />
      <Picker.Item label='C' value='C' />
      <Picker.Item label='C#' value='C#' />
      <Picker.Item label='C++' value='C++' />
      <Picker.Item label='Python' value='Python' />
      <Picker.Item label='Ruby' value='Ruby' />
      <Picker.Item label='Java' value='Java' />
    </Picker >
  );
}

const styles = StyleSheet.create({
  pickerItem: {
    backgroundColor: '#000000',
  },
});

export default PickLanguage;
