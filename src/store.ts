import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './reducers/charactersSlice'
import thunk from 'redux-thunk'

// const middleware = [thunk]

export default configureStore({
  reducer: charactersReducer,
  devTools: (process.env.NODE_ENV === 'development')
  // middleware
})
