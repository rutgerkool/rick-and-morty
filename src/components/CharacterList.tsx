import React, { useState, useEffect} from 'react'
import { Character } from './Character'

export function CharacterList() {
    const [characters, setCharacters] = useState<{id: number, name:string}[]>([]);

    useEffect(() => {
        const url='https://rickandmortyapi.com/api/character/';
        fetch(url).then(response => response.json()).then(data => {
            setCharacters(data.results);
        })

        for (let i = 2; i <= 42; i++) {
            fetch(`https://rickandmortyapi.com/api/character/?page=${i}`).then(response => response.json()).then(data => {
                setCharacters(prevchar => prevchar.concat(data.results))
            })
        }
        
    }, [])

    

    return (
        <div>
            {characters ? 
                characters.map(el => {
                    return <div key={el.id}>{el.name}</div>
                }) : null}
            <Character></Character>
        </div>
    )
}