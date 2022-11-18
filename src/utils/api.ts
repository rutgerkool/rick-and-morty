import { CharactersType } from '../components/CharacterUI'

const getPages = async (): Promise<number> => {
  const url = 'https://rickandmortyapi.com/api/character/'
  const initialResponse = await fetch(url)
  const data = await initialResponse.json()

  return data.info.pages
}

const getCharacters = async (pageNumber: number): Promise<CharactersType[]> => {
  const characters = []

  const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
  const partialCharacters = await charactersResponse.json()
  characters.push(...partialCharacters.results)
  return characters
}

const getCharacter = async (characterID: string): Promise<CharactersType[]> => {
  const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
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
  getPages,
  getCharacters,
  getCharacter,
  getEpisodes
}
