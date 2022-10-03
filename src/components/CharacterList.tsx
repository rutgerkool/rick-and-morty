import React, { useState, useEffect} from 'react'
import { Character } from './Character'
import { Link } from 'react-router-dom'
import './CharacterList.css'
import { Button, ButtonGroup, TextField} from '@mui/material'

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


export function CharacterList() {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [{filterValue, firstLetter}, setFilterValue] = useState<{filterValue: string, firstLetter: boolean}>({filterValue: '', firstLetter: false});

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

    return (
        <div className='page-container'>
            <img className='logo' src={require('./Rick-And-Morty-Logo.png')} alt={'logo'}/>
            <div className='filter-bar'>
                <ButtonGroup variant='contained' aria-label='outlined primary button group'
                    sx={{
                        width: '100%', 
                        display: 'block', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }} 
                >
                    {alphabet.map(el => 
                    <Button size='small'
                        sx={{
                            width: '2vw',
                        }}
                    onClick={e => {
                        e.preventDefault();
                        setFilterValue({filterValue: el.toLowerCase(), firstLetter: true});
                    }}>{el}
                    </Button>
                    )}
                </ButtonGroup>
            </div>
            <div className='search-bar' style={{
                width: '75%',
                display: 'block', 
                marginLeft: 'auto',
                marginRight: 'auto',
                }}>
                <TextField fullWidth sx={{
                    width: '100%', 
                    backgroundColor: 'lightgrey', 
                    display: 'block', 
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 5,
                }}  label="Search" onChange={e => {
                    e.preventDefault();
                    setFilterValue({filterValue: e.target.value.toLowerCase(), firstLetter: false});
                }}/>
            </div>
            {characters ? characters.map(el => {
            if (filterValue !== '' && !firstLetter) {
                if (!el.name.toLowerCase().includes(filterValue))
                    return null;
            }
            else if (filterValue !== '' && firstLetter) {
                if (!el.name.toLowerCase().slice(0,filterValue.length).includes(filterValue)) 
                    return null;
            }
            return (
                <div className='character-item' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    }}>
                        <Link className='navlink' to={`/${el.id}`}>
                            <Character {...el}></Character>
                        </Link>
                    </div>
                    )
            })
                 : null}
        </div>
    )
}


