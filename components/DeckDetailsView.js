import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class DeckDetailsView extends Component {
    static propTypes = {
        deck: PropTypes.object.isRequired
    }

    render() {
        const { deck } = this.props
        return (
            <View>
                <View>
                    <Text>{deck.title}</Text>
                    <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
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

export default connect(mapStateToProps)(DeckDetailsView)