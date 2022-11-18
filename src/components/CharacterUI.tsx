import { useEffect, useState } from 'react'
import '../styles/CharacterList.css'
import { FilterBar, SearchBar } from './UIComonents'
import { CharacterList } from './CharacterList'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { getPages } from '../reducers/charactersSlice'

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
  const [pageNumber, setPageNumber] = useState<{pageNumber: number}>({ pageNumber: 1 })
  const dispatch = useAppDispatch()
  const pagesFromStore = useAppSelector(state => state.characters.numberOfPages)
  const [{ filterValue, firstLetter }, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({ filterValue: '', firstLetter: false })

  useEffect(() => {
    dispatch(getPages())
  }, [])

  return (
        <div className='page-container'>
            <img
                className='logo'
                src={require('../pictures/Rick-And-Morty-Logo.png')}
                alt={'logo'}
            />
            <FilterBar setFilterValue={setFilterValue} setPageNumber={setPageNumber} numberOfPages={pagesFromStore}/>
            <SearchBar setFilterValue={setFilterValue} setPageNumber={setPageNumber} numberOfPages={pagesFromStore}/>
            <CharacterList
                filterValue={filterValue}
                firstLetter={firstLetter}
                numberOfPages={pagesFromStore}
                pageNumber={pageNumber.pageNumber}
            />
        </div>
  )
}
