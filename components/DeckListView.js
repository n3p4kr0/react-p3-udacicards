import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { decks } from '../utils/DATA'
import { useNavigation } from '@react-navigation/native';

function DeckListItem(deck) {
    deck = deck.deck
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => { 
        navigation.navigate('TabDeck', { screen: 'DeckDetails', params: { title: deck.title, questions: deck.questions } })
      }}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
      </TouchableOpacity>
    )
}

class DeckListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
          decks: decks
        }
    }

    static propTypes = {
        //decks: PropTypes.object.isRequired
    }

    renderItem = ({item}) => {
        return (
            <DeckListItem deck={item} />
        )
    }

    render() {
          const { navigation } = this.props
          const { decks } = this.state
          let deckArray = []

          Object.keys(decks).map((id) => {
            deckArray.push(decks[id])
          })

          return (
            <SafeAreaView>
                <FlatList 
                  data={deckArray}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.title}
                />
            </SafeAreaView>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default function(props) {
  const navigation = useNavigation()

  return <DeckListView {...props} navigation={navigation}/>
}
//export default connect(mapStateToProps)(DeckListView)