import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';


class DeckDetailsView extends Component {
    static propTypes = {
        //deck: PropTypes.object.isRequired
    }

    onPressBtnAddCard = () => {
        const { title } = this.props.route.params
        this.props.navigation.navigate('NewQuestion', { title: title })
    }

    onPressBtnShowQuiz = () => {
        const { title, questions } = this.props.route.params
        //console.log(this.props.route)
        this.props.navigation.navigate('Quiz', { title: this.props.route.params.title, questions: this.props.route.params.questions })
    }

    render() {
        const { title, questions } = this.props.route.params
        return (
            <View>
                <View>
                    <Text>{title}</Text>
                    <Text>{questions.length} card{questions.length > 1 ? 's' : ''}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.onPressBtnAddCard}>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.onPressBtnShowQuiz}>
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps({ deck }) {
    return {
        deck
    }
}

export default connect(mapStateToProps)((props) => {
    const navigation = useNavigation()

    return (<DeckDetailsView {...props} navigation={navigation}/>)
})
