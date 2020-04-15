import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../store/actions'


class NewQuestionView extends Component {
    static propTypes = {
        //title: PropTypes.string.isRequired
    }

    state = {
        questionValue: '',
        answerValue: ''
    }

    onChangeQuestionValue = (newValue) => {
        this.setState((prevState) => ({
            ...prevState,
            questionValue: newValue
        }))
    }

    onChangeAnswerValue = (newValue) => {
        this.setState((prevState) => ({
            ...prevState,
            answerValue: newValue
        }))
    }

    onSubmit = () => {
        const question = {
            question: this.state.questionValue,
            answer: this.state.answerValue,
        }

        this.props.dispatch(addCardToDeck(this.props.deck.title, question))
        
        this.props.navigation.navigate("DeckList")
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Question:</Text>
                    <TextInput
                      onChangeText={ text => this.onChangeQuestionValue(text) }
                      value={this.state.questionValue}
                      />
                </View>          
                <View>
                    <Text>Answer:</Text>
                    <TextInput
                      onChangeText={ text => this.onChangeAnswerValue(text) }
                      value={this.state.answerValue}
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

function mapStateToProps({ decks }, { route }) {
    if(typeof route.params !== 'undefined' && route.params.hasOwnProperty('title')) {
        return {
            deck: decks[route.params.title]
        }
    }

    return {}
}

export default connect(mapStateToProps)((props) => {
    const navigation = useNavigation()

    return (<NewQuestionView {...props} navigation={navigation}/>)
})