import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
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


const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();

function TabDeckView() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckDetails" component={DeckDetailsView} />
      <Tab.Screen name="NewDeck" component={NewDeckView} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    store.dispatch(handleGetInitialData())
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='DeckList'>
              <Stack.Screen name="DeckList" component={DeckListView} />
              <Stack.Screen name="NewDeck" component={NewDeckView} />
              <Stack.Screen name="TabDeck" component={TabDeckView} />
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
