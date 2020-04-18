import 'react-native-gesture-handler';
import React from 'react';
import { Notifications } from 'expo'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckListView from './components/DeckListView'
import DeckDetailsView from './components/DeckDetailsView'
import NewDeckView from './components/NewDeckView'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { handleGetInitialData } from './store/actions'
import { white, royalBlue, orange } from './utils/colors'
import { setLocalNotification, createNotification } from './utils/helpers'
import './utils/ReactotronConfig'

const Stack = createStackNavigator();



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
