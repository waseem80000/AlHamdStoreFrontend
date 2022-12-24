import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'app',
  storage: storage,
  whitelist: ['products', 'customers', 'categories'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeEnhancer(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { persistor, store };
