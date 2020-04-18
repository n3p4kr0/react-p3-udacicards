import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import DeckListView from './components/DeckListView'
import DeckDetailsView from './components/DeckDetailsView'
import NewDeckView from './components/NewDeckView'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { handleGetInitialData } from './store/actions'
import { white, orange } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import './utils/ReactotronConfig'
import { Transition } from 'react-native-reanimated';

const Stack = createStackNavigator();

const TransitionListToDetails = {
  gestureDirection: 'horizontal',
  transtionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { spinner: true }
  }

  componentDidMount() {
    setLocalNotification()
  }

  getInitialData = () => {
    if((Object.keys(store.getState().decks).length === 0)) {
      store.dispatch(handleGetInitialData())
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={this.getInitialData()}>
          <NavigationContainer>
            <Stack.Navigator
              style={styles.container} 
              initialRouteName='DeckList'
              screenOptions= {{
                headerStyle: {
                  backgroundColor: orange
                },
                headerTitleAlign: 'center',
                headerTintColor: white,
                headerTitleStyle: { alignSelf: 'center' },
                ...TransitionListToDetails
              }}
            >
              <Stack.Screen name="DeckList" component={DeckListView} />
              <Stack.Screen 
                name="NewDeck" 
                component={NewDeckView} 
                options= {{
                  headerTitle: 'Add a Deck',
                }}
              />
              <Stack.Screen name="DeckDetails" component={DeckDetailsView} />
              <Stack.Screen name="Quiz" component={QuizView} />
              <Stack.Screen name="NewQuestion" component={NewQuestionView} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
  },
  spinnerText: {
    color: white
  }
});
