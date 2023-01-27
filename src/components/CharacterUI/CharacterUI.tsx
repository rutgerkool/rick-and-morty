import { useEffect, useState } from 'react'
import '../../styles/CharacterList.css'
import { ErrorModal, FilterBar, LoadMoreButton, SearchBar } from '../UIComponents/UIComonents'
import { CharacterList } from '../CharacterList/CharacterList'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearErrorState, getMoreCharacters, getPages, getPagesWithWrongEndpoint, setScrollPosition } from '../../reducers/charactersSlice'
import { Button } from '@mui/material'

export type CharactersType = {
    id: number,
    name:string,
    status: string,
    species : string;
    type? : string;
    gender : string;
    origin : object;
    location : {name: string, url: string};
    image : string;
    episode : string[];
    created: string;
}

export type EpisodeType = {
  air_date: string,
  created: string,
  name: string,
  episode: string
}

export function CharacterUI () {
  const dispatch = useAppDispatch()
  const {
    searchedEntities: searchedCharactersFromStore,
    isInErrorState: characterRejectedFromStore,
    errorMessage: statusCodeFromStore,
    numberOfPages: pagesFromStore,
    lastPage: lastPageFromStore,
    scrollPosition: scrollPositionFromStore,
    loading: loadingFromStore
  } = useAppSelector(state => state.characters)
  const [pageNumber, setPageNumber] = useState<{pageNumber: number}>({ pageNumber: 1 })
  const [togglePageReload, setShouldReloadPage] = useState<boolean>(false)
  const [{ filterValue, firstLetter }, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({ filterValue: '', firstLetter: false })

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
    if (characterRejectedFromStore) {
      setShouldReloadPage(!togglePageReload)
    }
  }, [characterRejectedFromStore])

  return (
        <div className='page-container'>
            <img
                className='logo'
                src={require('../../pictures/Rick-And-Morty-Logo.png')}
                alt={'logo'}
            />
            <FilterBar setFilterValue={setFilterValue} setPageNumber={setPageNumber} numberOfPages={pagesFromStore}/>
            <SearchBar />
            <CharacterList
                filterValue={filterValue}
                firstLetter={firstLetter}
                numberOfPages={pagesFromStore}
                pageNumber={pageNumber.pageNumber}
                shouldReloadPage={togglePageReload}
            />
            {lastPageFromStore >= pagesFromStore || searchedCharactersFromStore.length > 0 || loadingFromStore
              ? null
              : (
              <LoadMoreButton getMoreCharacters={() => {
                dispatch(getMoreCharacters(lastPageFromStore + 1))
                dispatch(setScrollPosition(window.scrollY))
                setShouldReloadPage(!togglePageReload)
              } } />
                )
            }
            {statusCodeFromStore.length > 0
              ? statusCodeFromStore.map((error) => {
                return <ErrorModal isOpenFirstTime={true} statusMessage={statusCodeFromStore} key={error}/>
              })
              : null}
        </div>
  )
}
