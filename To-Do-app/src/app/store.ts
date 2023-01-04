import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../features/userSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>




