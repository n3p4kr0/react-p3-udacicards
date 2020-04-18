import React, { useLayoutEffect, Component } from 'react'
import { View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { white, orange, royalBlue } from '../utils/colors'

class DeckListItem extends Component{
  state = {
    bounceValue: new Animated.Value(1)
  }

  onItemSelected = () => {
    Animated.sequence([
      Animated.timing(this.state.bounceValue, { duration: 200, toValue: 1.12 }),
      Animated.spring(this.state.bounceValue, { toValue: 1, friction: 4 })
    ]).start()
    
    setTimeout( () => {
      this.props.navigation.navigate('DeckDetails', { title: this.props.deck.title, questions: this.props.deck.questions })
    },220)    
  }

  render() {
    const deck = this.props.deck

    return (
      <Animated.View style={{ transform: [{ scale: this.state.bounceValue }] }} >
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.7}
          underlayColor="rgba(253,138,94,0)" 
          onPress={this.onItemSelected}
        >
            <Text style={styles.itemTitle}>{deck.title}</Text>
            <Text style={styles.itemNbCards}>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
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
          <SafeAreaView style={styles.listContainer}>
            <FlatList 
              //style={styles.list}
              contentContainerStyle={styles.list}
              data={decks}
              renderItem={item => {return (<DeckListItem deck={item.item} navigation={navigation}/>)}}
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
    paddingVertical: 20,
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
