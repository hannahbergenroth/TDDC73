import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#1B574A"/>
      <View style={styles.container}>
        <Text style={styles.header}>Example 1</Text>
        <Image source={require('./img/bridge.png')} style={styles.logo}/>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btn_ind}>
            <Text>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_ind}>
            <Text>BUTTON</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
        <TouchableOpacity style={styles.btn_ind}>
          <Text>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_ind}>
          <Text>BUTTON</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.input_container}>
          <Text style = {styles.inputenn}>Email:</Text>
          <TextInput selectionColor={'#CD1B61'} style={styles.inputField} />
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2D8576',
    alignSelf: 'stretch',
    fontSize: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    color: '#fff',
    marginTop: 24,
  },
  logo: {
    marginTop: 16,
    marginBottom: 34,
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  btn: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
},
  btn_ind: {
    backgroundColor: '#D6D7D7',
    padding: 10,
  },
  inputenn: {
    marginLeft: 16,
    color: '#828282',
  },
  inputField: {
    width: 200,
    marginLeft: 65,
    borderBottomColor: '#CD1B61',
    borderBottomWidth: 2,
  },
  input_container: {
    flexDirection: 'row',
    marginTop: 26,
  }
});
