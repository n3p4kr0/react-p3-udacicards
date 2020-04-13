import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';


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

//export default connect(mapStateToProps)(NewQuestionView)
export default function(props) {
    const navigation = useNavigation()

    return <NewQuestionView {...props} navigation={navigation}/>
}