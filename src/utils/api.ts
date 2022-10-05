async function getCharacters () {
  const url = 'https://rickandmortyapi.com/api/character/'
  const initialResponse = await fetch(url)
  const data = await initialResponse.json()

  const characters = []
  for (let i = 0; i <= data.info.pages; i++) {
    const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
    const partialCharacters = await charactersResponse.json()
    characters.push(...partialCharacters.results)
  }
  return characters
}
export const Api = {
  getCharacters
}
