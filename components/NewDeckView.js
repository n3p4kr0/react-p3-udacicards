import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { createNewDeck } from '../store/actions'


class NewDeckView extends Component {
    static propTypes = {
        decks: PropTypes.object.isRequired
    }

    state = {
        inputValue: ''
    }

    onChangeText = (newValue) => {
        this.setState((prevState) => ({
            ...prevState,
            inputValue: newValue
        }))
    }

    onSubmit = () => {
        this.props.dispatch(createNewDeck(this.state.inputValue))

        this.props.navigation.navigate('DeckList')
    }

    render() {
        const { decks } = this.props
        return (
            <View>
                <View>
                    <Text>What is the title of the new deck?</Text>
                    <TextInput
                      onChangeText={ text => this.onChangeText(text) }
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

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewDeckView)

/*export default function(props) {
    const navigation = useNavigation()

    console.log(navigation)

    return <DeckDetailsView {...props} navigation={navigation}/>
}*/