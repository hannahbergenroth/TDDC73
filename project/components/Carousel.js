import React, { useState }  from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity,  Dimensions } from 'react-native';

const Carousel = ({ data, split }) => {
    const initialState = {
        currentItems: [],
        limit: split,
        activePage: 1,
      };

    const [state, setState] = useState(initialState);

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / state.limit); i++) {
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
    currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    let renderItems = [];
    renderItems = currentItems.map((data, index) => {
        let imageURL = { uri: data.posterurl };
        return(
            <View style={ [styles.containerItem, { width: Dimensions.get('window').width/state.limit }] } key={ index }>
                <Image source={ imageURL } style={ styles.img } />
            </View>
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
                <View style ={ styles.pageNumbers }>
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
        alignSelf: 'flex-end', 
        alignItems: 'center', 
        margin: 5
    },
    pageNumbers: {
        flexDirection: 'row', 
        marginRight: 10
    },
    containerItem: {
        alignItems: 'center',
    },
    radiobutton: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center', 
        marginLeft: 1,
        marginRight: 1
    },
    radiobuttonSelected: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: '#B1B2B2',
    },
    btnRight: {
        borderTopRightRadius:15,
        borderBottomRightRadius: 15,
        alignItems: 'flex-start', 
        backgroundColor: '#B1B2B2',
        height: 40,
        padding: 10,
        paddingTop: 0,
    },
    btnLeft: {
        borderTopLeftRadius:15,
        borderBottomLeftRadius: 15,
        alignItems: 'flex-start', 
        backgroundColor: '#B1B2B2',
        height: 40,
        padding: 10,
        paddingTop: 0,
    },
    font: {
        fontSize: 25,
    },
    textAlign: {
        flex: 1, 
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: undefined,
        aspectRatio: 2/3,
      },
});

export default Carousel;