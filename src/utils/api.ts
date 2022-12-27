import { CharactersType } from '../components/CharacterUI/CharacterUI'

const getPagesWithWrongEndpoint = async (): Promise<number> => {
  const url = 'https://rickandmortyapi.com/api/characterr/'
  const initialResponse = await fetch(url)
  if (!initialResponse.ok) return Promise.reject(await initialResponse.json())
  const data = await initialResponse.json()

  return data.info.pages
}

const getPages = async (): Promise<number> => {
  const url = 'https://rickandmortyapi.com/api/character/'
  const initialResponse = await fetch(url)
  if (!initialResponse.ok) return Promise.reject(await initialResponse.json())
  const data = await initialResponse.json()

  return data.info.pages
}

const getCharacters = async (pageNumber: number): Promise<CharactersType[]> => {
  const characters = []

  const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
  if (!charactersResponse.ok) return Promise.reject(await charactersResponse.json())
  const partialCharacters = await charactersResponse.json()
  characters.push(...partialCharacters.results)
  return characters
}

const getCharactersByName = async (characterName: string): Promise<CharactersType[]> => {
  const characters = []

  const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
  if (!charactersResponse.ok) return Promise.reject(await charactersResponse.json())
  const partialCharacters = await charactersResponse.json()
  characters.push(...partialCharacters.results)
  return characters
}

const getCharacter = async (characterID: string): Promise<CharactersType[]> => {
  const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
  if (!characterResponse.ok) {
    if (!characterResponse.ok) return Promise.reject(await characterResponse.json())
  }
  const character = await characterResponse.json()

  return [character]
}

const getEpisodes = async (character: CharactersType | null): Promise<string[]> => {
  const episodes: string[] = []
  if (character) {
    for (let i = 0; i < character.episode.length; i++) {
      await fetch(character.episode[i]).then(response => response.json()).then(data => {
        episodes.push(data.name)
      })
    }
  }
  return episodes
}

export const Api = {
  getPagesWithWrongEndpoint,
  getPages,
  getCharacters,
  getCharactersByName,
  getCharacter,
  getEpisodes
}
