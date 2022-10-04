import { useState, useEffect} from 'react'
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

export function CharacterUI() {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [{filterValue, firstLetter}, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({filterValue: '', firstLetter: false});

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
        
    }, [pageNumber])

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
                characters={characters}
                filterValue={filterValue}
                firstLetter={firstLetter}
            />
        </div>
    )
}


