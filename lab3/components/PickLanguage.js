import { Picker } from '@react-native-picker/picker';
import React from 'react';

const PickLanguage = ({state, onUpdateState}) => {
    return (
      <Picker selectedValue={state.language} onValueChange={(itemValue, itemIndex) => onUpdateState(itemValue)}>
        <Picker.Item label="Top Overall" value="Top Overall" />
        <Picker.Item label="JavaScript" value="JavaScript" />
        <Picker.Item label="TypeScript" value="TypeScript" />
        <Picker.Item label="Go" value="Go" />
        <Picker.Item label="Rust" value="Rust" />
        <Picker.Item label="Swift" value="Swift" />
        <Picker.Item label="PHP" value="PHP" />
        <Picker.Item label="CSS" value="CSS" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="C#" value="C#" />
        <Picker.Item label="C++" value="C++" />
        <Picker.Item label="Python" value="Python" />
        <Picker.Item label="Ruby" value="Ruby" />
        <Picker.Item label="Java" value="Java" />
      </Picker>
    );
}
export default PickLanguage;
