import React, { useState, useEffect} from 'react'
import { Character } from './Character'

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
    episodes : string[];
}

export function CharacterList() {
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
        <div>
            {characters ? 
                characters.map(el => {
                    return <Character {...el}></Character>;
                }) : null}
        </div>
    )
}