import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from '../utils/api'
import { CharactersType } from '../components/CharacterUI'

// createAsyncThunk generates promise lifecycle action types using action passed as a prefix:
// pending: characters/getCharacters/pending
// fulfilled: characters/getCharacters/fulfilled
// rejected: characters/getCharacters/rejected
export const getPages = createAsyncThunk(
  'characters/getPages',
  async () => await Api.getPages()
)

export const getCharacters = createAsyncThunk(
  // action type string
  'characters/getCharacters',
  // callback function
  async (pageNumber: number) => await Api.getCharacters(pageNumber)
)

export const getCharacter = createAsyncThunk(
  'characters/getCharacter',
  async (characterID: string) => await Api.getCharacter(characterID)
)

export const getEpisodes = createAsyncThunk(
  'characters/getEpisodes',
  async (character: CharactersType) => await Api.getEpisodes(character)
)

type initialStateType = {
  entity: CharactersType[],
  episodes: string[],
  entities: CharactersType[]
  loading: boolean
  episodesLoading: boolean
  error: boolean
  numberOfPages: number
}

const initialState: initialStateType = {
  entity: [],
  episodes: [],
  entities: [],
  loading: false,
  episodesLoading: false,
  error: false,
  numberOfPages: 0
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
    builder.addCase(getCharacters.rejected, (state) => {
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
    builder.addCase(getCharacter.rejected, (state) => {
      state.loading = true
      state.error = true
    })
    builder.addCase(getEpisodes.pending, (state) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.episodesLoading = true
    })
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.episodesLoading = false
      state.episodes = action.payload
      state.error = false
    })
    // TODO add error handling
    builder.addCase(getEpisodes.rejected, (state) => {
      state.episodesLoading = true
      state.error = true
    })
    builder.addCase(getPages.pending, (state) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.loading = true
    })
    builder.addCase(getPages.fulfilled, (state, action) => {
      state.loading = false
      state.numberOfPages = action.payload
    })
    // TODO add error handling
    builder.addCase(getPages.rejected, (state) => {
      state.loading = true
    })
  }

})

// Action creators are generated for each case reducer function

export default charactersSlice.reducer
