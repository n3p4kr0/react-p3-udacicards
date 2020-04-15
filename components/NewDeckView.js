import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { createNewDeck } from '../store/actions'
import { white, orange, royalBlue } from '../utils/colors'
import ValidatedTextInput from './elements/ValidatedTextInput'
import validate from 'validate.js'

const formConstraints = {

}

class NewDeckView extends Component {
    static propTypes = {
        decks: PropTypes.object.isRequired
    }

    state = {
        inputValue: ''
    }



    onSubmit = () => {
        this.props.dispatch(createNewDeck(this.state.inputValue))

        this.props.navigation.navigate('DeckList')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>What is the title of the new deck?</Text>
                    <TextInput
                      onChangeText={ text => this.setState((prevState) => this.setState({ ...prevState, inputValue: text }))}
                      value={this.state.inputValue}
                      />
                </View>
                <View>
                    <TouchableOpacity onPress={ this.onSubmit }>
                        <Text>Submit</Text>
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
        fontSize: 20,
    },
    inputView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
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
