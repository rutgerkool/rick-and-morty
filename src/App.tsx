import { CharacterUI } from './components/CharacterUI'
import { Routes, Route } from 'react-router-dom'
import { CharacterPage } from './components/CharacterPage'
import { ErrorModal } from './components/UIComonents'
import { useAppSelector } from './hooks/reduxHooks'

function App () {
  const statusCodeFromStore = useAppSelector(state => state.characters.statusCode)

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <CharacterUI />
        }/>

        <Route path={'/notFound'} element={
          <ErrorModal statusCode={statusCodeFromStore} />
        }/>

        <Route path={'/:charId'} element={
          <CharacterPage/>
        }/>

        <Route path={'*'} element={
          <ErrorModal statusCode={statusCodeFromStore} />
        }/>

      </Routes>
    </div>
  )
}

export default App
