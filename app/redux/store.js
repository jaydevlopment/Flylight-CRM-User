import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './Reducers/root_reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer, applyMiddleware(thunk)
);
let persistor = persistStore(store);
export {
  store,
  persistor,
};



