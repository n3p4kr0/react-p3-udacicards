import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { createNewDeck } from '../store/actions'
import { white, orange, royalBlue } from '../utils/colors'

class NewDeckView extends Component {
    state = {
        inputValue: '',
        error: ''
    }

    onSubmit = () => {
        // TODO : Check if no other deck already has the same title
        if(this.props.decks.hasOwnProperty(this.state.inputValue)) {
            this.setState((prevState) => ({
                ...prevState,
                error: 'You already have a deck named ' + this.state.inputValue
            }))
            return;
        }

        // TODO : Check if the name is not empty
        if(this.state.inputValue === '') {
            this.setState((prevState) => ({
                ...prevState,
                error: "The deck's name cannot be empty"
            }))
            return;
        }

        this.props.dispatch(createNewDeck(this.state.inputValue))

        setTimeout((() => {
            this.props.navigation.navigate("DeckDetails", { title: this.state.inputValue, questions: [] }) 
        }), 200)    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>What is the title of the new deck?</Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Enter a deck title'
                      // TODO : CHANGE THIS TO A CALLBACK FUNCTION
                      onChangeText={ text => this.setState((prevState) => this.setState({ ...prevState, inputValue: text, error: '' }))}
                      value={this.state.inputValue}
                      />
                    { this.state.error !== '' && (<Text style={styles.error}>{this.state.error}</Text>) }
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ this.onSubmit }>
                        <Text style={styles.textBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: royalBlue,
        flex: 1
    },
    text: {
        color: white,
        fontSize: 25,
    },
    inputView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        flex: 1
    },
    input: {
        marginTop: 30,
        height: 40,
        borderBottomColor: white,
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        width: 300,
        color: white,
    },
    btnContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: orange,
        borderRadius: 30,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 15,
        marginBottom: 15
    },
    textBtn: {
        color: white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    error: {
        color: white,
        marginTop: 10,
        fontStyle: 'italic'
    }
})



function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)((props) => {
    const navigation = useNavigation()

    return (<NewDeckView {...props} navigation={navigation}/>)
})
