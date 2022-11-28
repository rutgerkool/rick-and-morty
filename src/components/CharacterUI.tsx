import { useEffect, useState } from 'react'
import '../styles/CharacterList.css'
import { ErrorModal, FilterBar, LoadMoreButton, SearchBar } from './UIComonents'
import { CharacterList } from './CharacterList'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { clearErrorState, getMoreCharacters, getPages, getPagesWithWrongEndpoint, setScrollPosition } from '../reducers/charactersSlice'
import { Button } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export type CharactersType = {
    id: number,
    name:string,
    status: string,
    species : string;
    type : string;
    gender : string;
    origin : object;
    location : {name: string, url: string};
    image : string;
    episode : string[];
    created: string;
}

export function CharacterUI () {
  const errorStateLoadingFromStore = useAppSelector(state => state.characters.isInErrorState)
  const statusCodeFromStore = useAppSelector(state => state.characters.errorMessage)
  const [pageNumber, setPageNumber] = useState<{pageNumber: number}>({ pageNumber: 1 })
  const [togglePageReload, setShouldReloadPage] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const scrollPositionFromStore = useAppSelector(state => state.characters.scrollPosition)
  const pagesFromStore = useAppSelector(state => state.characters.numberOfPages)
  const lastPageFromStore = useAppSelector(state => state.characters.lastPage)
  const [{ filterValue, firstLetter }, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({ filterValue: '', firstLetter: false })
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    dispatch(getPages())
    return () => {
      dispatch(clearErrorState())
    }
  }, [])

  useEffect(() => {
    const scrollingElement = (document.scrollingElement || document.body)
    scrollingElement.scrollTop = scrollPositionFromStore
  })

  useEffect(() => {
    if (errorStateLoadingFromStore) {
      setShouldReloadPage(!togglePageReload)
    }
  }, [errorStateLoadingFromStore])

  return (
        <div className='page-container'>
            <img
                className='logo'
                src={require('../pictures/Rick-And-Morty-Logo.png')}
                alt={'logo'}
            />
            <FilterBar setFilterValue={setFilterValue} setPageNumber={setPageNumber} numberOfPages={pagesFromStore}/>
            <SearchBar setFilterValue={setFilterValue} setPageNumber={setPageNumber} numberOfPages={pagesFromStore}/>
            <Button
              sx={{
                margin: 2
              }}
              onClick={() => {
                dispatch(getPagesWithWrongEndpoint())
              }}>Create error</Button>
            <CharacterList
                filterValue={filterValue}
                firstLetter={firstLetter}
                numberOfPages={pagesFromStore}
                pageNumber={pageNumber.pageNumber}
                shouldReloadPage={togglePageReload}
            />
            {lastPageFromStore >= pagesFromStore
              ? null
              : (
              <LoadMoreButton getMoreCharacters={() => {
                dispatch(getMoreCharacters(lastPageFromStore + 1))
                dispatch(setScrollPosition(window.scrollY))
                setShouldReloadPage(!togglePageReload)
                console.log(searchParams.get('page'))
                searchParams.get('page')
                  ? navigate(`?page=${searchParams.get('page')},${lastPageFromStore + 1}`)
                  : navigate(`?page=${lastPageFromStore},${lastPageFromStore + 1}`, { replace: false })
              } } />
                )
            }
            {statusCodeFromStore.length > 0
              ? statusCodeFromStore.map((error, index) => {
                return <ErrorModal isOpenFirstTime={true} statusMessage={statusCodeFromStore} key={error}/>
              })
              : null}
        </div>
  )
}
