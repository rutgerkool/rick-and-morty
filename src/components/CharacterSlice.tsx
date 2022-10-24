import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'

export const characterSlice = createSlice({
  name: 'character',
  initialState: {
    value: []
  },
  reducers: {
    setCharacters: (state, action) => {
      state.value = [...state.value].concat(action.payload)
    }
  }
})

export const { setCharacters } = characterSlice.actions

export const selectCharacters = (state: RootState) => state.character.value

export default characterSlice.reducer
