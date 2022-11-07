import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from '../utils/api'
import { CharactersType } from '../components/CharacterUI'

// createAsyncThunk generates promise lifecycle action types using action passed as a prefix:
// pending: characters/getCharacters/pending
// fulfilled: characters/getCharacters/fulfilled
// rejected: characters/getCharacters/rejected
const getCharacters = createAsyncThunk(
  // action type string
  'characters/getCharacters',
  // callback function
  async () => await Api.getCharacters()
)

type initialStateType = {
  entities: CharactersType[]
  loading: boolean
}

const initialState: initialStateType = {
  entities: [],
  loading: false
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
  }

})

// Action creators are generated for each case reducer function

export default charactersSlice.reducer
