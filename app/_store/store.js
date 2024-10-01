import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import userIdReducer from './features/user/userIdSlice';
import noteReducer from './features/notes/noteSlice';
import storage from 'redux-persist/lib/storage'; // use localStorage for web
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import { version } from 'react';
// import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage, 
//   stateReconciler: autoMergeLevel2,
};


const rootReducer = combineReducers({
    theme: themeReducer,
    userId: userIdReducer,
    note: noteReducer,
});
const persistRootReducer = persistReducer(persistConfig, rootReducer);


// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export let persistor = persistStore(makeStore());
