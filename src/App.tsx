import React from 'react';
import {CharacterList, CharacterProps} from './components/CharacterList'
import { Routes, Route} from 'react-router-dom'
import {  CharacterPage } from './components/Character';
import {useState, useEffect} from 'react'

function App() {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);

    useEffect(() => {
        const url='https://rickandmortyapi.com/api/character/';
        fetch(url).then(response => response.json()).then(data => {
            setCharacters(data.results);
        })

        async function getCharacters() {
            for (let i = 2; i <= 42; i++) {
                await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`).then(response => response.json()).then(data => {
                    setCharacters(prevchar => prevchar.concat(data.results))
                })
            }
        }

        getCharacters();
        
    }, [])

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <CharacterList></CharacterList>
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
