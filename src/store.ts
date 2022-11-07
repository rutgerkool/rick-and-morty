import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './reducers/charactersSlice'
import thunk from 'redux-thunk'

// const middleware = [thunk]

const store = configureStore({
  reducer: {
    characters: charactersReducer
  },
  devTools: (process.env.NODE_ENV === 'development')
  // middleware
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
