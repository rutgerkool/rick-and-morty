import { CharacterUI, CharacterProps } from './components/CharacterUI'
import { Routes, Route} from 'react-router-dom'
import { CharacterPage } from './components/CharacterPage'
import { useState, useEffect } from 'react'

function App() {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    const url='https://rickandmortyapi.com/api/character/';
    fetch(url).then(response => response.json()).then(data => {
        setPageNumber(data.info.pages);
        setCharacters(data.results);
    })

    async function getCharacters() {
        for (let i = 2; i <= pageNumber; i++) {
            await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`).then(response => response.json()).then(data => {
                setCharacters(previousCharacters => previousCharacters.concat(data.results))
            })
        }
    }

    getCharacters();
    
}, [])

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <CharacterUI characters={characters}></CharacterUI>
        }/>
        {characters !== undefined && characters.length > 0 ? (
          <Route path={'/:charId'} element={
            <CharacterPage characters={characters}/>
          }/>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
