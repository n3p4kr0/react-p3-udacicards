import React, { Component } from 'react'
import { SafeAreaView, Button, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { decks } from '../utils/DATA'
import { useNavigation } from '@react-navigation/native';

function DeckListItem(deck) {
    deck = deck.deck
    const navigation = useNavigation();
    return (
      <TouchableOpacity 
        onPress={() => { 
          navigation.navigate('TabDeck', { screen: 'DeckDetails', params: { title: deck.title, questions: deck.questions } })
        }}
        onLongPress={() => {
          Alert.alert('Appui long', 'TODO : Add a menu allowing to delete the deck or change its title')
        }}
      >
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
      </TouchableOpacity>
    )
}

class DeckListView extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        /*React.useLayoutEffect(() => {
          props.navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => props.navigation.navigate("NewDeck")} title="Add Deck" />
            ),
          });
        });*/
    }

    static propTypes = {
        decks: PropTypes.array.isRequired
    }

    renderItem = ({item}) => {
        return (
            <DeckListItem deck={item} />
        )
    }

    render() {
          const { decks } = this.props
          let deckArray = []

          return (
            <SafeAreaView>
                <FlatList 
                  data={decks}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.title}
                />
            </SafeAreaView>
        )
    }
}

function mapStateToProps({ decks }) {
    let deckArray = []
    Object.keys(decks).map((id) => {
      deckArray.push(decks[id])
    });
    console.log(deckArray)

    return {
        decks: deckArray
    }
}

export default connect(mapStateToProps)((props) => {
  const navigation = useNavigation()

  return (<DeckListView {...props} navigation={navigation}/>)
})

/*export default function(props) {
  const navigation = useNavigation()


  return <DeckListView {...props} navigation={navigation}/>
}
//export default connect(mapStateToProps)(DeckListView)*/