import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'

console.log(process.env.NODE_ENV)
export default configureStore({
  reducer: counterReducer,
  devTools: (process.env.NODE_ENV === 'development')
})
