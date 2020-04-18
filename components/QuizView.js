import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';
import { shuffleArray } from '../utils/helpers'
import { white, orange, royalBlue } from '../utils/colors'



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
        // TODO : Shuffle the deck in the state and activates quizMode
        const { questions } = this.state.questions

        this.setState((prevState) => ({
            ...prevState,
            quizMode: true,
            questions: shuffleArray(this.state.questions)
        }))
    }

    navigateToDeckDetails = () => {
        this.props.navigation.navigate('DeckDetails', { title: this.props.route.params.title })
    }


    render() {
        const {questions, counter, score, quizMode, currentCardSide} = this.state

        if(!quizMode) {
            return (
                <View style={styles.container}>
                    <View style={styles.title}><Text style={styles.titleText}>Quiz</Text></View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>Test your knowledge!{"\n"}{"\n"}Each of the card you added to this deck will
                        show one by one, and you'll have to guess the answer. If you got it right, you get one point!</Text>
                    </View>
                    <View style={styles.quiz}>
                        { questions.length > 0 
                        ?
                            <TouchableOpacity onPress={this.startQuiz} style={styles.btn}>
                                <Text style={styles.textBtn}>Start the quiz !</Text>
                            </TouchableOpacity>

                        :   <Text style={styles.text}>To play a quiz, please add at least a card to the deck.</Text>
                        }
                    </View>
                </View>
            )
        }
    

        else if(counter < questions.length) {
            return(
                <View style={styles.container}>
                    <View style={styles.counters}>
                        <Text style={styles.questionsCounterText}>{counter+1}/{questions.length}</Text>
                        <Text style={styles.currentScoreText}>Current score : {score}</Text>
                    </View>

                    <View style={styles.questionAnswerContainer}>
                        { currentCardSide === 'question' && 
                        <View style={styles.question}>
                            <Text style={styles.questionText}>{questions[counter].question}</Text>
                            <TouchableOpacity
                            style={styles.flipBtn}
                            onPress={() => this.setState((prevState) => ({...prevState, currentCardSide: 'answer'}))}>
                                <Text style={styles.flipBtnText}>See Answer</Text>
                            </TouchableOpacity>
                        </View> 
                        }
                        
                        { currentCardSide === 'answer' && 
                        <View>
                            <View style={styles.answerContainer}>
                                <View style={styles.answer}>
                                <Text style={styles.answerText}>{questions[counter].answer}{'\n'}</Text>
                                </View>
                                <TouchableOpacity
                                style={styles.flipBtn}
                                onPress={() => this.setState((prevState) => ({...prevState, currentCardSide: 'question'}))}
                                >
                                    <Text style={styles.flipBtnText}>See Question</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.moduleCorrectIncorrect}>                        
                                {/* If the User clicks on Correct, increment his score, flip the card to Question side and show next question (increment counter) */}
                                <TouchableOpacity 
                                style={styles.btn}
                                onPress={() => this.setState((prevState) => ({ ...prevState, counter: counter+1, score: score+1, currentCardSide: 'question' }))}
                                >
                                    <Text style={styles.textBtn}>Correct</Text>
                                </TouchableOpacity>
                                
                                {/* If the User clicks on Incorrect, just flip the card to Question side and show next question (increment counter) */}
                                <TouchableOpacity
                                style={styles.btn}
                                onPress={() => this.setState((prevState) => ({ ...prevState, counter: counter+1, currentCardSide: 'question' }))}
                                >
                                    <Text style={styles.textBtn}>Incorrect</Text>
                                </TouchableOpacity>   
                            </View>
                        </View>                     
                        }
                    </View>

                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.finalResultsText}>Congrats ! You did {score} out of {questions.length}, which is {(score / questions.length * 100).toFixed(2)}%. </Text>
                <TouchableOpacity onPress={this.navigateToDeckDetails} style={styles.btn}>
                    <Text style={styles.textBtn}>Go back to the Deck</Text>
                </TouchableOpacity>
            </View>
        )
            
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: royalBlue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: white,
        fontSize: 50,
        fontWeight: 'bold'
    },
    description: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    descriptionText: {
        color: white,
        fontSize: 20,
        textAlign: 'center'
    },
    counters: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentScoreText: {
        color: white,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionsCounterText: {
        color: white,
        fontSize: 20
    },
    questionAnswerContainer: {
        flex: 10
    },
    question: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    questionText: {
        color: white,
        fontSize: 40,
        textAlign: 'center'
    },
    answerContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    answerText: {
        color: white,
        fontSize: 30,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    moduleCorrectIncorrect: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    quiz: {
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
    finalResultsText: {
        color: white,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 20,
        textAlign: 'center'
    },
})

function mapStateToProps({ }, {route}) {
    return {
        title: route.params.title,
        questions: route.params.questions
    }
}

export default connect(mapStateToProps)((props) => {
    const navigation = useNavigation()

    return (<QuizView {...props} navigation={navigation}/>)
})
