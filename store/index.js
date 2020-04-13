import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from './reducers'; 
import middleware from './middleware'

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store);
