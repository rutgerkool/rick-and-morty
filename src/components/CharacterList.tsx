import React, { useState, useEffect} from 'react'
import { Character } from './Character'
import { Link } from 'react-router-dom'
import './CharacterList.css'
import { Button, ButtonGroup } from '@mui/material'

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
    created: string;
}

export function CharacterList() {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [filterValue, setFilterValue] = useState<string>('');

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

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
            <div className='filter-bar'>
                <ButtonGroup variant='contained' aria-label='outlined primary button group'>
                    {alphabet.map(el => <Button onClick={e => {
                        e.preventDefault();
                        setFilterValue(el.toUpperCase());
                    }}>{el}</Button>)}
                </ButtonGroup>
            </div>
            {list ? list.map(el => {
            if (filterValue !== '' && el[0].name[0] !== filterValue) {
                console.log(filterValue, 'and', el[0].name)
                return null;}
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    }}>
                        <Link className='navlink' to={`/${el[0].id}`}>
                            <Character {...el[0]}></Character>
                        </Link>
    
                        <Link className='navlink' to={`/${el[1].id}`}>
                            <Character {...el[1]}></Character>
                        </Link>
                    </div>
                    )
            })
                 : null}
        </div>
    )
}


