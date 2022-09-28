import React, { useState, useEffect} from 'react'
import { Character } from './Character'

export function CharacterList() {
    const [characters, setCharacters] = useState<{id: number,name:string}[]>([])

    useEffect(() => {
        const url='https://rickandmortyapi.com/api/character/';
        fetch(url).then(response => response.json()).then(data => {
            setCharacters(data.results);
        })

    }, [characters])

    return (
        <div>
            {characters ? 
                characters.map(el => {
                    return <div>{el.name}</div>
                }) : null}
            <Character></Character>
        </div>
    )
}