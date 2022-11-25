import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from '../utils/api'
import { CharactersType } from '../components/CharacterUI'
interface ThunkError {
  error: string
}

export const getPagesWithWrongEndpoint = createAsyncThunk<number, undefined, {rejectValue: ThunkError}>(
  'characters/getPagesWithWrongEndpoint',
  async (_: undefined, { rejectWithValue }: any) => {
    try {
      return await Api.getPagesWithWrongEndpoint()
    } catch (error) {
      const thunkError = error as ThunkError
      return rejectWithValue(thunkError)
    }
  }
)

export const getPages = createAsyncThunk<number, undefined, {rejectValue: ThunkError}>(
  'characters/getPages',
  async () => await Api.getPages()
)

export const getCharacters = createAsyncThunk<CharactersType[], number, {rejectValue: ThunkError}>(
  'characters/getCharacters',
  async (pageNumber: number, { rejectWithValue }) => {
    try {
      return await Api.getCharacters(pageNumber)
    } catch (error) {
      const thunkError = error as ThunkError
      return rejectWithValue(thunkError)
    }
  }
)

export const getMoreCharacters = createAsyncThunk<CharactersType[], number, {rejectValue: ThunkError}>(
  'characters/getMoreCharacters',
  async (pageNumber: number, { rejectWithValue }) => {
    try {
      return await Api.getCharacters(pageNumber)
    } catch (error) {
      const thunkError = error as ThunkError
      return rejectWithValue(thunkError)
    }
  }
)

export const getCharacter = createAsyncThunk<CharactersType[], string, {rejectValue: ThunkError}>(
  'characters/getCharacter',
  async (characterID: string, { rejectWithValue }) => {
    try {
      return await Api.getCharacter(characterID)
    } catch (error) {
      const thunkError = error as ThunkError
      return rejectWithValue(thunkError)
    }
  }
)

export const getEpisodes = createAsyncThunk<string[], CharactersType, {rejectValue: ThunkError}>(
  'characters/getEpisodes',
  async (character: CharactersType) => await Api.getEpisodes(character)
)

type initialStateType = {
  entity: CharactersType[],
  episodes: string[],
  entities: CharactersType[]
  loading: boolean
  episodesLoading: boolean
  errorMessage: string[]
  isInErrorState: boolean
  numberOfPages: number
  lastPage: number
}

const initialState: initialStateType = {
  entity: [],
  episodes: [],
  entities: [],
  loading: false,
  episodesLoading: false,
  errorMessage: [],
  isInErrorState: false,
  numberOfPages: 0,
  lastPage: 0
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCharacters.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.loading = false
      state.lastPage = action.meta.arg
      state.entities = action.payload
    })
    builder.addCase(getCharacters.rejected, (state) => {
      state.loading = true
      state.isInErrorState = true
    })
    builder.addCase(getCharacter.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.loading = false
      state.entity = action.payload
    })
    builder.addCase(getCharacter.rejected, (state, action) => {
      state.loading = false
      if (action.payload) state.errorMessage.push(action.payload.error)
      state.isInErrorState = true
    })
    builder.addCase(getEpisodes.pending, (state) => {
      state.episodesLoading = true
    })
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.episodesLoading = false
      state.episodes = action.payload
    })
    builder.addCase(getEpisodes.rejected, (state, action) => {
      state.episodesLoading = true
      if (action.payload) state.errorMessage.push(action.payload.error)
      state.isInErrorState = true
    })
    builder.addCase(getPages.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPages.fulfilled, (state, action) => {
      state.loading = false
      state.numberOfPages = action.payload
    })
    builder.addCase(getPages.rejected, (state) => {
      state.loading = true
      state.isInErrorState = true
    })
    builder.addCase(getMoreCharacters.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getMoreCharacters.fulfilled, (state, action) => {
      state.loading = false
      state.lastPage = action.meta.arg
      state.entities = state.entities.concat(action.payload)
    })
    builder.addCase(getMoreCharacters.rejected, (state, action) => {
      state.loading = true
      if (action.payload) state.errorMessage.push(action.payload.error)
      state.isInErrorState = true
    })
    builder.addCase(getPagesWithWrongEndpoint.rejected, (state, action) => {
      state.loading = false
      console.log(action.payload)
      if (action.payload) state.errorMessage.push(action.payload.error)
      state.isInErrorState = true
    })
  }

})

export default charactersSlice.reducer
