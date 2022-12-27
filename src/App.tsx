import { CharacterUI } from './components/CharacterUI/CharacterUI'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { CharacterPage } from './components/CharacterPage/CharacterPage'
import { ErrorModal } from './components/UIComponents/UIComonents'
import { useAppSelector } from './hooks/reduxHooks'

function App () {
  const { errorMessage: statusCodeFromStore } = useAppSelector(state => state.characters)

  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App
