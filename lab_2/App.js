import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  Button,
  ImageBackground,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Picker} from '@react-native-picker/picker';

const card_img = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/17.jpeg');
const chip_img = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/chip.png');
const visa = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/visa.png');
const amex = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/amex.png');
const dinersclub = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/dinersclub.png');
const mastercard = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/mastercard.png');
const discover = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/discover.png');
const troy = require('/Users/hannahbergenroth/Desktop/tddc73/lab_2/troy.png');

const img_width = 675;
const img_height = 435;

class App extends Component {
  state = {
    cardNumber: '',
    cardName: 'FULL NAME',
    month: 'MM',
    year: 'YY',
    cvv: '',
    isCardFlipped: false,
  };

setCardNumber = (text) => {

  this.setState({
        cardNumber: text.replace(/[^0-9]/g, ''),
    });
};

  setCardName = (text) => {
     const temp = text;
     var capital_name = temp.toUpperCase() ;
     this.setState({cardName: capital_name});
  };

  setCardCVV = (text) => {
    this.setState({
          cvv: text.replace(/[^0-9]/g, ''),
      });
  };

  showCardNumber = () => {
    const a = this.state.cardNumber.length;
    let text = "";

    const type = this.getCardType().toString();


    for(let i = 0; i < 16; i++) {

      if(i < a ) {
        if(i > 3 && i < 12) {
          text += '*';
        }
        else {
          text += this.state.cardNumber[i];
        }
      }
      else {
       text += '#';
      }
      if(type=="4") {
        if(i==3 || i==9 )
        text += '   ';
      }
      else {
        if(i==3 || i==7 || i == 11 ) {
          text += '   ';
        }
      }
    }

    return(<Text style={styles.font3}>{text}</Text>);
  };
  showCVV=()=>{
    let text = '';

    for(let i=0; i<this.state.cvv.length; i++){
      text += '*';
    }
    return text;
  };

  getCardType = () => {
    const number = this.state.cardNumber;

    let re = new RegExp("^4");
    if (number.match(re) != null) return visa;


    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return amex;

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return mastercard;

    re = new RegExp("^6011");
    if (number.match(re) != null) return discover;

    re = new RegExp('^9792')
    if (number.match(re) != null) return troy;


    return visa; // default type
  };

  style = (str) => {
    if(str=="3") //visa
    return {
      width: '25%',
      aspectRatio: 200/106,
   }
   else if(str=="4") //amex
   return {
     width: '30%',
     aspectRatio: 250/86,
  }

  else if(str=="5") //dinersclub
  return{
    width: '25%',
    aspectRatio: 250/69,
  }

  else if(str=="6") //mastercard
  return{
    width: '20%',
    aspectRatio: 250/195,
  }
  else if(str=="7") //discover
  return{
    width: '30%',
    aspectRatio: 2400/504,
  }
  else if(str=="8") //troy
  return{
    width: '30%',
    aspectRatio: 250/111,
  }

  };

    flipCard = (status) => {
      if(status == true && this.state.isCardFlipped==false)
        this.setState({isCardFlipped: true});
      else if(status == false && this.state.isCardFlipped==true)
        this.setState({isCardFlipped: false});
    };

  render() {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.container}>
        <View style={styles.img_container}>
        {this.state.isCardFlipped ?
          <ImageBackground source={card_img} style={styles.img}>
          <View style={styles.cardRow1_back}><View style={styles.remsa2}></View>
          <View style={styles.cvv}></View><Text style={styles.cvv_font}>CVV</Text></View>
          <View style={styles.cardRow2_back}>
          <View style={styles.remsa}><View style={{flex: 1, justifyContent: 'center'}}><Text style={{alignSelf: 'flex-end', paddingRight: 10}}>{this.showCVV()}</Text></View></View>
          </View>
          <View style={styles.cardRow3_back}>
          <Image source={this.getCardType()} style={this.style(this.getCardType().toString(),styles.img_back_logo)}/>
          </View>

          </ImageBackground>
          :
          <ImageBackground source={card_img} style={styles.img}>
          <View style={styles.cardRow1}>
            <Image source={chip_img} style={styles.img_chip}/>
            <Image source={this.getCardType()} style={this.style(this.getCardType().toString())}/>

          </View>
          <View style={styles.cardRow2}>
            <View style={styles.fontCardNumber}>
              {this.showCardNumber()}
            </View>
          </View>
          <View style={styles.cardRow3}>
            <Text style={styles.font2}>Card Holder</Text>
            <Text style={styles.font2}>Expires</Text>
          </View>
        <View style={styles.cardRow4}>
          <Text style={styles.font}>{this.state.cardName}</Text>
          <Text style={styles.font}>{this.state.month}/{this.state.year}</Text>
        </View>

          </ImageBackground>}
          </View>
          <View style ={styles.form}>
            <Text style={styles.text}>Card Number</Text>
            <TextInput keyboardType={'numeric'}  style={styles.input} value ={this.state.cardNumber} maxLength={16} onChangeText={value => this.setCardNumber(value)}/>
            <Text style={styles.text}>Card Name</Text>
            <TextInput style={styles.input} onChangeText={ (text) => this.setCardName(text) } />

            <View style={styles.form_row}>
              <Text style={{marginTop: 15, width:'70%'}}>Expiration Date</Text>
              <Text style={styles.text}>CVV</Text>
            </View>
            <View style ={styles.form_row}>
              <Picker selectedValue={this.state.month}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
                <Picker.Item label="01" value="01" />
                <Picker.Item label="02" value="02" />
                <Picker.Item label="03" value="03" />
                <Picker.Item label="04" value="04" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="07" value="07" />
                <Picker.Item label="08" value="08" />
                <Picker.Item label="09" value="09" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
              <Picker selectedValue={this.state.year} style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>this.setState({year: itemValue})}>
                <Picker.Item label="2020" value="20" />
                <Picker.Item label="2021" value="21" />
                <Picker.Item label="2022" value="22" />
                <Picker.Item label="2023" value="23" />
                <Picker.Item label="2024" value="24" />
                <Picker.Item label="2025" value="25" />
                <Picker.Item label="2026" value="26" />
                <Picker.Item label="2027" value="27" />
                <Picker.Item label="2028" value="28" />
                <Picker.Item label="2029" value="29" />
                <Picker.Item label="2030" value="30" />
                <Picker.Item label="2031" value="31" />
              </Picker>
              <TextInput keyboardType={'numeric'} onBlur={() => this.flipCard(false)} onFocus={() => this.flipCard(true)} style={styles.input_CVV} value={this.state.cvv} maxLength={4} onChangeText={value => this.setCardCVV(value)}/>
            </View>
            <View style={styles.btn}>
              <Button title="Submit"/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );}
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
    height: '100%',
    padding: 10,
  },
  card_container: {
    alignItems: "center",
  },
  img_container: {
    width: '80%',
    zIndex: 1,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: img_width/img_height,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    zIndex: 1,
    justifyContent: 'space-around',
  },

  img_back_logo: {
    alignSelf: 'flex-end',
  },
  remsa: {
    flex: 1,
    width: '100%',
    //height: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,


  },
  remsa2: {
    flex:2,
    backgroundColor: '#000000',
    width: '100%',
    opacity: 0.75,
    alignItems: 'flex-end',
    marginTop: 20,
  },

  img_jcb: {
    aspectRatio: 117/117,
  },

  img_unionPay: {
    aspectRatio: 320/200,
  },
  img_chip: {
    width: '20%',
    aspectRatio: 101/82,
  },
  font: {
    color: '#fff',
    fontSize: 16,
  },
  font2: {
    color: '#DCDCDC',
    fontSize: 12,
  },
font3: {
  color: '#fff',
  fontSize: 20,
},
  fontCardNumber: {
    alignSelf: 'center',

  },
  input: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
  },
  text: {
    marginTop: 15,
  },
  cardRow1: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardRow1_back: {
    flex: 3,
    width: '100%',
    height: '10%',
    alignItems: 'center',
  },

  cardRow2_back: {
    flex: 1,
    width: '92%',
    height: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  cardRow3_back: {
    flex:3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
    opacity: 0.75,
  },
  cardRow2: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardRow3: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardRow4:{
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cvv: {
    flex:1,
    alignContent: 'flex-end',

  },
  cvv_font: {
    color: '#fff',
    fontSize: 11,
    alignSelf: 'flex-end',
    marginRight: 20,

  },

  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    //position: 'relative',
    top: -0.68*(img_height*img_height/img_width)/2,
    zIndex: 0,
    padding: 25,
    paddingTop: 0.68*(img_height*img_height/img_width)/2+25,
  },
  form_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picker: {
    width: '35%',
    borderWidth: 1,
    borderColor: '#D3EAFD',
  },
  input_CVV: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    width: '30%',
    alignContent: 'flex-end',
  },
  btn: {
    marginTop: 30,
  },
});

export default App;
