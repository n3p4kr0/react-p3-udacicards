import React, { Component, useLayoutEffect } from 'react'
import { SafeAreaView, Button, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { decks } from '../utils/DATA'
import { useNavigation } from '@react-navigation/native';

function DeckListItem(deck) {
    console.log(deck.deck)
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


function DeckListView(props) {
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => props.navigation.navigate("NewDeck")} title="Add Deck" />
        ),
      });
    });

    const { decks } = props

    return (
      <SafeAreaView>
          <FlatList 
            data={decks}
            renderItem={item => {return (<DeckListItem deck={item.item} />)}}
            keyExtractor={item => item.title}
          />
      </SafeAreaView>
    )
}

function mapStateToProps({ decks }) {
    let deckArray = []
    Object.keys(decks).map((id) => {
      deckArray.push(decks[id])
    });

    return {
        decks: deckArray
    }
}

export default connect(mapStateToProps)((props) => {
  const navigation = useNavigation()

  return (<DeckListView {...props} navigation={navigation}/>)
})