import React, { useState, useEffect} from 'react'
import { Character } from './Character'
import './CharacterList.css'

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

    let list : CharacterProps[][] = []

    for (let i = 0; i < characters.length; i+=2) {
        list.push([characters[i], characters[i+1]])
    }

    return (
        <div>
            <img className='logo' src={require('./Rick-And-Morty-Logo.png')} alt={'logo'}/>
            {list ? list.map(el => {
            return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                }}>
                    <Character {...el[0]}></Character>;
                    <Character {...el[1]}></Character>;
                </div>
                )})
                 : null}
        </div>
    )
}


