import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';


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

    render() {
        const { decks } = this.props
        return (
            <View>
                <View>
                    <Text>What is the title of the new deck?</Text>
                    <TextInput
                      onChangeText={ text => onChangeText(text) }
                      value={this.state.inputValue}
                      />
                </View>
                <View>
                    <TouchableOpacity>
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