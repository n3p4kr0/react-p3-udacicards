import React, { useLayoutEffect } from 'react'
import { View, SafeAreaView, Button, StyleSheet, Text, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { white, orange, royalBlue } from '../utils/colors'

/*function removeData() {
  AsyncStorage.clear()
    .then(() => {
      console.log('DELETED')
    }).catch(e => {
      console.log('ERROR : ' + e)
    }).finally(() => {
      console.log('Done')
    })
}*/

function DeckListItem(deck) {
    deck = deck.deck

    const navigation = useNavigation();
    return (
      <View>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.7}
          underlayColor="rgba(253,138,94,0)" 
          onPress={() => { 
            navigation.navigate('DeckDetails', { title: deck.title, questions: deck.questions })
          }}
          onLongPress={() => {
            Alert.alert('Appui long', 'TODO : Add a menu allowing to delete the deck or change its title')
          }}
        >
            <Text style={styles.itemTitle}>{deck.title}</Text>
            <Text style={styles.itemNbCards}>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
      </View>
    )
}


function DeckListView(props) {
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Your Decks',
        headerRight: () => (
          <TouchableWithoutFeedback>
            <Feather name="plus" style={styles.iconPlus} onPress={() => props.navigation.navigate("NewDeck")} title="Add Deck" />
          </TouchableWithoutFeedback>
        ),
      });
    });

    const { decks } = props
    return (
        <View style={styles.deckListView}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeContent}>Welcome ! Your brain is nothing more than a muscle: keep exercising to get better!</Text>
          </View>
          {/*<TouchableOpacity
            onPress={removeData}>
            <Text>_DEV_ : DELETE ALL DATA FROM ASYNC STORAGE</Text>
          </TouchableOpacity>*/}
          <SafeAreaView style={styles.listContainer}>
            <FlatList 
              style={styles.list}
              data={decks}
              renderItem={item => {return (<DeckListItem deck={item.item} />)}}
              keyExtractor={item => item.title}
            />
          </SafeAreaView>
        </View>
      
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

const styles = StyleSheet.create({
  iconPlus: {
    fontSize: 30,
    color: '#FFFFFF',
    paddingRight: 10
  },
  deckListView: {
    flex: 1,
    backgroundColor: '#FF5C39'
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: royalBlue,
    borderBottomStartRadius: 60,
    borderBottomRightRadius: 60,
  },
  welcomeContent: {
    textAlign: 'center',
    fontSize: 20,
    color: white,
  },
  listContainer: {
    backgroundColor: royalBlue,
    flex: 3,
    borderTopStartRadius: 60,
    borderTopRightRadius: 60
  },
  itemContainer: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 30,
    backgroundColor: orange,
    shadowColor: 'rgba(255,255,255, 1)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  list: {
    paddingTop: 40
  },
  itemTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  itemNbCards: {
    color: '#EEEEEE',
    fontStyle: 'italic',
  }
});
