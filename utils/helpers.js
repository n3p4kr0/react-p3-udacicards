import { _getDecks } from './DATA'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native';

const NOTIFICATIONS_KEY= "Udacicards:notifications"

export function retrieveDecks() {
    return Promise.all([
        _getDecks()
      ]).then((decks) => ({
        decks
      }))
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: 'Exercise your brain!',
    body: "You didn't play your daily quiz today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then(async (data) => {
      //console.log(data)
      //if (data === null) {
        const { status } =  await Permissions.askAsync(Permissions.NOTIFICATIONS)

        console.log("Status: " + status)

        if(status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
      
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)
          console.log(tomorrow)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          ).then(console.log('Uesh, notif set up'))

          AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
        }
        
      //}
    })
}