import { _getDecks } from './DATA'

export function retrieveDecks() {
    return Promise.all([
        _getDecks()
      ]).then((decks) => ({
        decks
      }))
}