import React, { useState }  from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity,  Dimensions } from 'react-native';

const Carousel = (props) => {

    const initialState = {
        currentItems: [],
        limit: props.split ? props.split : 2,
        activePage: 1,
      };

    const [state, setState] = useState(initialState);

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.data.length / state.limit); i++) {
        pageNumbers.push(i);
    }
    //Radiobuttons
    let renderPageNumbers = pageNumbers.map((number, index) => {
        return(
            <TouchableOpacity style={ styles.radiobutton } key={ index } onPress={ () => setState({ ...state, activePage: index + 1 }) }>
                { index + 1 == state.activePage ?
                    <View style={ styles.radiobuttonSelected }/>
                    : null
                }
            </TouchableOpacity>
        )
    })

    // Logic for displaying items
    let indexOfLastItem = state.activePage * state.limit;
    let indexOfFirstItem = indexOfLastItem - state.limit;
    let currentItems = [];
    currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
    let renderItems = [];
    renderItems = currentItems.map((item, index) => {
        let imageURL = { uri: item.url };
        //onPress={(() => props.onUpdateState(item))}
        //onPress={callback ? () => callback(cardInfo) : () => {}}>
        return(
            <TouchableOpacity activeOpacity={0.6} onPress={props.onPress ? () => props.onPress(item) : () => {}} style={ [styles.containerItem, { width: Dimensions.get('window').width/state.limit }] }  key={ index }>
                <Image source={ imageURL } style={ styles.img } />
            </TouchableOpacity>
        )
    })

    const incrementActivePage = () => {
        if(state.activePage == pageNumbers.length) {
            setState({
                ...state,
                activePage: 1,
            })    
        }
        else {
            setState({
                ...state,
                activePage: state.activePage + 1,
            })
        }
    };

    const decreaseActivePage = () => {
        if(state.activePage == 1) {
            setState({
                ...state,
                activePage: pageNumbers.length,
            })    
        }
        else {
            setState({
                ...state,
                activePage: state.activePage - 1,
            })
        }
    };

    return (
        <SafeAreaView>
            <View style={ styles.row1 }>
                { renderItems }
            </View>
            <View style ={ styles.row2 }>
                <View style={ styles.pageNumbers }>
                    { renderPageNumbers }
                </View>
               
                <TouchableOpacity onPress={() => decreaseActivePage()} style={ styles.btnLeft } >
                    <View style={ styles.textAlign }>
                        <Text style={ styles.font }>&#8592;</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementActivePage()} style={ styles.btnRight } >
                    <View style={ styles.textAlign }>
                        <Text style={ styles.font }>&#8594;</Text>
                    </View>
                </TouchableOpacity>
           
            </View>
        </SafeAreaView>
    );  
}

const styles = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row2: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: 5,
    },
    pageNumbers: {
        flex: 1,
        flexDirection: 'row', 
        marginRight: 10,  
        justifyContent: 'flex-end',
    },
    containerItem: {
        alignItems: 'center',
    },
    radiobutton: {
        height: 13,
        width: 13,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center', 
        marginLeft: 1,
        marginRight: 1
    },
    radiobuttonSelected: {
        height: 7,
        width: 7,
        borderRadius: 6,
        backgroundColor: 'black',
    },
    btnRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'flex-start', 
        backgroundColor: '#F0F0F0',
        height: 30,
        padding: 10,
        paddingTop: 0,
        borderWidth: 1,
        marginLeft: 1,
    },
    btnLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'flex-start', 
        backgroundColor: '#F0F0F0',
        height: 30,
        padding: 10,
        paddingTop: 0,
        borderWidth: 1,
        marginRight: 1,
    },
    font: {
        fontSize: 25,
    },
    textAlign: {
        flex: 1, 
        justifyContent: 'center',
       alignItems: 'flex-end',
       alignContent: 'flex-end',
       alignSelf: 'flex-end'
    },
    img: {
        width: '100%',
        height: undefined,
        aspectRatio: 2/3,
      },
});

export default Carousel;