import React from 'react'
import { CharacterProps } from './CharacterList'
import './Character.css'

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