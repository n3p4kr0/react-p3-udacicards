import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { shuffleArray } from '../utils/helpers'



class QuizView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quizMode: false,
            questions: props.questions,
            counter: 0,
            score: 0,
            currentCardSide: 'question'
        }
    }
    static propTypes = {
        //deck: PropTypes.object.isRequired
    }


    startQuiz = () => {
        // Shuffle the deck in the state and activates quizMode
        const { questions } = this.state.questions

        this.setState((prevState) => ({
            ...prevState,
            quizMode: true,
            //questions: shuffleArray(questions)
        }))
    }


    render() {
        const {questions, counter, score, quizMode, currentCardSide} = this.state

        if(!quizMode) {
            return (
                <View>
                    <Text>Quiz</Text>
                    { questions.length > 0 
                    ?
                        <TouchableOpacity onPress={this.startQuiz}>
                            <Text>Start the quiz !</Text>
                        </TouchableOpacity>

                    :   <Text>To play a quiz, please add at least a card to the deck.</Text>
                    }
                </View>
            )
        }
    

        else if(counter < questions.length) {
            return(
                <View>
                    <Text>{counter+1}/{questions.length}</Text>
                    { currentCardSide === 'question' && 
                    <View>
                        <Text>{questions[counter].question}</Text>
                        <TouchableOpacity onPress={() => this.setState((prevState) => ({...prevState, currentCardSide: 'answer'}))}>
                            <Text>Answer</Text>
                        </TouchableOpacity>
                    </View> 
                    }
                    
                    { currentCardSide === 'answer' && 
                    <View>
                        <View>
                            <Text>{questions[counter].answer}</Text>
                            <TouchableOpacity onPress={() => this.setState((prevState) => ({...prevState, currentCardSide: 'question'}))}>
                                <Text>Answer</Text>
                            </TouchableOpacity>
                        </View> 
                        
                        <Text>Did you guess right?</Text>
                        
                        {/* If the User clicks on Correct, increment his score, flip the card to Question side and show next question (increment counter) */}
                        <TouchableOpacity onPress={() => this.setState((prevState) => ({ ...prevState, counter: counter+1, score: score+1, currentCardSide: 'question' }))}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        
                        {/* If the User clicks on Incorrect, just flip the card to Question side and show next question (increment counter) */}
                        <TouchableOpacity onPress={() => this.setState((prevState) => ({ ...prevState, counter: counter+1, currentCardSide: 'question' }))}>
                            <Text>Incorrect</Text>
                        </TouchableOpacity>   
                    </View>                     
                    }

                    <Text>Current score : {score}</Text>

                </View>
            )
        }

        return (
            <View>
                <Text>Congrats ! You did {score} out of {questions.length}, which is {(score / questions.length * 100).toFixed(2)}%. </Text>
            </View>
        )
            
    }
}

function mapStateToProps({ }, {route}) {
    return {
        title: route.params.title,
        questions: route.params.questions
    }
}

connect()
export default connect(mapStateToProps)((props) => {
    const navigation = useNavigation()

    return (<QuizView {...props} navigation={navigation}/>)
})
