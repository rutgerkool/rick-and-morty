import { useState } from 'react'
import '../styles/CharacterList.css'
import { FilterBar, SearchBar } from './UIComonents'
import { CharacterList } from './CharacterList'

export type CharacterProps = {
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
  const [{ filterValue, firstLetter }, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({ filterValue: '', firstLetter: false })

  return (
        <div className='page-container'>
            <img
                className='logo'
                src={require('../pictures/Rick-And-Morty-Logo.png')}
                alt={'logo'}
            />
            <FilterBar setFilterValue={setFilterValue} />
            <SearchBar setFilterValue={setFilterValue} />
            <CharacterList
                filterValue={filterValue}
                firstLetter={firstLetter}
            />
        </div>
  )
}
