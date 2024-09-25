

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userSlice from './userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'

// Redux Persist ka configuration React Native ke AsyncStorage ke sath
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // AsyncStorage ko as a storage use kar rahe hain
}

// Tumhare reducers ko combine kar rahe ho
const rootReducer = combineReducers({
  counter: counterReducer,
  userSlice: userSlice,
})

// Persist reducer banate hain
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Store ko configure karte hain persisted reducer ke sath
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)