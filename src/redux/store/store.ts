import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createTransform from 'redux-persist/es/createTransform';
import Flatted from 'flatted';
import RootReducer from '../reducers/index';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));

  let persistor = persistStore(store);

  return {store, persistor};
};
