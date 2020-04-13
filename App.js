import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DeckListView from './components/DeckListView'
import DeckDetailsView from './components/DeckDetailsView'
import NewDeckView from './components/NewDeckView'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();

function TabDeckView() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckDetails" component={DeckDetailsView} />
      <Tab.Screen name="NewQuestion" component={NewQuestionView} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();


export default function App({navigation}) {
  console.log(navigation)
  const decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='DeckList'>
        <Stack.Screen 
          name="DeckList"
          component={DeckListView}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('NewDeck')}
              >
                <Text>Add Deck</Text>
              </TouchableOpacity>
            )}} />
        <Stack.Screen name="TabDeck" component={TabDeckView} />
        <Stack.Screen name="Quiz" component={QuizView} />
        <Stack.Screen name="NewDeck" component={NewDeckView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
