import React from 'react'
import { CharacterProps } from './CharacterList'
import './Character.css'
import { useParams } from 'react-router-dom'

export function CharacterPage(props : {characters: CharacterProps[]}) {
    const params = useParams();
    const character = props.characters.find(el => el.id === Number(params.charId))!
    return(
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
                    
                    <p>Last known location: </p>
                    <p>{character.location.name}</p>

                    <p>First seen in: </p>
                    
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