import { CharacterProps } from './CharacterUI'
import '../styles/Character.css'

export const listStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export function CharacterCardInfo(props : {character : CharacterProps}) {
    return (
        <div> 
            <h1>{props.character.name}</h1>
            <p>
                <span 
                    className={props.character.status === 'Alive' ? 'status-dot-alive' : 
                    (props.character.status === 'Dead' ? 'status-dot-dead' : 'status-dot-unknown')}
                >
                </span>  {props.character.status} - {props.character.species}
            </p>
            
            <p className='subtitle'>Last known location: </p>
            <p>{props.character.location.name}</p>
        </div>
    )
}

export function CharacterCard(props : CharacterProps) {
    return(
        <div className='character'>
                <div>
                    <img className='character-image' src={props.image} alt={props.name}/>
                </div> 
                <div 
                    style={{
                        margin: 10,
                        padding: 10,
                    }}
                >
                    <CharacterCardInfo character={props}/>
                </div>
        </div>
    )
}
