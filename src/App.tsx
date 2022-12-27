import { CharacterUI } from './components/CharacterUI/CharacterUI'
import { Routes, Route } from 'react-router-dom'
import { CharacterPage } from './components/CharacterPage/CharacterPage'
import { ErrorModal } from './components/UIComponents/UIComonents'
import { useAppSelector } from './hooks/reduxHooks'

function App () {
  const statusCodeFromStore = useAppSelector(state => state.characters.errorMessage)

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <CharacterUI />
        }/>

        <Route path={'/notFound'} element={
          <ErrorModal isOpenFirstTime={true} statusMessage={statusCodeFromStore} />
        }/>

        <Route path={'/:charId'} element={
          <CharacterPage/>
        }/>

        <Route path={'*'} element={
          <ErrorModal isOpenFirstTime={true} statusMessage={statusCodeFromStore} />
        }/>

      </Routes>
    </div>
  )
}

export default App
