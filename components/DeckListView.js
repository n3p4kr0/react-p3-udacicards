import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function DeckListItem({ title, nbCards }) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{nbcards} card{nbCards > 1 ? 's' : ''}</Text>
        </View>
    )
}

class DeckListView extends Component {
    static propTypes = {
        decks: PropTypes.object.isRequired
    }

    render() {
        const { decks } = this.props
        return (
            <View>
                <FlatList 
                  data={decks}
                  renderItem={({ item }) => <DeckListItem title={item} nbCards={item.questions.length} />}
                  keyExtractor={item => item.title}
                />
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckListView)