import { CharacterUI, CharacterProps } from './components/CharacterUI'
import { Routes, Route } from 'react-router-dom'
import { CharacterPage } from './components/CharacterPage'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <CharacterUI />
        }/>

        <Route path={'/:charId'} element={
          <CharacterPage/>
        }/>

        <Route path={'*'} element={
          <p>Page not found</p>
        }/>
      </Routes>
    </div>
  )
}

export default App
