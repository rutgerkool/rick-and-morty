import { CharactersType } from '../components/CharacterUI'

const getCharacters = async (): Promise<CharactersType[]> => {
  const url = 'https://rickandmortyapi.com/api/character/'
  const initialResponse = await fetch(url)
  const data = await initialResponse.json()

  const characters = []
  for (let i = 1; i <= data.info.pages; i++) {
    const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
    const partialCharacters = await charactersResponse.json()
    characters.push(...partialCharacters.results)
  }
  return characters
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
  getCharacters,
  getEpisodes
}
