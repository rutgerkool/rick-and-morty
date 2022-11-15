import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from '../utils/api'
import { CharactersType } from '../components/CharacterUI'

// createAsyncThunk generates promise lifecycle action types using action passed as a prefix:
// pending: characters/getCharacters/pending
// fulfilled: characters/getCharacters/fulfilled
// rejected: characters/getCharacters/rejected
export const getCharacters = createAsyncThunk(
  // action type string
  'characters/getCharacters',
  // callback function
  async (thunkAPI) => await Api.getCharacters()
)

export const getCharacter = createAsyncThunk(
  'characters/getCharacter',
  async (characterID: string) => await Api.getCharacter(characterID)
)

type initialStateType = {
  entity: CharactersType[],
  entities: CharactersType[]
  loading: boolean
  error: boolean
}

const initialState: initialStateType = {
  entity: [],
  entities: [],
  loading: false,
  error: false
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCharacters.pending, (state) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.loading = true
    })
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.loading = false
      state.entities = action.payload
    })
    // TODO add error handling
    builder.addCase(getCharacters.rejected, (state, action) => {
      state.loading = true
    })
    builder.addCase(getCharacter.pending, (state) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.loading = true
    })
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.loading = false
      state.entity = action.payload
      state.error = false
    })
    // TODO add error handling
    builder.addCase(getCharacter.rejected, (state, action) => {
      state.loading = true
      state.error = true
    })
  }

})

// Action creators are generated for each case reducer function

export default charactersSlice.reducer
