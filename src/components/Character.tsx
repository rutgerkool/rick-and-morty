import React, {useState, useEffect} from 'react'
import { CharacterProps } from './CharacterList'
import './Character.css'
import { useParams } from 'react-router-dom'
import { Button, List, ListItem } from '@mui/material'

export function CharacterPage(props : {characters: CharacterProps[]}) {
    const params = useParams();
    const character = props.characters.find(el => el.id === Number(params.charId))!

    const [episodes, setEpisodes] = useState<string[]>([]);

    useEffect(() => {
        async function getEpisodes() {
            for (let i = 0; i < character.episode.length; i++) {
                await fetch(character.episode[i]).then(response => response.json()).then(data => {
                    setEpisodes(prevchar => prevchar.concat(data.name))
                })
            }
        }

        getEpisodes();
        
    }, [character.episode])
    
    return(
        <div>
            <div className='character-page' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',        
            }}>
                    <div>
                        <img src={character.image} alt={character.name}/>
                    </div> 
                    <div style={{
                        margin: 10,
                        padding: 10,
                    }}>
                        <h1>{character.name}</h1>
                        <p><span className={character.status === 'Alive' ? 'status-dot-alive' : 
                        (character.status === 'Dead' ? 'status-dot-dead' : 'status-dot-unknown')}></span>  {character.status} - {character.species}</p>
                        
                        <p className='subtitle'>Last known location: </p>
                        <p>{character.location.name}</p>

                        <p className='subtitle'>First seen in: </p>
                        <p>{episodes[0]}</p>

                        <p className='subtitle'>Gender: </p>
                        <p>{character.gender}</p>

                        {character.type ? (
                            <div>
                                <p className='subtitle'>Type: </p>
                                <p>{character.type}</p>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <Button variant='contained' href='/' sx={{width: 20}}>Back</Button>
                    </div>
            </div>
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', 
            }}>
                <div className='episode-title'>
                    <h2>Episodes</h2>
                </div>
                <List className='episode-list'
                    sx={{
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                        borderRadius: 5,
                        backgroundColor: 'lightgrey',
                        }}
                    >
                    {episodes ? episodes.map(el => {
                        return <ListItem>{el}</ListItem>
                    }) : null}
                </List>
            </div>
            <div className='created-text'>
                <p>Created: {character.created}</p>
            </div>
        </div>
    )
}

export function Character(props : CharacterProps) {
    return(
        <div className='character'>
                <div>
                    <img className='character-image' src={props.image} alt={props.name}/>
                </div> 
                <div style={{
                    margin: 10,
                    padding: 10,
                }}>
                    <h1>{props.name}</h1>
                    <p><span className={props.status === 'Alive' ? 'status-dot-alive' : 
                    (props.status === 'Dead' ? 'status-dot-dead' : 'status-dot-unknown')}></span>  {props.status} - {props.species}</p>
                    
                    <p>Last known location: </p>
                    <p>{props.location.name}</p>
                </div>
        </div>
    )
}