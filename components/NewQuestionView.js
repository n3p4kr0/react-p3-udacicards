import React, { Component, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { white, orange, royalBlue } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../store/actions'


class NewQuestion extends Component {
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
        
        setTimeout((() => {
            this.props.navigation.navigate("DeckDetails", { title: this.props.deck.title, questions: this.props.deck.questions }) 
        }), 200)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>Question</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Please enter the question"
                      onChangeText={ text => this.onChangeQuestionValue(text) }
                      value={this.state.questionValue}
                      />
                </View>          
                <View style={styles.inputView}>
                    <Text style={styles.text}>Answer</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Please enter the answer"
                      onChangeText={ text => this.onChangeAnswerValue(text) }
                      value={this.state.answerValue}
                      />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={ this.onSubmit }>
                        <Text style={styles.textBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


function NewQuestionView (props) {
    useLayoutEffect(() => {
        props.navigation.setOptions({
          title: 'Add a Card'
        });
      });

    return (
        <NewQuestion {...props} />
    )    
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: royalBlue,
        flex: 1
    },
    text: {
        color: white,
        fontSize: 25,
        fontWeight: 'bold'
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
    }
})





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