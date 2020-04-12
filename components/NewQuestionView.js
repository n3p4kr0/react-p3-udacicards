import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class NewQuestionView extends Component {
    static propTypes = {
        decks: PropTypes.object.isRequired
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
        const { decks } = this.props
        return (
            <View>
                <View>
                    <Text>Question:</Text>
                    <TextInput
                      onChangeText={ text => this.onChangeQuestionValue(text) }
                      value={value}
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

export default connect(mapStateToProps)(NewQuestionView)