import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';


class QuizView extends Component {
    static propTypes = {
        //deck: PropTypes.object.isRequired
    }

    state = {
        currentIndex: 0,
        currentCardSide: 'question'
    }

    render() {
        //const { deck } = this.props
        return (
            <View>
                <Text>Quiz</Text>
            </View>
        )
            {/*<View>
                { this.currentCardSide === 'question' &&
                    <View>
                        <Text>{ deck.questions[currentIndex].question }</Text>
                        <TouchableOpacity>
                            <Text>Answer</Text>
                        </TouchableOpacity>
                    </View>         
                }
                { this.currentCardSide === 'answer' &&
                    <View>
                        <Text>{ deck.questions[currentIndex].answer }</Text>
                        <TouchableOpacity>
                            <Text>Question</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                    <TouchableOpacity>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>*/}
    }
}

function mapStateToProps({ deck }) {
    return {
        deck
    }
}

export default function(props) {
    const navigation = useNavigation()

    console.log(navigation)

    return <QuizView {...props} navigation={navigation}/>
}

//export default connect(mapStateToProps)(QuizView)